import React, { useState } from "react";
import { X, Download, Printer, ZoomIn, ZoomOut, RotateCcw } from "lucide-react";

interface PdfPreviewModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  filename: string;
  onDownload: () => Promise<void>;
  onPrint: () => void;
  children: React.ReactNode;
}

export const PdfPreviewModal: React.FC<PdfPreviewModalProps> = ({
  isOpen,
  onClose,
  title,
  filename,
  onDownload,
  onPrint,
  children,
}) => {
  const [zoom, setZoom] = useState<number>(0.9);
  const [isDownloading, setIsDownloading] = useState(false);

  if (!isOpen) return null;

  const handleDownloadClick = async () => {
    setIsDownloading(true);
    try {
      await onDownload();
    } catch (e) {
      console.error("PDF generation error:", e);
      alert("Failed to generate PDF. Please try printing directly or check console.");
    } finally {
      setIsDownloading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-xs flex flex-col items-center justify-center p-2 sm:p-4">
      {/* Top Modal Action Bar */}
      <div className="w-full max-w-5xl bg-slate-900 text-white rounded-t-2xl px-4 py-3 flex items-center justify-between border-b border-slate-800 shadow-xl">
        <div className="flex items-center gap-2 overflow-hidden">
          <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 shrink-0"></span>
          <h3 className="text-sm sm:text-base font-bold truncate">{title}</h3>
          <span className="hidden sm:inline text-xs text-slate-400 font-mono">({filename})</span>
        </div>

        <div className="flex items-center gap-2 shrink-0">
          {/* Zoom controls */}
          <div className="hidden sm:flex items-center bg-slate-800 rounded-lg p-0.5 border border-slate-700">
            <button
              type="button"
              onClick={() => setZoom((z) => Math.max(0.5, z - 0.1))}
              className="p-1.5 text-slate-300 hover:text-white rounded hover:bg-slate-700 transition-colors"
              title="Zoom out"
            >
              <ZoomOut className="w-4 h-4" />
            </button>
            <span className="text-xs font-mono px-2 text-slate-300">{Math.round(zoom * 100)}%</span>
            <button
              type="button"
              onClick={() => setZoom((z) => Math.min(1.4, z + 0.1))}
              className="p-1.5 text-slate-300 hover:text-white rounded hover:bg-slate-700 transition-colors"
              title="Zoom in"
            >
              <ZoomIn className="w-4 h-4" />
            </button>
            <button
              type="button"
              onClick={() => setZoom(0.9)}
              className="p-1.5 text-slate-400 hover:text-white rounded hover:bg-slate-700 transition-colors"
              title="Reset Zoom"
            >
              <RotateCcw className="w-3.5 h-3.5" />
            </button>
          </div>

          {/* Direct Print Button */}
          <button
            type="button"
            onClick={onPrint}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 transition-all cursor-pointer"
          >
            <Printer className="w-4 h-4" />
            <span className="hidden sm:inline">Print Form</span>
          </button>

          {/* Download PDF Button */}
          <button
            type="button"
            onClick={handleDownloadClick}
            disabled={isDownloading}
            className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg text-xs font-bold bg-blue-600 hover:bg-blue-500 text-white transition-all shadow-md cursor-pointer disabled:opacity-60"
          >
            <Download className="w-4 h-4" />
            <span>{isDownloading ? "Generating..." : "Download PDF"}</span>
          </button>

          {/* Close */}
          <button
            type="button"
            onClick={onClose}
            className="p-1.5 text-slate-400 hover:text-white hover:bg-slate-800 rounded-lg transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>
      </div>

      {/* Preview viewport with zoom transform */}
      <div className="w-full max-w-5xl flex-1 bg-slate-800/95 rounded-b-2xl overflow-auto p-4 sm:p-6 flex justify-center items-start border border-t-0 border-slate-700 shadow-2xl">
        <div
          style={{
            transform: `scale(${zoom})`,
            transformOrigin: "top center",
            transition: "transform 0.15s ease-out",
          }}
          className="shadow-2xl rounded-sm overflow-hidden"
        >
          {children}
        </div>
      </div>
    </div>
  );
};
