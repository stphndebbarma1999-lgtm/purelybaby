import type { Metadata } from "next";
import { InfoPage } from "@/components/ui/InfoPage";
import { contactInfo, siteConfig } from "@/config/site";

export const metadata: Metadata = {
  title: "Privacy Policy",
};

export default function PrivacyPolicyPage() {
  return (
    <InfoPage title="Privacy Policy" description={`Last updated: ${new Date().getFullYear()}`}>
      <div>
        <h2>Information We Collect</h2>
        <p className="mt-1.5">
          When you use {siteConfig.name}, we may collect information you provide directly, such
          as your name, email address, shipping address and phone number, along with basic usage
          data like pages visited and items viewed.
        </p>
      </div>
      <div>
        <h2>How We Use Your Information</h2>
        <p className="mt-1.5">
          We use this information to process orders, respond to your inquiries, improve the site,
          and — if you opt in — send updates about new products and offers. We do not sell your
          personal information.
        </p>
      </div>
      <div>
        <h2>Cookies & Local Storage</h2>
        <p className="mt-1.5">
          We use your browser&apos;s local storage to remember your cart and wishlist on this
          device. This data stays on your device and is not shared with third parties.
        </p>
      </div>
      <div>
        <h2>Your Choices</h2>
        <p className="mt-1.5">
          You can unsubscribe from marketing emails at any time, and can contact us to request
          access to or deletion of your personal information.
        </p>
      </div>
      <div>
        <h2>Contact</h2>
        <p className="mt-1.5">
          Questions about this policy can be sent to {contactInfo.email}.
        </p>
      </div>
    </InfoPage>
  );
}
