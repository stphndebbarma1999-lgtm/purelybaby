"use client";

import { useState } from "react";
import { Check, Loader2, Plus, Trash2 } from "lucide-react";
import { ImageUpload } from "@/components/admin/ImageUpload";
import { createBanner, deleteBanner, updateBanner, type BannerInput } from "@/actions/admin";

interface BannerRow extends BannerInput {
  id: string;
}

const emptyBanner: BannerInput = {
  title: "",
  subtitle: "",
  cta_label: "Shop Now",
  href: "/shop",
  desktop_image_url: "",
  mobile_image_url: "",
  is_active: true,
  sort_order: 0,
};

function BannerForm({
  initial,
  onSaved,
  onDelete,
}: {
  initial: BannerInput;
  onSaved: (input: BannerInput) => Promise<void>;
  onDelete?: () => Promise<void>;
}) {
  const [form, setForm] = useState<BannerInput>(initial);
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);

  function set<K extends keyof BannerInput>(key: K, value: BannerInput[K]) {
    setForm((f) => ({ ...f, [key]: value }));
  }

  async function handleSave() {
    setSaving(true);
    await onSaved(form);
    setSaving(false);
    setSaved(true);
    window.setTimeout(() => setSaved(false), 1500);
  }

  return (
    <div className="rounded-xl border border-border bg-card p-4">
      <div className="grid gap-4 sm:grid-cols-2">
        <ImageUpload
          label="Desktop image (wide)"
          value={form.desktop_image_url}
          onChange={(url) => set("desktop_image_url", url)}
          folder="banners/desktop"
          aspect="aspect-[21/9]"
        />
        <ImageUpload
          label="Mobile image (tall)"
          value={form.mobile_image_url}
          onChange={(url) => set("mobile_image_url", url)}
          folder="banners/mobile"
          aspect="aspect-[3/4]"
        />
      </div>

      <div className="mt-4 grid gap-3 sm:grid-cols-2">
        <div>
          <label className="mb-1.5 block text-xs font-bold text-charcoal">Title</label>
          <input
            value={form.title}
            onChange={(e) => set("title", e.target.value)}
            className="w-full rounded-full border border-border px-4 py-2 text-sm outline-none"
          />
        </div>
        <div>
          <label className="mb-1.5 block text-xs font-bold text-charcoal">Subtitle</label>
          <input
            value={form.subtitle}
            onChange={(e) => set("subtitle", e.target.value)}
            className="w-full rounded-full border border-border px-4 py-2 text-sm outline-none"
          />
        </div>
        <div>
          <label className="mb-1.5 block text-xs font-bold text-charcoal">Button label</label>
          <input
            value={form.cta_label}
            onChange={(e) => set("cta_label", e.target.value)}
            className="w-full rounded-full border border-border px-4 py-2 text-sm outline-none"
          />
        </div>
        <div>
          <label className="mb-1.5 block text-xs font-bold text-charcoal">Button link</label>
          <input
            value={form.href}
            onChange={(e) => set("href", e.target.value)}
            className="w-full rounded-full border border-border px-4 py-2 text-sm outline-none"
          />
        </div>
      </div>

      <div className="mt-4 flex items-center justify-between">
        <label className="flex items-center gap-2 text-xs font-semibold text-charcoal">
          <input
            type="checkbox"
            checked={form.is_active}
            onChange={(e) => set("is_active", e.target.checked)}
          />
          Active
        </label>
        <div className="flex items-center gap-2">
          {onDelete && (
            <button
              type="button"
              onClick={onDelete}
              className="inline-flex items-center gap-1.5 rounded-full border border-border px-4 py-2 text-xs font-bold text-secondary hover:bg-secondary-light"
            >
              <Trash2 size={13} /> Delete
            </button>
          )}
          <button
            type="button"
            onClick={handleSave}
            disabled={saving}
            className="inline-flex items-center gap-2 rounded-full bg-primary px-5 py-2.5 text-xs font-bold text-white hover:bg-primary-dark disabled:opacity-60"
          >
            {saving ? (
              <Loader2 size={14} className="animate-spin" />
            ) : saved ? (
              <Check size={14} />
            ) : null}
            {saving ? "Saving…" : saved ? "Saved" : "Save"}
          </button>
        </div>
      </div>
    </div>
  );
}

export function BannersAdminForm({ banners }: { banners: BannerRow[] }) {
  const [list, setList] = useState(banners);
  const [adding, setAdding] = useState(false);

  return (
    <div className="flex flex-col gap-4">
      {list.map((banner) => (
        <BannerForm
          key={banner.id}
          initial={banner}
          onSaved={(input) => updateBanner(banner.id, input)}
          onDelete={async () => {
            await deleteBanner(banner.id);
            setList((l) => l.filter((b) => b.id !== banner.id));
          }}
        />
      ))}

      {adding ? (
        <BannerForm
          initial={{ ...emptyBanner, sort_order: list.length + 1 }}
          onSaved={async (input) => {
            await createBanner(input);
            setAdding(false);
            window.location.reload();
          }}
        />
      ) : (
        <button
          type="button"
          onClick={() => setAdding(true)}
          className="inline-flex items-center justify-center gap-2 rounded-full border-2 border-dashed border-border py-3 text-sm font-bold text-muted hover:border-primary hover:text-primary"
        >
          <Plus size={16} /> Add Banner
        </button>
      )}
    </div>
  );
}
