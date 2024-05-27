export const apiMethods = {
  GET: "get",
  POST: "post",
  PUT: "put",
};

export const env = {
  API_URL: import.meta.env.VITE_APP_API_URL,
};

export const apiUrls = {
  signup: "/signup",
  login: "/login",
  updateProfile: "/admin/update/",
  getCountries: "/get-countries",
};
