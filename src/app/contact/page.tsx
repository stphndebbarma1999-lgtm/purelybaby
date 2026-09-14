import type { Metadata } from "next";
import { Mail, MapPin, Phone } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { PageHero } from "@/components/ui/PageHero";
import { contactInfo } from "@/config/site";
import { ContactForm } from "@/components/ContactForm";

export const metadata: Metadata = {
  title: "Contact Us",
};

export default function ContactPage() {
  return (
    <>
      <PageHero title="Contact Us" description="We'd love to hear from you." />
      <Container className="grid gap-10 py-10 lg:grid-cols-[1fr_1.2fr] lg:py-14">
        <div className="flex flex-col gap-4">
          <div className="flex items-start gap-3">
            <Mail size={18} className="mt-0.5 shrink-0 text-primary" />
            <div>
              <p className="text-sm font-bold text-charcoal">Email</p>
              <p className="text-sm text-muted">{contactInfo.email}</p>
            </div>
          </div>
          <div className="flex items-start gap-3">
            <Phone size={18} className="mt-0.5 shrink-0 text-primary" />
            <div>
              <p className="text-sm font-bold text-charcoal">Phone</p>
              <p className="text-sm text-muted">{contactInfo.phone}</p>
            </div>
          </div>
          <div className="flex items-start gap-3">
            <MapPin size={18} className="mt-0.5 shrink-0 text-primary" />
            <div>
              <p className="text-sm font-bold text-charcoal">Address</p>
              <p className="text-sm text-muted">{contactInfo.address}</p>
            </div>
          </div>
        </div>

        <ContactForm />
      </Container>
    </>
  );
}
