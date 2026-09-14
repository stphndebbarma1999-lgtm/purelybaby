import { createClient } from "@/lib/supabase/public";
import type { Category, PastelBg } from "@/types";

interface CategoryRow {
  id: string;
  slug: string;
  name: string;
  icon_url: string;
  bg: string;
  sort_order: number;
}

export async function getCategories(): Promise<Category[]> {
  const supabase = createClient();
  const { data, error } = await supabase
    .from("categories")
    .select("id, slug, name, icon_url, bg, sort_order")
    .order("sort_order");

  if (error || !data) return [];

  return (data as CategoryRow[]).map((row) => ({
    id: row.slug,
    name: row.name,
    href: `/shop/${row.slug}`,
    imageUrl: row.icon_url,
    bg: (row.bg as PastelBg) ?? "mint",
  }));
}

export async function getCategoryBySlug(slug: string): Promise<Category | null> {
  const categories = await getCategories();
  return categories.find((c) => c.id === slug) ?? null;
}
