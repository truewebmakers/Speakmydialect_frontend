import React, { useState } from "react";
import Search1 from "../element/Search1";
import listingStore from "@/store/listingStore";

export default function LocationOption1({ data }) {
  const getLocation = listingStore((state) => state.getLocation);
  const setLocation = listingStore((state) => state.setLocation);
  const [showAll, setShowAll] = useState(false);

  // handler
  const locationHandler = (id) => {
    setLocation(id);
  };

  const displayedData = showAll ? data : data?.slice(0, 10);

  return (
    <>
      <div className="card-body card-body px-0 pt-0">
        <Search1 />
        <div className="checkbox-style1 mb15">
          {displayedData?.map((item, i) => (
            <label key={i} className="custom_checkbox">
              {item?.name}
              <input
                type="checkbox"
                checked={getLocation?.includes(item?.name)}
                onChange={() => locationHandler(item?.name)}
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
        )}
      </div>
    </>
  );
}
