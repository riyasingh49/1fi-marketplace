import { Sparkles, Smartphone, Laptop } from "lucide-react";

export default function ShopHero() {
  return (
    <div
      className="relative overflow-hidden px-5 pb-8 pt-5"
      style={{
        background:
          "linear-gradient(135deg, var(--color-brand-900) 0%, var(--color-brand-700) 55%, var(--color-brand-500) 100%)",
      }}
    >
      <div className="pointer-events-none absolute -right-6 top-6 flex gap-2 opacity-90">
        <Laptop size={64} strokeWidth={1.2} className="rotate-6 text-white/25" />
        <Smartphone size={40} strokeWidth={1.2} className="-rotate-6 text-white/40" />
      </div>

      <span className="inline-flex items-center gap-1.5 rounded-full border border-white/30 px-3 py-1 text-xs font-medium text-white/90">
        <Sparkles size={13} /> No-cost EMIs
      </span>

      <h1 className="mt-3 max-w-[220px] text-[26px] font-semibold leading-tight text-white">
        Shop today,
        <br />
        <span className="italic font-medium text-white/90">pay later</span> using
        Mutual funds.
      </h1>

      <p className="mt-2 max-w-[240px] text-[13px] leading-snug text-white/70">
        No credit score required. No interest. Backed by your investments.
      </p>
    </div>
  );
}
