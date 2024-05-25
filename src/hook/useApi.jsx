import { apiMethods, env } from "@/constants/constant";
import axios from "axios";

const UseApi = async (url, method, body) => {
  try {
    const result = await axios({
      method: method || apiMethods.GET,
      url: env.API_URL + url,
      data: body || undefined,
    });
    return result;
  } catch (error) {
    return error?.response || error;
  }
};

export default UseApi;
