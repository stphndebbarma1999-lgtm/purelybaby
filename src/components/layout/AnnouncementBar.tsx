import { siteConfig } from "@/config/site";

export function AnnouncementBar() {
  if (!siteConfig.announcementBar.enabled) return null;

  return (
    <div className="bg-secondary py-2 text-center text-xs font-semibold text-white sm:text-sm">
      <p className="mx-auto max-w-[1280px] px-4 truncate">
        {siteConfig.announcementBar.message}
      </p>
    </div>
  );
}
