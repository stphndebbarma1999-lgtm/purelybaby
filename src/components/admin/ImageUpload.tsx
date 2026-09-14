"use client";

import { useRef, useState } from "react";
import { Loader2, Upload, X } from "lucide-react";
import { createClient } from "@/lib/supabase/client";
import { MediaPlaceholder } from "@/components/ui/MediaPlaceholder";

export function ImageUpload({
  label,
  value,
  onChange,
  folder,
  aspect = "aspect-square",
}: {
  label: string;
  value: string;
  onChange: (url: string) => void;
  folder: string;
  aspect?: string;
}) {
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  async function handleFile(file: File) {
    setUploading(true);
    setError(null);

    const supabase = createClient();
    const ext = file.name.split(".").pop();
    const path = `${folder}/${crypto.randomUUID()}.${ext}`;

    const { error: uploadError } = await supabase.storage.from("media").upload(path, file, {
      cacheControl: "3600",
      upsert: false,
    });

    if (uploadError) {
      setError(uploadError.message);
      setUploading(false);
      return;
    }

    const { data } = supabase.storage.from("media").getPublicUrl(path);
    onChange(data.publicUrl);
    setUploading(false);
  }

  return (
    <div>
      <label className="mb-1.5 block text-xs font-bold text-charcoal">{label}</label>
      <div className="flex items-start gap-3">
        <div className={`relative w-28 shrink-0 overflow-hidden rounded-lg border border-border ${aspect}`}>
          <MediaPlaceholder src={value} alt={label} tint="mint" fill={false} className="h-full w-full" />
          {value && (
            <button
              type="button"
              onClick={() => onChange("")}
              aria-label="Remove image"
              className="absolute right-1 top-1 flex h-6 w-6 items-center justify-center rounded-full bg-card/90 text-charcoal shadow-sm"
            >
              <X size={12} />
            </button>
          )}
        </div>

        <div>
          <input
            ref={inputRef}
            type="file"
            accept="image/*"
            className="hidden"
            onChange={(e) => {
              const file = e.target.files?.[0];
              if (file) handleFile(file);
            }}
          />
          <button
            type="button"
            onClick={() => inputRef.current?.click()}
            disabled={uploading}
            className="inline-flex items-center gap-2 rounded-full border border-border px-4 py-2 text-xs font-bold text-charcoal hover:border-primary hover:text-primary disabled:opacity-60"
          >
            {uploading ? <Loader2 size={14} className="animate-spin" /> : <Upload size={14} />}
            {uploading ? "Uploading…" : value ? "Replace" : "Upload image"}
          </button>
          {error && <p className="mt-1 text-xs text-secondary">{error}</p>}
        </div>
      </div>
    </div>
  );
}
