"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import { Loader2, Plus, Trash2 } from "lucide-react";
import { ImageUpload } from "@/components/admin/ImageUpload";
import { createProduct, updateProduct, type ProductInput } from "@/actions/admin";
import type { ProductColor } from "@/types";

interface CategoryOption {
  id: string;
  name: string;
}

export function ProductForm({
  categories,
  productId,
  initial,
}: {
  categories: CategoryOption[];
  productId?: string;
  initial?: ProductInput;
}) {
  const router = useRouter();
  const [form, setForm] = useState<ProductInput>(
    initial ?? {
      slug: "",
      title: "",
      description: "",
      image_url: "",
      images: [],
      colors: [],
      price: 0,
      original_price: null,
      badge: null,
      category_id: categories[0]?.id ?? null,
      is_best_seller: false,
      is_new_arrival: false,
      is_active: true,
    }
  );
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);

  function set<K extends keyof ProductInput>(key: K, value: ProductInput[K]) {
    setForm((f) => ({ ...f, [key]: value }));
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setSaving(true);
    setError(null);
    try {
      if (productId) {
        await updateProduct(productId, form);
      } else {
        await createProduct(form);
      }
      router.push("/admin/products");
    } catch (err) {
      setError(err instanceof Error ? err.message : "Something went wrong");
    } finally {
      setSaving(false);
    }
  }

  function addGalleryImage(url: string) {
    if (!url) return;
    set("images", [...form.images, url]);
  }

  function removeGalleryImage(i: number) {
    set("images", form.images.filter((_, idx) => idx !== i));
  }

  function addColor() {
    set("colors", [...form.colors, { name: "", hex: "#2f9e8f", imageUrl: "" }]);
  }

  function updateColor(i: number, patch: Partial<ProductColor>) {
    set(
      "colors",
      form.colors.map((c, idx) => (idx === i ? { ...c, ...patch } : c))
    );
  }

  function removeColor(i: number) {
    set("colors", form.colors.filter((_, idx) => idx !== i));
  }

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-6">
      <div className="grid gap-4 sm:grid-cols-2">
        <div>
          <label className="mb-1.5 block text-xs font-bold text-charcoal">Title</label>
          <input
            required
            value={form.title}
            onChange={(e) => set("title", e.target.value)}
            className="w-full rounded-full border border-border px-4 py-2 text-sm outline-none"
          />
        </div>
        <div>
          <label className="mb-1.5 block text-xs font-bold text-charcoal">Slug</label>
          <input
            required
            value={form.slug}
            onChange={(e) => set("slug", e.target.value)}
            placeholder="organic-cotton-onesie"
            className="w-full rounded-full border border-border px-4 py-2 text-sm outline-none"
          />
        </div>
      </div>

      <div>
        <label className="mb-1.5 block text-xs font-bold text-charcoal">Description</label>
        <textarea
          rows={3}
          value={form.description}
          onChange={(e) => set("description", e.target.value)}
          className="w-full rounded-2xl border border-border px-4 py-2 text-sm outline-none"
        />
      </div>

      <div className="grid gap-4 sm:grid-cols-3">
        <div>
          <label className="mb-1.5 block text-xs font-bold text-charcoal">Price (₹)</label>
          <input
            required
            type="number"
            step="0.01"
            value={form.price}
            onChange={(e) => set("price", Number(e.target.value))}
            className="w-full rounded-full border border-border px-4 py-2 text-sm outline-none"
          />
        </div>
        <div>
          <label className="mb-1.5 block text-xs font-bold text-charcoal">
            Original price (optional)
          </label>
          <input
            type="number"
            step="0.01"
            value={form.original_price ?? ""}
            onChange={(e) => set("original_price", e.target.value ? Number(e.target.value) : null)}
            className="w-full rounded-full border border-border px-4 py-2 text-sm outline-none"
          />
        </div>
        <div>
          <label className="mb-1.5 block text-xs font-bold text-charcoal">Badge (optional)</label>
          <input
            value={form.badge ?? ""}
            onChange={(e) => set("badge", e.target.value || null)}
            placeholder="New"
            className="w-full rounded-full border border-border px-4 py-2 text-sm outline-none"
          />
        </div>
      </div>

      <div>
        <label className="mb-1.5 block text-xs font-bold text-charcoal">Category</label>
        <select
          value={form.category_id ?? ""}
          onChange={(e) => set("category_id", e.target.value || null)}
          className="w-full max-w-xs rounded-full border border-border px-4 py-2 text-sm outline-none"
        >
          {categories.map((c) => (
            <option key={c.id} value={c.id}>
              {c.name}
            </option>
          ))}
        </select>
      </div>

      <div className="flex flex-wrap gap-6 text-sm font-semibold text-charcoal">
        <label className="flex items-center gap-2">
          <input
            type="checkbox"
            checked={form.is_active}
            onChange={(e) => set("is_active", e.target.checked)}
          />
          Active
        </label>
        <label className="flex items-center gap-2">
          <input
            type="checkbox"
            checked={form.is_best_seller}
            onChange={(e) => set("is_best_seller", e.target.checked)}
          />
          Best Seller
        </label>
        <label className="flex items-center gap-2">
          <input
            type="checkbox"
            checked={form.is_new_arrival}
            onChange={(e) => set("is_new_arrival", e.target.checked)}
          />
          New Arrival
        </label>
      </div>

      <div>
        <p className="mb-2 text-xs font-bold text-charcoal">Cover photo</p>
        <ImageUpload
          label="Cover photo"
          value={form.image_url}
          onChange={(url) => set("image_url", url)}
          folder={`products/${form.slug || "new"}`}
        />
      </div>

      <div>
        <p className="mb-2 text-xs font-bold text-charcoal">Gallery photos</p>
        <div className="flex flex-wrap gap-3">
          {form.images.map((url, i) => (
            <div key={url + i} className="relative">
              <ImageUpload
                label=""
                value={url}
                onChange={(newUrl) =>
                  newUrl ? set("images", form.images.map((u, idx) => (idx === i ? newUrl : u))) : removeGalleryImage(i)
                }
                folder={`products/${form.slug || "new"}/gallery`}
              />
            </div>
          ))}
          <ImageUpload
            label="Add photo"
            value=""
            onChange={addGalleryImage}
            folder={`products/${form.slug || "new"}/gallery`}
          />
        </div>
      </div>

      <div>
        <p className="mb-2 text-xs font-bold text-charcoal">Color options</p>
        <div className="flex flex-col gap-3">
          {form.colors.map((color, i) => (
            <div key={i} className="flex flex-wrap items-end gap-3 rounded-lg border border-border p-3">
              <div>
                <label className="mb-1.5 block text-xs font-bold text-charcoal">Name</label>
                <input
                  value={color.name}
                  onChange={(e) => updateColor(i, { name: e.target.value })}
                  placeholder="Sage Green"
                  className="w-36 rounded-full border border-border px-3 py-1.5 text-sm outline-none"
                />
              </div>
              <div>
                <label className="mb-1.5 block text-xs font-bold text-charcoal">Swatch</label>
                <input
                  type="color"
                  value={color.hex}
                  onChange={(e) => updateColor(i, { hex: e.target.value })}
                  className="h-9 w-14 cursor-pointer rounded border border-border"
                />
              </div>
              <ImageUpload
                label="Photo for this color (optional)"
                value={color.imageUrl ?? ""}
                onChange={(url) => updateColor(i, { imageUrl: url })}
                folder={`products/${form.slug || "new"}/colors`}
              />
              <button
                type="button"
                onClick={() => removeColor(i)}
                className="rounded-full border border-border p-2 text-secondary hover:bg-secondary-light"
                aria-label="Remove color"
              >
                <Trash2 size={14} />
              </button>
            </div>
          ))}
          <button
            type="button"
            onClick={addColor}
            className="inline-flex items-center gap-2 self-start rounded-full border-2 border-dashed border-border px-4 py-2 text-xs font-bold text-muted hover:border-primary hover:text-primary"
          >
            <Plus size={14} /> Add color
          </button>
        </div>
      </div>

      {error && <p className="text-sm text-secondary">{error}</p>}

      <div className="flex items-center gap-3">
        <button
          type="submit"
          disabled={saving}
          className="inline-flex items-center gap-2 rounded-full bg-primary px-6 py-3 text-sm font-bold text-white hover:bg-primary-dark disabled:opacity-60"
        >
          {saving && <Loader2 size={16} className="animate-spin" />}
          {saving ? "Saving…" : productId ? "Save Changes" : "Create Product"}
        </button>
      </div>
    </form>
  );
}
