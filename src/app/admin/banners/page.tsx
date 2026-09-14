import { createClient } from "@/lib/supabase/server";
import { BannersAdminForm } from "@/components/admin/BannersAdminForm";

interface BannerRow {
  id: string;
  title: string;
  subtitle: string;
  cta_label: string;
  href: string;
  desktop_image_url: string;
  mobile_image_url: string;
  is_active: boolean;
  sort_order: number;
}

export default async function AdminBannersPage() {
  const supabase = await createClient();
  const { data } = await supabase
    .from("banners")
    .select("id, title, subtitle, cta_label, href, desktop_image_url, mobile_image_url, is_active, sort_order")
    .order("sort_order");

  return (
    <div>
      <h1 className="mb-6 font-[family-name:var(--font-heading)] text-2xl font-extrabold">
        Homepage Banners
      </h1>
      <p className="mb-6 max-w-lg text-sm text-muted">
        These slide automatically on the homepage. Upload a wide image for desktop and a taller
        image for mobile — each banner can use different images per device.
      </p>
      <BannersAdminForm banners={(data as BannerRow[]) ?? []} />
    </div>
  );
}
