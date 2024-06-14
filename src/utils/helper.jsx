export const CapitalizeFirstLetter = (str) => {
  let newStr = "";
  if (str?.length && typeof str === "string") {
    newStr = str.charAt(0).toUpperCase() + str.slice(1);
  }
  return newStr;
};

export function formatDate(value) {
  const dateInput = value;
  if (dateInput) {
    const date = new Date(dateInput);
    const options = { day: "2-digit", month: "short", year: "numeric" };
    const formattedDate = date.toLocaleDateString("en-GB", options);
    return formattedDate;
  }
}
