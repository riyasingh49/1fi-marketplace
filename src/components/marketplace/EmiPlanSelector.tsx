import { EmiPlan } from "@/lib/types";

function formatInr(value: number) {
  return `₹${value.toLocaleString("en-IN")}`;
}

function PlanRow({
  plan,
  isSelected,
  onSelect,
}: {
  plan: EmiPlan;
  isSelected: boolean;
  onSelect: () => void;
}) {
  return (
    <button
      type="button"
      onClick={onSelect}
      className={
        "flex w-full items-center justify-between rounded-xl border px-3.5 py-3 text-left " +
        (isSelected
          ? "border-[var(--color-brand-600)] bg-[var(--color-brand-100)]"
          : "border-[var(--color-border)] bg-[var(--color-surface)]")
      }
    >
      <div>
        <p className="text-[13.5px] font-semibold text-[var(--color-text)]">
          {plan.tenureMonths} months
        </p>
        <p className="text-[11.5px] text-[var(--color-text-faint)]">
          Total {formatInr(plan.totalAmount)} · Processing fee{" "}
          {formatInr(plan.processingFee)}
        </p>
      </div>
      <div className="text-right">
        <p className="text-[14px] font-semibold text-[var(--color-text)]">
          {formatInr(plan.monthlyAmount)}
          <span className="text-[11px] font-normal text-[var(--color-text-faint)]">
            /mo
          </span>
        </p>
        <span
          className={
            "text-[10.5px] font-medium " +
            (plan.interestType === "no-cost"
              ? "text-[var(--color-success)]"
              : "text-[var(--color-text-faint)]")
          }
        >
          {plan.interestType === "no-cost" ? "No-cost EMI" : "Standard EMI"}
        </span>
      </div>
    </button>
  );
}

export default function EmiPlanSelector({
  plans,
  selectedId,
  onSelect,
}: {
  plans: EmiPlan[];
  selectedId: string | null;
  onSelect: (planId: string) => void;
}) {
  const noCost = plans.filter((p) => p.interestType === "no-cost");
  const standard = plans.filter((p) => p.interestType === "standard");

  return (
    <div className="flex flex-col gap-4">
      <div>
        <h3 className="mb-2 text-[13px] font-medium text-[var(--color-text-muted)]">
          No-cost EMI plans
        </h3>
        <div className="flex flex-col gap-2">
          {noCost.map((plan) => (
            <PlanRow
              key={plan.id}
              plan={plan}
              isSelected={plan.id === selectedId}
              onSelect={() => onSelect(plan.id)}
            />
          ))}
        </div>
      </div>

      <div>
        <h3 className="mb-2 text-[13px] font-medium text-[var(--color-text-muted)]">
          Longer tenure (standard EMI)
        </h3>
        <div className="flex flex-col gap-2">
          {standard.map((plan) => (
            <PlanRow
              key={plan.id}
              plan={plan}
              isSelected={plan.id === selectedId}
              onSelect={() => onSelect(plan.id)}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
