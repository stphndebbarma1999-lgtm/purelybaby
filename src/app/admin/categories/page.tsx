import { createClient } from "@/lib/supabase/server";
import { CategoriesAdminForm } from "@/components/admin/CategoriesAdminForm";

interface CategoryRow {
  id: string;
  slug: string;
  name: string;
  icon_url: string;
  bg: string;
  sort_order: number;
}

export default async function AdminCategoriesPage() {
  const supabase = await createClient();
  const { data } = await supabase
    .from("categories")
    .select("id, slug, name, icon_url, bg, sort_order")
    .order("sort_order");

  return (
    <div>
      <h1 className="mb-6 font-[family-name:var(--font-heading)] text-2xl font-extrabold">
        Categories
      </h1>
      <CategoriesAdminForm categories={(data as CategoryRow[]) ?? []} />
    </div>
  );
}
