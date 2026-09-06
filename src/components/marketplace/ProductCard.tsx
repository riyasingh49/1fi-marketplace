import Link from "next/link";
import { Star } from "lucide-react";
import { ProductSummary } from "@/lib/types";

function formatInr(value: number) {
  return `₹${value.toLocaleString("en-IN")}`;
}

export default function ProductCard({ product }: { product: ProductSummary }) {
  return (
    <Link
      href={`/shop/marketplace/${product.id}`}
      className="flex flex-col rounded-2xl border border-[var(--color-border)] bg-[var(--color-surface)] p-3 transition-transform active:scale-[0.98]"
    >
      <div className="flex h-24 items-center justify-center rounded-xl bg-[var(--color-surface-muted)] text-4xl">
        {product.image}
      </div>

      <p className="mt-2.5 text-[11px] font-medium text-[var(--color-text-faint)]">
        {product.brand}
      </p>
      <h3 className="line-clamp-2 text-[13.5px] font-medium leading-snug text-[var(--color-text)]">
        {product.name}
      </h3>

      <div className="mt-1 flex items-center gap-1 text-[11px] text-[var(--color-text-muted)]">
        <Star size={12} className="fill-amber-400 text-amber-400" />
        {product.rating}
      </div>

      <div className="mt-2 flex items-baseline gap-1.5">
        <span className="text-[14px] font-semibold text-[var(--color-text)]">
          {formatInr(product.basePrice)}
        </span>
        {product.mrp > product.basePrice && (
          <span className="text-[11px] text-[var(--color-text-faint)] line-through">
            {formatInr(product.mrp)}
          </span>
        )}
      </div>

      <div className="mt-1.5 inline-flex w-fit items-center rounded-md bg-[var(--color-brand-100)] px-2 py-1 text-[10.5px] font-medium text-[var(--color-brand-700)]">
        No-cost EMI from {formatInr(product.minMonthlyEmi)}/mo
      </div>
    </Link>
  );
}
