import Invoice from "@/components/section/Invoice";

import MetaComponent from "@/components/common/MetaComponent";
import { metaData } from "@/constants/constant";

export default function InvoicePage() {
  return (
    <>
      <MetaComponent meta={metaData} />
      <Invoice />
    </>
  );
}
