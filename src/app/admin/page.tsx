import { Package, Tags, Image as ImageIcon, MessageSquareQuote } from "lucide-react";
import { createClient } from "@/lib/supabase/server";

export default async function AdminDashboardPage() {
  const supabase = await createClient();
  const [products, categories, banners, testimonials] = await Promise.all([
    supabase.from("products").select("id", { count: "exact", head: true }),
    supabase.from("categories").select("id", { count: "exact", head: true }),
    supabase.from("banners").select("id", { count: "exact", head: true }),
    supabase.from("testimonials").select("id", { count: "exact", head: true }),
  ]);

  const stats = [
    { label: "Products", count: products.count ?? 0, icon: Package },
    { label: "Categories", count: categories.count ?? 0, icon: Tags },
    { label: "Banners", count: banners.count ?? 0, icon: ImageIcon },
    { label: "Testimonials", count: testimonials.count ?? 0, icon: MessageSquareQuote },
  ];

  return (
    <div>
      <h1 className="mb-6 font-[family-name:var(--font-heading)] text-2xl font-extrabold">
        Dashboard
      </h1>
      <div className="grid grid-cols-2 gap-4 sm:grid-cols-4">
        {stats.map((s) => (
          <div key={s.label} className="rounded-xl border border-border bg-card p-4">
            <s.icon size={20} className="text-primary" />
            <p className="mt-3 text-2xl font-extrabold text-charcoal">{s.count}</p>
            <p className="text-xs text-muted">{s.label}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
