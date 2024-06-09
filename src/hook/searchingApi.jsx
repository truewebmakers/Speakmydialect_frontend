import axios from "axios";

export const searchingApi = async (params) => {
  try {
    // Make a GET request to your search API endpoint
    const response = await axios.get(
      "https://webapp.hyperiontech.com.au/speakmydialect/api/translators/search",
      {
        params: params, // Pass the search parameters as query parameters
      }
    );
    // Return the data received from the API response
    console.log(response);
    return response.data.data;
  } catch (error) {
    // Handle any errors that occur during the API request
    console.error("Error fetching search results:", error);
    throw error;
  }
};
