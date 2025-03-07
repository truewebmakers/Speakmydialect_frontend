import React, { useEffect, useState } from "react";
import Search1 from "../element/Search1";
import listingStore from "@/store/listingStore";
import { useSearchParams } from "react-router-dom";

export default function LocationOption1({ data }) {
  const getLocation = listingStore((state) => state.getLocation);
  const setLocation = listingStore((state) => state.setLocation);
  const [search, setSearch] = useState("");
  const [searchParams, setSearchParams] = useSearchParams();

  // Location Handler
  const locationHandler = (id) => {
    // If the clicked location is already selected, deselect it; otherwise, select it
    if (getLocation === id) {
      setLocation(""); // Deselecting the location
    } else {
      setLocation(id); // Selecting a new location
    }
  };

  useEffect(() => {
    if (searchParams?.size) {
      setSearchParams("");
    }
  }, [getLocation]);
 
  const filteredData = data?.filter((item) =>
    item?.name?.toLowerCase()?.includes(search?.toLowerCase())
  );

  return (
    <div className="card-body card-body px-0 pt-0">
      <Search1
        setSearch={setSearch}
        search={search}
        placeholder="Search For Location"
      />
 
      {search && (
        <div className="checkbox-style1 mb15">
          {filteredData?.map((item, i) => (
            <label key={i} className="custom_checkbox">
              {item?.name}
              <input
                type="checkbox"
                checked={getLocation === item?.id}  
                onChange={() => locationHandler(item?.id)}  
              />
              <span className="checkmark" />
            </label>
          ))}
        </div>
      )}
    </div>
  );
}
