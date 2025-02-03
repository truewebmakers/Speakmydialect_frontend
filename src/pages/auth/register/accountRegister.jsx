// AccountCreationForm.js
import { useState, useEffect } from "react";
import Loader from "@/components/common/loader";
import { handleValidations } from "@/utils/handleValidations";

const AccountCreationForm = ({
  setStep,
  data,
  setData,
  error,
  setError,
  isOtpVerified,
  setIsOtpVerified,
  isSendOtpLoading,
  handleSendOtp,
  handleVerifyOtp,
  isEmailAvailable,
}) => {
  const [countryList, setCountryList] = useState([]);
  const [isOtpSent, setIsOtpSent] = useState(false);

  const handleChange = (e) => {
    const { value, name } = e.target;
    setData({ ...data, [name]: value });
    const newErr = handleValidations(name, value);
    setError((prevError) => ({ ...prevError, ...newErr }));
  };

  const getCountryCode = () => {
    const CountryList = require("country-list-with-dial-code-and-flag");
    const country = CountryList.getAll();
    setCountryList(country);
  };

  useEffect(() => {
    getCountryCode();
  }, []);

  const hasErrors = (error) => Object.values(error).some((err) => err);
  const areAllFieldsFilled = (data) =>
    Object.values(data).every((field) => field);

  const handleNext = () => {
    let newErr = {};
    for (let key in data) {
      newErr = { ...newErr, ...handleValidations(key, data[key]) };
    }
    setError(newErr);
    if (
      !hasErrors(newErr) &&
      areAllFieldsFilled(data) &&
      isOtpVerified?.length
    ) {
      setStep(2);
    }
  };

  return (
    <div>
      <h4>Let's create your account!</h4>
      <div className="mb25">
        <label className="form-label fw500 dark-color">First Name</label>
        <input
          type="text"
          className="form-control"
          placeholder="Enter your first name"
          name="firstName"
          value={data.firstName}
          onChange={handleChange}
        />
        {error.firstName && <p style={{ color: "red" }}>{error.firstName}</p>}
      </div>

      {/* Other form fields for Last Name, Email, Password, etc. */}

      <div className="mb25 otpFrm">
        <label className="form-label fw500 dark-color">Phone Number</label>
        <div className="d-flex">
          <select
            name="countryCode"
            className="form-control"
            value={data?.countryCode}
            onChange={handleChange}
            style={{ width: "40%" }}
          >
            {countryList?.map((country, index) => (
              <option key={index} value={country?.dial_code}>
                {country?.dial_code} ({country?.name})
              </option>
            ))}
          </select>
          <input
            type="text"
            className="form-control"
            placeholder="Enter your phone number"
            name="phoneNumber"
            value={data?.phoneNumber}
            onChange={handleChange}
            maxLength="10"
            style={{ width: "349px" }}
          />
          <button
            type="button"
            className="ud-btn btn-thm default-box-shadow2 SendOTPBtn"
            onClick={(e) => handleSendOtp(e)}
            disabled={data?.phoneNumber?.length !== 10}
          >
            {isSendOtpLoading ? <Loader /> : "Send OTP"}
          </button>
        </div>
      </div>

      {isOtpSent && !isOtpVerified?.length && (
        <div className="mb15">
          <label className="form-label fw500 dark-color">OTP</label>
          <input
            type="text"
            className="form-control"
            placeholder="Enter OTP"
            name="otp"
            value={data?.otp}
            onChange={handleChange}
          />
          <button
            type="button"
            className="ud-btn btn-thm default-box-shadow2"
            onClick={(e) => handleVerifyOtp(e)}
            disabled={!data?.otp?.length}
          >
            {isSendOtpLoading ? <Loader /> : "Verify OTP"}
          </button>
        </div>
      )}

      {isOtpVerified?.length && (
        <p className="text-success">Your phone number has been verified!</p>
      )}

      <div className="d-grid mb20">
        <button
          className="ud-btn btn-thm default-box-shadow2"
          type="button"
          onClick={handleNext}
          disabled={
            hasErrors(error) || !isOtpVerified?.length || !isEmailAvailable
          }
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default AccountCreationForm;
