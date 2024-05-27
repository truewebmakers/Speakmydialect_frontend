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
  getUserProfile: "/admin/getProfile/",
  getLanguages: "/get-languages",
  updateUserSkill: "/admin/update/skills/",
};

export const skillStatus = [
  { id: 1, name: "Active" },
  { id: 2, name: "Inactive" },
];
export const skillLevel = [
  { id: 1, name: "basic" },
  { id: 2, name: "bilingual" },
  { id: 3, name: "fluent" },
  { id: 4, name: "native" },
];
