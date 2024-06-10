import { skillLevel } from "@/constants/constant";
import listingStore from "@/store/listingStore";

export default function CategoryOption1() {
  const getCategory = listingStore((state) => state.getCategory);
  const setCategory = listingStore((state) => state.setCategory);

  // handler
  const categoryHandler = (data) => {
    setCategory(data);
  };

  return (
    <>
      <div className="checkbox-style1 mb15">
        {skillLevel?.map((item, i) => (
          <label key={i} className="custom_checkbox">
            {item?.name}
            <input
              type="checkbox"
              onChange={() => categoryHandler(item?.name)}
              checked={getCategory.includes(item?.name)}
            />
            <span className="checkmark" />
          </label>
        ))}
      </div>
    </>
  );
}
