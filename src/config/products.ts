import type { Product } from "@/types";

/**
 * Single source of truth for the product catalog. Best Sellers, New
 * Arrivals, category pages, /shop, /deals and /product/[slug] all read
 * from this list rather than keeping separate arrays.
 */
export const allProducts: Product[] = [
  {
    id: "bs-1",
    slug: "organic-cotton-onesie",
    title: "Organic Cotton Onesie",
    description:
      "A soft, breathable onesie made from organic cotton — an easy everyday layer for warmer days.",
    imageUrl: "",
    price: 599,
    originalPrice: 799,
    rating: 4.8,
    reviewCount: 154,
    categorySlug: "baby-clothing",
    isBestSeller: true,
  },
  {
    id: "bs-2",
    slug: "silicone-feeding-set",
    title: "Silicone Feeding Set",
    description:
      "A bowl, plate and spoon set in food-grade silicone, sized for little hands learning to self-feed.",
    imageUrl: "",
    price: 899,
    rating: 4.6,
    reviewCount: 96,
    categorySlug: "feeding",
    isBestSeller: true,
  },
  {
    id: "bs-3",
    slug: "wooden-stacking-toy",
    title: "Wooden Stacking Toy",
    description:
      "A classic stacking ring toy in smooth, rounded wood pieces for early hand-eye coordination play.",
    imageUrl: "",
    price: 749,
    rating: 4.7,
    reviewCount: 128,
    categorySlug: "toys-learning",
    isBestSeller: true,
  },
  {
    id: "bs-4",
    slug: "leak-proof-sippy-cup",
    title: "Leak-Proof Sippy Cup",
    description:
      "A spill-resistant sippy cup with an easy-grip handle, built for the transition away from bottles.",
    imageUrl: "",
    price: 449,
    originalPrice: 549,
    rating: 4.5,
    reviewCount: 87,
    categorySlug: "feeding",
    isBestSeller: true,
  },
  {
    id: "bs-5",
    slug: "baby-muslin-swaddle",
    title: "Baby Muslin Swaddle Blanket",
    description:
      "A lightweight muslin swaddle that gets softer with every wash — useful for naps, strolls and tummy time.",
    imageUrl: "",
    price: 649,
    rating: 4.6,
    reviewCount: 112,
    categorySlug: "nursery",
    isBestSeller: true,
  },
  {
    id: "bs-6",
    slug: "diaper-caddy-organizer",
    title: "Diaper Caddy Organizer",
    description:
      "A portable caddy that keeps diapers, wipes and creams sorted and within reach at changing time.",
    imageUrl: "",
    price: 999,
    rating: 4.4,
    reviewCount: 79,
    categorySlug: "diapering",
    isBestSeller: true,
  },
  {
    id: "na-1",
    slug: "bamboo-baby-comb-set",
    title: "Bamboo Baby Comb Set",
    description:
      "A gentle comb and brush set in smooth bamboo, sized for a newborn's first grooming routine.",
    imageUrl: "",
    price: 349,
    rating: 4.7,
    reviewCount: 21,
    badge: "New",
    categorySlug: "bath-skincare",
    isNewArrival: true,
  },
  {
    id: "na-2",
    slug: "nursery-night-lamp",
    title: "Nursery Night Lamp",
    description:
      "A soft-glow night lamp with adjustable brightness, designed for calm middle-of-the-night feeds and changes.",
    imageUrl: "",
    price: 1199,
    rating: 4.9,
    reviewCount: 14,
    badge: "New",
    categorySlug: "nursery",
    isNewArrival: true,
  },
  {
    id: "na-3",
    slug: "baby-grooming-kit",
    title: "Baby Grooming Kit",
    description:
      "A rounded-tip nail clipper, brush and comb kit for safe, simple grooming in the first year.",
    imageUrl: "",
    price: 799,
    rating: 4.6,
    reviewCount: 33,
    badge: "New",
    categorySlug: "bath-skincare",
    isNewArrival: true,
  },
  {
    id: "na-4",
    slug: "cotton-muslin-wraps",
    title: "Cotton Muslin Wraps (Pack of 3)",
    description:
      "Three breathable muslin wraps that double as swaddles, burp cloths or light pram covers.",
    imageUrl: "",
    price: 899,
    rating: 4.8,
    reviewCount: 19,
    badge: "New",
    categorySlug: "baby-clothing",
    isNewArrival: true,
  },
];

export function getProductBySlug(slug: string) {
  return allProducts.find((product) => product.slug === slug);
}

export function getProductsByCategory(categorySlug: string) {
  return allProducts.filter((product) => product.categorySlug === categorySlug);
}

export function getRelatedProducts(product: Product, limit = 4) {
  return allProducts
    .filter((p) => p.id !== product.id && p.categorySlug === product.categorySlug)
    .slice(0, limit);
}
