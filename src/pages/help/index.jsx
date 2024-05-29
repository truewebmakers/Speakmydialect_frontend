import OurFaqSection1 from "@/components/section/OurFaqSection1";

import MetaComponent from "@/components/common/MetaComponent";
import { metaData } from "@/constants/constant";

export default function HelpPage() {
  return (
    <>
      <MetaComponent meta={metaData} />
      <OurFaqSection1 />
    </>
  );
}
