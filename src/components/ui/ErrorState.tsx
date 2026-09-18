import { AlertTriangle } from 'lucide-react';
import { Button } from './Button';

export function ErrorState({ message, onRetry }: { message: string; onRetry?: () => void }) {
  return (
    <div
      role="alert"
      className="flex flex-col items-center rounded-card border border-state-danger/25 bg-state-danger/5 px-6 py-12 text-center"
    >
      <AlertTriangle size={22} className="mb-4 text-state-danger" aria-hidden="true" />
      <h3 className="text-base font-medium text-content">That didn't load</h3>
      <p className="mt-2 max-w-md text-sm leading-relaxed text-content-secondary">{message}</p>
      {onRetry && (
        <Button variant="secondary" size="sm" className="mt-6" onClick={onRetry}>
          Try again
        </Button>
      )}
    </div>
  );
}
