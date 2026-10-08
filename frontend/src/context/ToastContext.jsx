import React, { createContext, useContext, useState } from "react";
import { CheckCircle2, AlertCircle, Info, AlertTriangle, X } from "lucide-react";

const ToastContext = createContext(null);

export const ToastProvider = ({ children }) => {
  const [toasts, setToasts] = useState([]);

  const showToast = (message, type = "info", duration = 3500) => {
    const id = Date.now();
    setToasts((prev) => [...prev, { id, message, type }]);

    setTimeout(() => {
      setToasts((prev) => prev.filter((t) => t.id !== id));
    }, duration);
  };

  const removeToast = (id) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  };

  return (
    <ToastContext.Provider value={{ showToast }}>
      {children}

      {/* DaisyUI Toast Container (มุมขวาบน) */}
      {toasts.length > 0 && (
        <div className="toast toast-top toast-end z-50 p-4 space-y-2 pointer-events-none">
          {toasts.map((toast) => {
            let alertClass = "alert-info text-info-content";
            let Icon = Info;

            if (toast.type === "success") {
              alertClass = "alert-success text-success-content";
              Icon = CheckCircle2;
            } else if (toast.type === "error") {
              alertClass = "alert-error text-error-content";
              Icon = AlertCircle;
            } else if (toast.type === "warning") {
              alertClass = "alert-warning text-warning-content";
              Icon = AlertTriangle;
            }

            return (
              <div
                key={toast.id}
                role="alert"
                className={`alert ${alertClass} pointer-events-auto shadow-2xl border border-white/50 backdrop-blur-xl rounded-2xl flex items-center justify-between gap-3 min-w-[280px] max-w-md transition-all duration-300 animate-in fade-in slide-in-from-top-3`}
              >
                <div className="flex items-center gap-3">
                  <Icon className="w-5 h-5 flex-shrink-0" />
                  <span className="text-sm font-semibold">{toast.message}</span>
                </div>
                <button
                  type="button"
                  onClick={() => removeToast(toast.id)}
                  className="btn btn-ghost btn-xs btn-circle opacity-70 hover:opacity-100 cursor-pointer"
                >
                  <X className="w-3.5 h-3.5" />
                </button>
              </div>
            );
          })}
        </div>
      )}
    </ToastContext.Provider>
  );
};

export const useToast = () => {
  const context = useContext(ToastContext);
  if (!context) {
    throw new Error("useToast must be used within a ToastProvider");
  }
  return context;
};
