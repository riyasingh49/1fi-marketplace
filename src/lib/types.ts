export type Variant = {
  id: string;
  label: string; // e.g. "128GB · Midnight Black"
  priceDelta: number; // added to basePrice
};

export type EmiPlan = {
  id: string;
  tenureMonths: number;
  monthlyAmount: number;
  totalAmount: number;
  interestType: "no-cost" | "standard";
  processingFee: number;
};

export type Product = {
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
  emiPlans: EmiPlan[];
};

export type ProductSummary = Pick<
  Product,
  "id" | "name" | "brand" | "category" | "image" | "basePrice" | "mrp" | "rating"
> & { minMonthlyEmi: number };
