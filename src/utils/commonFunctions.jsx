import { apiMethods, apiUrls } from "@/constants/constant";
import UseApi from "@/hook/useApi";
import { getProfileDetails } from "@/redux/auth";
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

// get country and languages from session storage based on ids
export const getCountryName = (countryId, countryList) => {
  const country = countryList.find((coun) => coun.id == countryId);
  return country ? country.name : "Unknown Country";
};

export const getLanguageName = (languageId, languageList) => {
  const language = languageList.find((coun) => coun.id == languageId);
  return language ? language.name : "Unknown Language";
};
