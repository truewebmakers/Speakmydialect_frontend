import TermsCondition1 from "@/components/section/TermsCondition1";

import MetaComponent from "@/components/common/MetaComponent";
import { metaData } from "@/constants/constant";

export default function TermsPage() {
  return (
    <>
      <MetaComponent meta={metaData} />
      <TermsCondition1 />
    </>
  );
}
