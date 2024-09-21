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

// paymentUtils.js
import moment from "moment";

export const calculatePayment = (presentRate = 0, startDate, endDate) => {
  const feePercentage = 0.035;
  const fixedFee = 0.3;

  // Calculate time difference in hours
  const startMoment = moment(startDate);
  const endMoment = moment(endDate);
  const hoursDiff =
    endMoment.diff(startMoment, "hours") +
    (endMoment.diff(startMoment, "minutes") % 60) / 60;

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
