import { HeroBanner } from "@/components/home/HeroBanner";
import { ShopByCategory } from "@/components/home/ShopByCategory";
import { ProductSection } from "@/components/home/ProductSection";
import { TrustStrip } from "@/components/home/TrustStrip";
import { Testimonials } from "@/components/home/Testimonials";
import { Newsletter } from "@/components/home/Newsletter";
import { getCategories } from "@/lib/data/categories";
import { getBestSellers, getNewArrivals } from "@/lib/data/products";
import { getTestimonials } from "@/lib/data/testimonials";
import { getBanners } from "@/lib/data/banners";
import { getContentBlock } from "@/lib/data/content";

export default async function Home() {
  const [categories, bestSellers, newArrivals, testimonials, banners, newsletter] =
    await Promise.all([
      getCategories(),
      getBestSellers(),
      getNewArrivals(),
      getTestimonials(),
      getBanners(),
      getContentBlock("newsletter"),
    ]);

  return (
    <>
      <HeroBanner banners={banners} />
      <ShopByCategory categories={categories} />
      <ProductSection heading="Best Sellers" products={bestSellers} viewAllHref="/shop" accent />
      <ProductSection heading="New Arrivals" products={newArrivals} viewAllHref="/new-arrivals" />
      <TrustStrip />
      <Testimonials testimonials={testimonials} />
      <Newsletter content={newsletter} />
    </>
  );
}
