import type { Metadata } from "next";
import { InfoPage } from "@/components/ui/InfoPage";

export const metadata: Metadata = {
  title: "Shipping Info",
};

export default function ShippingInfoPage() {
  return (
    <InfoPage title="Shipping Info" description="How and when your order arrives.">
      <div>
        <h2>Processing Time</h2>
        <p className="mt-1.5">
          Orders are typically processed and handed to our courier partner within 2-3 business
          days of being placed.
        </p>
      </div>
      <div>
        <h2>Delivery Time</h2>
        <p className="mt-1.5">
          Once shipped, most orders arrive within 4-7 business days depending on your location.
        </p>
      </div>
      <div>
        <h2>Shipping Charges</h2>
        <p className="mt-1.5">
          Free shipping applies on orders over ₹999. Orders below that threshold may include a
          flat shipping fee, shown at checkout.
        </p>
      </div>
      <div>
        <h2>Order Tracking</h2>
        <p className="mt-1.5">
          Tracking details will be shared once online order tracking is available. Until then,
          contact us for the latest status on your order.
        </p>
      </div>
    </InfoPage>
  );
}
