import Breadcumb16 from "@/components/breadcumb/Breadcumb16";
import Breadcumb3 from "@/components/breadcumb/Breadcumb3";

import Listing13 from "@/components/section/Listing13";
import TabSection1 from "@/components/section/TabSection1";

import MetaComponent from "@/components/common/MetaComponent";
import { metaData } from "@/constants/constant";

export default function FreelancerPage1() {
  return (
    <>
      <MetaComponent meta={metaData} />
      <TabSection1 />
      <Breadcumb3 path={["Home", "Services", "Design & Creative"]} />
      <Breadcumb16 />
      <Listing13 />
    </>
  );
}
