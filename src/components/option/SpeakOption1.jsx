import listingStore from "@/store/listingStore";
import { useState } from "react";
import Search1 from "../element/Search1";

export default function SpeakOption1(datas) {
  const { data } = datas;
  const getSpeak = listingStore((state) => state.getSpeak);
  const setSpeak = listingStore((state) => state.setSpeak);
  const [showAll, setShowAll] = useState(false);
  const [search, setSearch] = useState("");

  // Language Handler
  const speakHandler = (data) => {
    setSpeak(data);
  };
  // Filtering data based on search input
  const filteredData = data?.filter((item) =>
    item?.name?.toLowerCase()?.includes(search?.toLowerCase())
  );

  const displayedData = showAll ? filteredData : filteredData?.slice(0, 10);
  return (
    <>
      <div className="card-body card-body px-0 pt-0">
        <Search1 setSearch={setSearch} search={search} />
        <div className="checkbox-style1 mb15">
          {displayedData?.map((item, i) => (
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
        {showAll ? (
          <a className="text-thm" onClick={() => setShowAll(false)}>
            Show less
          </a>
        ) : (
          <a className="text-thm" onClick={() => setShowAll(true)}>
            Show more
          </a>
        )}{" "}
      </div>
    </>
  );
}
