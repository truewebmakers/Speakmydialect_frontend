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
        newErr[name] =
          "Your password must be at least 8 characters long including a lowercase letter, an uppercase letter,a number and a special symbol";
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

export const passwordValidations = (name, value) => {
  let newErr = {};
  switch (name) {
    case "oldPassword":
      if (value === "") {
        newErr[name] = "Enter password";
        break;
      } else if (!passwordRegex.test(value)) {
        newErr[name] =
          "Your password must be at least 8 characters long including a lowercase letter, an uppercase letter,a number and a special symbol";
        break;
      } else {
        newErr[name] = "";
        break;
      }
    case "newPassword":
      if (value === "") {
        newErr[name] = "Enter password";
        break;
      } else if (!passwordRegex.test(value)) {
        newErr[name] =
          "Your password must be at least 8 characters long including a lowercase letter, an uppercase letter,a number and a special symbol";
        break;
      } else {
        newErr[name] = "";
        break;
      }
    case "confirmPassword":
      if (value === "") {
        newErr[name] = "Enter password";
        break;
      } else if (!passwordRegex.test(value)) {
        newErr[name] =
          "Your password must be at least 8 characters long including a lowercase letter, an uppercase letter,a number and a special symbol";
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

export const validateBookingForm = (hireNowForm) => {
  const errors = {};

  // Validate payment type
  // switch (true) {
  //   case !hireNowForm?.payment_type?.value:
  //     errors.payment_type = "Payment type is required";
  //     break;
  //   case typeof hireNowForm?.payment_type?.value !== "string" ||
  //     hireNowForm?.payment_type?.value.trim() === "":
  //     errors.payment_type = "Invalid payment type";
  //     break;
  //   default:
  //     break;
  // }

  // Validate availability
  switch (true) {
    case !hireNowForm?.availability?.value:
      errors.availability = "Availability is required";
      break;
    case typeof hireNowForm?.availability?.value !== "string" ||
      hireNowForm?.availability?.value.trim() === "":
      errors.availability = "Invalid availability";
      break;
    default:
      break;
  }

  // Validate start date and time
  const startDate = new Date(hireNowForm?.start_at);
  switch (true) {
    case !hireNowForm?.start_at:
      errors.start_at = "Start date and time are required";
      break;
    case isNaN(startDate.getTime()) || startDate <= new Date():
      errors.start_at = "Start date and time must be after today";
      break;
    default:
      break;
  }

  // Validate end date and time
  const endDate = new Date(hireNowForm?.end_at);
  switch (true) {
    case !hireNowForm?.end_at:
      errors.end_at = "End date and time are required";
      break;
    case isNaN(endDate.getTime()) || endDate <= new Date():
      errors.end_at = "End date and time must be after today";
      break;
    case endDate <= startDate:
      errors.end_at = "End date and time must be after start date and time";
      break;
    default:
      break;
  }

  // Validate job title
  switch (true) {
    case !hireNowForm?.job_title:
      errors.job_title = "Job title is required";
      break;
    case typeof hireNowForm?.job_title !== "string" ||
      hireNowForm?.job_title.trim() === "":
      errors.job_title = "Invalid job title";
      break;
    default:
      break;
  }

  return errors;
};
