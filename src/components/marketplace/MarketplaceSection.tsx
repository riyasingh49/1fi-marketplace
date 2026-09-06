"use client";

import { useMemo, useState } from "react";
import { Search } from "lucide-react";
import { useProducts } from "@/hooks/useProducts";
import ProductCard from "./ProductCard";
import ProductGridSkeleton from "./ProductGridSkeleton";
import ErrorState from "./ErrorState";
import CategoryChips from "./CategoryChips";

export default function MarketplaceSection() {
  const [category, setCategory] = useState("All");
  const [query, setQuery] = useState("");
  const { products, isLoading, error, retry } = useProducts(
    category === "All" ? undefined : category
  );

  const filtered = useMemo(() => {
    if (!query.trim()) return products;
    const q = query.trim().toLowerCase();
    return products.filter(
      (p) =>
        p.name.toLowerCase().includes(q) || p.brand.toLowerCase().includes(q)
    );
  }, [products, query]);

  return (
    <div className="flex flex-col gap-4 pb-6">
      <div className="px-5">
        <div className="flex items-center gap-2 rounded-full border border-[var(--color-border)] bg-[var(--color-surface)] px-4 py-2.5">
          <Search size={17} className="text-[var(--color-text-faint)]" />
          <input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search phones, laptops, appliances..."
            className="w-full bg-transparent text-[13.5px] text-[var(--color-text)] placeholder:text-[var(--color-text-faint)] focus:outline-none"
          />
        </div>
      </div>

      <CategoryChips active={category} onChange={setCategory} />

      <div className="flex items-center justify-between px-5">
        <h2 className="text-[15px] font-semibold text-[var(--color-text)]">
          {category === "All" ? "1Fi Marketplace" : category}
        </h2>
        {!isLoading && !error && (
          <span className="text-[12px] text-[var(--color-text-faint)]">
            {filtered.length} item{filtered.length !== 1 ? "s" : ""}
          </span>
        )}
      </div>

      {isLoading && <ProductGridSkeleton />}

      {!isLoading && error && <ErrorState message={error} onRetry={retry} />}

      {!isLoading && !error && filtered.length === 0 && (
        <p className="px-5 text-sm text-(--color-surface-muted)">
          No products match &ldquo;{query}&rdquo;.
        </p>
      )}

      {!isLoading && !error && filtered.length > 0 && (
        <div className="grid grid-cols-2 gap-3 px-5">
          {filtered.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      )}
    </div>
  );
}
