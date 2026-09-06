# 1Fi Marketplace — Shop Section

A standalone Next.js mockup of the **1Fi Marketplace**, built for the SDE
Intern assignment. It recreates the existing Shop page's visual language
(purple/violet brand, pill tabs, rounded cards, bottom nav) from the
provided screenshot, and adds a fully working Marketplace flow: browse
products → view product + EMI details → pick a variant and EMI plan →
confirm.

> This is a standalone project (no access to the real 1Fi codebase/repo),
> so it recreates the UI patterns visible in the reference screenshot
> rather than reusing actual 1Fi components.

## Running it

```bash
npm install
npm run dev
```

Open http://localhost:3000 — it redirects straight to `/shop`.

```bash
npm run build && npm start   # production build
npm run lint                 # eslint (clean, 0 warnings)
```

## What's implemented

**Shop page** (`/shop`)
- Hero banner + pill tab switcher: **Top Brands**, **Nearby Stores**, **1Fi
  Marketplace**
- Top Brands / Nearby Stores are intentionally blank placeholders per the
  assignment brief ("no implementation required")
- Bottom nav (Home / Shop / EMI Dues / Limit / Profile), Shop active

**1Fi Marketplace** (the built section)
- Search + category filter chips
- Product grid: image, name, brand, price (with MRP strikethrough), "EMI
  from ₹X/mo" badge
- Loading skeletons, error state with retry, empty-search state
- Product detail page: image, price, rating, variant selector
  (storage/color/size), highlights, description
- EMI plan selector: no-cost EMI (3/6/9 mo) and standard EMI (12/18/24 mo)
  tiers, each showing tenure, monthly amount, total payable, processing fee
- Sticky "Proceed" CTA, disabled until a plan is selected
- Confirmation page summarizing the selected product + variant + plan

## Architecture

```
src/
  app/
    shop/page.tsx                        Shop page (tabs + hero)
    shop/marketplace/[productId]/page.tsx        Product detail
    shop/marketplace/[productId]/confirm/page.tsx Plan confirmation
    api/marketplace/products/route.ts            List API (mock, ~500ms latency)
    api/marketplace/products/[productId]/route.ts Detail API (variant-aware pricing)
  components/
    layout/       MobileFrame, BottomNav
    shop/         ShopHero, ShopTabs, PlaceholderTab
    marketplace/  ProductCard, ProductGrid states, VariantSelector,
                  EmiPlanSelector, StickyCta, CategoryChips, ErrorState
  hooks/          useProducts, useProduct (loading/error/retry state)
  lib/            types.ts, mock-data.ts, api-client.ts
```

**Data flow / no hardcoded UI data:** components never import mock data
directly. `mock-data.ts` seeds products and *derives* EMI plans from price
(no-cost EMI = price / tenure; standard EMI = amortized with interest) so
plans are never hand-typed per product. This is served through Next.js API
routes (`/api/marketplace/products...`), and the client only talks to those
routes via `lib/api-client.ts`. Swapping in a real backend later means
replacing the two route handlers — no component changes needed.

**State management:** local component state (`useState`) for
variant/plan selection, plus small data-fetching hooks
(`useProducts`/`useProduct`) that own loading/error/retry state. No global
store — the app doesn't need one at this scope, and introducing Redux/Zustand
here would be over-engineering for two screens' worth of state.

**Error/loading states:** every fetch has a skeleton (loading) and an error
state with a retry button. 
- an unknown product id → 404 handled explicitly


