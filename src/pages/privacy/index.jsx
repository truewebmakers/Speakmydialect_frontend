import TermsCondition1 from "@/components/section/TermsCondition1";

import MetaComponent from "@/components/common/MetaComponent";
import { metaData } from "@/constants/constant";
import PrivacyPolicy from "@/components/section/PrivacyPolicy";

export default function PrivacyPage() {
  return (
    <>
      <MetaComponent meta={metaData} />
      <PrivacyPolicy />
    </>
  );
}
