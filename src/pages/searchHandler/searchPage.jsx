import Breadcumb9 from "@/components/breadcumb/Breadcumb9";
import Listing8 from "@/components/section/Listing8";
import MetaComponent from "@/components/common/MetaComponent";
import { metaData } from "@/constants/constant";
import { useState } from "react";

export default function SearchPage() {
  const [searchingResult1, setSearchingResult1] = useState([]);

  return (
    <>
      <MetaComponent meta={metaData} />
      <Breadcumb9 />
      <Listing8
        searchingResult1={searchingResult1}
        setSearchingResult1={setSearchingResult1}
      />
    </>
  );
}
