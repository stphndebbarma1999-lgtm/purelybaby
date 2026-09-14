import { createClient } from "@/lib/supabase/server";
import { ContentAdminForm } from "@/components/admin/ContentAdminForm";
import type { AnnouncementBarContent, SiteContent } from "@/lib/data/content";

export default async function AdminContentPage() {
  const supabase = await createClient();
  const { data } = await supabase
    .from("content_blocks")
    .select("key, data")
    .in("key", ["site", "announcement_bar"]);

  const site = (data?.find((d) => d.key === "site")?.data ?? {}) as SiteContent;
  const announcementBar = (data?.find((d) => d.key === "announcement_bar")?.data ??
    {}) as AnnouncementBarContent;

  return (
    <div>
      <h1 className="mb-6 font-[family-name:var(--font-heading)] text-2xl font-extrabold">
        Site Content
      </h1>
      <ContentAdminForm site={site} announcementBar={announcementBar} />
    </div>
  );
}
