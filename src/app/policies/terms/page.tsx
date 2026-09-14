import type { Metadata } from "next";
import { InfoPage } from "@/components/ui/InfoPage";
import { contactInfo, siteConfig } from "@/config/site";

export const metadata: Metadata = {
  title: "Terms & Conditions",
};

export default function TermsPage() {
  return (
    <InfoPage title="Terms & Conditions" description={`Last updated: ${new Date().getFullYear()}`}>
      <div>
        <h2>Using This Site</h2>
        <p className="mt-1.5">
          By using {siteConfig.name} ({siteConfig.domain}), you agree to use it only for lawful
          purposes and in a way that doesn&apos;t infringe on the rights of others.
        </p>
      </div>
      <div>
        <h2>Product Information</h2>
        <p className="mt-1.5">
          We aim to keep product descriptions, images and pricing accurate, but errors can occur.
          We reserve the right to correct pricing or availability issues and will let you know
          before fulfilling an affected order.
        </p>
      </div>
      <div>
        <h2>Orders</h2>
        <p className="mt-1.5">
          Placing an order is an offer to purchase, which we may accept or decline (for example,
          if an item is out of stock or a pricing error occurred).
        </p>
      </div>
      <div>
        <h2>Intellectual Property</h2>
        <p className="mt-1.5">
          All content on this site, including text, graphics and logos, belongs to{" "}
          {siteConfig.name} unless otherwise noted, and may not be reused without permission.
        </p>
      </div>
      <div>
        <h2>Contact</h2>
        <p className="mt-1.5">Questions about these terms can be sent to {contactInfo.email}.</p>
      </div>
    </InfoPage>
  );
}
