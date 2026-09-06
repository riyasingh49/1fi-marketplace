"use client";

import { use, useState } from "react";
import { useRouter } from "next/navigation";
import { ChevronLeft, Star } from "lucide-react";
import MobileFrame from "@/components/layout/MobileFrame";
import { useProduct } from "@/hooks/useProduct";
import VariantSelector from "@/components/marketplace/VariantSelector";
import EmiPlanSelector from "@/components/marketplace/EmiPlanSelector";
import StickyCta from "@/components/marketplace/StickyCta";
import ErrorState from "@/components/marketplace/ErrorState";

function formatInr(value: number) {
  return `₹${value.toLocaleString("en-IN")}`;
}

export default function ProductDetailPage({
  params,
}: {
  params: Promise<{ productId: string }>;
}) {
  const { productId } = use(params);
  const router = useRouter();

  const [variantId, setVariantId] = useState<string | undefined>(undefined);
  const [planId, setPlanId] = useState<string | null>(null);

  const { product, isLoading, error, retry } = useProduct(productId, variantId);

  // The chosen EMI plan is only valid for the variant it was picked under
  // (price, and therefore the plan set, changes with the variant). Rather
  // than syncing this with an effect, we adjust it directly during render —
  // React's documented pattern for "reset state when a prop/derived value
  // changes" (see react.dev "You Might Not Need an Effect").
  const [planResetForVariant, setPlanResetForVariant] = useState(variantId);
  if (variantId !== planResetForVariant) {
    setPlanResetForVariant(variantId);
    setPlanId(null);
  }

  const selectedPlan = product?.emiPlans.find((p) => p.id === planId) ?? null;

  const handleProceed = () => {
    if (!product || !selectedPlan) return;
    const search = new URLSearchParams({
      variantId: product.selectedVariant.id,
      planId: selectedPlan.id,
    });
    router.push(`/shop/marketplace/${productId}/confirm?${search.toString()}`);
  };

  return (
    <MobileFrame>
      <header className="flex shrink-0 items-center gap-3 border-b border-[var(--color-border)] bg-[var(--color-surface)] px-4 py-3">
        <button
          type="button"
          onClick={() => router.back()}
          className="rounded-full p-1.5 hover:bg-[var(--color-surface-muted)]"
          aria-label="Go back"
        >
          <ChevronLeft size={20} />
        </button>
        <h1 className="text-[14px] font-semibold text-[var(--color-text)]">
          Product details
        </h1>
      </header>

      <div className="flex-1 overflow-y-auto">
        {isLoading && (
          <div className="flex flex-col gap-3 px-5 py-6">
            <div className="h-40 animate-pulse rounded-2xl bg-[var(--color-surface-muted)]" />
            <div className="h-4 w-1/2 animate-pulse rounded bg-[var(--color-surface-muted)]" />
            <div className="h-4 w-3/4 animate-pulse rounded bg-[var(--color-surface-muted)]" />
            <div className="h-24 animate-pulse rounded-2xl bg-[var(--color-surface-muted)]" />
          </div>
        )}

        {!isLoading && error && (
          <div className="py-6">
            <ErrorState message={error} onRetry={retry} />
          </div>
        )}

        {!isLoading && !error && product && (
          <div className="flex flex-col gap-5 px-5 py-5">
            <div className="flex h-40 items-center justify-center rounded-2xl bg-[var(--color-surface-muted)] text-6xl">
              {product.image}
            </div>

            <div>
              <p className="text-[12px] font-medium text-[var(--color-text-faint)]">
                {product.brand}
              </p>
              <h2 className="text-[18px] font-semibold text-[var(--color-text)]">
                {product.name}
              </h2>
              <div className="mt-1 flex items-center gap-1 text-[12px] text-[var(--color-text-muted)]">
                <Star size={13} className="fill-amber-400 text-amber-400" />
                {product.rating}
                <span className="text-[var(--color-text-faint)]">
                  ({product.reviewCount.toLocaleString("en-IN")} ratings)
                </span>
              </div>

              <div className="mt-2 flex items-baseline gap-2">
                <span className="text-[20px] font-semibold text-[var(--color-text)]">
                  {formatInr(product.finalPrice)}
                </span>
                {product.mrp + (product.selectedVariant.priceDelta ?? 0) >
                  product.finalPrice && (
                  <span className="text-[13px] text-[var(--color-text-faint)] line-through">
                    {formatInr(
                      product.mrp + product.selectedVariant.priceDelta
                    )}
                  </span>
                )}
              </div>
            </div>

            <VariantSelector
              variants={product.variants}
              selectedId={product.selectedVariant.id}
              onSelect={setVariantId}
            />

            <div>
              <h3 className="mb-2 text-[13px] font-medium text-[var(--color-text-muted)]">
                Highlights
              </h3>
              <ul className="flex flex-col gap-1.5">
                {product.highlights.map((h) => (
                  <li
                    key={h}
                    className="flex gap-2 text-[13px] text-[var(--color-text)]"
                  >
                    <span className="mt-1.5 h-1 w-1 shrink-0 rounded-full bg-[var(--color-text-faint)]" />
                    {h}
                  </li>
                ))}
              </ul>
            </div>

            <p className="text-[13px] leading-relaxed text-[var(--color-text-muted)]">
              {product.description}
            </p>

            <div>
              <h3 className="mb-2 text-[14px] font-semibold text-[var(--color-text)]">
                Choose your EMI plan
              </h3>
              <EmiPlanSelector
                plans={product.emiPlans}
                selectedId={planId}
                onSelect={setPlanId}
              />
            </div>
          </div>
        )}
      </div>

      {!isLoading && !error && product && (
        <StickyCta
          monthlyAmount={selectedPlan?.monthlyAmount ?? null}
          tenureMonths={selectedPlan?.tenureMonths ?? null}
          disabled={!selectedPlan}
          onProceed={handleProceed}
        />
      )}
    </MobileFrame>
  );
}
