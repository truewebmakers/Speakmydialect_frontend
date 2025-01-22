import listingStore from "@/store/listingStore";
import { useSearchParams } from "react-router-dom";
import SelectInput from "../dashboard/option/SelectInput";

export default function SpeakOption1({ data, setSpeakId }) {
  const getSpeak = listingStore((state) => state.getSpeak);
  const setSpeak = listingStore((state) => state.setSpeak);
  const [searchParams, setSearchParams] = useSearchParams();

  // Language Handler
  const speakHandler = (option, value) => {
    // console.log("id",value)
    setSpeakId(value);
    setSpeak(value); // Set the selected language's id
    setSearchParams(""); // Clear search params
  };

  // Prepare the default select object
  const defaultSelect = {
    option:
      data?.find((item) => item?.id === getSpeak)?.name || "Select Language", // Show the name of the selected language
      value: getSpeak,
  };

  return (
    <div className="card-body px-0 pt-0">
      <SelectInput
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
