"use client";

import { useCallback, useEffect, useState } from "react";
import { ApiError, ProductDetail, fetchProduct } from "@/lib/api-client";

type State = {
  product: ProductDetail | null;
  isLoading: boolean;
  error: string | null;
};

export function useProduct(productId: string, variantId?: string) {
  const [state, setState] = useState<State>({
    product: null,
    isLoading: true,
    error: null,
  });

  const load = useCallback(async () => {
    setState((prev) => ({ ...prev, isLoading: true, error: null }));
    try {
      const product = await fetchProduct(productId, variantId);
      setState({ product, isLoading: false, error: null });
    } catch (err) {
      const message =
        err instanceof ApiError ? err.message : "Couldn't load this product.";
      setState({ product: null, isLoading: false, error: message });
    }
  }, [productId, variantId]);

  useEffect(() => {
    // Data fetching on mount/dependency-change is a documented, valid use of
    // an effect (see react.dev "You Might Not Need an Effect").
    // eslint-disable-next-line react-hooks/set-state-in-effect
    load();
  }, [load]);

  return { ...state, retry: load };
}
