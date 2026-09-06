"use client";

export type ShopTab = "top-brands" | "nearby-stores" | "marketplace";

const tabs: { id: ShopTab; label: string }[] = [
  { id: "top-brands", label: "Top Brands" },
  { id: "nearby-stores", label: "Nearby Stores" },
  { id: "marketplace", label: "1Fi Marketplace" },
];

export default function ShopTabs({
  active,
  onChange,
}: {
  active: ShopTab;
  onChange: (tab: ShopTab) => void;
}) {
  return (
    <div className="-mt-5 px-5">
      <div className="flex gap-1 rounded-full bg-[var(--color-brand-100)] p-2">
        {tabs.map((tab) => {
          const isActive = tab.id === active;
          return (
            <button
              key={tab.id}
              type="button"
              onClick={() => onChange(tab.id)}
              className={
                "flex-1 rounded-full px-2 py-2.5 text-[12.5px] font-medium transition-colors " +
                (isActive
                  ? "bg-white text-[var(--color-brand-700)] shadow-sm"
                  : "text-[var(--color-text-muted)]")
              }
            >
              {tab.label}
            </button>
          );
        })}
      </div>
    </div>
  );
}
