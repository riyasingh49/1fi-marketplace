const categories = [
  "All",
  "Smartphones",
  "Laptops",
  "Tablets",
  "Televisions",
  "Wearables",
  "Appliances",
];

export default function CategoryChips({
  active,
  onChange,
}: {
  active: string;
  onChange: (category: string) => void;
}) {
  return (
    <div className="flex gap-2 overflow-x-auto px-5 pb-1 [scrollbar-width:none]">
      {categories.map((category) => {
        const isActive = category === active;
        return (
          <button
            key={category}
            type="button"
            onClick={() => onChange(category)}
            className={
              "shrink-0 rounded-full border px-3.5 py-1.5 text-[12.5px] font-medium " +
              (isActive
                ? "border-[var(--color-brand-600)] bg-[var(--color-brand-600)] text-white"
                : "border-[var(--color-border)] bg-[var(--color-surface)] text-[var(--color-text-muted)]")
            }
          >
            {category}
          </button>
        );
      })}
    </div>
  );
}
