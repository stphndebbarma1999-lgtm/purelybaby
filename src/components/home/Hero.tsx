import Link from "next/link";
import { Baby, Heart, Sparkles } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { MediaPlaceholder } from "@/components/ui/MediaPlaceholder";
import { heroConfig } from "@/config/homepage";

export function Hero() {
  return (
    <section className="relative overflow-hidden bg-cream">
      {/* Decorative shapes */}
      <div className="pointer-events-none absolute -left-16 top-10 h-40 w-40 rounded-full bg-pastel-mint/60 blur-2xl" />
      <div className="pointer-events-none absolute right-0 top-0 h-72 w-72 rounded-full bg-pastel-peach/50 blur-3xl" />
      <Heart
        className="pointer-events-none absolute left-10 top-24 hidden h-6 w-6 text-secondary/40 sm:block"
        fill="currentColor"
      />
      <Sparkles className="pointer-events-none absolute left-[38%] top-10 hidden h-5 w-5 text-gold/50 md:block" />

      <Container className="relative grid gap-10 py-12 lg:grid-cols-2 lg:items-center lg:py-20">
        <div className="relative z-10 text-center lg:text-left">
          {heroConfig.eyebrow && (
            <p className="mb-3 text-sm font-semibold uppercase tracking-wide text-secondary">
              {heroConfig.eyebrow}
            </p>
          )}
          <h1 className="font-[family-name:var(--font-heading)] text-4xl font-extrabold leading-tight sm:text-5xl lg:text-6xl">
            <span className="text-primary">{heroConfig.titleLine1}</span>
            <br />
            <span className="text-secondary">{heroConfig.titleLine2}</span>
          </h1>
          <p className="mx-auto mt-5 max-w-md text-base leading-relaxed text-muted lg:mx-0 lg:text-lg">
            {heroConfig.description}
          </p>
          <div className="mt-8 flex flex-col items-center gap-3 sm:flex-row sm:justify-center lg:justify-start">
            <Link
              href={heroConfig.primaryButton.href}
              className="inline-flex items-center gap-2 rounded-full bg-primary px-7 py-3.5 text-sm font-bold text-white shadow-sm transition-colors hover:bg-primary-dark"
            >
              {heroConfig.primaryButton.label}
              <span aria-hidden>→</span>
            </Link>
            <Link
              href={heroConfig.secondaryButton.href}
              className="inline-flex items-center gap-2 rounded-full border-2 border-charcoal/15 bg-card px-7 py-3.5 text-sm font-bold text-charcoal transition-colors hover:border-primary hover:text-primary"
            >
              {heroConfig.secondaryButton.label}
            </Link>
          </div>
        </div>

        <div className="relative z-10">
          <MediaPlaceholder
            src={heroConfig.imageUrl}
            alt="PurelyBaby hero"
            icon={Baby}
            tint="peach"
            fill={false}
            className="mx-auto aspect-[4/3] w-full max-w-lg rounded-[2rem] border border-border shadow-sm"
          />
        </div>
      </Container>
    </section>
  );
}
