import jsPDF from "jspdf";
import html2canvas from "html2canvas";

export interface GeneratePdfOptions {
  filename?: string;
  scale?: number;
}

/**
 * Capture an HTML element and generate a high-resolution, print-ready A4 PDF.
 * Uses scale: 2 for sharp text and authentic Malayalam script rendering.
 */
export async function generatePdfBlob(
  elementId: string,
  options: GeneratePdfOptions = {}
): Promise<{ blob: Blob; dataUri: string }> {
  const element = document.getElementById(elementId);
  if (!element) {
    throw new Error(`Element with id "${elementId}" not found for PDF generation.`);
  }

  const scale = options.scale || 2;

  // Render element to canvas at high DPI
  const canvas = await html2canvas(element, {
    scale: scale,
    useCORS: true,
    logging: false,
    backgroundColor: "#ffffff",
    windowWidth: 794,
  });

  const imgData = canvas.toDataURL("image/jpeg", 0.95);

  // Initialize jsPDF in portrait A4 (210mm x 297mm)
  const pdf = new jsPDF({
    orientation: "portrait",
    unit: "mm",
    format: "a4",
    compress: true,
  });

  const pdfWidth = 210;
  const pdfHeight = 297;

  // Calculate proportional height
  const imgProps = pdf.getImageProperties(imgData);
  const calculatedHeight = (imgProps.height * pdfWidth) / imgProps.width;

  if (calculatedHeight <= pdfHeight) {
    // Fits on single page
    pdf.addImage(imgData, "JPEG", 0, 0, pdfWidth, calculatedHeight, undefined, "FAST");
  } else {
    // Multi-page handling if table or declaration is taller than single A4 page
    let heightLeft = calculatedHeight;
    let position = 0;

    pdf.addImage(imgData, "JPEG", 0, position, pdfWidth, calculatedHeight, undefined, "FAST");
    heightLeft -= pdfHeight;

    while (heightLeft > 0) {
      position = heightLeft - calculatedHeight;
      pdf.addPage();
      pdf.addImage(imgData, "JPEG", 0, position, pdfWidth, calculatedHeight, undefined, "FAST");
      heightLeft -= pdfHeight;
    }
  }

  const blob = pdf.output("blob");
  const dataUri = URL.createObjectURL(blob);

  return { blob, dataUri };
}

/**
 * Direct download of generated PDF to user's device
 */
export async function downloadPdfDocument(
  elementId: string,
  filename: string,
  scale = 2
): Promise<void> {
  const { blob } = await generatePdfBlob(elementId, { filename, scale });
  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");
  link.href = url;
  link.download = filename;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  setTimeout(() => URL.revokeObjectURL(url), 5000);
}

/**
 * Print specific template directly using a dedicated print iframe
 */
export function printTemplateElement(elementId: string): void {
  const element = document.getElementById(elementId);
  if (!element) return;

  const printWindow = window.open("", "_blank", "width=900,height=1100");
  if (!printWindow) {
    alert("Please allow popups to print the application document directly.");
    return;
  }

  printWindow.document.write(`
    <!DOCTYPE html>
    <html>
      <head>
        <title>Print Document - Nexia Virtual Desk</title>
        <link rel="preconnect" href="https://fonts.googleapis.com">
        <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
        <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&family=Noto+Sans+Malayalam:wght@400;500;600;700&display=swap" rel="stylesheet">
        <style>
          @page {
            size: A4 portrait;
            margin: 10mm;
          }
          body {
            margin: 0;
            padding: 0;
            background: #fff;
            color: #0f172a;
            font-family: 'Noto Sans Malayalam', 'Inter', -apple-system, sans-serif;
            -webkit-print-color-adjust: exact;
            print-color-adjust: exact;
          }
          .no-print {
            display: none !important;
          }
          table {
            border-collapse: collapse;
          }
        </style>
      </head>
      <body>
        ${element.outerHTML}
        <script>
          window.onload = function() {
            setTimeout(function() {
              window.print();
              window.close();
            }, 500);
          };
        </script>
      </body>
    </html>
  `);
  printWindow.document.close();
}
