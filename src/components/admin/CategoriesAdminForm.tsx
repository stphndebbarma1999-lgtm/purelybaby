"use client";

import { useState } from "react";
import { Check, Loader2 } from "lucide-react";
import { ImageUpload } from "@/components/admin/ImageUpload";
import { updateCategory } from "@/actions/admin";

interface CategoryRow {
  id: string;
  slug: string;
  name: string;
  icon_url: string;
  bg: string;
  sort_order: number;
}

function CategoryRowForm({ category }: { category: CategoryRow }) {
  const [name, setName] = useState(category.name);
  const [iconUrl, setIconUrl] = useState(category.icon_url);
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);

  async function handleSave() {
    setSaving(true);
    await updateCategory(category.id, { name, icon_url: iconUrl });
    setSaving(false);
    setSaved(true);
    window.setTimeout(() => setSaved(false), 1500);
  }

  return (
    <div className="flex flex-wrap items-end gap-4 rounded-xl border border-border bg-card p-4">
      <ImageUpload
        label="Icon"
        value={iconUrl}
        onChange={setIconUrl}
        folder={`categories/${category.slug}`}
      />
      <div className="flex-1 min-w-[160px]">
        <label className="mb-1.5 block text-xs font-bold text-charcoal">Name</label>
        <input
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="w-full rounded-full border border-border px-4 py-2 text-sm outline-none"
        />
        <p className="mt-1 text-xs text-muted">/shop/{category.slug}</p>
      </div>
      <button
        type="button"
        onClick={handleSave}
        disabled={saving}
        className="inline-flex items-center gap-2 rounded-full bg-primary px-5 py-2.5 text-xs font-bold text-white hover:bg-primary-dark disabled:opacity-60"
      >
        {saving ? <Loader2 size={14} className="animate-spin" /> : saved ? <Check size={14} /> : null}
        {saving ? "Saving…" : saved ? "Saved" : "Save"}
      </button>
    </div>
  );
}

export function CategoriesAdminForm({ categories }: { categories: CategoryRow[] }) {
  return (
    <div className="flex flex-col gap-3">
      {categories.map((category) => (
        <CategoryRowForm key={category.id} category={category} />
      ))}
    </div>
  );
}
