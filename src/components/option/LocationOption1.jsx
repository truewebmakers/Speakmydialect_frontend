import React, { useState } from "react";
import Search1 from "../element/Search1";
import listingStore from "@/store/listingStore";

export default function LocationOption1({ data }) {
  const getLocation = listingStore((state) => state.getLocation);
  const setLocation = listingStore((state) => state.setLocation);
  const [search, setSearch] = useState("");

  // Location Handler
  const locationHandler = (id) => {
    setLocation(id);
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
          placeholder="Search For Location"
        />

        {/* Show location list only if there's a search term */}
        {search && (
          <div className="checkbox-style1 mb15">
            {filteredData?.map((item, i) => (
              <label key={i} className="custom_checkbox">
                {item?.name}
                <input
                  type="checkbox"
                  checked={getLocation.includes(item?.id)}
                  onChange={() => locationHandler(item?.id)}
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
