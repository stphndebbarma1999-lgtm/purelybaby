import { notFound } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import { ProductForm } from "@/components/admin/ProductForm";
import type { ProductInput } from "@/actions/admin";

export default async function EditProductPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const supabase = await createClient();

  const [{ data: product }, { data: categories }] = await Promise.all([
    supabase
      .from("products")
      .select(
        "id, slug, title, description, image_url, images, colors, price, original_price, badge, category_id, is_best_seller, is_new_arrival, is_active"
      )
      .eq("id", id)
      .maybeSingle(),
    supabase.from("categories").select("id, name").order("sort_order"),
  ]);

  if (!product) notFound();

  const initial: ProductInput = {
    slug: product.slug,
    title: product.title,
    description: product.description,
    image_url: product.image_url,
    images: product.images ?? [],
    colors: product.colors ?? [],
    price: Number(product.price),
    original_price: product.original_price ? Number(product.original_price) : null,
    badge: product.badge,
    category_id: product.category_id,
    is_best_seller: product.is_best_seller,
    is_new_arrival: product.is_new_arrival,
    is_active: product.is_active,
  };

  return (
    <div>
      <h1 className="mb-6 font-[family-name:var(--font-heading)] text-2xl font-extrabold">
        Edit Product
      </h1>
      <ProductForm categories={categories ?? []} productId={product.id} initial={initial} />
    </div>
  );
}
