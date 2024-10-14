import listingStore from "@/store/listingStore";
import { useState } from "react";
import Search1 from "../element/Search1";
import { useSearchParams } from "react-router-dom";

export default function SpeakOption1({ data }) {
  const getSpeak = listingStore((state) => state.getSpeak);
  const setSpeak = listingStore((state) => state.setSpeak);
  const [search, setSearch] = useState("");
  const [searchParams, setSearchParams] = useSearchParams();

  // Language Handler
  const speakHandler = (name) => {
    if (getSpeak === name) {
      setSpeak(""); // Deselecting the location
    } else {
      setSpeak(name); // Selecting a new location
    }
  };

  useEffect(() => {
    if (searchParams?.size) {
      setSearchParams("");
    }
  }, [getSpeak]);

  // Filtering data based on search input
  const filteredData = data?.filter((item) =>
    item?.name?.toLowerCase()?.includes(search?.toLowerCase())
  );

  return (
    <div className="card-body card-body px-0 pt-0">
      <Search1
        setSearch={setSearch}
        search={search}
        placeholder="Search For Languages"
      />

      {/* Show language list only if there's a search term */}
      {search && (
        <div className="checkbox-style1 mb15">
          {filteredData?.map((item, i) => (
            <label key={i} className="custom_checkbox">
              {item?.name}
              <input
                type="checkbox"
                onChange={() => speakHandler(item?.name)}
                checked={getSpeak === item?.name} // Check if current item is the selected language
              />
              <span className="checkmark" />
            </label>
          ))}
        </div>
      )}
    </div>
  );
}
