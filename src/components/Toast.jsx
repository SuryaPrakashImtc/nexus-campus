import React, { useEffect } from 'react';
import { CheckCircle, AlertCircle, Info, X } from 'lucide-react';

export default function Toast({ message, type = 'success', onClose }) {
  useEffect(() => {
    if (!message) return;
    const timer = setTimeout(() => {
      if (typeof onClose === 'function') {
        onClose();
      }
    }, 4000);
    return () => clearTimeout(timer);
  }, [message, onClose]);

  if (!message) return null;

  return (
    <div className="fixed bottom-6 right-6 z-50 animate-in fade-in slide-in-from-bottom-5 duration-200">
      <div className="flex items-center gap-3 px-4 py-3 bg-[#0B132B] text-white rounded-xl shadow-2xl border border-slate-700/80 max-w-md">
        {type === 'success' && <CheckCircle className="w-4 h-4 text-emerald-400 shrink-0" />}
        {type === 'error' && <AlertCircle className="w-4 h-4 text-rose-400 shrink-0" />}
        {type === 'info' && <Info className="w-4 h-4 text-blue-400 shrink-0" />}
        <span className="text-xs font-medium text-slate-100 flex-1">{message}</span>
        <button
          onClick={() => {
            if (typeof onClose === 'function') {
              onClose();
            }
          }}
          className="text-slate-400 hover:text-white p-1 rounded transition"
          aria-label="Close notification"
        >
          <X className="w-3.5 h-3.5" />
        </button>
      </div>
    </div>
  );
}
