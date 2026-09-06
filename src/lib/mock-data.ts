import { EmiPlan, Product, Variant } from "./types";

// EMI plans are derived from price so no data is hardcoded per product.
function buildEmiPlans(price: number): EmiPlan[] {
  const noCostTenures = [3, 6, 9];
  const standardTenures = [12, 18, 24];
  const standardAnnualRate = 0.13; // used only to compute the "standard" tier

  const noCost: EmiPlan[] = noCostTenures.map((tenureMonths) => ({
    id: `nc-${tenureMonths}`,
    tenureMonths,
    monthlyAmount: Math.ceil(price / tenureMonths),
    totalAmount: price,
    interestType: "no-cost",
    processingFee: Math.round(price * 0.005),
  }));

  const standard: EmiPlan[] = standardTenures.map((tenureMonths) => {
    const monthlyRate = standardAnnualRate / 12;
    const monthlyAmount = Math.ceil(
      (price * monthlyRate * Math.pow(1 + monthlyRate, tenureMonths)) /
        (Math.pow(1 + monthlyRate, tenureMonths) - 1)
    );
    return {
      id: `std-${tenureMonths}`,
      tenureMonths,
      monthlyAmount,
      totalAmount: monthlyAmount * tenureMonths,
      interestType: "standard",
      processingFee: Math.round(price * 0.01),
    };
  });

  return [...noCost, ...standard];
}

type ProductSeed = {
  id: string;
  name: string;
  brand: string;
  category: string;
  image: string;
  basePrice: number;
  mrp: number;
  rating: number;
  reviewCount: number;
  highlights: string[];
  description: string;
  variants: Variant[];
};

const seeds: ProductSeed[] = [
  {
    id: "phone-aurora-x200",
    name: "Aurora X200",
    brand: "Novatech",
    category: "Smartphones",
    image: "📱",
    basePrice: 62999,
    mrp: 69999,
    rating: 4.4,
    reviewCount: 2318,
    highlights: [
      "6.7\" 120Hz AMOLED display",
      "50MP triple camera with OIS",
      "5000mAh battery, 67W fast charging",
    ],
    description:
      "Aurora X200 pairs a flagship-grade camera system with a smooth 120Hz display, built for people who want premium performance without the flagship price tag.",
    variants: [
      { id: "128-black", label: "128GB · Obsidian Black", priceDelta: 0 },
      { id: "256-black", label: "256GB · Obsidian Black", priceDelta: 6000 },
      { id: "256-blue", label: "256GB · Glacier Blue", priceDelta: 6000 },
    ],
  },
  {
    id: "laptop-zenbook-air14",
    name: "AirBook Slim 14",
    brand: "Kestrel",
    category: "Laptops",
    image: "💻",
    basePrice: 84999,
    mrp: 94999,
    rating: 4.5,
    reviewCount: 1189,
    highlights: [
      "14\" 2.8K OLED display",
      "Up to 18 hours battery life",
      "1.2kg magnesium alloy body",
    ],
    description:
      "AirBook Slim 14 is built for everyday productivity — light enough to carry all day, with a battery that keeps up with long study or work sessions.",
    variants: [
      { id: "8-256", label: "8GB RAM · 256GB SSD", priceDelta: 0 },
      { id: "16-512", label: "16GB RAM · 512GB SSD", priceDelta: 15000 },
    ],
  },
  {
    id: "tv-crestline-55",
    name: "Crestline 55\" 4K QLED",
    brand: "Crestline",
    category: "Televisions",
    image: "📺",
    basePrice: 45999,
    mrp: 59999,
    rating: 4.3,
    reviewCount: 942,
    highlights: [
      "4K QLED with Dolby Vision",
      "Built-in voice assistant",
      "3 x HDMI 2.1 ports",
    ],
    description:
      "A 55-inch QLED panel with punchy color and deep contrast, plus smart features that make it the centrepiece of a living room upgrade.",
    variants: [
      { id: "55in", label: "55 inch", priceDelta: 0 },
      { id: "65in", label: "65 inch", priceDelta: 18000 },
    ],
  },
  {
    id: "watch-pulse-active",
    name: "Pulse Active Watch",
    brand: "Fernic",
    category: "Wearables",
    image: "⌚",
    basePrice: 8999,
    mrp: 11499,
    rating: 4.2,
    reviewCount: 3021,
    highlights: [
      "SpO2 and 24x7 heart rate tracking",
      "7-day battery backup",
      "AMOLED always-on display",
    ],
    description:
      "Pulse Active tracks the essentials — heart rate, sleep, and 100+ workout modes — in a lightweight design that lasts a full week on a charge.",
    variants: [
      { id: "black-strap", label: "Charcoal Black Strap", priceDelta: 0 },
      { id: "tan-strap", label: "Sandstone Tan Strap", priceDelta: 500 },
    ],
  },
  {
    id: "appliance-frostair-fridge",
    name: "FrostAir 340L Frost Free Refrigerator",
    brand: "FrostAir",
    category: "Appliances",
    image: "🧊",
    basePrice: 32999,
    mrp: 38999,
    rating: 4.1,
    reviewCount: 674,
    highlights: [
      "340L frost-free, 3-star rated",
      "Convertible freezer mode",
      "10-year compressor warranty",
    ],
    description:
      "A spacious frost-free refrigerator with a convertible freezer, built for families who want flexibility without a jump in their electricity bill.",
    variants: [
      { id: "silver", label: "Metallic Silver", priceDelta: 0 },
      { id: "wine", label: "Wine Red", priceDelta: 1000 },
    ],
  },
  {
    id: "tablet-slatebook-11",
    name: "SlateBook 11",
    brand: "Kestrel",
    category: "Tablets",
    image: "📲",
    basePrice: 27999,
    mrp: 32999,
    rating: 4.3,
    reviewCount: 511,
    highlights: [
      "11\" 2K display, stylus support",
      "13-hour battery life",
      "Quad speaker setup",
    ],
    description:
      "SlateBook 11 is equally at home sketching, streaming, or getting through a stack of study notes, with a display sharp enough for detailed work.",
    variants: [
      { id: "wifi-64", label: "Wi-Fi · 64GB", priceDelta: 0 },
      { id: "wifi-128", label: "Wi-Fi · 128GB", priceDelta: 4000 },
      { id: "cellular-128", label: "Wi-Fi + Cellular · 128GB", priceDelta: 7500 },
    ],
  },
];

export const products: Product[] = seeds.map((seed) => ({
  ...seed,
  emiPlans: buildEmiPlans(seed.basePrice),
}));

export function getProductSummaries() {
  return products.map((p) => ({
    id: p.id,
    name: p.name,
    brand: p.brand,
    category: p.category,
    image: p.image,
    basePrice: p.basePrice,
    mrp: p.mrp,
    rating: p.rating,
    minMonthlyEmi: Math.min(...p.emiPlans.map((plan) => plan.monthlyAmount)),
  }));
}

export function getProductById(id: string) {
  return products.find((p) => p.id === id) ?? null;
}

export function getProductWithVariantPricing(id: string, variantId?: string) {
  const product = getProductById(id);
  if (!product) return null;

  const variant =
    product.variants.find((v) => v.id === variantId) ?? product.variants[0];
  const finalPrice = product.basePrice + variant.priceDelta;

  return {
    ...product,
    selectedVariant: variant,
    finalPrice,
    emiPlans: buildEmiPlans(finalPrice),
  };
}
