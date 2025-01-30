import { apiMethods, apiUrls, dialectData } from "@/constants/constant";
import UseApi from "@/hook/useApi";
import { getProfileDetails } from "@/redux/auth";
import moment from "moment";
import { toast } from "react-toastify";

export const getCountries = async (setCountryList) => {
  try {
    // Fetch the location data from location.json
    const response = await fetch("/location.json");

    if (!response.ok) {
      throw new Error("Network response was not ok");
    }
    const data = await response?.json();

    // Format the array based on the data from location.json
    const formattedArray = data?.map((location, index) => ({
      id: index + 1,
      name: location?.suburb, // Assuming 'name' is a property in your JSON
    }));

    setCountryList(formattedArray);

    // Optionally store in session storage
    sessionStorage.setItem("countries", JSON.stringify(formattedArray));
  } catch (error) {
    toast.error("Error fetching countries: " + error.message);
  }
};

export const getDialects = async (setDialectListing) => {
  try {
    const formattedArray = dialectData;
    // const formattedArray = dialectData?.map((lang, index) => ({
    //   id: index + 1,
    //   dialect: lang,
    // }));
    // const response = await UseApi(apiUrls.getDialects, apiMethods.GET);
    // if (response?.status === 200 || response?.status === 201) {
    //   const dialectData = response?.data?.data;
    setDialectListing(formattedArray);
    sessionStorage.setItem("dialect", JSON.stringify(formattedArray));
    // }
  } catch (error) {
    toast.error("Error fetching languages");
  }
};

export const getSelectedDialect = async (setDialectListing, id) => {
  try {
    const response = await UseApi(apiUrls.getDialects + id, apiMethods.GET);
    if (response?.status === 200 || response?.status === 201) {
      const dialectData = response?.data?.data;
      const formattedArray = dialectData?.map((lang, index) => ({
        id: index + 1,
        name: lang?.dialect,
      }));

      setDialectListing(formattedArray);
    }
  } catch (error) {
    toast.error("Error fetching Dialects");
  }
};

export const getLanguages = async (setLanguageListing) => {
  try {
    const response = await UseApi(apiUrls.getLanguages, apiMethods.GET);
    if (response?.status === 200 || response?.status === 201) {
      const languageData = response?.data?.data;
      const formattedArray = languageData?.map((lang, index) => ({
        id: lang?.id,
        name: lang?.name,
      }));
      setLanguageListing(formattedArray);
      sessionStorage.setItem("languages", JSON.stringify(formattedArray));
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
  return language ? language.name : null;
};

export const getProfileData = async (id, token) => {
  try {
    const headers = { Authorization: `Bearer ${token}` };
    const response = await UseApi(
      apiUrls.getUserProfile + id,
      apiMethods.GET,
      null,
      headers
    );
    if (response?.status === 200 || response?.status === 201) {
      return response?.data?.user;
    }
  } catch (error) {
    return toast.error("Error fetching profile data");
  }
};

export const calculatePayment = (presentRate = 0, slots, duration) => {
  const feePercentage = 0.035;
  const fixedFee = 0.3;

  // Calculate time difference in hours'
  const hoursDuration = duration / 60;
  const hoursDiff = slots?.length * hoursDuration;

  // Calculate amount to receive
  const amountToReceive = presentRate * hoursDiff;

  // Calculate total amount based on hourly rate
  const totalAmount = (amountToReceive + fixedFee) / (1 - feePercentage);
  return {
    amountToReceive: amountToReceive.toFixed(2),
    totalAmount: totalAmount.toFixed(2),
    hours: hoursDiff,
  };
};

export const formatTo12Hour = (time) => {
  if (!time) return "";
  const [hours, minutes] = time.split(":");
  const period = +hours >= 12 ? "PM" : "AM";
  const adjustedHours = +hours % 12 || 12; // Convert 0 to 12 for 12 AM
  return `${adjustedHours}:${minutes} ${period}`;
};
