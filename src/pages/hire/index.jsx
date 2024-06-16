import Breadcumb15 from "@/components/breadcumb/Breadcumb15";
import MetaComponent from "@/components/common/MetaComponent";
import HireNowSection from "@/components/section/HireNowSection";
import { metaData } from "@/constants/constant";
import { useLocation } from "react-router-dom";

export default function HireNowPage() {
  const { state } = useLocation();
  return (
    <>
      <MetaComponent meta={metaData} />
      <Breadcumb15 translatorProfile={state} />
      <HireNowSection translatorProfile={state} />
    </>
  );
}
