import { useState, useEffect, createContext, useContext, useCallback } from 'react';

const ToastContext = createContext();

const TOAST_STYLES = {
  error: 'bg-red-900/80 border-red-500/50 text-red-100',
  warning: 'bg-amber-900/80 border-amber-500/50 text-amber-100',
  success: 'bg-green-900/80 border-green-500/50 text-green-100',
  info: 'bg-blue-900/80 border-blue-500/50 text-blue-100',
};

const TOAST_ICONS = {
  error: '✕',
  warning: '⚠',
  success: '✓',
  info: 'ℹ',
};

export function ToastProvider({ children }) {
  const [toasts, setToasts] = useState([]);

  const showToast = useCallback((message, type = 'info', duration = 4000) => {
    const id = Date.now() + Math.random();
    setToasts((prev) => [...prev, { id, message, type }]);
    setTimeout(() => {
      setToasts((prev) => prev.filter((t) => t.id !== id));
    }, duration);
  }, []);

  return (
    <ToastContext.Provider value={showToast}>
      {children}
      <div className="fixed top-4 left-4 right-4 z-[9999] flex flex-col gap-2 pointer-events-none">
        {toasts.map((t) => (
          <div
            key={t.id}
            className={`animate-slide-down px-4 py-3 rounded-xl border backdrop-blur-md flex items-center gap-3 shadow-2xl pointer-events-auto ${TOAST_STYLES[t.type]}`}
          >
            <span className="text-lg font-bold w-6 h-6 flex items-center justify-center rounded-full bg-white/10">
              {TOAST_ICONS[t.type]}
            </span>
            <span className="text-sm font-semibold flex-1">{t.message}</span>
            <button
              onClick={() => setToasts((prev) => prev.filter((x) => x.id !== t.id))}
              className="text-white/50 hover:text-white ml-2"
            >
              ✕
            </button>
          </div>
        ))}
      </div>
    </ToastContext.Provider>
  );
}

export function useToast() {
  return useContext(ToastContext);
}
