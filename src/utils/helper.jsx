export const CapitalizeFirstLetter = (str) => {
  let newStr = "";
  if (str?.length && typeof str === "string") {
    newStr = str.charAt(0).toUpperCase() + str.slice(1);
  }
  return newStr;
};
