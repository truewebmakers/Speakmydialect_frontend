import Breadcumb3 from "@/components/breadcumb/Breadcumb3";
import Breadcumb9 from "@/components/breadcumb/Breadcumb9";

import Listing8 from "@/components/section/Listing8";
import TabSection1 from "@/components/section/TabSection1";

import MetaComponent from "@/components/common/MetaComponent";
import { apiMethods, apiUrls, metaData } from "@/constants/constant";
import { useParams, useSearchParams } from "react-router-dom";
import { useEffect, useState } from "react";
import UseApi from "@/hook/useApi";

export default function ProjectPage1() {
  const [searchParams] = useSearchParams();
  const searchValue = searchParams.get("value");
  const [searchingResult, setSearchingResult] = useState([]);

  const getSearchingResult = async () => {
    try {
      const { data } = await UseApi(
        apiUrls.serachingApi + searchValue,
        apiMethods.GET
      );
      if (data?.status === true || data?.status == 200) {
        const searhingData = data?.data;
        setSearchingResult(searhingData);
      }
    } catch (error) {
      toast.error("Error fetching suggestions");
    }
  };

  useEffect(() => {
    getSearchingResult();
  }, [searchValue]);

  return (
    <>
      <MetaComponent meta={metaData} />
      <TabSection1 />
      <Breadcumb3 path={["Home", "Services", "Design & Creative"]} />
      <Breadcumb9 />
      <Listing8 searchingResult={searchingResult} />
    </>
  );
}
