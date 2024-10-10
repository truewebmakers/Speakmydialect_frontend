import listingStore from "@/store/listingStore";
import { useState } from "react";
import Search1 from "../element/Search1";

export default function SpeakOption1({ data }) {
  const getSpeak = listingStore((state) => state.getSpeak);
  const setSpeak = listingStore((state) => state.setSpeak);
  const [search, setSearch] = useState("");

  // Language Handler
  const speakHandler = (name) => {
    setSpeak(name);
  };

  // Filtering data based on search input
  const filteredData = data?.filter((item) =>
    item?.name?.toLowerCase()?.includes(search?.toLowerCase())
  );

  return (
    <>
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
                  checked={getSpeak?.includes(item?.name)}
                />
                <span className="checkmark" />
              </label>
            ))}
          </div>
        )}
      </div>
    </>
  );
}
