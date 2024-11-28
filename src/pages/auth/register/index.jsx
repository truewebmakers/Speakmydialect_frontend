import { Link, useLocation, useNavigate } from "react-router-dom";
import MetaComponent from "@/components/common/MetaComponent";
import { useEffect, useState } from "react";
import { handleValidations } from "@/utils/handleValidations";
import UseApi from "@/hook/useApi";
import { apiMethods, apiUrls, metaData } from "@/constants/constant";
import { toast } from "react-toastify";
import Loader from "@/components/common/loader";
import CountryList from "country-list-with-dial-code-and-flag";

export default function RegisterPage() {
  const [step, setStep] = useState(1);
  const [data, setData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    phoneNumber: "",
    otp: "",
    countryCode: "+61", // Default country code set to Australia
  });
  const [disable, setDisable] = useState(false);
  const [error, setError] = useState({});
  const [fileUpload, setFileUpload] = useState({
    supportingDocs: null,
    primaryId: null,
    secondaryId: null,
    policeCheck: null,
    wwcCheck: null,
  });
  const [uploadedFiles, setUploadedFiles] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const { pathname } = useLocation();
  const [countryList, setCountryList] = useState([]);
  const [isOtpSent, setIsOtpSent] = useState(false); // Track OTP sent status
  const [isOtpVerified, setIsOtpVerified] = useState(""); // Track OTP verification status
  const [isSendOtpLoading, setIsSendOtpLoading] = useState(false);
  const [isVerifyOtpLoading, setIsVerifyOtpLoading] = useState(false);
  const [isEmailAvailable, setIsEmailAvailable] = useState(true); // Default to true, meaning available

  const handleChange = (e) => {
    const { value, name } = e.target;
    setData({ ...data, [name]: value });
    if (disable) {
      const newErr = handleValidations(name, value);
      setError((prevError) => ({ ...prevError, ...newErr }));
    }
  };

  const handleEmailBlur = async () => {
    const { email } = data;

    if (email) {
      try {
        // Call the API to check if email is already taken
        const response = await UseApi(
          apiUrls.checkEmail,
          apiMethods.POST,
          { email },
          null
        );
        if (response?.status === 200 && response?.data?.exists == false) {
          setIsEmailAvailable(true); // Email is available
          setError((prev) => ({ ...prev, email: "" })); // Clear email error
        } else {
          setIsEmailAvailable(false); // Email is not available
          setError((prev) => ({
            ...prev,
            email: "This email is already taken. Please use a different one.",
          }));
        }
      } catch (err) {
        setIsEmailAvailable(false);
        setError((prev) => ({
          ...prev,
          email: "An error occurred while checking email availability.",
        }));
      }
    }
  };

  const handlePhoneChange = (e) => {
    const { value } = e.target;
    if (value.length <= 10 && /^[0-9]*$/.test(value)) {
      setData({ ...data, phoneNumber: value });
    }
  };

  const hasErrors = (error) => Object.values(error).some((err) => err);

  const areAllFieldsFilled = (data) =>
    Object.values(data).every((field) => field);

  useEffect(() => {
    if (hasErrors(error)) {
      setDisable(true);
      return;
    }
    setDisable(false);
  }, [error]);

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

  const handleSubmit = async () => {
    // Ensure that primaryId, secondaryId, and policeCheck are uploaded
    const requiredFiles = ["primary_id", "secondary_id", "police_check"];
    const allRequiredUploaded = requiredFiles?.every((file) =>
      uploadedFiles?.some((uploadedFile) => uploadedFile?.type === file)
    );

    if (!allRequiredUploaded) {
      toast.error(
        "Please upload all required files: Primary ID, Secondary ID, and Police Check."
      );
      return;
    }

    setIsLoading(true);
    try {
      const route = pathname.split("-");
      const bodyData = {
        fname: data?.firstName,
        lname: data?.lastName,
        email: data?.email,
        password: data?.password,
        user_type: route[1],
        files: uploadedFiles,
        phone_number: data?.phoneNumber,
        country_code: data?.countryCode,
        otp_verified_at: isOtpVerified,
      };

      const response = await UseApi(apiUrls.signup, apiMethods.POST, bodyData);
      if (response?.status === 201 || response?.status === 200) {
        toast.success(response?.data?.message);
        navigate("/login");
      } else {
        toast.error(response?.data?.message);
      }
    } catch (err) {
      toast.error(err?.message);
    } finally {
      setIsLoading(false);
    }
  };

  const handleFileUpload = async (e, fileType) => {
    const { name, files } = e.target;
    const file = files[0];
    setFileUpload((prevState) => ({ ...prevState, [name]: file }));

    try {
      const headers = { "Content-Type": "multipart/form-data" };
      const bodyData = { file, type: fileType, side: "front" };
      const response = await UseApi(
        apiUrls.uploadDoc,
        apiMethods.POST,
        bodyData,
        headers
      );
      if (response?.status === 201 || response?.status === 200) {
        const newFileData = {
          path: response.data.path,
          type: fileType,
          side: "front",
        };
        setUploadedFiles((prev) => {
          const existingIndex = prev?.findIndex(
            (file) => file?.type === fileType
          );
          if (existingIndex !== -1) {
            const newFiles = [...prev];
            newFiles[existingIndex] = newFileData;
            return newFiles;
          } else {
            return [...prev, newFileData];
          }
        });
      } else {
        toast.error(response.data.message);
      }
    } catch (err) {
      toast.error(err.message);
    }
  };

  const getCountryCode = () => {
    const country = CountryList.getAll();
    setCountryList(country);
  };

  useEffect(() => {
    getCountryCode();
  }, []);

  const handleSendOtp = async (e) => {
    e.preventDefault();
    if (data?.phoneNumber?.length === 10) {
      try {
        setIsSendOtpLoading(true);
        const bodyData = {
          country_code: data?.countryCode,
          phone_number: data?.phoneNumber,
        };
        const response = await UseApi(
          apiUrls.sendOtp,
          apiMethods.POST,
          bodyData,
          null
        );
        if (response?.status == 200 || response?.status == 201) {
          setIsOtpSent(true);
          toast.success(response?.data?.message);
        } else {
          toast.error(response?.data?.message);
        }
      } catch (err) {
        toast.error(err?.message);
      } finally {
        setIsSendOtpLoading(false);
      }
    } else {
      toast.error("Phone number should be 10 digits.");
    }
  };

  const handleVerifyOtp = async (e) => {
    e.preventDefault();

    try {
      setIsVerifyOtpLoading(true);
      const bodyData = {
        otp: data?.otp,
        phone_number: data?.phoneNumber,
      };
      const response = await UseApi(
        apiUrls.verifyOtp,
        apiMethods.POST,
        bodyData,
        null
      );

      if (response?.status === 200 || response?.status === 201) {
        toast.success(response?.data?.message);
        setIsOtpVerified(response?.data?.verified_at); // Set OTP as verified
      } else {
        toast.error(response?.data?.message || "OTP verification failed.");
      }
    } catch (err) {
      toast.error(err?.message || "An error occurred while verifying OTP.");
    } finally {
      setIsVerifyOtpLoading(false);
    }
  };

  return (
    <>
      <MetaComponent meta={metaData} />
      <section className="our-register">
        <div className="container">
          <div className="row">
            <div
              className="col-lg-6 m-auto wow fadeInUp"
              data-wow-delay="300ms"
            >
              <div className="main-title text-center">
                <h2 className="title">Register</h2>
              </div>
            </div>
          </div>
          <div className="row wow fadeInRight" data-wow-delay="300ms">
            <div className="col-xl-6 mx-auto">
              <div className="log-reg-form search-modal form-style1 bgc-white p50 p30-sm default-box-shadow1 bdrs12">
                {step === 1 ? (
                  <div>
                    <h4>Let's create your account!</h4>
                    <p className="text mt20">
                      Already have an account?{" "}
                      <Link to="/login" className="text-thm">
                        Log In!
                      </Link>
                    </p>
                    <div className="mb25">
                      <label className="form-label fw500 dark-color">
                        First Name
                      </label>
                      <input
                        type="text"
                        className="form-control"
                        placeholder="Enter your first name"
                        name="firstName"
                        value={data.firstName}
                        onChange={handleChange}
                      />
                      {error.firstName && (
                        <p style={{ color: "red" }}>{error.firstName}</p>
                      )}
                    </div>
                    <div className="mb25">
                      <label className="form-label fw500 dark-color">
                        Last Name
                      </label>
                      <input
                        type="text"
                        className="form-control"
                        placeholder="Enter your last name"
                        name="lastName"
                        value={data.lastName}
                        onChange={handleChange}
                      />
                      {error.lastName && (
                        <p style={{ color: "red" }}>{error.lastName}</p>
                      )}
                    </div>
                    <div className="mb25">
                      <label className="form-label fw500 dark-color">
                        Phone Number
                      </label>
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
                        <div
                          style={{
                            position: "relative",
                            display: "inline-block",
                            marginLeft: "10px",
                          }}
                        >
                          <input
                            type="text"
                            className="form-control"
                            placeholder="Enter your phone number"
                            name="phoneNumber"
                            value={data?.phoneNumber}
                            onChange={handlePhoneChange}
                            maxLength="10" // Limit to 10 digits
                            style={{ width: " 349px" }}
                          />
                          <button
                            type="button"
                            className="ud-btn btn-thm default-box-shadow2"
                            style={{
                              position: "absolute",
                              right: "10px",
                              top: "50%",
                              transform: "translateY(-50%)",
                              padding: "5px 10px",
                              borderRadius: "5px",
                            }}
                            onClick={(e) => handleSendOtp(e)}
                            disabled={data?.phoneNumber?.length !== 10}
                          >
                            {isSendOtpLoading ? <Loader /> : "Send OTP"}
                          </button>
                        </div>
                      </div>
                      {error?.phoneNumber && (
                        <p style={{ color: "red" }}>{error?.phoneNumber}</p>
                      )}
                    </div>

                    {/* OTP field should be visible only if OTP has been sent */}
                    {isOtpSent && !isOtpVerified?.length ? (
                      <div className="mb15">
                        <label className="form-label fw500 dark-color">
                          OTP
                        </label>
                        <div className="d-flex">
                          <div
                            style={{
                              position: "relative",
                              display: "inline-block",
                            }}
                          >
                            <input
                              type="text"
                              className="form-control"
                              placeholder="Enter OTP"
                              name="otp"
                              value={data?.otp}
                              onChange={handleChange}
                              style={{ width: "600px" }}
                            />
                            <button
                              type="button"
                              className="ud-btn btn-thm default-box-shadow2"
                              style={{
                                position: "absolute",
                                right: "10px",
                                top: "50%",
                                transform: "translateY(-50%)",
                                padding: "5px 10px",
                                borderRadius: "5px",
                              }}
                              onClick={(e) => handleVerifyOtp(e)}
                              disabled={!data?.otp?.length} // Enable when OTP is entered
                            >
                              {isVerifyOtpLoading ? <Loader /> : "Verify OTP"}
                            </button>
                          </div>
                        </div>
                        {error?.otp && (
                          <p style={{ color: "red" }}>{error?.otp}</p>
                        )}
                      </div>
                    ) : null}
                    {isOtpVerified?.length ? (
                      <div className="mb3">
                        <p className="text-success">
                          Your phone number has been verified!
                        </p>
                      </div>
                    ) : null}
                    <div className="mb25">
                      <label className="form-label fw500 dark-color">
                        Email
                      </label>
                      <input
                        type="email"
                        className="form-control"
                        placeholder="Enter your email"
                        name="email"
                        value={data.email}
                        onChange={handleChange}
                        onBlur={handleEmailBlur} // Add the onBlur event handler
                      />
                      {error.email && (
                        <p style={{ color: "red" }}>{error.email}</p>
                      )}
                    </div>
                    <div className="mb15">
                      <label className="form-label fw500 dark-color">
                        Password
                      </label>
                      <input
                        type="password"
                        className="form-control"
                        placeholder="Enter your password"
                        name="password"
                        value={data.password}
                        onChange={handleChange}
                      />
                      {error.password && (
                        <p style={{ color: "red" }}>{error.password}</p>
                      )}
                    </div>
                    <div className="d-grid mb20">
                      <button
                        className="ud-btn btn-thm default-box-shadow2"
                        type="button"
                        onClick={handleNext}
                        disabled={
                          disable || !isOtpVerified?.length || !isEmailAvailable
                        } // Disable if email is not available
                      >
                        Next
                      </button>
                    </div>
                  </div>
                ) : (
                  <div>
                    <h4>Upload your documents</h4>
                    {[
                      /* Your document upload fields here */
                      {
                        type: "primaryId",
                        desc: "Primary Identification is used to verify an individual’s identity with documents like a Passport, Australian Birth Certificate, or Australian Citizenship Certificate. This document must clearly display the individual’s full legal name and date of birth. Primary ID is crucial for legal verification and compliance purposes.",
                      },
                      {
                        type: "secondaryId",
                        desc: "Secondary Identification includes documents that support an individual’s identity but do not have the same level of verification as Primary ID.",
                      },
                      {
                        type: "policeCheck",
                        desc: "A Police Check, or National Police Clearance, is a certificate issued to show any recorded criminal history of an individual in Australia. ",
                      },
                      {
                        type: "wwcCheck",
                        desc: "The Working With Children (WWC) Check is a background check required for anyone working with or volunteering with children in Australia.",
                      },
                      {
                        type: "supportingDocs",
                        desc: "Supporting Documents may include additional information that verifies an individual’s credentials or background, such as employment history, educational certificates, or references. ",
                      },
                    ].map(({ type, desc }) => (
                      <div className="mb25" key={type}>
                        <label className="form-label fw500 dark-color">
                          {type === "primaryId" && "Primary ID:"}
                          {type === "secondaryId" && "Secondary ID:"}
                          {type === "policeCheck" && "Police Check:"}
                          {type === "wwcCheck" && "WWC Check:"}
                          {type === "supportingDocs" && "Supporting Documents:"}
                        </label>
                        <p className="description">{desc}</p>
                        <div
                          className="upload-box"
                          onClick={() =>
                            document.getElementById(`${type}Input`).click()
                          }
                        >
                          <input
                            id={`${type}Input`}
                            type="file"
                            name={type}
                            accept=".png, .jpg, .jpeg, .pdf"
                            onChange={(e) =>
                              handleFileUpload(
                                e,
                                type.replace(/([A-Z])/g, "_$1").toLowerCase()
                              )
                            }
                            required={
                              type !== "supportingDocs" && type !== "wwcCheck"
                            }
                            style={{ display: "none" }}
                          />
                          <button type="button" className="upload-button">
                            Select Files
                          </button>
                        </div>
                        {fileUpload[type] ? (
                          <p className="file-name">
                            Selected file: {fileUpload[type]?.name}
                          </p>
                        ) : (
                          !["supportingDocs", "wwcCheck"].includes(type) && (
                            <p className="error-msg">
                              Upload your{" "}
                              {type.replace(/([A-Z])/g, " $1").toLowerCase()}
                            </p>
                          )
                        )}
                      </div>
                    ))}
                    <div className="d-grid mb20">
                      <button
                        className="ud-btn btn-thm default-box-shadow2"
                        type="button"
                        onClick={handleSubmit}
                      >
                        Create Account{" "}
                        {isLoading ? (
                          <Loader />
                        ) : (
                          <i className="fal fa-arrow-right-long" />
                        )}
                      </button>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
