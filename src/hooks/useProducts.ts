"use client";

import { useCallback, useEffect, useState } from "react";
import { ApiError, fetchProducts } from "@/lib/api-client";
import { ProductSummary } from "@/lib/types";

type State = {
  products: ProductSummary[];
  isLoading: boolean;
  error: string | null;
};

export function useProducts(category?: string) {
  const [state, setState] = useState<State>({
    products: [],
    isLoading: true,
    error: null,
  });

  const load = useCallback(async () => {
    setState((prev) => ({ ...prev, isLoading: true, error: null }));
    try {
      const products = await fetchProducts({ category });
      setState({ products, isLoading: false, error: null });
    } catch (err) {
      const message =
        err instanceof ApiError ? err.message : "Couldn't load the marketplace.";
      setState({ products: [], isLoading: false, error: message });
    }
  }, [category]);

  useEffect(() => {
    // Data fetching on mount/dependency-change is a documented, valid use of
    // an effect (see react.dev "You Might Not Need an Effect" — fetching data
    // is one of the cases where an effect is the right tool).
    // eslint-disable-next-line react-hooks/set-state-in-effect
    load();
  }, [load]);

  return { ...state, retry: load };
}
