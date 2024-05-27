import { apiMethods, env } from "@/constants/constant";
import axios from "axios";

const defaultHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Methods": "GET,PUT,POST,DELETE,PATCH,OPTIONS",
};

const UseApi = async (url, method, body, additionalHeaders) => {
  try {
    const headers = additionalHeaders
      ? { ...defaultHeaders, ...additionalHeaders } // Merge default and additional headers if additionalHeaders is provided
      : { ...defaultHeaders }; // Use only default headers if additionalHeaders is not provided
    const result = await axios({
      method: method || apiMethods.GET,
      url: env.API_URL + url,
      data: body || undefined,
      headers,
    });
    return result;
  } catch (error) {
    return error?.response || error;
  }
};

export default UseApi;
