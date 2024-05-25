/*eslint-disable*/
import { createRef } from "react";
let timer = createRef();
let counter = 0;

class Toaster {
  success(message, title) {
    toast.success(message, title || "Success", 3000);
  }

  warning = (title = "Warning", message) => {
    if (!counter) {
      counter = 1;
      toast.warning(message, title || "Warning", 3000);
      timer = setTimeout(() => {
        counter = 0;
      }, 3000);
    }
  };
  error(message, title) {
    toast.error(message, title || "Error", 3000);
  }
  info(message, title, cb = () => {}) {
    toast.info(message, title || "Info", 3000, cb);
  }
}

export const toast = new Toaster();
