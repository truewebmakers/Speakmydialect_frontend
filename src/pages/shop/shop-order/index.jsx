import OrderComplete1 from "@/components/element/OrderComplete1";

import MetaComponent from "@/components/common/MetaComponent";
import { metaData } from "@/constants/constant";

export default function ShopPageOrder() {
  return (
    <>
      <MetaComponent meta={metaData} />
      <OrderComplete1 />
    </>
  );
}
