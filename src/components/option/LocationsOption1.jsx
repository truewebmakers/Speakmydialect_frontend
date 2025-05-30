import listingStore from "@/store/listingStore";
import { useSearchParams } from "react-router-dom";
import SelectInputDefault from "../dashboard/option/SelectInputDefault";

export default function LocationSelection({
  data,
  setCountryId,
  setSpeakId,
  label,
}) {
  const getCountry = listingStore((state) => state.getCountry);
  const setCountry = listingStore((state) => state.setCountry);
  const setSpeak = listingStore((state) => state.setSpeak);
  const setDialect = listingStore((state) => state.setDialect);

  const [searchParams, setSearchParams] = useSearchParams();

  // Language Handler
  const speakHandler = (option, value) => {
     
    setCountryId(value);
    setCountry(value);
    setSearchParams("");
    setSpeakId(0); // Clear search params
    setSpeak("");
    setDialect("");
  };

  // Prepare the default select object
  const defaultSelect = {
    option: data?.find((item) => item?.id === getCountry)?.name || label, // Show the name of the selected country
    value: getCountry,
  };
  return (
    <div className="card-body px-0 pt-0">
      <SelectInputDefault
        defaultSelect={defaultSelect} // Pass the prepared defaultSelect object
        data={data?.map((item) => ({
          option: item?.name, // Language name to display
          value: item?.id, // Language id for internal use (e.g. searching)
        }))} // Populate dropdown with languages
        handler={speakHandler} // Handle language selection
      />
    </div>
  );
}
