import Breadcumb3 from "@/components/breadcumb/Breadcumb3";

import BlogArea1 from "@/components/section/BlogArea1";

import MetaComponent from "@/components/common/MetaComponent";
import { metaData } from "@/constants/constant";

export default function BlogPage1() {
  return (
    <>
      <MetaComponent meta={metaData} />
      <Breadcumb3 />
      <BlogArea1 />
    </>
  );
}
