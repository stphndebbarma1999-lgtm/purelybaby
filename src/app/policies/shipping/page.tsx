import type { Metadata } from "next";
import { InfoPage } from "@/components/ui/InfoPage";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Shipping Policy",
};

export default function ShippingPolicyPage() {
  return (
    <InfoPage title="Shipping Policy" description={`Last updated: ${new Date().getFullYear()}`}>
      <div>
        <h2>Order Processing</h2>
        <p className="mt-1.5">
          Orders are processed within 2-3 business days of being placed, excluding weekends and
          public holidays.
        </p>
      </div>
      <div>
        <h2>Shipping Costs</h2>
        <p className="mt-1.5">
          Free shipping applies to orders over ₹999. A flat shipping fee applies below that
          threshold, shown at checkout before you pay.
        </p>
      </div>
      <div>
        <h2>Delivery Estimates</h2>
        <p className="mt-1.5">
          Delivery typically takes 4-7 business days after dispatch, depending on your location.
          These are estimates, not guarantees.
        </p>
      </div>
      <div>
        <h2>Questions</h2>
        <p className="mt-1.5">
          See our <Link href="/shipping-info" className="text-primary underline">Shipping Info</Link> page
          for more details, or contact us directly.
        </p>
      </div>
    </InfoPage>
  );
}
