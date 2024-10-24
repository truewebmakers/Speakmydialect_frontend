import listingStore from "@/store/listingStore";
import { useSearchParams } from "react-router-dom";
import SelectInput from "../dashboard/option/SelectInput";

export default function SpeakOption1({ data }) {
  const getSpeak = listingStore((state) => state.getSpeak);
  const setSpeak = listingStore((state) => state.setSpeak);
  const [searchParams, setSearchParams] = useSearchParams();

  // Language Handler
  const speakHandler = (option, value) => {
    setSpeak(value); // Set the selected language
    setSearchParams(""); // Clear search params
  };

  // Prepare the default select object
  const defaultSelect = {
    option: getSpeak || "Select Language", // Show placeholder when no language is selected
    value: getSpeak,
  };

  return (
    <div className="card-body px-0 pt-0">
      <SelectInput
        defaultSelect={defaultSelect} // Pass the prepared defaultSelect object
        data={data?.map((item) => ({
          option: item?.name,
          value: item?.name,
        }))} // Populate dropdown with languages
        handler={speakHandler} // Handle language selection
      />
    </div>
  );
}
