import type { Feature } from "@/components/ui/FeatureCard";
import {
  BeakerIcon,
  ShieldCheckIcon,
  SnowflakeIcon,
  TruckIcon,
} from "@/components/icons";

/** The four supply guarantees. Used on the Why Us page. */
export const whyUsFeatures: Feature[] = [
  {
    icon: SnowflakeIcon,
    title: "Unbroken cold chain",
    body: "−18 °C from the field to your walk-in, monitored at every transfer and logged on the delivery docket.",
    tone: "blue",
  },
  {
    icon: BeakerIcon,
    title: "Batch-tested quality",
    body: "Brix, pH and microbiology checked per lot, with a certificate of analysis attached to every consignment.",
    tone: "green",
  },
  {
    icon: TruckIcon,
    title: "Bulk-ready supply",
    body: "1 kg to pallet quantities on a standing schedule, so your prep list never waits on a delivery window.",
    tone: "berry",
  },
  {
    icon: ShieldCheckIcon,
    title: "Chef-led sourcing",
    body: "Varietals selected for pastry and bar performance — colour that holds, acidity that balances.",
    tone: "blue",
  },
];
