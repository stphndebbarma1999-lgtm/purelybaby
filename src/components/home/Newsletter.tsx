"use client";

import { useState } from "react";
import { Send } from "lucide-react";
import { Container } from "@/components/ui/Container";
import type { NewsletterContent } from "@/lib/data/content";

export function Newsletter({ content }: { content: NewsletterContent }) {
  const [submitted, setSubmitted] = useState(false);

  return (
    <section className="relative overflow-hidden bg-primary py-14 text-white">
      <div className="pointer-events-none absolute -left-10 -top-10 h-40 w-40 rounded-full bg-white/10" />
      <div className="pointer-events-none absolute -right-8 bottom-0 h-32 w-32 rounded-full bg-white/10" />

      <Container className="relative text-center">
        <h2 className="font-[family-name:var(--font-heading)] text-2xl font-extrabold sm:text-3xl">
          {content.heading}
        </h2>
        <p className="mx-auto mt-3 max-w-md text-sm text-white/85">
          {content.description}
        </p>

        <form
          onSubmit={(e) => {
            e.preventDefault();
            setSubmitted(true);
          }}
          className="mx-auto mt-6 flex max-w-md flex-col gap-3 sm:flex-row"
        >
          <input
            type="email"
            required
            placeholder={content.placeholder}
            className="w-full rounded-full border-0 bg-white px-5 py-3 text-sm text-charcoal outline-none placeholder:text-muted"
          />
          <button
            type="submit"
            className="inline-flex items-center justify-center gap-2 rounded-full bg-secondary px-6 py-3 text-sm font-bold text-white transition-colors hover:bg-secondary-dark"
          >
            {content.buttonLabel}
            <Send size={14} />
          </button>
        </form>
        {submitted && (
          <p className="mt-3 text-sm font-semibold text-white">Thanks — you&apos;re on the list!</p>
        )}
      </Container>
    </section>
  );
}
