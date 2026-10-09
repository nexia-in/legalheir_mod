"use client";

import React, { useState, useEffect } from "react";
import {
  FullApplicationData,
  INITIAL_APPLICATION_DATA,
  SAMPLE_APPLICATION_DATA,
  ApplicantDetails,
  DeceasedDetails,
  LegalHeir,
  WitnessDetails,
  SupportingDocumentItem,
} from "@/types";
import { Header } from "@/components/Header";
import { ProgressBar } from "@/components/ProgressBar";
import { StepApplicant } from "@/components/steps/StepApplicant";
import { StepDeceased } from "@/components/steps/StepDeceased";
import { StepLegalHeirs } from "@/components/steps/StepLegalHeirs";
import { StepWitnesses } from "@/components/steps/StepWitnesses";
import { StepDocuments } from "@/components/steps/StepDocuments";
import { StepReviewAndDownload } from "@/components/steps/StepReviewAndDownload";
import { MainApplicationTemplate } from "@/components/pdf-templates/MainApplicationTemplate";
import { LegalHeirScheduleTemplate } from "@/components/pdf-templates/LegalHeirScheduleTemplate";
import { WitnessFormTemplate } from "@/components/pdf-templates/WitnessFormTemplate";
import { PdfPreviewModal } from "@/components/PdfPreviewModal";
import { ConfirmDialog } from "@/components/ConfirmDialog";
import { SourceDocsInfoModal } from "@/components/SourceDocsInfoModal";
import {
  generateOnlineApplicationText,
  generateAadhaarChecklistText,
  downloadTextFile,
} from "@/utils/generateTextFiles";
import { downloadPdfDocument, printTemplateElement } from "@/utils/pdfGenerator";
import { syncDocumentsWithEntities } from "@/utils/syncDocuments";
import {
  Shield,
  MessageCircle,
  ExternalLink,
  ChevronLeft,
  ChevronRight,
  FileCheck,
  CheckCircle,
} from "lucide-react";

export default function Home() {
  const [data, setData] = useState<FullApplicationData>(INITIAL_APPLICATION_DATA);
  const [currentStep, setCurrentStep] = useState<number>(1);
  const [completedSteps, setCompletedSteps] = useState<number[]>([]);
  const [toast, setToast] = useState<string | null>(null);

  // Modals state
  const [resetDialogOpen, setResetDialogOpen] = useState<boolean>(false);
  const [guidelinesModalOpen, setGuidelinesModalOpen] = useState<boolean>(false);
  const [previewModalOpen, setPreviewModalOpen] = useState<boolean>(false);
  const [previewDocType, setPreviewDocType] = useState<"main" | "heir" | "witness">("main");

  // Show temporary toast message
  const showToast = (msg: string) => {
    setToast(msg);
    setTimeout(() => setToast(null), 4000);
  };

  // Mark step complete
  const markStepComplete = (step: number) => {
    if (!completedSteps.includes(step)) {
      setCompletedSteps((prev) => [...prev, step]);
    }
  };

  // Next step handler
  const handleNextStep = () => {
    markStepComplete(currentStep);
    setCurrentStep((prev) => Math.min(6, prev + 1));
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  // Back step handler
  const handleBackStep = () => {
    setCurrentStep((prev) => Math.max(1, prev - 1));
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  // Step click navigation
  const handleStepClick = (step: number) => {
    markStepComplete(currentStep);
    setCurrentStep(step);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  // Load sample data
  const handleLoadSample = () => {
    setData(SAMPLE_APPLICATION_DATA);
    setCompletedSteps([1, 2, 3, 4, 5, 6]);
    showToast("Loaded complete realistic Kerala Legal Heir sample data.");
  };

  // Reset form
  const handleConfirmReset = () => {
    setData(INITIAL_APPLICATION_DATA);
    setCompletedSteps([]);
    setCurrentStep(1);
    setResetDialogOpen(false);
    showToast("Application session cleared.");
  };

  // Update applicant
  const handleApplicantChange = (applicant: ApplicantDetails) => {
    setData((prev) => ({ ...prev, applicant }));
  };

  // Update deceased
  const handleDeceasedChange = (deceased: DeceasedDetails) => {
    setData((prev) => ({ ...prev, deceased }));
  };

  // Update legal heirs (with document checklist sync)
  const handleHeirsChange = (heirs: LegalHeir[]) => {
    const syncedDocs = syncDocumentsWithEntities(data.documents, heirs, data.witness1, data.witness2);
    setData((prev) => ({
      ...prev,
      heirs,
      documents: syncedDocs,
    }));
  };

  // Update witness 1
  const handleWitness1Change = (witness1: WitnessDetails) => {
    const syncedDocs = syncDocumentsWithEntities(data.documents, data.heirs, witness1, data.witness2);
    setData((prev) => ({
      ...prev,
      witness1,
      documents: syncedDocs,
    }));
  };

  // Update witness 2
  const handleWitness2Change = (witness2: WitnessDetails) => {
    const syncedDocs = syncDocumentsWithEntities(data.documents, data.heirs, data.witness1, witness2);
    setData((prev) => ({
      ...prev,
      witness2,
      documents: syncedDocs,
    }));
  };

  // Update supporting documents
  const handleDocumentsChange = (documents: SupportingDocumentItem[]) => {
    setData((prev) => ({ ...prev, documents }));
  };

  // PDF Preview Trigger
  const handleOpenPreview = (docType: "main" | "heir" | "witness") => {
    setPreviewDocType(docType);
    setPreviewModalOpen(true);
  };

  // Download individual PDF
  const handleDownloadPdf = async (docType: "main" | "heir" | "witness") => {
    if (docType === "main") {
      await downloadPdfDocument("pdf-main-application", "Legal_Heir_Main_Application.pdf");
      showToast("Downloaded Main Application PDF (Form LH-01).");
    } else if (docType === "heir") {
      await downloadPdfDocument("pdf-legal-heir-schedule", "Legal_Heir_Application_Form.pdf");
      showToast("Downloaded Legal Heir Application Form (Form LH-02).");
    } else if (docType === "witness") {
      await downloadPdfDocument("pdf-witness-form", "Legal_Heir_Witness_Form.pdf");
      showToast("Downloaded Legal Heir Witness Form (Form LH-03).");
    }
  };

  // Direct Print
  const handlePrintPdf = (docType: "main" | "heir" | "witness") => {
    if (docType === "main") printTemplateElement("pdf-main-application");
    else if (docType === "heir") printTemplateElement("pdf-legal-heir-schedule");
    else if (docType === "witness") printTemplateElement("pdf-witness-form");
  };

  // Download Online Data TXT
  const handleDownloadOnlineDataTxt = () => {
    const content = generateOnlineApplicationText(data);
    downloadTextFile("Nexia_eDistrict_Online_Application_Data.txt", content);
    showToast("Downloaded Nexia_eDistrict_Online_Application_Data.txt");
  };

  // Download Aadhaar Checklist TXT
  const handleDownloadAadhaarChecklistTxt = () => {
    const content = generateAadhaarChecklistText(data);
    downloadTextFile("Nexia_Aadhaar_Documents_Checklist.txt", content);
    showToast("Downloaded Nexia_Aadhaar_Documents_Checklist.txt");
  };

  // Download All Bundle
  const handleDownloadAllBundle = async () => {
    showToast("Generating and downloading all 5 files sequentially...");
    // 1. Online TXT
    handleDownloadOnlineDataTxt();
    // 2. Checklist TXT
    setTimeout(() => handleDownloadAadhaarChecklistTxt(), 400);
    // 3. Form 1 PDF
    setTimeout(async () => {
      await handleDownloadPdf("main");
    }, 1000);
    // 4. Form 2 PDF
    setTimeout(async () => {
      await handleDownloadPdf("heir");
    }, 2200);
    // 5. Form 3 PDF
    setTimeout(async () => {
      await handleDownloadPdf("witness");
    }, 3400);
  };

  const getPreviewTitle = () => {
    if (previewDocType === "main") return "Main Application – Legal Heir (പ്രധാന അപേക്ഷ - ഫോം 1)";
    if (previewDocType === "heir") return "Legal Heir Schedule (അനന്തരാവകാശികളുടെ പട്ടിക - ഫോം 2)";
    return "Legal Heir Witness Form (സാക്ഷിമൊഴിപ്പത്രിക - ഫോം 3)";
  };

  const getPreviewFilename = () => {
    if (previewDocType === "main") return "Legal_Heir_Main_Application.pdf";
    if (previewDocType === "heir") return "Legal_Heir_Application_Form.pdf";
    return "Legal_Heir_Witness_Form.pdf";
  };

  return (
    <div className="min-h-screen flex flex-col bg-slate-100 font-sans">
      {/* Toast Notification */}
      {toast && (
        <div className="fixed bottom-20 right-4 z-50 bg-slate-900 text-white text-xs px-4 py-2.5 rounded-xl shadow-2xl border border-slate-700 flex items-center gap-2 animate-fade-in">
          <CheckCircle className="w-4 h-4 text-emerald-400 shrink-0" />
          <span>{toast}</span>
        </div>
      )}

      {/* Main Header */}
      <Header
        onLoadSample={handleLoadSample}
        onReset={() => setResetDialogOpen(true)}
        onOpenGuidelines={() => setGuidelinesModalOpen(true)}
      />

      {/* 6-Step Wizard Navigation */}
      <ProgressBar
        currentStep={currentStep}
        totalSteps={6}
        onStepClick={handleStepClick}
        completedSteps={completedSteps}
      />

      {/* Main Content Area */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 py-6 sm:py-8 mb-16 sm:mb-8">
        {currentStep === 1 && (
          <StepApplicant
            data={data.applicant}
            onChange={handleApplicantChange}
            onNext={handleNextStep}
          />
        )}

        {currentStep === 2 && (
          <StepDeceased
            data={data.deceased}
            onChange={handleDeceasedChange}
            onNext={handleNextStep}
            onBack={handleBackStep}
          />
        )}

        {currentStep === 3 && (
          <StepLegalHeirs
            heirs={data.heirs}
            applicant={data.applicant}
            onChange={handleHeirsChange}
            onNext={handleNextStep}
            onBack={handleBackStep}
          />
        )}

        {currentStep === 4 && (
          <StepWitnesses
            witness1={data.witness1}
            witness2={data.witness2}
            onChangeWitness1={handleWitness1Change}
            onChangeWitness2={handleWitness2Change}
            onNext={handleNextStep}
            onBack={handleBackStep}
          />
        )}

        {currentStep === 5 && (
          <StepDocuments
            documents={data.documents}
            heirs={data.heirs}
            witness1={data.witness1}
            witness2={data.witness2}
            onChange={handleDocumentsChange}
            onNext={handleNextStep}
            onBack={handleBackStep}
          />
        )}

        {currentStep === 6 && (
          <StepReviewAndDownload
            data={data}
            onNavigateToStep={handleStepClick}
            onPreviewPdf={handleOpenPreview}
            onDownloadPdf={handleDownloadPdf}
            onPrintPdf={handlePrintPdf}
            onDownloadOnlineDataTxt={handleDownloadOnlineDataTxt}
            onDownloadAadhaarChecklistTxt={handleDownloadAadhaarChecklistTxt}
            onDownloadAllBundle={handleDownloadAllBundle}
          />
        )}
      </main>

      {/* Offscreen Render Targets for high-resolution html2canvas -> jsPDF generation */}
      <div
        style={{
          position: "fixed",
          left: "-9999px",
          top: 0,
          width: "794px",
          pointerEvents: "none",
        }}
        aria-hidden="true"
      >
        <MainApplicationTemplate data={data} id="pdf-main-application" />
        <LegalHeirScheduleTemplate data={data} id="pdf-legal-heir-schedule" />
        <WitnessFormTemplate data={data} id="pdf-witness-form" />
      </div>

      {/* Interactive PDF Preview Modal */}
      <PdfPreviewModal
        isOpen={previewModalOpen}
        onClose={() => setPreviewModalOpen(false)}
        title={getPreviewTitle()}
        filename={getPreviewFilename()}
        onDownload={() => handleDownloadPdf(previewDocType)}
        onPrint={() => handlePrintPdf(previewDocType)}
      >
        {previewDocType === "main" && (
          <MainApplicationTemplate data={data} id="preview-main-template" />
        )}
        {previewDocType === "heir" && (
          <LegalHeirScheduleTemplate data={data} id="preview-heir-template" />
        )}
        {previewDocType === "witness" && (
          <WitnessFormTemplate data={data} id="preview-witness-template" />
        )}
      </PdfPreviewModal>

      {/* Guidelines & Source Docs Info Modal */}
      <SourceDocsInfoModal
        isOpen={guidelinesModalOpen}
        onClose={() => setGuidelinesModalOpen(false)}
      />

      {/* Reset Confirmation Dialog */}
      <ConfirmDialog
        isOpen={resetDialogOpen}
        title="Clear Current Application Session?"
        message="This will wipe all entered applicant, deceased person, legal heirs, and witness information from your browser. Are you sure you want to start over?"
        confirmLabel="Yes, Clear All Data"
        cancelLabel="Keep Current Data"
        onConfirm={handleConfirmReset}
        onCancel={() => setResetDialogOpen(false)}
      />

      {/* Mobile Bottom Sticky Navigation */}
      <div className="sm:hidden fixed bottom-0 left-0 right-0 bg-white/95 backdrop-blur-md border-t border-slate-200 px-4 py-2.5 flex items-center justify-between z-40 shadow-lg">
        <button
          type="button"
          disabled={currentStep === 1}
          onClick={handleBackStep}
          className="inline-flex items-center gap-1 px-3.5 py-2 text-xs font-semibold text-slate-700 bg-slate-100 rounded-xl disabled:opacity-30 disabled:pointer-events-none"
        >
          <ChevronLeft className="w-4 h-4" />
          <span>Back</span>
        </button>

        <span className="text-xs font-bold text-slate-600">
          Step {currentStep} of 6
        </span>

        {currentStep < 6 ? (
          <button
            type="button"
            onClick={handleNextStep}
            className="inline-flex items-center gap-1 px-4 py-2 text-xs font-bold bg-blue-600 text-white rounded-xl shadow-sm"
          >
            <span>Next</span>
            <ChevronRight className="w-4 h-4" />
          </button>
        ) : (
          <button
            type="button"
            onClick={handleDownloadAllBundle}
            className="inline-flex items-center gap-1 px-4 py-2 text-xs font-bold bg-emerald-600 text-white rounded-xl shadow-sm"
          >
            <FileCheck className="w-4 h-4" />
            <span>Files</span>
          </button>
        )}
      </div>

      {/* Footer */}
      <footer className="bg-slate-900 text-slate-400 text-xs border-t border-slate-800 py-8 px-4 mt-auto">
        <div className="max-w-7xl mx-auto space-y-4">
          <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
            <div>
              <div className="font-extrabold text-white text-base tracking-tight">
                Nexia Virtual Desk
              </div>
              <p className="text-slate-400 mt-0.5">
                Your online application supporting team • Kerala Legal Heirship Certificate Application Assistant
              </p>
            </div>

            <div className="flex flex-wrap items-center gap-4 text-xs">
              <a
                href="https://wa.me/919961850698"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1 text-emerald-400 hover:text-emerald-300 font-semibold"
              >
                <MessageCircle className="w-3.5 h-3.5" />
                <span>WhatsApp: +91 9961850698</span>
              </a>

              <a
                href="https://edistrict.kerala.gov.in/"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1 text-blue-400 hover:text-blue-300 underline"
              >
                <span>Kerala e-District Portal</span>
                <ExternalLink className="w-3 h-3" />
              </a>
            </div>
          </div>

          <div className="border-t border-slate-800/80 pt-4 text-[11px] leading-relaxed text-slate-500">
            <p>
              <strong>Disclaimer:</strong> This is a private application assistance service provided by Nexia Virtual Desk. We are not affiliated with or representing the Government of Kerala. Final requirements, ground-level enquiries, and application acceptance are subject to the relevant government authority (concerned Village Officer and Tahsildar).
            </p>
            <p className="mt-1">
              All personal credentials and Aadhaar numbers entered are processed entirely inside your local browser session and are never transmitted to external servers. Downloaded PDFs and text files remain stored on your device.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}
