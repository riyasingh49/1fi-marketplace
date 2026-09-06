import { NextRequest, NextResponse } from "next/server";
import { getProductWithVariantPricing } from "@/lib/mock-data";

function delay(ms: number) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ productId: string }> }
) {
  await delay(400);

  const { productId } = await params;
  const variantId = request.nextUrl.searchParams.get("variantId") ?? undefined;

  const simulateError = request.nextUrl.searchParams.get("simulateError");
  if (simulateError === "true") {
    return NextResponse.json(
      { error: "Unable to load this product right now." },
      { status: 500 }
    );
  }

  const product = getProductWithVariantPricing(productId, variantId);

  if (!product) {
    return NextResponse.json(
      { error: "Product not found." },
      { status: 404 }
    );
  }

  return NextResponse.json({ product });
}
