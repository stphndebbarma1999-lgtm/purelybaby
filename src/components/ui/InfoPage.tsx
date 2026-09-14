import type { ReactNode } from "react";
import { Container } from "@/components/ui/Container";
import { PageHero } from "@/components/ui/PageHero";

export function InfoPage({
  title,
  description,
  children,
}: {
  title: string;
  description?: string;
  children: ReactNode;
}) {
  return (
    <>
      <PageHero title={title} description={description} />
      <Container className="max-w-3xl py-10 lg:py-14">
        <div className="flex flex-col gap-6 text-sm leading-relaxed text-charcoal [&_h2]:font-[family-name:var(--font-heading)] [&_h2]:text-lg [&_h2]:font-bold [&_h2]:text-charcoal [&_p]:text-muted [&_li]:text-muted">
          {children}
        </div>
      </Container>
    </>
  );
}
