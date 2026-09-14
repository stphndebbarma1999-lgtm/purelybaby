import { Hero } from "@/components/home/Hero";
import { ShopByCategory } from "@/components/home/ShopByCategory";
import { ProductSection } from "@/components/home/ProductSection";
import { TrustStrip } from "@/components/home/TrustStrip";
import { Testimonials } from "@/components/home/Testimonials";
import { Newsletter } from "@/components/home/Newsletter";
import { bestSellers, newArrivals } from "@/config/homepage";

export default function Home() {
  return (
    <>
      <Hero />
      <ShopByCategory />
      <ProductSection heading="Best Sellers" products={bestSellers} viewAllHref="/shop" accent />
      <ProductSection heading="New Arrivals" products={newArrivals} viewAllHref="/new-arrivals" />
      <TrustStrip />
      <Testimonials />
      <Newsletter />
    </>
  );
}
