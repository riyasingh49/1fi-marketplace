"use client";

import { Home, ShoppingBag, Receipt, TrendingUp, User } from "lucide-react";

const items = [
  { label: "Home", icon: Home },
  { label: "Shop", icon: ShoppingBag },
  { label: "EMI Dues", icon: Receipt },
  { label: "Limit", icon: TrendingUp },
  { label: "Profile", icon: User },
];

export default function BottomNav({ active = "Shop" }: { active?: string }) {
  return (
    <nav className="shrink-0 border-t border-[var(--color-border)] bg-[var(--color-surface)] px-2 pb-[max(0.5rem,env(safe-area-inset-bottom))] pt-2">
      <ul className="flex items-stretch justify-between">
        {items.map(({ label, icon: Icon }) => {
          const isActive = label === active;
          return (
            <li key={label} className="flex-1">
              <button
                type="button"
                className="flex w-full flex-col items-center gap-1 py-1 text-[11px]"
              >
                {isActive && (
                  <span className="absolute -mt-2 h-1 w-6 rounded-full bg-[var(--color-brand-600)]" />
                )}
                <Icon
                  size={22}
                  strokeWidth={2}
                  color={isActive ? "var(--color-brand-600)" : "var(--color-text-faint)"}
                />
                <span
                  className={
                    isActive
                      ? "font-medium text-[var(--color-brand-600)]"
                      : "text-[var(--color-text-faint)]"
                  }
                >
                  {label}
                </span>
              </button>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}
