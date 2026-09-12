import { Heart, Quote } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { MediaPlaceholder } from "@/components/ui/MediaPlaceholder";
import { StarRating } from "@/components/ui/StarRating";
import { testimonials, testimonialsAreDemo } from "@/config/homepage";

export function Testimonials() {
  return (
    <section className="relative overflow-hidden py-14 lg:py-20">
      <Container>
        <div className="text-center">
          <h2 className="inline-flex items-center gap-2 font-[family-name:var(--font-heading)] text-2xl font-extrabold sm:text-3xl">
            Loved by Parents, Trusted by Families
            <Heart size={18} className="fill-secondary text-secondary" />
          </h2>
          {testimonialsAreDemo && (
            <p className="mt-2 text-xs text-muted">
              Demo content shown for preview — replace with verified customer reviews.
            </p>
          )}
        </div>

        <div className="mt-10 grid gap-5 md:grid-cols-3">
          {testimonials.map((t) => (
            <div
              key={t.id}
              className="flex flex-col gap-4 rounded-2xl border border-border bg-card p-6"
            >
              <Quote className="h-6 w-6 text-secondary/60" fill="currentColor" />
              <p className="text-sm leading-relaxed text-charcoal">&ldquo;{t.quote}&rdquo;</p>
              <div className="mt-auto flex items-center gap-3 pt-2">
                <MediaPlaceholder
                  src={t.avatarUrl}
                  alt={t.name}
                  tint="peach"
                  fill={false}
                  className="h-10 w-10 shrink-0 rounded-full"
                />
                <div>
                  <p className="text-sm font-bold text-charcoal">{t.name}</p>
                  {t.role && <p className="text-xs text-muted">{t.role}</p>}
                </div>
                <div className="ml-auto">
                  <StarRating rating={t.rating} />
                </div>
              </div>
            </div>
          ))}
        </div>
      </Container>
    </section>
  );
}
