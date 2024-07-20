import { Link, useLocation, useNavigate } from "react-router-dom";
import MetaComponent from "@/components/common/MetaComponent";
import { useEffect, useState } from "react";
import { handleValidations } from "@/utils/handleValidations";
import UseApi from "@/hook/useApi";
import { apiMethods, apiUrls, metaData } from "@/constants/constant";
import { toast } from "react-toastify";
import Loader from "@/components/common/loader";

export default function RegisterPage() {
  <MetaComponent meta={metaData} />;
  const [data, setData] = useState({
    firstName: "",
    lastName: "",
    userName: "",
    email: "",
    password: "",
  });
  const [disable, setDisable] = useState(false);
  const [error, setError] = useState({
    firstName: "",
    lastName: "",
    userName: "",
    email: "",
    password: "",
  });

  const [fileUpload, setFileUpload] = useState({
    idCheck: null,
    primaryId: null,
    secondaryId: null,
    policeCheck: null,
    wwcCheck: null,
  });
  const [uploadedFiles, setUploadedFiles] = useState([]);

  const navigate = useNavigate();
  const { pathname } = useLocation();
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const handleChange = (e) => {
    const { value, name } = e.target;
    setData({ ...data, [name]: value });
    if (disable) {
      const newErr = handleValidations(name, value);
      setError((prevError) => ({ ...prevError, ...newErr }));
    }
  };

  const hasErrors = (error) => {
    return Object.values(error).some((err) => err);
  };

  const areAllFieldsFilled = (data) => {
    return Object.values(data).every((field) => field);
  };

  useEffect(() => {
    if (hasErrors(error)) {
      setDisable(true);
      return;
    }
    setDisable(false);
  }, [error]);

  const handleClick = async () => {
    let newErr = {};
    for (let key in data) {
      newErr = { ...newErr, ...handleValidations(key, data[key]) };
    }
    setError(newErr);
    if (
      !hasErrors(error) &&
      areAllFieldsFilled(data) &&
      uploadedFiles?.length == 5
    ) {
      setIsLoading(true);
      try {
        // Prepare data for signup API
        let route = pathname.split("-");
        const bodyData = {
          fname: data.firstName,
          lname: data.lastName,
          username: data.userName,
          email: data.email,
          password: data.password,
          user_type: route[1], // it is coming from the routes
          files: uploadedFiles,
        };
        // Call signup API
        const response = await UseApi(
          apiUrls.signup,
          apiMethods.POST,
          bodyData
        );
        if (response?.status == 201 || response?.status == 200) {
          toast.success(response?.data?.message);
          navigate("/login");
          setIsLoading(false);
          return;
        } else {
          toast.error(response?.data?.message);
          setIsLoading(false);
        }
      } catch (err) {
        toast.error(err?.message);
        setIsLoading(false);
      }
    }
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const handleFileUpload = async (e, fileType) => {
    const { name, files } = e.target;
    const file = files[0];

    // Updating the state with the selected file
    setFileUpload((prevState) => ({
      ...prevState,
      [name]: file,
    }));

    try {
      const headers = {
        "Content-Type": "multipart/form-data",
      };
      const bodyData = {
        file: file,
        type: fileType,
        side: "front",
      };
      const response = await UseApi(
        apiUrls.uploadDoc,
        apiMethods.POST,
        bodyData,
        headers
      );

      if (response?.status == 201 || response?.status == 200) {
        const newFileData = {
          path: response.data.path,
          type: fileType,
          side: "front",
        };

        // Replace the file if it already exists, else add it
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
                <div className="mb30">
                  <h4>Let's create your account!</h4>
                  <p className="text mt20">
                    Already have an account?{" "}
                    <Link to="/login" className="text-thm">
                      Log In!
                    </Link>
                  </p>
                </div>
                <div className="mb25">
                  <label className="form-label fw500 dark-color">
                    First Name
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    placeholder="Enter your first name"
                    name="firstName"
                    value={data?.firstName}
                    onChange={handleChange}
                    autoComplete="off"
                  />
                  {error?.firstName && (
                    <p style={{ color: "red" }}>{error?.firstName}</p>
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
                    value={data?.lastName}
                    onChange={handleChange}
                    autoComplete="off"
                  />
                  {error?.lastName && (
                    <p style={{ color: "red" }}>{error?.lastName}</p>
                  )}
                </div>
                <div className="mb25">
                  <label className="form-label fw500 dark-color">
                    Username
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    placeholder="Enter your username"
                    name="userName"
                    value={data?.userName}
                    onChange={handleChange}
                    autoComplete="off"
                  />
                  {error?.userName && (
                    <p style={{ color: "red" }}>{error?.userName}</p>
                  )}
                </div>
                <div className="mb25">
                  <label className="form-label fw500 dark-color">Email</label>
                  <input
                    type="email"
                    className="form-control"
                    placeholder="Enter your email"
                    name="email"
                    value={data?.email}
                    onChange={handleChange}
                    autoComplete="off"
                  />
                  {error?.email && (
                    <p style={{ color: "red" }}>{error?.email}</p>
                  )}
                </div>
                <div className="mb15">
                  <label className="form-label fw500 dark-color">
                    Password
                  </label>
                  <div className="input-with-icon">
                    <input
                      type={showPassword ? "text" : "password"}
                      className="form-control"
                      placeholder="Enter your password"
                      name="password"
                      value={data?.password}
                      onChange={handleChange}
                      autoComplete="off"
                    />
                    <button
                      type="button"
                      className="toggle-password"
                      onClick={togglePasswordVisibility}
                    >
                      {showPassword ? (
                        <i class="fa fa-eye" aria-hidden="true"></i>
                      ) : (
                        <i class="fa fa-eye-slash" aria-hidden="true"></i>
                      )}
                    </button>
                  </div>

                  {error?.password && (
                    <p style={{ color: "red" }}>{error?.password}</p>
                  )}
                </div>
                <div className="mb25">
                  <label className="form-label fw500 dark-color">
                    Id Check:
                  </label>
                  <div
                    className="upload-box"
                    onClick={() =>
                      document.getElementById("idCheckInput").click()
                    }
                  >
                    <input
                      id="idCheckInput"
                      type="file"
                      name="idCheck"
                      accept=".png, .jpg, .jpeg, .pdf"
                      onChange={(e) => handleFileUpload(e, "id_check")}
                      required
                      style={{ display: "none" }}
                    />
                    <p>Drop files here or</p>
                    <button type="button" className="upload-button">
                      Select Files
                    </button>
                  </div>
                  {fileUpload.idCheck ? (
                    <p className="file-name">
                      Selected file: {fileUpload?.idCheck?.name}
                    </p>
                  ) : (
                    <p className="error-msg">Upload your Id Check</p>
                  )}
                </div>
                <div className="mb25">
                  <label className="form-label fw500 dark-color">
                    Primary Id:
                  </label>
                  <div
                    className="upload-box"
                    onClick={() =>
                      document.getElementById("primaryIdInput").click()
                    }
                  >
                    <input
                      id="primaryIdInput"
                      type="file"
                      name="primaryId"
                      accept=".png, .jpg, .jpeg, .pdf"
                      onChange={(e) => handleFileUpload(e, "primary_id")}
                      required
                      style={{ display: "none" }}
                    />
                    <p>Drop files here or</p>
                    <button type="button" className="upload-button">
                      Select Files
                    </button>
                  </div>
                  {fileUpload.primaryId ? (
                    <p className="file-name">
                      Selected file: {fileUpload?.primaryId?.name}
                    </p>
                  ) : (
                    <p className="error-msg">Upload your Primary Id</p>
                  )}
                </div>
                <div className="mb25">
                  <label className="form-label fw500 dark-color">
                    Secondary Id:
                  </label>
                  <div
                    className="upload-box"
                    onClick={() =>
                      document.getElementById("secondaryIdInput").click()
                    }
                  >
                    <input
                      id="secondaryIdInput"
                      type="file"
                      name="secondaryId"
                      accept=".png, .jpg, .jpeg, .pdf"
                      onChange={(e) => handleFileUpload(e, "secondary_id")}
                      required
                      style={{ display: "none" }}
                    />
                    <p>Drop files here or</p>
                    <button type="button" className="upload-button">
                      Select Files
                    </button>
                  </div>
                  {fileUpload?.secondaryId ? (
                    <p className="file-name">
                      Selected file: {fileUpload?.secondaryId?.name}
                    </p>
                  ) : (
                    <p className="error-msg">Upload your Secondary Id</p>
                  )}
                </div>
                <div className="mb25">
                  <label className="form-label fw500 dark-color">
                    Police Check:
                  </label>
                  <div
                    className="upload-box"
                    onClick={() =>
                      document.getElementById("policeCheckInput").click()
                    }
                  >
                    <input
                      id="policeCheckInput"
                      type="file"
                      name="policeCheck"
                      accept=".png, .jpg, .jpeg, .pdf"
                      onChange={(e) => handleFileUpload(e, "police_check")}
                      required
                      style={{ display: "none" }}
                    />
                    <p>Drop files here or</p>
                    <button type="button" className="upload-button">
                      Select Files
                    </button>
                  </div>
                  {fileUpload?.policeCheck ? (
                    <p className="file-name">
                      Selected file: {fileUpload?.policeCheck?.name}
                    </p>
                  ) : (
                    <p className="error-msg">Upload your Id for Police Check</p>
                  )}
                </div>
                <div className="mb25">
                  <label className="form-label fw500 dark-color">
                    WWC Check:
                  </label>
                  <div
                    className="upload-box"
                    onClick={() =>
                      document.getElementById("wwcCheckInput").click()
                    }
                  >
                    <input
                      id="wwcCheckInput"
                      type="file"
                      name="wwcCheck"
                      accept=".png, .jpg, .jpeg, .pdf"
                      onChange={(e) => handleFileUpload(e, "wwc_check")}
                      required
                      style={{ display: "none" }}
                    />
                    <p>Drop files here or</p>
                    <button type="button" className="upload-button">
                      Select Files
                    </button>
                  </div>
                  {fileUpload?.wwcCheck ? (
                    <p className="file-name">
                      Selected file: {fileUpload?.wwcCheck?.name}
                    </p>
                  ) : (
                    <p className="error-msg">Upload your Id for WWC Check</p>
                  )}
                </div>

                <div className="d-grid mb20">
                  <button
                    className="ud-btn btn-thm default-box-shadow2"
                    type="button"
                    onClick={handleClick}
                    disabled={disable}
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
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
