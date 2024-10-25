export const apiMethods = {
  GET: "get",
  POST: "post",
  PUT: "put",
  DELETE: "delete",
};

export const fixRate = 77;
export const pageLimit = 2;

export const env = {
  API_URL: import.meta.env.VITE_APP_API_URL,
};

export const apiUrls = {
  signup: "/signup",
  login: "/login",
  uploadDoc: "/upload/temp-documents",
  logout: "/admin/logout",
  updateProfile: "/admin/update/",
  getCountries: "/get-countries",
  getUserProfile: "/admin/getProfile/",
  getLanguages: "/get-languages",
  getDialects: "/get/skillsall/dialect",
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
  getTranslatorAllJobs: "/admin/booking/get/translator/",
  getClientOrders: "/admin/booking/get/client/",
  changeTranslatorBookingStatus: "/admin/booking/update/translator/",
  changeClientBookingStatus: "/admin/booking/update/client/",
  adminGetUserApprovals: "/admin/users/get/list",
  adminDashboardCards: "/admin/user/get/dashboard/count?id=",
  adminApproveUsers: "/admin/user/update/status/",
  adminGetPayoutsListing: "/admin/user/get/approved/bookings",
  adminChangePaymentStatus: "/admin/user/status/approved/bookings/",
  getUserDocuments: "/admin/user/get/docuemnts/",
  getInvoiceListing: "/admin/payout/invoices/",
  payNow: "/admin/payout/charge",
  addBankDetails: "/admin/translator/bank/store",
  getBankDetails: "/admin/translator/get/bank/",
  updateBankDetails: "/admin/translator/bank/update/",
  deleteUserApprovals: "/admin/user/delete/",
  contactUsSendEmail: "/send-email",
  getContactInquiries: "/admin/get-contactform-entries",
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

export const jobAvailaibiltyType = [
  { id: 1, name: "Phone", value: "phone" },
  { id: 2, name: "Video Call", value: "video-call" },
  { id: 3, name: "In-Person", value: "in-person" },
];

export const paymentMode = [
  { id: 1, name: "Fix Rate", value: "fix" },
  // { id: 2, name: "Hourly", value: "hourly" },
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
  Register: "/register",
  TranslatorRegister: "/register-translator",
  ClientRegister: "/register-client",
  Terms: "/terms",
  Privacy: "/privacy",
  Contact: "/contact",
  Help: "/help",
  About: "/about",
  Blog: "/blog-1",
  Faq: "/faq",
  Dashboard: "/dashboard",
  Jobs: "/jobs",
  Cards: "/cards",
  Bookings: "/bookings",
  Invoice: "/invoice",
  Search: "/search",
  TranslatorProfile: "/profile/:id",
  Payouts: "/payouts",
  NotFound: "/not-found",
  Nothing: "*",
  HireNow: "/hire/:id",
  UserApprovals: "/admin/userApprovals",
  contactInquiry: "/admin/contactInquiry",
  PayoutManagement: "/admin/payoutManagement",
  PayNow: "/pay",
};

export const startYearDropdown = 1965;

export const translatorBookingTab = [
  { id: 0, name: "New", status: "in-process", type: "new_booking" }, //pending jobs
  {
    id: 1,
    name: "Current",
    status: "accept", //today's date
    type: "today_booking",
  },
  {
    id: 2,
    name: "Upcoming",
    status: "accept", //>date jobs which are aligned for future
    type: "upcoming_booking",
  },
  {
    id: 3,
    name: "Completed",
    status: "mark-completed", // job completed by translator not yet approved by client
    type: "completed_booking",
  },
  {
    id: 4,
    name: "Approved",
    status: "approved", // job completed by translator & approved by client
    type: "approved_booking",
  },
  {
    id: 5,
    name: "Canceled",
    status: "cancel", // job canceled by client
    type: "canceled_booking", //not required
  },
  {
    id: 6,
    name: "Rejected",
    status: "reject", // translator reject the job
    type: "rejected_booking", //not required
  },
];

export const ordersManagementTab = [
  {
    id: 0,
    name: "Upcoming",
    status: "in-process",
    type: "upcoming_booking",
  }, // pending or accepted from translator +future date,
  {
    id: 1,
    name: "Current",
    status: "accept",
    type: "current_booking",
  }, //accepted from from translator + today's date
  {
    id: 2,
    name: "Completed",
    status: "mark-completed",
    type: "completed_booking",
  }, //  client can approve & user as well
  {
    id: 3,
    name: "Approved",
    status: "approved",
    type: "approved_booking",
  }, //  approved by client  & user as well
  {
    id: 4,
    name: "Canceled",
    status: "cancel",
    type: "canceled_booking",
  }, // rejected by client
  {
    id: 5,
    name: "Rejected",
    status: "reject", // translator reject the job
    type: "rejected_booking", //not required
  },
];

export const australianStatesAndCities = [
  "New South Wales",
  "Sydney",
  "Newcastle",
  "Wollongong",
  "Central Coast",
  "Maitland",
  "Coffs Harbour",
  "Port Stephens",
  "Tamworth",
  "Wagga Wagga",
  "Dubbo",
  "Gosford",
  "Lismore",
  "Mudgee",
  "Nowra",
  "Armidale",
  "Bathurst",
  "Bellingen",
  "Kempsey",
  "Queanbeyan",
  "Victoria",
  "Melbourne",
  "Geelong",
  "Ballarat",
  "Bendigo",
  "Shepparton",
  "Warrnambool",
  "Mildura",
  "Frankston",
  "Latrobe Valley",
  "Torquay",
  "Dandenong",
  "Sunbury",
  "Wodonga",
  "Maroondah",
  "Melton",
  "Bayside",
  "Hobsons Bay",
  "Queensland",
  "Brisbane",
  "Gold Coast",
  "Cairns",
  "Townsville",
  "Sunshine Coast",
  "Toowoomba",
  "Mackay",
  "Rockhampton",
  "Gladstone",
  "Bundaberg",
  "Ipswich",
  "Maryborough",
  "Redcliffe",
  "Caloundra",
  "Logan City",
  "Gympie",
  "Hervey Bay",
  "Western Australia",
  "Perth",
  "Bunbury",
  "Mandurah",
  "Kalgoorlie",
  "Albany",
  "Geraldton",
  "Broome",
  "Karratha",
  "Port Hedland",
  "Esperance",
  "Armadale",
  "Bayswater",
  "Cannington",
  "Rockingham",
  "Midland",
  "Scarborough",
  "South Australia",
  "Adelaide",
  "Mount Gambier",
  "Whyalla",
  "Port Lincoln",
  "Port Augusta",
  "Gawler",
  "Murray Bridge",
  "Victor Harbor",
  "Berri",
  "Loxton",
  "Mount Barker",
  "Kingscote",
  "Renmark",
  "Port Noarlunga",
  "Tasmania",
  "Hobart",
  "Launceston",
  "Devonport",
  "Burnie",
  "Kingston",
  "Bicheno",
  "Sorell",
  "Westbury",
  "Queenstown",
  "George Town",
  "Glenorchy",
  "Smithton",
  "Australian Capital Territory",
  "Canberra",
  "Queanbeyan",
  "Gungahlin",
  "Belconnen",
  "Woden Valley",
  "Tuggeranong",
  "Inner South",
  "Narrabundah",
  "Kambah",
  "Hughes",
  "Northern Territory",
  "Darwin",
  "Alice Springs",
  "Katherine",
  "Palmerston",
  "Nhulunbuy",
  "Tennant Creek",
  "Yulara",
  "East Arnhem",
  "Gove",
];
