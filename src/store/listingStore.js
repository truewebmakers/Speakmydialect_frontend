import { create } from "zustand";

const listingStore = create((set) => ({
  getDeliveryTime: "",
  getLevel: "",
  getLocation: "",
  getBestSeller: "best-seller",
  getDesginTool: [],
  getSpeak: "",
  getSearch: "",
  getCategory: "",
  getProjectType: [],
  getEnglishLevel: [],
  getJobType: [],
  getNoOfEmployee: [],
  setDeliveryTime: (payload) => set(() => ({ getDeliveryTime: payload })),
  setLevel: (payload) =>
    set((state) => {
      if (payload?.length !== 0) {
        const isExist = state.getLevel.includes(payload);
        if (!isExist) {
          return { getLevel: [...state.getLevel, payload] };
        } else {
          const deleted = state.getLevel.filter((item) => item !== payload);
          return { getLevel: deleted };
        }
      } else {
        return { getLevel: [] };
      }
    }),
  setLocation: (payload) =>
    set((state) => {
      if (payload?.length !== 0) {
        return { getLocation: payload }; // Store the selected location as a single value
      } else {
        return { getLocation: "" }; // Handle case for no selection
      }
    }),
  setBestSeller: (payload) => set(() => ({ getBestSeller: payload })),
  setDesginTool: (payload) =>
    set((state) => {
      if (payload?.length !== 0) {
        const isExist = state.getDesginTool.includes(payload);
        if (!isExist) {
          return { getDesginTool: [...state.getDesginTool, payload] };
        } else {
          const deleted = state.getDesginTool.filter(
            (item) => item !== payload
          );
          return { getDesginTool: deleted };
        }
      } else {
        return { getDesginTool: [] };
      }
    }),
  setSpeak: (payload) =>
    set((state) => {
      if (payload?.length !== 0) {
        return { getSpeak: payload }; // Store the selected language as a string
      } else {
        return { getSpeak: "" }; // Handle case for no selection
      }
    }),
  setSearch: (payload) => set(() => ({ getSearch: payload })),
  setCategory: (payload) =>
    set((state) => {
      if (payload?.length !== 0) {
        return { getCategory: payload }; // Store the selected category as a string
      } else {
        return { getCategory: "" }; // Handle case for no selection
      }
    }),
  setProjectType: (payload) =>
    set((state) => {
      if (payload?.length !== 0) {
        const isExist = state.getProjectType.includes(payload);
        if (!isExist) {
          return {
            getProjectType: [...state.getProjectType, payload],
          };
        } else {
          const deleted = state.getProjectType.filter(
            (item) => item !== payload
          );
          return { getProjectType: deleted };
        }
      } else {
        return { getProjectType: [] };
      }
    }),
  setEnglishLevel: (payload) =>
    set((state) => {
      if (payload?.length !== 0) {
        const isExist = state.getEnglishLevel.includes(payload);
        if (!isExist) {
          return {
            getEnglishLevel: [...state.getEnglishLevel, payload],
          };
        } else {
          const deleted = state.getEnglishLevel.filter(
            (item) => item !== payload
          );
          return { getEnglishLevel: deleted };
        }
      } else {
        return { getEnglishLevel: [] };
      }
    }),
  setJobType: (payload) =>
    set((state) => {
      if (payload?.length !== 0) {
        const isExist = state.getJobType.includes(payload);
        if (!isExist) {
          return {
            getJobType: [...state.getJobType, payload],
          };
        } else {
          const deleted = state.getJobType.filter((item) => item !== payload);
          return { getJobType: deleted };
        }
      } else {
        return { getJobType: [] };
      }
    }),
  setNoOfEmployee: (payload) =>
    set((state) => {
      if (payload?.length !== 0) {
        const isExist = state.getNoOfEmployee.includes(payload);
        if (!isExist) {
          return {
            getNoOfEmployee: [...state.getNoOfEmployee, payload],
          };
        } else {
          const deleted = state.getNoOfEmployee.filter(
            (item) => item !== payload
          );
          return { getNoOfEmployee: deleted };
        }
      } else {
        return { getNoOfEmployee: [] };
      }
    }),
}));

export default listingStore;
