import { createClient } from "@/lib/supabase/public";
import type { Product, ProductColor } from "@/types";

interface ProductRow {
  id: string;
  slug: string;
  title: string;
  description: string;
  image_url: string;
  images: string[];
  colors: ProductColor[];
  price: string;
  original_price: string | null;
  rating: string;
  review_count: number;
  badge: string | null;
  is_best_seller: boolean;
  is_new_arrival: boolean;
  categories: { slug: string } | null;
}

const PRODUCT_SELECT =
  "id, slug, title, description, image_url, images, colors, price, original_price, rating, review_count, badge, is_best_seller, is_new_arrival, categories(slug)";

function mapProduct(row: ProductRow): Product {
  return {
    id: row.id,
    slug: row.slug,
    title: row.title,
    description: row.description,
    imageUrl: row.image_url,
    images: row.images ?? [],
    colors: row.colors ?? [],
    price: Number(row.price),
    originalPrice: row.original_price ? Number(row.original_price) : undefined,
    rating: Number(row.rating),
    reviewCount: row.review_count,
    badge: row.badge ?? undefined,
    categorySlug: row.categories?.slug ?? "",
    isBestSeller: row.is_best_seller,
    isNewArrival: row.is_new_arrival,
  };
}

export async function getAllProducts(): Promise<Product[]> {
  const supabase = createClient();
  const { data, error } = await supabase
    .from("products")
    .select(PRODUCT_SELECT)
    .eq("is_active", true)
    .order("sort_order");

  if (error || !data) return [];
  return (data as unknown as ProductRow[]).map(mapProduct);
}

export async function getBestSellers(): Promise<Product[]> {
  const supabase = createClient();
  const { data, error } = await supabase
    .from("products")
    .select(PRODUCT_SELECT)
    .eq("is_active", true)
    .eq("is_best_seller", true)
    .order("sort_order");

  if (error || !data) return [];
  return (data as unknown as ProductRow[]).map(mapProduct);
}

export async function getNewArrivals(): Promise<Product[]> {
  const supabase = createClient();
  const { data, error } = await supabase
    .from("products")
    .select(PRODUCT_SELECT)
    .eq("is_active", true)
    .eq("is_new_arrival", true)
    .order("sort_order");

  if (error || !data) return [];
  return (data as unknown as ProductRow[]).map(mapProduct);
}

export async function getDeals(): Promise<Product[]> {
  const products = await getAllProducts();
  return products.filter((p) => p.originalPrice && p.originalPrice > p.price);
}

export async function getProductsByCategory(categorySlug: string): Promise<Product[]> {
  const products = await getAllProducts();
  return products.filter((p) => p.categorySlug === categorySlug);
}

export async function getProductBySlug(slug: string): Promise<Product | null> {
  const supabase = createClient();
  const { data, error } = await supabase
    .from("products")
    .select(PRODUCT_SELECT)
    .eq("slug", slug)
    .eq("is_active", true)
    .maybeSingle();

  if (error || !data) return null;
  return mapProduct(data as unknown as ProductRow);
}

export async function getRelatedProducts(product: Product, limit = 4): Promise<Product[]> {
  const products = await getProductsByCategory(product.categorySlug);
  return products.filter((p) => p.id !== product.id).slice(0, limit);
}
