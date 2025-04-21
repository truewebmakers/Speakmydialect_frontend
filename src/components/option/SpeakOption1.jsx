import listingStore from "@/store/listingStore";
import { useSearchParams } from "react-router-dom";
import SelectInputDefault from "../dashboard/option/SelectInputDefault";

export default function SpeakOption1({ data, setSpeakId,label}) {
  
  const getSpeak = listingStore((state) => state.getSpeak);
  const setSpeak = listingStore((state) => state.setSpeak);
  const [searchParams, setSearchParams] = useSearchParams();

  // Language Handler
  const speakHandler = (option, value) => {
    
    setSpeakId(value);
    // setCountry(value) 
    setSpeak(value); // Set the selected language's id
    setSearchParams(""); // Clear search params 
  };

  // Prepare the default select object
  const defaultSelect = {
    option:   data?.find((item) => item?.id === getSpeak)?.name || label, // Show the name of the selected language
    value: getSpeak,
  };
  console.log(":defaultSelect",defaultSelect)

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
