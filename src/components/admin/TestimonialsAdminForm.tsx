"use client";

import { useState } from "react";
import { Check, Loader2, Plus, Trash2 } from "lucide-react";
import { ImageUpload } from "@/components/admin/ImageUpload";
import {
  createTestimonial,
  deleteTestimonial,
  updateTestimonial,
  type TestimonialInput,
} from "@/actions/admin";

interface TestimonialRow extends TestimonialInput {
  id: string;
}

const empty: TestimonialInput = {
  name: "",
  role: "",
  quote: "",
  rating: 5,
  avatar_url: "",
  is_published: false,
};

function TestimonialForm({
  initial,
  onSaved,
  onDelete,
}: {
  initial: TestimonialInput;
  onSaved: (input: TestimonialInput) => Promise<void>;
  onDelete?: () => Promise<void>;
}) {
  const [form, setForm] = useState<TestimonialInput>(initial);
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);

  function set<K extends keyof TestimonialInput>(key: K, value: TestimonialInput[K]) {
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
      <div className="flex flex-wrap gap-4">
        <ImageUpload
          label="Avatar"
          value={form.avatar_url}
          onChange={(url) => set("avatar_url", url)}
          folder="testimonials"
          aspect="aspect-square"
        />
        <div className="grid flex-1 gap-3 sm:grid-cols-2">
          <div>
            <label className="mb-1.5 block text-xs font-bold text-charcoal">Name</label>
            <input
              value={form.name}
              onChange={(e) => set("name", e.target.value)}
              className="w-full rounded-full border border-border px-4 py-2 text-sm outline-none"
            />
          </div>
          <div>
            <label className="mb-1.5 block text-xs font-bold text-charcoal">Role</label>
            <input
              value={form.role}
              onChange={(e) => set("role", e.target.value)}
              placeholder="Mom of 1"
              className="w-full rounded-full border border-border px-4 py-2 text-sm outline-none"
            />
          </div>
          <div className="sm:col-span-2">
            <label className="mb-1.5 block text-xs font-bold text-charcoal">Quote</label>
            <textarea
              rows={3}
              value={form.quote}
              onChange={(e) => set("quote", e.target.value)}
              className="w-full rounded-2xl border border-border px-4 py-2 text-sm outline-none"
            />
          </div>
          <div>
            <label className="mb-1.5 block text-xs font-bold text-charcoal">Rating (1-5)</label>
            <input
              type="number"
              min={1}
              max={5}
              value={form.rating}
              onChange={(e) => set("rating", Number(e.target.value))}
              className="w-full rounded-full border border-border px-4 py-2 text-sm outline-none"
            />
          </div>
        </div>
      </div>

      <div className="mt-4 flex items-center justify-between">
        <label className="flex items-center gap-2 text-xs font-semibold text-charcoal">
          <input
            type="checkbox"
            checked={form.is_published}
            onChange={(e) => set("is_published", e.target.checked)}
          />
          Published (visible on homepage)
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

export function TestimonialsAdminForm({ testimonials }: { testimonials: TestimonialRow[] }) {
  const [list, setList] = useState(testimonials);
  const [adding, setAdding] = useState(false);

  return (
    <div className="flex flex-col gap-4">
      {list.map((t) => (
        <TestimonialForm
          key={t.id}
          initial={t}
          onSaved={(input) => updateTestimonial(t.id, input)}
          onDelete={async () => {
            await deleteTestimonial(t.id);
            setList((l) => l.filter((x) => x.id !== t.id));
          }}
        />
      ))}

      {adding ? (
        <TestimonialForm
          initial={empty}
          onSaved={async (input) => {
            await createTestimonial(input);
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
          <Plus size={16} /> Add Testimonial
        </button>
      )}
    </div>
  );
}
