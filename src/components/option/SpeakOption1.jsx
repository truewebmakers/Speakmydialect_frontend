import listingStore from "@/store/listingStore";
import { useState } from "react";

export default function SpeakOption1(datas) {
  const { data } = datas;
  const getSpeak = listingStore((state) => state.getSpeak);
  const setSpeak = listingStore((state) => state.setSpeak);
  const [showAll, setShowAll] = useState(false);

  // handler
  const speakHandler = (data) => {
    setSpeak(data);
  };
  const displayedData = showAll ? data : data?.slice(0, 10);
  return (
    <>
      <div className="card-body card-body px-0 pt-0">
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
