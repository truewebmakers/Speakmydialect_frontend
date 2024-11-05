import { Link, useLocation, useNavigate } from "react-router-dom";
import MetaComponent from "@/components/common/MetaComponent";
import { useEffect, useState } from "react";
import { handleValidations } from "@/utils/handleValidations";
import UseApi from "@/hook/useApi";
import { apiMethods, apiUrls, metaData } from "@/constants/constant";
import { toast } from "react-toastify";
import Loader from "@/components/common/loader";

export default function RegisterPage() {
  const [step, setStep] = useState(1);
  const [data, setData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
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

  const handleChange = (e) => {
    const { value, name } = e.target;
    setData({ ...data, [name]: value });
    if (disable) {
      const newErr = handleValidations(name, value);
      setError((prevError) => ({ ...prevError, ...newErr }));
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
    if (!hasErrors(newErr) && areAllFieldsFilled(data)) {
      setStep(2);
    }
  };
  console.log(uploadedFiles);

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
        fname: data.firstName,
        lname: data.lastName,
        email: data.email,
        password: data.password,
        user_type: route[1],
        files: uploadedFiles,
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
                        Email
                      </label>
                      <input
                        type="email"
                        className="form-control"
                        placeholder="Enter your email"
                        name="email"
                        value={data.email}
                        onChange={handleChange}
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
                        disabled={disable}
                      >
                        Next
                      </button>
                    </div>
                  </div>
                ) : (
                  <div>
                    <h4>Upload your documents</h4>
                    {[
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
                          {type
                            .replace(/([A-Z])/g, " $1")
                            .replace(/^./, (str) => str.toUpperCase())}
                          :
                        </label>
                        <p
                          className="description"
                          // style={{ marginTop: "-19px" }}
                        >
                          {desc}
                        </p>
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
