import type { Metadata } from "next";
import { InfoPage } from "@/components/ui/InfoPage";
import { contactInfo } from "@/config/site";

export const metadata: Metadata = {
  title: "Returns & Exchanges",
};

export default function ReturnsPage() {
  return (
    <InfoPage
      title="Returns & Exchanges"
      description="Not quite right? Here's how returns work."
    >
      <div>
        <h2>Return Window</h2>
        <p className="mt-1.5">
          Most unused, unopened items can be returned within 7 days of delivery. Items must be in
          their original packaging with tags intact.
        </p>
      </div>
      <div>
        <h2>Non-Returnable Items</h2>
        <p className="mt-1.5">
          For hygiene reasons, opened feeding, bath and skincare items can&apos;t be returned
          unless defective.
        </p>
      </div>
      <div>
        <h2>How to Start a Return</h2>
        <p className="mt-1.5">
          Email {contactInfo.email} with your order details and the reason for return, and
          we&apos;ll walk you through the next steps.
        </p>
      </div>
      <div>
        <h2>Refunds</h2>
        <p className="mt-1.5">
          Once we receive and inspect your return, refunds are processed to your original payment
          method within 5-7 business days.
        </p>
      </div>
    </InfoPage>
  );
}
