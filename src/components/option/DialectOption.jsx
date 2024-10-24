import listingStore from "@/store/listingStore";
import { useSearchParams } from "react-router-dom";
import SelectInput from "../dashboard/option/SelectInput";
import { useState } from "react";

export default function DialectOption1({ data }) {
  const getDialect = listingStore((state) => state.getDialect);
  const setDialect = listingStore((state) => state.setDialect);
  const [searchParams, setSearchParams] = useSearchParams();

  // Language Handler
  const speakHandler = (option, value) => {
    setDialect(value); // Set the selected language
    setSearchParams(""); // Clear search params
  };

  // Prepare the default select object
  const defaultSelect = {
    option: getDialect || "Select Dialect", // Show placeholder when no language is selected
    value: getDialect,
  };

  return (
    <div className="card-body px-0 pt-0">
      <SelectInput
        defaultSelect={defaultSelect} // Pass the prepared defaultSelect object
        data={data?.map((item) => ({
          option: item?.dialect,
          value: item?.dialect,
        }))} // Populate dropdown with languages
        handler={speakHandler} // Handle language selection
      />
    </div>
  );
}
