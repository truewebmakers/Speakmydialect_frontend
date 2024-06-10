import Breadcumb15 from "@/components/breadcumb/Breadcumb15";
import MetaComponent from "@/components/common/MetaComponent";
import TranslatorProfilePage from "@/components/section/TranslatorProfilePage";
import { metaData } from "@/constants/constant";

export default function FreelancerPageSingle11() {
  return (
    <>
      <MetaComponent meta={metaData} />
      <Breadcumb15 />
      <TranslatorProfilePage />
    </>
  );
}
