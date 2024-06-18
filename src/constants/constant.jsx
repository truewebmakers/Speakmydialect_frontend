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
  getSearchingSuggestions: "/language/search/suggestion?language=",
  serachingApi: "/translators/search?language=",
  getTranslatorProfile: "/get-profile/",
  addBooking: "/admin/booking/add",
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
  { id: 1, name: "On-site", value: "on-site" },
  { id: 2, name: "Hybrid", value: "hybrid" },
  { id: 3, name: "Remote", value: "remote" },
];

export const paymentMode = [
  { id: 1, name: "Fix Rate", value: "fix" },
  { id: 2, name: "Hourly", value: "hourly" },
];

export const translatorBookingPaymentStatus = [
  { id: 1, name: "Paid", value: "paid" },
  { id: 2, name: "Escrow", value: "escrow" },
  { id: 3, name: "Hold", value: "hold" },
  { id: 4, name: "Dispute", value: "dispute" },
  { id: 5, name: "None", value: "none" },
];

export const translatorBookingWorkStatus = [
  { id: 1, name: "approved", value: "Approved" },
  { id: 2, name: "reject", value: "Reject" },
  { id: 3, name: "disputed", value: "Disputed" },
  { id: 4, name: "pending", value: "Pending" },
];

export const translatorBookingStatus = [
  { id: 1, name: "accept", value: "Accept" },
  { id: 2, name: "reject", value: "Reject" },
  { id: 3, name: "cancel", value: "Cancel" },
  { id: 4, name: "in-process", value: "In-Process" },
];

export const experienceEmploymentType = [
  { id: 1, name: "Full-time" },
  { id: 2, name: "Part-time" },
  { id: 3, name: "Self-employed" },
  { id: 4, name: "Freelance" },
  { id: 5, name: "Internship" },
  { id: 6, name: "Trainee" },
];

export const monthsList = [
  { name: "January", id: 1 },
  { name: "February", id: 2 },
  { name: "March", id: 3 },
  { name: "April", id: 4 },
  { name: "May", id: 5 },
  { name: "June", id: 6 },
  { name: "July", id: 7 },
  { name: "August", id: 8 },
  { name: "September", id: 9 },
  { name: "October", id: 10 },
  { name: "November", id: 11 },
  { name: "December", id: 12 },
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
  TranslatorProfile: "/profile/:id",
  Payouts: "/payouts",
  NotFound: "/not-found",
  Nothing: "*",
  HireNow: "/hire/:id",
};

export const startYearDropdown = 1965;
