import React from "react";
import { User, UserX, Users, Eye, CheckSquare, FileCheck } from "lucide-react";

interface ProgressBarProps {
  currentStep: number;
  totalSteps: number;
  onStepClick: (step: number) => void;
  completedSteps: number[];
}

export const ProgressBar: React.FC<ProgressBarProps> = ({
  currentStep,
  totalSteps,
  onStepClick,
  completedSteps,
}) => {
  const steps = [
    { num: 1, title: "Applicant", mlTitle: "അപേക്ഷകൻ", icon: User },
    { num: 2, title: "Deceased", mlTitle: "പരേതൻ", icon: UserX },
    { num: 3, title: "Legal Heirs", mlTitle: "അവകാശികൾ", icon: Users },
    { num: 4, title: "Witnesses", mlTitle: "സാക്ഷികൾ", icon: Eye },
    { num: 5, title: "Documents", mlTitle: "രേഖകൾ", icon: CheckSquare },
    { num: 6, title: "Review & Files", mlTitle: "പരിശോധന", icon: FileCheck },
  ];

  const progressPercent = Math.round(((currentStep - 1) / (totalSteps - 1)) * 100);

  return (
    <div className="bg-white border-b border-slate-200 sticky top-0 z-30 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 py-2.5 sm:py-3">
        {/* Progress Bar Line */}
        <div className="w-full bg-slate-100 h-1.5 rounded-full overflow-hidden mb-2.5">
          <div
            className="bg-blue-600 h-full transition-all duration-300 ease-out"
            style={{ width: `${progressPercent}%` }}
          />
        </div>

        {/* Step navigation pills - horizontally scrollable on mobile */}
        <div className="flex items-center justify-between gap-1 sm:gap-2 overflow-x-auto pb-1 no-scrollbar">
          {steps.map((s) => {
            const Icon = s.icon;
            const isActive = currentStep === s.num;
            const isCompleted = completedSteps.includes(s.num);

            return (
              <button
                key={s.num}
                type="button"
                onClick={() => onStepClick(s.num)}
                className={`flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg text-xs font-medium whitespace-nowrap transition-all cursor-pointer ${
                  isActive
                    ? "bg-blue-600 text-white shadow-sm ring-1 ring-blue-700 font-semibold"
                    : isCompleted
                    ? "bg-blue-50 text-blue-900 hover:bg-blue-100"
                    : "text-slate-600 hover:bg-slate-100 hover:text-slate-900"
                }`}
              >
                <span
                  className={`w-5 h-5 rounded-full flex items-center justify-center text-[11px] shrink-0 font-bold ${
                    isActive
                      ? "bg-white text-blue-700"
                      : isCompleted
                      ? "bg-blue-200 text-blue-800"
                      : "bg-slate-200 text-slate-700"
                  }`}
                >
                  {isCompleted && !isActive ? "✓" : s.num}
                </span>

                <Icon className={`w-3.5 h-3.5 ${isActive ? "text-white" : "text-slate-500"}`} />

                <span className="hidden md:inline">{s.title}</span>
                <span className="text-[10px] opacity-80 hidden lg:inline">({s.mlTitle})</span>
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
};
