"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { ChevronLeft, ChevronRight, ImageIcon } from "lucide-react";
import { MediaPlaceholder } from "@/components/ui/MediaPlaceholder";
import type { Banner } from "@/types";

export function HeroBanner({ banners }: { banners: Banner[] }) {
  const [active, setActive] = useState(0);
  const slideCount = banners.length;

  useEffect(() => {
    if (slideCount <= 1) return;
    const id = window.setInterval(() => {
      setActive((i) => (i + 1) % slideCount);
    }, 6000);
    return () => window.clearInterval(id);
  }, [slideCount]);

  if (slideCount === 0) return null;

  return (
    <section className="relative overflow-hidden bg-cream">
      <div className="relative aspect-[3/4] w-full sm:aspect-[16/9] lg:aspect-[21/7]">
        {banners.map((banner, i) => (
          <div
            key={banner.id}
            className={`absolute inset-0 transition-opacity duration-700 ${
              i === active ? "z-10 opacity-100" : "z-0 opacity-0"
            }`}
          >
            {/* Mobile image */}
            <MediaPlaceholder
              src={banner.mobileImageUrl}
              alt={banner.title}
              icon={ImageIcon}
              tint="peach"
              fill={false}
              className="absolute inset-0 h-full w-full sm:hidden"
            />
            {/* Desktop / tablet image */}
            <MediaPlaceholder
              src={banner.desktopImageUrl}
              alt={banner.title}
              icon={ImageIcon}
              tint="peach"
              fill={false}
              className="absolute inset-0 hidden h-full w-full sm:block"
            />

            <div className="absolute inset-0 bg-gradient-to-t from-charcoal/55 via-charcoal/10 to-transparent" />

            <div className="absolute inset-0 flex flex-col items-start justify-end gap-3 p-6 sm:items-center sm:justify-center sm:p-10 sm:text-center">
              {banner.title && (
                <h1 className="max-w-lg font-[family-name:var(--font-heading)] text-2xl font-extrabold text-white sm:text-4xl lg:text-5xl">
                  {banner.title}
                </h1>
              )}
              {banner.subtitle && (
                <p className="max-w-sm text-sm text-white/90 sm:text-base">{banner.subtitle}</p>
              )}
              {banner.ctaLabel && (
                <Link
                  href={banner.href}
                  className="mt-1 inline-flex items-center gap-2 rounded-full bg-primary px-6 py-3 text-sm font-bold text-white shadow-sm transition-colors hover:bg-primary-dark"
                >
                  {banner.ctaLabel}
                  <span aria-hidden>→</span>
                </Link>
              )}
            </div>
          </div>
        ))}

        {slideCount > 1 && (
          <>
            <button
              type="button"
              aria-label="Previous slide"
              onClick={() => setActive((i) => (i - 1 + slideCount) % slideCount)}
              className="absolute left-3 top-1/2 z-20 -translate-y-1/2 rounded-full bg-white/80 p-2 text-charcoal shadow-sm transition-colors hover:bg-white"
            >
              <ChevronLeft size={18} />
            </button>
            <button
              type="button"
              aria-label="Next slide"
              onClick={() => setActive((i) => (i + 1) % slideCount)}
              className="absolute right-3 top-1/2 z-20 -translate-y-1/2 rounded-full bg-white/80 p-2 text-charcoal shadow-sm transition-colors hover:bg-white"
            >
              <ChevronRight size={18} />
            </button>
            <div className="absolute bottom-3 left-1/2 z-20 flex -translate-x-1/2 gap-1.5">
              {banners.map((banner, i) => (
                <button
                  key={banner.id}
                  type="button"
                  aria-label={`Go to slide ${i + 1}`}
                  onClick={() => setActive(i)}
                  className={`h-1.5 rounded-full transition-all ${
                    i === active ? "w-6 bg-white" : "w-1.5 bg-white/50"
                  }`}
                />
              ))}
            </div>
          </>
        )}
      </div>
    </section>
  );
}
