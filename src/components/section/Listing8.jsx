import ProjectCard1 from "../card/ProjectCard1";
import ListingSidebar2 from "../sidebar/ListingSidebar2";
import Pagination1 from "./Pagination1";
import listingStore from "@/store/listingStore";
import priceStore from "@/store/priceStore";
import ListingSidebarModal2 from "../modal/ListingSidebarModal2";
import { useEffect, useState } from "react";
import { searchingApi } from "@/hook/searchingApi";
import NoDataFound from "../noData/NoDataFound";

export default function Listing8({ searchingResult1, setSearchingResult1 }) {
  const getCategory = listingStore((state) => state.getCategory);
  const getProjectType = listingStore((state) => state.getProjectType);
  const getLocation = listingStore((state) => state.getLocation);
  const getSpeak = listingStore((state) => state.getSpeak);
  const getDialect = listingStore((state) => state.getDialect);

  const [searchingResult, setSearchingResult] = useState([]);

  useEffect(() => {
    // Create a query based on selected filters
    const query = {
      location: getLocation || undefined,
      language: getSpeak || undefined,
      level: getCategory || undefined,
      type: getProjectType.length > 0 ? getProjectType : undefined,
      dialect: getDialect || undefined,
    };

    // Remove undefined values from query
    Object.keys(query).forEach(
      (key) => query[key] === undefined && delete query[key]
    );

    // If there are no selected filters, call API without parameters
    if (Object.keys(query).length === 0) {
      searchingApi({}).then((data) => setSearchingResult(data));
      return; // Exit early
    }

    // Call API with the constructed query if any filter is selected
    searchingApi(query).then((data) => setSearchingResult(data));
    setSearchingResult1([]); // Reset previous results
  }, [getLocation, getSpeak, getCategory, getProjectType, getDialect]);

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
              <ListingSidebar2 setSearchingResult={setSearchingResult} />
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
