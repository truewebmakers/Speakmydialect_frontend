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

export const formatDateTime = (dateStr) => {
  const date = new Date(dateStr);
  const day = String(date.getDate()).padStart(2, '0');
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const year = date.getFullYear();
  let hours = date.getHours();
  const minutes = String(date.getMinutes()).padStart(2, '0');
  const ampm = hours >= 12 ? 'PM' : 'AM';

  // Convert to 12-hour format
  hours = hours % 12;
  hours = hours ? hours : 12; // Hour '0' should be '12'

  return `${day}-${month}-${year} ${hours}:${minutes} ${ampm}`;
};



export const calculatePayment = (presentRate = 0, slots) => {
  const feePercentage = 0.035;
  const fixedFee = 0.3;
    console.log("slots in s",slots)
  // Initialize total duration in minutes
  let totalDuration = 0;

  // Loop through each slot and calculate the time difference between start_at and end_at
  slots?.forEach(slot => {

    console.log("slot",slot)
    const startTime = new Date(slot.start_at);
    const endTime = new Date(slot.end_at);

    // Calculate the duration in minutes for each slot
    const duration = (endTime - startTime) / (1000 * 60); // in minutes
    totalDuration += duration;
  });

  // Calculate total duration in hours (rounded)
  const hoursDiff = totalDuration / 60;

  // Calculate amount to receive
  const amountToReceive = presentRate * hoursDiff;

  // Calculate total amount based on hourly rate
  const totalAmount = (amountToReceive + fixedFee) / (1 - feePercentage);

  return {
    amountToReceive: amountToReceive.toFixed(2),
    totalAmount: totalAmount.toFixed(2),
    hours: hoursDiff.toFixed(2),
  };
};

export const calculatePaymentForPaymentForm = (presentRate = 0, slots) => {
  const feePercentage = 0.035;
  const fixedFee = 0.3;
  console.log("slots in s", slots);
  
  // Initialize total duration in minutes
  let totalDuration = 0;

  // Get today's date in YYYY-MM-DD format
  const currentDate = new Date();
  const formattedDate = currentDate.toISOString().split('T')[0]; // Extract date (YYYY-MM-DD)
  
  // Function to format the time in "YYYY-MM-DD HH:MM:SS"
  const formatDateTime = (time) => {
    const timeParts = time.split(':');
    const hours = timeParts[0].padStart(2, '0'); // Ensure hours are 2 digits
    const minutes = timeParts[1].padStart(2, '0'); // Ensure minutes are 2 digits
    return `${formattedDate} ${hours}:${minutes}:00`; // Adding ":00" for seconds
  };

  // Loop through each slot and calculate the time difference between start_at and end_at
  slots?.forEach(slot => {
    // Combine date and time for start_time and end_time
    const startTimeString = formatDateTime(slot.start_time);
    const endTimeString = formatDateTime(slot.end_time);

    const startTime = new Date(startTimeString);
    const endTime = new Date(endTimeString);

    // If the end time is earlier than the start time, assume it is on the next day
    if (endTime <= startTime) {
      endTime.setDate(endTime.getDate() + 1); // Add one day to the end time
    }

    console.log("startTime:", startTime, "endTime:", endTime);

    // Calculate the duration in minutes for each slot
    const duration = (endTime - startTime) / (1000 * 60); // in minutes
    totalDuration += duration;
  });

  // Calculate total duration in hours (rounded)
  const hoursDiff = totalDuration / 60;

  // Calculate amount to receive
  const amountToReceive = presentRate * hoursDiff;

  // Calculate total amount based on hourly rate
  const totalAmount = (amountToReceive + fixedFee) / (1 - feePercentage);

  return {
    amountToReceive: amountToReceive.toFixed(2),
    totalAmount: totalAmount.toFixed(2),
    hours: hoursDiff.toFixed(2),
  };
};

 

// export const calculatePayment = (presentRate = 0, slots, duration) => {
//   const feePercentage = 0.035;
//   const fixedFee = 0.3;

//   // Calculate time difference in hours'
//   const hoursDuration = duration / 60;
//   const hoursDiff = slots?.length * hoursDuration;

//   // Calculate amount to receive
//   const amountToReceive = presentRate * hoursDiff;

//   // Calculate total amount based on hourly rate
//   const totalAmount = (amountToReceive + fixedFee) / (1 - feePercentage);
//   return {
//     amountToReceive: amountToReceive.toFixed(2),
//     totalAmount: totalAmount.toFixed(2),
//     hours: hoursDiff,
//   };
// };

export const formatTo12Hour = (time) => {
  if (!time) return "";
  const [hours, minutes] = time.split(":");
  const period = +hours >= 12 ? "PM" : "AM";
  const adjustedHours = +hours % 12 || 12; // Convert 0 to 12 for 12 AM
  return `${adjustedHours}:${minutes} ${period}`;
};
