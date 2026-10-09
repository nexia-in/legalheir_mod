import React from "react";
import { FileText, Shield, ExternalLink, RefreshCw, Sparkles, MessageCircle, Info } from "lucide-react";

interface HeaderProps {
  onLoadSample: () => void;
  onReset: () => void;
  onOpenGuidelines: () => void;
}

export const Header: React.FC<HeaderProps> = ({ onLoadSample, onReset, onOpenGuidelines }) => {
  return (
    <header className="bg-slate-900 text-white border-b border-slate-800 shadow-md">
      {/* Top alert bar - Disclaimer */}
      <div className="bg-blue-950/80 border-b border-blue-900/50 px-4 py-1.5 text-xs text-blue-200">
        <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-between gap-2">
          <div className="flex items-center gap-1.5">
            <Shield className="w-3.5 h-3.5 text-amber-400 shrink-0" />
            <span>
              <strong>Private Assistance Service:</strong> Nexia Virtual Desk is not affiliated with or representing the Government of Kerala. Final acceptance is subject to the relevant government authority.
            </span>
          </div>
          <a
            href="https://edistrict.kerala.gov.in/"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1 text-blue-300 hover:text-white underline font-medium hover:no-underline transition-colors shrink-0"
          >
            Official Kerala e-District Portal <ExternalLink className="w-3 h-3" />
          </a>
        </div>
      </div>

      {/* Main Brand & Actions Navbar */}
      <div className="max-w-7xl mx-auto px-4 py-3 sm:py-4 flex flex-col md:flex-row md:items-center justify-between gap-4">
        {/* Brand identity */}
        <div className="flex items-center gap-3">
          <div className="w-11 h-11 rounded-xl bg-gradient-to-br from-blue-600 to-indigo-700 flex items-center justify-center text-white shadow-lg ring-2 ring-white/10 shrink-0">
            <FileText className="w-6 h-6 text-white" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="font-extrabold text-lg sm:text-xl tracking-tight text-white">
                Nexia Virtual Desk
              </span>
              <span className="bg-blue-600/30 text-blue-300 text-[10px] font-semibold px-2 py-0.5 rounded-full border border-blue-500/30">
                Kerala Revenue
              </span>
            </div>
            <p className="text-xs text-slate-400 font-medium mt-0.5">
              Your online application supporting team • Legal Heirship Certificate Assistant
            </p>
          </div>
        </div>

        {/* Quick Actions */}
        <div className="flex flex-wrap items-center gap-2">
          <button
            type="button"
            onClick={onLoadSample}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold bg-emerald-600/20 text-emerald-300 border border-emerald-500/40 hover:bg-emerald-600/30 transition-all shadow-sm cursor-pointer"
            title="Load complete realistic Kerala sample data for instant testing"
          >
            <Sparkles className="w-3.5 h-3.5 text-emerald-400" />
            <span>Load Sample Data</span>
          </button>

          <button
            type="button"
            onClick={onOpenGuidelines}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium bg-slate-800 text-slate-200 border border-slate-700 hover:bg-slate-700 hover:text-white transition-all cursor-pointer"
            title="View Form Guidelines and Field Mapping Details"
          >
            <Info className="w-3.5 h-3.5 text-blue-400" />
            <span className="hidden sm:inline">Source Docs Guide</span>
          </button>

          <button
            type="button"
            onClick={onReset}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium bg-slate-800 text-slate-300 border border-slate-700 hover:bg-rose-950/40 hover:text-rose-300 hover:border-rose-700/50 transition-all cursor-pointer"
            title="Clear all current session data"
          >
            <RefreshCw className="w-3.5 h-3.5" />
            <span>Reset</span>
          </button>

          <a
            href="https://wa.me/919961850698?text=Hello%20Nexia%20Virtual%20Desk%2C%20I%20need%20assistance%20with%20Kerala%20Legal%20Heirship%20Certificate%20application%20documents."
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg text-xs font-semibold bg-emerald-600 text-white hover:bg-emerald-500 transition-all shadow-md shrink-0 cursor-pointer"
          >
            <MessageCircle className="w-3.5 h-3.5" />
            <span>WhatsApp Nexia</span>
          </a>
        </div>
      </div>
    </header>
  );
};
