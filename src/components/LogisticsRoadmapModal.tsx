import React from 'react';
import { X, Truck, Compass } from 'lucide-react';
import { LogisticsRoadmap } from './LogisticsRoadmap';

interface LogisticsRoadmapModalProps {
  isOpen: boolean;
  onClose: () => void;
  onAskAIAboutLogistics: (prompt: string) => void;
}

export const LogisticsRoadmapModal: React.FC<LogisticsRoadmapModalProps> = ({
  isOpen,
  onClose,
  onAskAIAboutLogistics,
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-slate-950/85 backdrop-blur-md overflow-y-auto">
      <div 
        className="relative w-full max-w-6xl bg-slate-900 border border-slate-800 rounded-3xl p-5 sm:p-8 shadow-2xl my-6 max-h-[92vh] overflow-y-auto"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-5 right-5 sm:top-7 sm:right-7 z-20 p-2.5 rounded-2xl bg-slate-800/90 text-slate-400 hover:text-white hover:bg-slate-700 transition-colors shadow-lg"
          title="Yopish"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Modal Inner Content */}
        <div className="pr-2 sm:pr-0">
          <LogisticsRoadmap
            onAskAIAboutLogistics={(prompt) => {
              onAskAIAboutLogistics(prompt);
              onClose();
            }}
          />
        </div>

        {/* Modal Bottom Close */}
        <div className="mt-8 pt-4 border-t border-slate-800 flex items-center justify-between">
          <span className="text-xs text-slate-500">
            O‘zbekiston Respublikasi Transport vazirligi va EPA ma’lumotlari asosida
          </span>
          <button
            onClick={onClose}
            className="px-6 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-white text-xs font-semibold transition-colors"
          >
            Yopish
          </button>
        </div>
      </div>
    </div>
  );
};
