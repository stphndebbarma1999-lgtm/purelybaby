import { createClient } from "@/lib/supabase/server";
import { TestimonialsAdminForm } from "@/components/admin/TestimonialsAdminForm";

interface TestimonialDbRow {
  id: string;
  name: string;
  role: string | null;
  quote: string;
  rating: number;
  avatar_url: string;
  is_published: boolean;
}

export default async function AdminTestimonialsPage() {
  const supabase = await createClient();
  const { data } = await supabase
    .from("testimonials")
    .select("id, name, role, quote, rating, avatar_url, is_published")
    .order("sort_order");

  const testimonials = ((data as TestimonialDbRow[]) ?? []).map((row) => ({
    ...row,
    role: row.role ?? "",
  }));

  return (
    <div>
      <h1 className="mb-6 font-[family-name:var(--font-heading)] text-2xl font-extrabold">
        Testimonials
      </h1>
      <TestimonialsAdminForm testimonials={testimonials} />
    </div>
  );
}
