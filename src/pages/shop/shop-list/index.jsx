import Breadcumb3 from "@/components/breadcumb/Breadcumb3";

import HeaderInfo1 from "@/components/section/HeaderInfo1";
import ShopArea1 from "@/components/section/ShopArea1";

import MetaComponent from "@/components/common/MetaComponent";
import { metaData } from "@/constants/constant";

export default function ShopPageList() {
  return (
    <>
      <MetaComponent meta={metaData} />
      <Breadcumb3 path={["Home", "Services", "Design & Creative"]} />
      <HeaderInfo1
        title="Shop Pages"
        brief="Give your visitor a smooth online experience
                                    with a solid UX design"
      />
      <ShopArea1 />
    </>
  );
}
