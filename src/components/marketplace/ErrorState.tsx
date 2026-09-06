import { AlertTriangle } from "lucide-react";

export default function ErrorState({
  message,
  onRetry,
}: {
  message: string;
  onRetry: () => void;
}) {
  return (
    <div className="mx-5 flex flex-col items-center rounded-2xl border border-[var(--color-border)] bg-[var(--color-surface)] px-6 py-10 text-center">
      <AlertTriangle size={28} className="text-[var(--color-danger)]" />
      <p className="mt-3 text-sm font-medium text-[var(--color-text)]">
        {message}
      </p>
      <button
        type="button"
        onClick={onRetry}
        className="mt-4 rounded-full bg-[var(--color-brand-600)] px-5 py-2 text-sm font-medium text-white"
      >
        Try again
      </button>
    </div>
  );
}
