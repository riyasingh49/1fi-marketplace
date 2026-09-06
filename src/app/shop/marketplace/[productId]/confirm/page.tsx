"use client";

import { use } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { CheckCircle2, ChevronLeft } from "lucide-react";
import MobileFrame from "@/components/layout/MobileFrame";
import { useProduct } from "@/hooks/useProduct";
import ErrorState from "@/components/marketplace/ErrorState";

function formatInr(value: number) {
  return `₹${value.toLocaleString("en-IN")}`;
}

export default function ConfirmPlanPage({
  params,
}: {
  params: Promise<{ productId: string }>;
}) {
  const { productId } = use(params);
  const router = useRouter();
  const searchParams = useSearchParams();
  const variantId = searchParams.get("variantId") ?? undefined;
  const planId = searchParams.get("planId");

  const { product, isLoading, error, retry } = useProduct(productId, variantId);
  const plan = product?.emiPlans.find((p) => p.id === planId) ?? null;

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
          Confirm your plan
        </h1>
      </header>

      <div className="flex-1 overflow-y-auto px-5 py-6">
        {isLoading && (
          <div className="flex flex-col gap-3">
            <div className="h-32 animate-pulse rounded-2xl bg-[var(--color-surface-muted)]" />
            <div className="h-40 animate-pulse rounded-2xl bg-[var(--color-surface-muted)]" />
          </div>
        )}

        {!isLoading && (error || !plan || !product) && (
          <ErrorState
            message={error ?? "This plan is no longer available."}
            onRetry={retry}
          />
        )}

        {!isLoading && !error && product && plan && (
          <div className="flex flex-col gap-5">
            <div className="flex flex-col items-center rounded-2xl bg-[var(--color-brand-100)] px-6 py-6 text-center">
              <CheckCircle2
                size={36}
                className="text-[var(--color-brand-700)]"
              />
              <p className="mt-2 text-[15px] font-semibold text-[var(--color-text)]">
                Plan selected
              </p>
              <p className="mt-1 text-[12.5px] text-[var(--color-text-muted)]">
                Review the details below before you proceed to payment
                authorization.
              </p>
            </div>

            <div className="rounded-2xl border border-[var(--color-border)] bg-[var(--color-surface)] p-4">
              <div className="flex items-center gap-3">
                <div className="flex h-14 w-14 items-center justify-center rounded-xl bg-[var(--color-surface-muted)] text-3xl">
                  {product.image}
                </div>
                <div>
                  <p className="text-[12px] text-[var(--color-text-faint)]">
                    {product.brand}
                  </p>
                  <p className="text-[13.5px] font-medium text-[var(--color-text)]">
                    {product.name}
                  </p>
                  <p className="text-[12px] text-[var(--color-text-muted)]">
                    {product.selectedVariant.label}
                  </p>
                </div>
              </div>

              <dl className="mt-4 flex flex-col gap-2.5 border-t border-[var(--color-border)] pt-4 text-[13px]">
                <div className="flex justify-between">
                  <dt className="text-[var(--color-text-muted)]">
                    Product price
                  </dt>
                  <dd className="font-medium text-[var(--color-text)]">
                    {formatInr(product.finalPrice)}
                  </dd>
                </div>
                <div className="flex justify-between">
                  <dt className="text-[var(--color-text-muted)]">Tenure</dt>
                  <dd className="font-medium text-[var(--color-text)]">
                    {plan.tenureMonths} months
                  </dd>
                </div>
                <div className="flex justify-between">
                  <dt className="text-[var(--color-text-muted)]">
                    Monthly EMI
                  </dt>
                  <dd className="font-medium text-[var(--color-text)]">
                    {formatInr(plan.monthlyAmount)}
                  </dd>
                </div>
                <div className="flex justify-between">
                  <dt className="text-[var(--color-text-muted)]">
                    Processing fee
                  </dt>
                  <dd className="font-medium text-[var(--color-text)]">
                    {formatInr(plan.processingFee)}
                  </dd>
                </div>
                <div className="flex justify-between border-t border-[var(--color-border)] pt-2.5">
                  <dt className="font-medium text-[var(--color-text)]">
                    Total payable
                  </dt>
                  <dd className="font-semibold text-[var(--color-text)]">
                    {formatInr(plan.totalAmount + plan.processingFee)}
                  </dd>
                </div>
              </dl>
            </div>

            <button
              type="button"
              onClick={() => router.push("/shop")}
              className="rounded-full bg-[var(--color-brand-600)] px-6 py-3.5 text-[14px] font-semibold text-white"
            >
              Back to Shop
            </button>
          </div>
        )}
      </div>
    </MobileFrame>
  );
}
