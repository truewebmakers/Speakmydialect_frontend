import Breadcumb9 from "@/components/breadcumb/Breadcumb9";
import Listing8 from "@/components/section/Listing8";
import MetaComponent from "@/components/common/MetaComponent";
import { metaData } from "@/constants/constant";
import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";

export default function SearchPage() {
  const [searchingResult1, setSearchingResult1] = useState([]);
  const [searchParams] = useSearchParams();
  const searchQuery = searchParams.get("language") || ""; // Get the search query

  useEffect(() => {
    const query = Object.fromEntries(searchParams.entries());
    // Fetch the results based on query parameters if needed
  }, [searchParams]);

  return (
    <>
      <MetaComponent meta={metaData} />
      <Breadcumb9 searchValue={searchQuery} /> {/* Pass searchQuery here */}
      <Listing8
        searchingResult1={searchingResult1}
        setSearchingResult1={setSearchingResult1}
      />
    </>
  );
}
