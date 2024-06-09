import { apiMethods, apiUrls } from "@/constants/constant";
import UseApi from "@/hook/useApi";
import { toast } from "react-toastify";

export const getCountries = async (setCountryList) => {
  try {
    const response = await UseApi(apiUrls.getCountries, apiMethods.GET);
    if (response?.status == 200 || response?.status == 201) {
      const countryData = response?.data?.data;
      setCountryList(countryData);
      sessionStorage.setItem("countries", JSON.stringify(countryData));
    }
  } catch (error) {
    toast.error("Error fetching countries");
  }
};

export const getLanguages = async (setLanguageListing) => {
  try {
    const response = await UseApi(apiUrls.getLanguages, apiMethods.GET);
    if (response?.status === 200 || response?.status === 201) {
      const languageData = response?.data?.data;
      setLanguageListing(languageData);
      sessionStorage.setItem("languages", JSON.stringify(languageData));
    }
  } catch (error) {
    toast.error("Error fetching languages");
  }
};
