import { Product, ProductSummary, Variant } from "./types";

export class ApiError extends Error {
  status: number;
  constructor(message: string, status: number) {
    super(message);
    this.status = status;
  }
}

async function parseOrThrow<T>(res: Response): Promise<T> {
  const body = await res.json().catch(() => ({}));
  if (!res.ok) {
    throw new ApiError(body?.error ?? "Something went wrong.", res.status);
  }
  return body as T;
}

export async function fetchProducts(params?: {
  category?: string;
}): Promise<ProductSummary[]> {
  const search = new URLSearchParams();
  if (params?.category) search.set("category", params.category);

  const res = await fetch(`/api/marketplace/products?${search.toString()}`);
  const data = await parseOrThrow<{ products: ProductSummary[] }>(res);
  return data.products;
}

export type ProductDetail = Product & {
  selectedVariant: Variant;
  finalPrice: number;
};

export async function fetchProduct(
  productId: string,
  variantId?: string
): Promise<ProductDetail> {
  const search = new URLSearchParams();
  if (variantId) search.set("variantId", variantId);

  const res = await fetch(
    `/api/marketplace/products/${productId}?${search.toString()}`
  );
  const data = await parseOrThrow<{ product: ProductDetail }>(res);
  return data.product;
}
