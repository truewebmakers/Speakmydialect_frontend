import ProjectCard1 from "../card/ProjectCard1";
import ListingSidebar2 from "../sidebar/ListingSidebar2";
import Pagination1 from "./Pagination1";
import listingStore from "@/store/listingStore";
import priceStore from "@/store/priceStore";
import ListingSidebarModal2 from "../modal/ListingSidebarModal2";
import { useEffect, useState } from "react";
import { searchingApi } from "@/hook/searchingApi";
import { useSearchParams } from "react-router-dom";
import NoDataFound from "../noData/NoDataFound";

export default function Listing8({ searchingResult1, setSearchingResult1 }) {
  const getCategory = listingStore((state) => state.getCategory);
  const getProjectType = listingStore((state) => state.getProjectType);
  const getPrice = priceStore((state) => state.priceRange);
  const getLocation = listingStore((state) => state.getLocation);
  const getSpeak = listingStore((state) => state.getSpeak);
  const [searchParams, setSearchParams] = useSearchParams();
  const [searchingResult, setSearchingResult] = useState([]);

  useEffect(() => {
    const query = Object.fromEntries(searchParams.entries());

    // If there are no filters and it's just "/search", call API without parameters
    if (!searchParams.toString()) {
      searchingApi({}).then((data) => setSearchingResult(data));
      return; // Exit early
    }

    // Check if no filters are selected
    if (
      !getLocation.length &&
      !getSpeak.length &&
      !getCategory.length &&
      !getProjectType.length
    ) {
      setSearchingResult([]); // Reset searching result if no filters are applied
      return; // Exit early
    }

    if (Object.keys(query).length) {
      searchingApi(query).then((data) => setSearchingResult(data));
    }
    setSearchingResult1([]); // Reset previous results
  }, [
    searchParams,
    setSearchingResult1,
    getLocation,
    getSpeak,
    getCategory,
    getProjectType,
  ]);

  useEffect(() => {
    const params = {
      location: getLocation,
      language: getSpeak,
      level: getCategory,
    };
    if (getProjectType?.length > 0) {
      params[getProjectType] = getPrice?.max;
    }
    setSearchParams(params); // This will update the URL params
  }, [getLocation, getSpeak, getCategory, getPrice, getProjectType]);

  const content =
    searchingResult1?.length > 0
      ? searchingResult1.map((item, i) => (
          <div key={i} className="col-md-6 col-lg-12">
            <ProjectCard1 data={item} />
          </div>
        ))
      : searchingResult.map((item, i) => (
          <div key={i} className="col-md-6 col-lg-12">
            <ProjectCard1 data={item} />
          </div>
        ));

  return (
    <>
      <section className="pt30 pb90">
        <div className="container">
          <div className="row">
            <div className="col-lg-3">
              <ListingSidebar2 />
            </div>
            <div className="col-lg-9">
              <div className="row">{content}</div>
              {searchingResult?.length === 0 &&
                searchingResult1?.length === 0 && <NoDataFound />}

              {searchingResult?.length > 10 && (
                <div className="mt30">
                  <Pagination1 />
                </div>
              )}
            </div>
          </div>
        </div>
      </section>
      <ListingSidebarModal2 />
    </>
  );
}
