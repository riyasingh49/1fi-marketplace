import { NextRequest, NextResponse } from "next/server";
import { getProductSummaries } from "@/lib/mock-data";

// Simulates real network latency so the client's loading states are exercised.
function delay(ms: number) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

export async function GET(request: NextRequest) {
  await delay(500);

  // Lets the UI's error state be demoed on demand: /api/marketplace/products?simulateError=true
  const simulateError = request.nextUrl.searchParams.get("simulateError");
  if (simulateError === "true") {
    return NextResponse.json(
      { error: "Unable to fetch products right now." },
      { status: 500 }
    );
  }

  const category = request.nextUrl.searchParams.get("category");
  let products = getProductSummaries();

  if (category && category !== "All") {
    products = products.filter((p) => p.category === category);
  }

  return NextResponse.json({ products });
}
