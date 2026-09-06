"use client";

import { useState } from "react";
import MobileFrame from "@/components/layout/MobileFrame";
import BottomNav from "@/components/layout/BottomNav";
import ShopHero from "@/components/shop/ShopHero";
import ShopTabs, { ShopTab } from "@/components/shop/ShopTabs";
import PlaceholderTab from "@/components/shop/PlaceholderTab";
import MarketplaceSection from "@/components/marketplace/MarketplaceSection";

export default function ShopPage() {
  const [activeTab, setActiveTab] = useState<ShopTab>("marketplace");

  return (
    <MobileFrame>
      <div className="flex-1 overflow-y-auto">
        <ShopHero />
        <ShopTabs active={activeTab} onChange={setActiveTab} />

        <div className="mt-4">
          {activeTab === "top-brands" && <PlaceholderTab label="Top Brands" />}
          {activeTab === "nearby-stores" && (
            <PlaceholderTab label="Nearby Stores" />
          )}
          {activeTab === "marketplace" && <MarketplaceSection />}
        </div>
      </div>

      <BottomNav active="Shop" />
    </MobileFrame>
  );
}
