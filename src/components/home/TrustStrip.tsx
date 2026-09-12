import { Container } from "@/components/ui/Container";
import { trustItems } from "@/config/homepage";

export function TrustStrip() {
  return (
    <section className="bg-primary-light py-10">
      <Container>
        <div className="grid grid-cols-2 gap-6 sm:grid-cols-3 lg:grid-cols-5">
          {trustItems.map((item) => (
            <div key={item.title} className="flex flex-col items-center gap-2 text-center">
              <span className="flex h-12 w-12 items-center justify-center rounded-full bg-card text-primary shadow-sm">
                <item.icon size={22} strokeWidth={1.75} />
              </span>
              <p className="text-sm font-bold text-charcoal">{item.title}</p>
              <p className="text-xs text-muted">{item.description}</p>
            </div>
          ))}
        </div>
      </Container>
    </section>
  );
}
