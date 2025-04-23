import listingStore from "@/store/listingStore";
import priceStore from "@/store/priceStore";

export default function ClearButton() {
  const {
    setDeliveryTime,
    setLevel,
    setLocation,
    setBestSeller,
    setDesginTool,
    setSpeak,
    setDialect,
    setSearch,
    setCategory,
    setProjectType,
    setEnglishLevel,
    setJobType,
    setNoOfEmployee,
    deliveryTime,
    level,
    location,
    bestSeller,
    desginTool,
    speak,
    search,
    category,
    projectType,
    englishLevel,
    jobType,
    noOfEmployee, 
    setCountry 
  } = listingStore();

  const { priceRange, priceRangeHandler } = priceStore();

  const clearHandler = () => {
    setDeliveryTime(""); 
    setLevel([]);
    setCountry([]);
    setLocation([]);
    setBestSeller("best-seller");
    setDesginTool([]);
    setSpeak([]);
    setDialect([]);
    setSearch("");
    setCategory([]);
    setProjectType([]);
    setEnglishLevel([]);
    setJobType([]);
    setNoOfEmployee([]);
    priceRangeHandler(0, 100000);
    console.log("Filters cleared!");
  };

  const shouldShowClear =
    deliveryTime !== "" ||
    level.length > 0 ||
    location.length > 0 ||
    bestSeller !== "best-seller" ||
    desginTool.length > 0 ||
    speak.length > 0 ||
    search !== "" ||
    category.length > 0 ||
    projectType.length > 0 ||
    englishLevel.length > 0 ||
    jobType.length > 0 ||
    noOfEmployee.length > 0 ||
    priceRange.min !== 0 ||
    priceRange.max !== 100000;

  return (
    shouldShowClear && (
      <button
        onClick={clearHandler}
        className="ud-btn btn-thm ui-clear-btn w-100"
      >
        Clear <i className="fal fa-arrow-right-long"></i>
      </button>
    )
  );
}
