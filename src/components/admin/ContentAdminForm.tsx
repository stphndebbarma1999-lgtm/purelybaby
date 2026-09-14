"use client";

import { useState } from "react";
import { Check, Loader2 } from "lucide-react";
import { ImageUpload } from "@/components/admin/ImageUpload";
import { updateContentBlock } from "@/actions/admin";
import type { AnnouncementBarContent, SiteContent } from "@/lib/data/content";

export function ContentAdminForm({
  site,
  announcementBar,
}: {
  site: SiteContent;
  announcementBar: AnnouncementBarContent;
}) {
  const [siteForm, setSiteForm] = useState<SiteContent>(site);
  const [announcementForm, setAnnouncementForm] =
    useState<AnnouncementBarContent>(announcementBar);
  const [savingSite, setSavingSite] = useState(false);
  const [savedSite, setSavedSite] = useState(false);
  const [savingAnnouncement, setSavingAnnouncement] = useState(false);
  const [savedAnnouncement, setSavedAnnouncement] = useState(false);

  async function saveSite() {
    setSavingSite(true);
    await updateContentBlock("site", siteForm);
    setSavingSite(false);
    setSavedSite(true);
    window.setTimeout(() => setSavedSite(false), 1500);
  }

  async function saveAnnouncement() {
    setSavingAnnouncement(true);
    await updateContentBlock("announcement_bar", announcementForm);
    setSavingAnnouncement(false);
    setSavedAnnouncement(true);
    window.setTimeout(() => setSavedAnnouncement(false), 1500);
  }

  return (
    <div className="flex flex-col gap-8">
      <section className="rounded-xl border border-border bg-card p-5">
        <h2 className="mb-4 font-[family-name:var(--font-heading)] text-lg font-bold">
          Logo &amp; Site Info
        </h2>
        <div className="flex flex-col gap-4">
          <ImageUpload
            label="Logo"
            value={siteForm.logoUrl}
            onChange={(url) => setSiteForm((f) => ({ ...f, logoUrl: url }))}
            folder="site"
            aspect="aspect-[4/1]"
          />
          <div>
            <label className="mb-1.5 block text-xs font-bold text-charcoal">Site name</label>
            <input
              value={siteForm.name}
              onChange={(e) => setSiteForm((f) => ({ ...f, name: e.target.value }))}
              className="w-full max-w-sm rounded-full border border-border px-4 py-2 text-sm outline-none"
            />
          </div>
          <div>
            <label className="mb-1.5 block text-xs font-bold text-charcoal">
              Footer description
            </label>
            <textarea
              rows={2}
              value={siteForm.description}
              onChange={(e) => setSiteForm((f) => ({ ...f, description: e.target.value }))}
              className="w-full max-w-md rounded-2xl border border-border px-4 py-2 text-sm outline-none"
            />
          </div>
          <button
            type="button"
            onClick={saveSite}
            disabled={savingSite}
            className="inline-flex w-fit items-center gap-2 rounded-full bg-primary px-5 py-2.5 text-xs font-bold text-white hover:bg-primary-dark disabled:opacity-60"
          >
            {savingSite ? (
              <Loader2 size={14} className="animate-spin" />
            ) : savedSite ? (
              <Check size={14} />
            ) : null}
            {savingSite ? "Saving…" : savedSite ? "Saved" : "Save"}
          </button>
        </div>
      </section>

      <section className="rounded-xl border border-border bg-card p-5">
        <h2 className="mb-4 font-[family-name:var(--font-heading)] text-lg font-bold">
          Announcement Bar
        </h2>
        <div className="flex flex-col gap-4">
          <label className="flex items-center gap-2 text-sm font-semibold text-charcoal">
            <input
              type="checkbox"
              checked={announcementForm.enabled}
              onChange={(e) =>
                setAnnouncementForm((f) => ({ ...f, enabled: e.target.checked }))
              }
            />
            Show announcement bar
          </label>
          <div>
            <label className="mb-1.5 block text-xs font-bold text-charcoal">Message</label>
            <input
              value={announcementForm.message}
              onChange={(e) =>
                setAnnouncementForm((f) => ({ ...f, message: e.target.value }))
              }
              className="w-full max-w-lg rounded-full border border-border px-4 py-2 text-sm outline-none"
            />
          </div>
          <button
            type="button"
            onClick={saveAnnouncement}
            disabled={savingAnnouncement}
            className="inline-flex w-fit items-center gap-2 rounded-full bg-primary px-5 py-2.5 text-xs font-bold text-white hover:bg-primary-dark disabled:opacity-60"
          >
            {savingAnnouncement ? (
              <Loader2 size={14} className="animate-spin" />
            ) : savedAnnouncement ? (
              <Check size={14} />
            ) : null}
            {savingAnnouncement ? "Saving…" : savedAnnouncement ? "Saved" : "Save"}
          </button>
        </div>
      </section>
    </div>
  );
}
