import listingStore from "@/store/listingStore";
import { useSearchParams } from "react-router-dom";
import SelectInputDefault from "../dashboard/option/SelectInputDefault";

export default function SpeakOption1({ data, setSpeakId, label }) {
  const getSpeak = listingStore((state) => state.getSpeak);
  const setSpeak = listingStore((state) => state.setSpeak);
  const setDialect = listingStore((state) => state.setDialect);
  const [searchParams, setSearchParams] = useSearchParams();

  // Language Handler
  const speakHandler = (option, value) => {
    setSpeakId(value);
    setSpeak(value); // Set the selected language's id
    setSearchParams(""); // Clear search params
    setDialect("");
  };

  // Prepare the default select object
  const defaultSelect = {
    option: data?.find((item) => item?.id === getSpeak)?.name || label, // Show the name of the selected language
    value: getSpeak,
  };
  return (
    <div className="card-body px-0 pt-0">
      <SelectInputDefault
        defaultSelect={defaultSelect}
        data={data?.map((item) => ({
          option: item?.name,
          value: item?.id,
        }))}
        handler={speakHandler}
      />
    </div>
  );
}
