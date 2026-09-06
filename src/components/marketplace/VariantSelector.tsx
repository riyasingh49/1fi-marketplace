import { Variant } from "@/lib/types";

export default function VariantSelector({
  variants,
  selectedId,
  onSelect,
}: {
  variants: Variant[];
  selectedId: string;
  onSelect: (variantId: string) => void;
}) {
  if (variants.length <= 1) return null;

  return (
    <div>
      <h3 className="text-[13px] font-medium text-[var(--color-text-muted)]">
        Choose a variant
      </h3>
      <div className="mt-2 flex flex-wrap gap-2">
        {variants.map((variant) => {
          const isActive = variant.id === selectedId;
          return (
            <button
              key={variant.id}
              type="button"
              onClick={() => onSelect(variant.id)}
              className={
                "rounded-xl border px-3 py-2 text-left text-[12.5px] font-medium " +
                (isActive
                  ? "border-[var(--color-brand-600)] bg-[var(--color-brand-100)] text-[var(--color-brand-700)]"
                  : "border-[var(--color-border)] bg-[var(--color-surface)] text-[var(--color-text-muted)]")
              }
            >
              {variant.label}
              {variant.priceDelta > 0 && (
                <span className="block text-[10.5px] font-normal text-[var(--color-text-faint)]">
                  +₹{variant.priceDelta.toLocaleString("en-IN")}
                </span>
              )}
            </button>
          );
        })}
      </div>
    </div>
  );
}
