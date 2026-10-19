import { createContext, useCallback, useContext, useState, type ReactNode } from 'react';
import { AlertCircle, CheckCircle2, Info, X, XCircle } from 'lucide-react';

export type ToastTone = 'success' | 'error' | 'info' | 'warning';
export interface ToastInput { title: string; message?: string; tone?: ToastTone; duration?: number }
interface ToastItem extends ToastInput { id: number }
interface ToastContextValue { notify: (toast: ToastInput) => void; dismiss: (id: number) => void }

const ToastContext = createContext<ToastContextValue | null>(null);
const ICONS = { success: CheckCircle2, error: XCircle, info: Info, warning: AlertCircle };
const TONES: Record<ToastTone, string> = {
  success: 'border-state-success/30',
  error: 'border-state-danger/30',
  info: 'border-state-info/30',
  warning: 'border-state-warning/30',
};
const ICON_TONES: Record<ToastTone, string> = {
  success: 'text-state-success bg-state-success/10',
  error: 'text-state-danger bg-state-danger/10',
  info: 'text-state-info bg-state-info/10',
  warning: 'text-state-warning bg-state-warning/10',
};

export function ToastProvider({ children }: { children: ReactNode }) {
  const [toasts, setToasts] = useState<ToastItem[]>([]);
  const dismiss = useCallback((id: number) => setToasts((current) => current.filter((toast) => toast.id !== id)), []);
  const notify = useCallback((input: ToastInput) => {
    const id = Date.now() + Math.floor(Math.random() * 10000);
    const toast = { tone: 'success' as ToastTone, duration: 4200, ...input, id };
    setToasts((current) => [...current.slice(-3), toast]);
    window.setTimeout(() => dismiss(id), toast.duration);
  }, [dismiss]);

  return (
    <ToastContext.Provider value={{ notify, dismiss }}>
      {children}
      <div className="pointer-events-none fixed right-3 top-3 z-[100] flex w-[calc(100%-1.5rem)] max-w-sm flex-col gap-3 sm:right-5 sm:top-5" aria-live="polite" aria-relevant="additions">
        {toasts.map((toast) => {
          const Icon = ICONS[toast.tone ?? 'success'];
          return (
            <div key={toast.id} role={toast.tone === 'error' ? 'alert' : 'status'} className={`toast-enter pointer-events-auto flex gap-3 rounded-2xl border bg-surface/95 p-4 shadow-xl backdrop-blur-xl ${TONES[toast.tone ?? 'success']}`}>
              <span className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-xl ${ICON_TONES[toast.tone ?? 'success']}`}><Icon size={18} aria-hidden="true" /></span>
              <div className="min-w-0 flex-1 pt-0.5">
                <p className="text-sm font-semibold text-content">{toast.title}</p>
                {toast.message && <p className="mt-1 text-xs leading-relaxed text-content-secondary">{toast.message}</p>}
              </div>
              <button type="button" aria-label="Dismiss notification" onClick={() => dismiss(toast.id)} className="flex h-7 w-7 shrink-0 items-center justify-center rounded-lg text-content-muted transition-colors hover:bg-surface-raised hover:text-content"><X size={15} /></button>
              <span className={`absolute bottom-0 left-4 right-4 h-0.5 origin-left rounded-full opacity-70 ${toast.tone === 'error' ? 'bg-state-danger' : toast.tone === 'warning' ? 'bg-state-warning' : toast.tone === 'info' ? 'bg-state-info' : 'bg-state-success'}`} aria-hidden="true" />
            </div>
          );
        })}
      </div>
    </ToastContext.Provider>
  );
}

export function useToast() {
  const value = useContext(ToastContext);
  if (!value) throw new Error('useToast must be used within ToastProvider.');
  return value;
}
