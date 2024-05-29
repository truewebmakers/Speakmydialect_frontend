import Breadcumb3 from "@/components/breadcumb/Breadcumb3";

import ShopSingleArea1 from "@/components/section/ShopSingleArea1";

import MetaComponent from "@/components/common/MetaComponent";
import { metaData } from "@/constants/constant";

export default function ShopPageSingle1() {
  return (
    <>
      <MetaComponent meta={metaData} />
      <Breadcumb3 path={["Home", "Services", "Design & Creative"]} />
      <ShopSingleArea1 />
    </>
  );
}
