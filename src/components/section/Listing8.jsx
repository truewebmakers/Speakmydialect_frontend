import ProjectCard1 from "../card/ProjectCard1";
import ListingSidebar2 from "../sidebar/ListingSidebar2";
import Pagination1 from "./Pagination1";
import listingStore from "@/store/listingStore";
import { useEffect, useState } from "react";
import { searchingApi } from "@/hook/searchingApi";
import NoDataFound from "../noData/NoDataFound";
import { pageLimit } from "@/constants/constant";

export default function Listing8({ searchingResult1, setSearchingResult1 }) {
  const getCategory = listingStore((state) => state.getCategory);
  const getProjectType = listingStore((state) => state.getProjectType);
  const getLocation = listingStore((state) => state.getLocation);
  const getSpeak = listingStore((state) => state.getSpeak);
  const getDialect = listingStore((state) => state.getDialect);
  const [searchingResult, setSearchingResult] = useState([]);
  const [total, setTotal] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);

  const fetchData = (page) => {
    const query = {
      location: getLocation || undefined,
      language: getSpeak || undefined,
      level: getCategory || undefined,
      type: getProjectType.length > 0 ? getProjectType : undefined,
      dialect: getDialect || undefined,
      page,
      page_limit: pageLimit,
    };

    // Remove undefined values from query
    Object.keys(query).forEach(
      (key) => query[key] === undefined && delete query[key]
    );

    // If there are no selected filters, call API without parameters
    if (Object.keys(query).length === 0) {
      searchingApi({}).then((data) => {
        setTotal(data?.total_count);
        setSearchingResult(data?.data);
      });
      return; // Exit early
    }

    // Call API with the constructed query if any filter is selected
    searchingApi(query).then((data) => {
      setTotal(data?.total_count);
      setSearchingResult(data?.data);
    });
    setSearchingResult1([]); // Reset previous results
  };

  useEffect(() => {
    // Fetch data whenever filters change or currentPage changes
    setCurrentPage(1); // Reset to first page when filters change
    fetchData(1); // Fetch data for the first page
  }, [getLocation, getSpeak, getCategory, getProjectType, getDialect]);

  // Fetch data for the current page whenever currentPage changes
  useEffect(() => {
    fetchData(currentPage);
  }, [currentPage]);

  const content =
    searchingResult1?.length > 0
      ? searchingResult1?.map((item, i) => (
          <div key={i} className="col-md-6 col-lg-12">
            <ProjectCard1 data={item} />
          </div>
        ))
      : searchingResult?.map((item, i) => (
          <div key={i} className="col-md-6 col-lg-12">
            <ProjectCard1 data={item} />
          </div>
        ));

  return (
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
            {total > pageLimit && (
              <div className="mt30">
                <Pagination1
                  currentPage={currentPage}
                  setCurrentPage={setCurrentPage}
                  total={total}
                  fetchData={fetchData}
                />
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
