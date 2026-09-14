import { Container } from "@/components/ui/Container";

export function PageHero({
  title,
  description,
}: {
  title: string;
  description?: string;
}) {
  return (
    <section className="border-b border-border bg-cream-dark/60 py-10 sm:py-14">
      <Container>
        <h1 className="font-[family-name:var(--font-heading)] text-3xl font-extrabold sm:text-4xl">
          {title}
        </h1>
        {description && (
          <p className="mt-3 max-w-2xl text-sm text-muted sm:text-base">{description}</p>
        )}
      </Container>
    </section>
  );
}
