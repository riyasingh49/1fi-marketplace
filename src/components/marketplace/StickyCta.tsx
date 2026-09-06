function formatInr(value: number) {
  return `₹${value.toLocaleString("en-IN")}`;
}

export default function StickyCta({
  monthlyAmount,
  tenureMonths,
  disabled,
  onProceed,
}: {
  monthlyAmount: number | null;
  tenureMonths: number | null;
  disabled: boolean;
  onProceed: () => void;
}) {
  return (
    <div className="shrink-0 border-t border-[var(--color-border)] bg-[var(--color-surface)] px-5 py-3">
      <div className="flex items-center justify-between gap-3">
        <div>
          {monthlyAmount && tenureMonths ? (
            <>
              <p className="text-[15px] font-semibold text-[var(--color-text)]">
                {formatInr(monthlyAmount)}/mo
              </p>
              <p className="text-[11px] text-[var(--color-text-faint)]">
                for {tenureMonths} months
              </p>
            </>
          ) : (
            <p className="text-[12.5px] text-[var(--color-text-faint)]">
              Select a plan to continue
            </p>
          )}
        </div>
        <button
          type="button"
          disabled={disabled}
          onClick={onProceed}
          className="rounded-full bg-[var(--color-brand-600)] px-6 py-3 text-[13.5px] font-semibold text-white disabled:opacity-40"
        >
          Proceed
        </button>
      </div>
    </div>
  );
}
