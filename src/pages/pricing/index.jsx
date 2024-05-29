import PriceTable1 from "@/components/section/PriceTable1";

import MetaComponent from "@/components/common/MetaComponent";
import { metaData } from "@/constants/constant";

export default function PricingPage() {
  return (
    <>
      <MetaComponent meta={metaData} />
      <PriceTable1 />
    </>
  );
}
