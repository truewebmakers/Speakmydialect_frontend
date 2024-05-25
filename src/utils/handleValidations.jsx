let emailRegex = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/;
let passwordRegex = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/;

export const handleValidations = (name, value) => {
  let newErr = {};
  switch (name) {
    case "firstName":
      if (value === "") {
        newErr[name] = "Enter your first name";
        break;
      } else if (value?.length < 2) {
        newErr[name] = "First name is too short";
        break;
      } else {
        newErr[name] = "";
        break;
      }
    case "lastName":
      if (value === "") {
        newErr[name] = "Enter your second name";
        break;
      } else if (value?.length < 2) {
        newErr[name] = "Last name is too short";
        break;
      } else {
        newErr[name] = "";
        break;
      }
    case "userName":
      if (value === "") {
        newErr[name] = "Enter your username";
        break;
      } else if (value?.length < 5) {
        newErr[name] = "Username should be atleast 5 character long";
        break;
      } else {
        newErr[name] = "";
        break;
      }
    case "email":
      if (value === "") {
        newErr[name] = "Enter valid email";
        break;
      } else if (!emailRegex.test(value)) {
        newErr[name] = "Invalid Email";
        break;
      } else {
        newErr[name] = "";
        break;
      }
    case "password":
      if (value === "") {
        newErr[name] = "Enter password";
        break;
      } else if (!passwordRegex.test(value)) {
        newErr[name] = "Weak Password";
        break;
      } else {
        newErr[name] = "";
        break;
      }
    default:
      break;
  }
  return newErr;
};
