import { AnnouncementBar } from "@/components/layout/AnnouncementBar";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
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
      <AnnouncementBar />
      <Header />
      <main className="flex-1">
        <Hero />
        <ShopByCategory />
        <ProductSection heading="Best Sellers" products={bestSellers} viewAllHref="/shop" accent />
        <ProductSection heading="New Arrivals" products={newArrivals} viewAllHref="/new-arrivals" />
        <TrustStrip />
        <Testimonials />
        <Newsletter />
      </main>
      <Footer />
    </>
  );
}
