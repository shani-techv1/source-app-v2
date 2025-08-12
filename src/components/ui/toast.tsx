"use client"

import React, { createContext, useContext, useState, useCallback } from "react";
import { X } from "lucide-react";
import { cn } from "@/hooks/lib/utils";

interface Toast {
  id: string;
  title: string;
  description?: string;
  variant?: "default" | "destructive";
  duration?: number;
}

interface ToastContextType {
  toasts: Toast[];
  addToast: (toast: Omit<Toast, "id">) => void;
  removeToast: (id: string) => void;
}

const ToastContext = createContext<ToastContextType | undefined>(undefined);

export const useToast = () => {
  const context = useContext(ToastContext);
  if (!context) {
    throw new Error("useToast must be used within a ToastProvider");
  }
  return context;
};

interface ToastProviderProps {
  children: React.ReactNode;
}

export const ToastProvider: React.FC<ToastProviderProps> = ({ children }) => {
  const [toasts, setToasts] = useState<Toast[]>([]);

  const addToast = useCallback((toast: Omit<Toast, "id">) => {
    const id = Math.random().toString(36).substr(2, 9);
    const newToast = { ...toast, id };
    
    setToasts(prev => [...prev, newToast]);

    // Auto remove after duration
    if (toast.duration !== 0) {
      setTimeout(() => {
        removeToast(id);
      }, toast.duration || 5000);
    }
  }, []);

  const removeToast = useCallback((id: string) => {
    setToasts(prev => prev.filter(toast => toast.id !== id));
  }, []);

  return (
    <ToastContext.Provider value={{ toasts, addToast, removeToast }}>
      {children}
      <ToastViewport toasts={toasts} removeToast={removeToast} />
    </ToastContext.Provider>
  );
};

interface ToastViewportProps {
  toasts: Toast[];
  removeToast: (id: string) => void;
}

const ToastViewport: React.FC<ToastViewportProps> = ({ toasts, removeToast }) => {
  return (
    <div className="fixed top-4 right-4 z-[100] flex flex-col gap-2 max-w-sm">
      {toasts.map((toast) => (
        <Toast key={toast.id} toast={toast} onClose={() => removeToast(toast.id)} />
      ))}
    </div>
  );
};

interface ToastProps {
  toast: Toast;
  onClose: () => void;
}

const Toast: React.FC<ToastProps> = ({ toast, onClose }) => {
  const variantClasses = {
    default: "border-gray-200 bg-white text-gray-900",
    destructive: "border-red-200 bg-red-50 text-red-900"
  };

  return (
    <div
      className={cn(
        "group pointer-events-auto relative flex w-full items-center justify-between space-x-4 overflow-hidden rounded-md border p-4 shadow-lg transition-all animate-in slide-in-from-top-full",
        variantClasses[toast.variant || "default"]
      )}
    >
      <div className="flex-1">
        <div className="text-sm font-semibold">{toast.title}</div>
        {toast.description && (
          <div className="text-sm opacity-90 mt-1">{toast.description}</div>
        )}
      </div>
      <button
        onClick={onClose}
        className="rounded-md p-1 opacity-0 transition-opacity hover:opacity-100 focus:opacity-100 focus:outline-none focus:ring-2 group-hover:opacity-100"
      >
        <X className="h-4 w-4" />
      </button>
    </div>
  );
}; 