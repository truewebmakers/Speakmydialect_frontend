export const apiMethods = {
  GET: "get",
  POST: "post",
  PUT: "put",
  DELETE: "delete",
};

export const env = {
  API_URL: import.meta.env.VITE_APP_API_URL,
};

export const apiUrls = {
  signup: "/signup",
  login: "/login",
  logout: "/admin/logout",
  updateProfile: "/admin/update/",
  getCountries: "/get-countries",
  getUserProfile: "/admin/getProfile/",
  getLanguages: "/get-languages",
  getSkills: "/admin/get/skills/",
  deleteSkills: "/admin/delete/skills/",
  updateUserSkill: "/admin/update/skills/",
  addEducation: "/admin/education/add/",
  getEducation: "/admin/education/get/",
  deleteEducation: "/admin/education/delete/",
  editEducation: "/admin/education/update/",
  addExperience: "/admin/experience/add/",
  getExperience: "/admin/experience/get/",
  deleteExpirence: "/admin/experience/delete/",
  editExperience: "/admin/experience/update/",
  changePassword: "/admin/update/password/",
};

export const metaData = {
  title: "SpeakMyDialect - Local / Global interpreters",
};
export const skillStatus = [
  { id: 1, name: "Active" },
  { id: 2, name: "Inactive" },
];
export const skillLevel = [
  { id: 1, name: "Basic" },
  { id: 2, name: "Bilingual" },
  { id: 3, name: "Fluent" },
  { id: 4, name: "Native" },
];

export const experienceLocationType = [
  { id: 1, name: "On-site" },
  { id: 2, name: "Hybrid" },
  { id: 3, name: "Remote" },
];

export const experienceEmploymentType = [
  { id: 1, name: "Full-time" },
  { id: 2, name: "Part-time" },
  { id: 3, name: "Self-employed" },
  { id: 4, name: "Freelance" },
  { id: 5, name: "Internship" },
  { id: 6, name: "Trainee" },
];

export const routes = {
  Home: "/",
  Login: "/login",
  MyProfile: "/my-profile",
  TranslatorRegister: "/register-translator",
  ClientRegister: "/register-client",
  Terms: "/terms",
  Contact: "/contact",
  Help: "/help",
  About: "/about-2",
  Blog: "/blog-1",
  Faq: "/faq",
  Dashboard: "/dashboard",
  Jobs: "/jobs",
  Cards: "/cards",
  Orders: "/orders",
  Search: "/search",
  Payouts: "/payouts",
  NotFound: "/not-found",
  Nothing: "*",
};
