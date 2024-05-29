import UiElement from "@/components/section/UiElement";

import MetaComponent from "@/components/common/MetaComponent";
import { metaData } from "@/constants/constant";

export default function UIElementsPage() {
  return (
    <>
      <MetaComponent meta={metaData} />
      <UiElement />
    </>
  );
}
