import Loader from "@/components/common/loader";
import { apiMethods, apiUrls } from "@/constants/constant";
import UseApi from "@/hook/useApi";
import { logInSuccess } from "@/redux/auth";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

export default function LoginPage() {
  const [loginData, setLoginData] = useState({
    email: "",
    password: "",
  });
  const [disable, setDisable] = useState(false);
  const [isForgotPassword, setIsForgotPassword] = useState(false); // Track if "Forgot Password" is active
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const handleChange = (e) => {
    const { value, name } = e.target;
    setLoginData({ ...loginData, [name]: value });
  };

  const areAllFieldsFilled = (data) => {
    return Object.values(data).every((field) => field);
  };

  useEffect(() => {
    if (!areAllFieldsFilled(loginData)) {
      setDisable(true);
      return;
    }
    setDisable(false);
  }, [loginData]);

  const handleLoginOrReset = async () => {
    setIsLoading(true);
    try {
      if (isForgotPassword) {
        // Forgot Password API call
        const response = await UseApi(apiUrls.forgotPassword, apiMethods.POST, {
          email: loginData?.email,
        });
        if (response?.status === 200 || response?.status === 201) {
          toast.success(response?.data?.message || "Password reset link sent!");
          setIsForgotPassword(false);
        } else {
          toast.error(response?.data?.message || "Failed to send reset link.");
        }
      } else {
        // Log In API call
        const bodyData = {
          email: loginData.email,
          password: loginData.password,
        };
        const response = await UseApi(apiUrls.login, apiMethods.POST, bodyData);
        if (response?.status === 200 || response?.status === 201) {
          const userData = {
            token: response?.data?.token,
            userInfo: response?.data?.userInfo,
          };
          dispatch(logInSuccess(userData));
          const redirectPath =
            sessionStorage.getItem("redirectAfterLogin") || "/my-profile";
          navigate(redirectPath);
          toast.success(response?.data?.message);
        } else {
          toast.error(response?.data?.message || "Login failed.");
        }
      }
    } catch (err) {
      toast.error(err.message || "Something went wrong.");
    } finally {
      setIsLoading(false);
    }
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const handleForgotPassword = () => {
    setIsForgotPassword(true);
    setLoginData({ email: "", password: "" }); // Clear password field
  };

  return (
    <>
      <section className="our-login">
        <div className="container">
          <div className="row">
            <div
              className="col-lg-6 m-auto wow fadeInUp"
              data-wow-delay="300ms"
            >
              <div className="main-title text-center">
                <h2 className="title">
                  {isForgotPassword ? "Reset Password" : "Log In"}
                </h2>
              </div>
            </div>
          </div>
          <div className="row wow fadeInRight" data-wow-delay="300ms">
            <div className="col-xl-6 mx-auto">
              <div className="log-reg-form search-modal form-style1 bgc-white p50 p30-sm default-box-shadow1 bdrs12">
                <div className="mb30">
                  <h4>
                    {isForgotPassword
                      ? "Forgot your password? No worries!"
                      : "We're glad to see you again!"}
                  </h4>
                  {!isForgotPassword && (
                    <p className="text">
                      Don't have an account?{" "}
                      <span>
                        <Link to="/register" className="text-thm">
                          Sign up
                        </Link>{" "}
                      </span>
                    </p>
                  )}
                </div>
                <div className="mb20">
                  <label className="form-label fw600 dark-color">
                    Email Address
                  </label>
                  <input
                    type="email"
                    className="form-control"
                    placeholder="Enter your email"
                    name="email"
                    value={loginData?.email}
                    onChange={handleChange}
                    autoComplete="off"
                  />
                </div>
                {!isForgotPassword && (
                  <div className="mb15">
                    <label
                      className="form-label fw600 dark-color"
                      htmlFor="password"
                    >
                      Password
                    </label>
                    <div className="input-with-icon">
                      <input
                        type={showPassword ? "text" : "password"}
                        className="form-control"
                        placeholder="Enter your password"
                        name="password"
                        id="password"
                        value={loginData?.password}
                        onChange={handleChange}
                        autoComplete="off"
                      />
                      <button
                        type="button"
                        className="toggle-password"
                        onClick={togglePasswordVisibility}
                      >
                        {showPassword ? (
                          <i className="fa fa-eye" aria-hidden="true"></i>
                        ) : (
                          <i className="fa fa-eye-slash" aria-hidden="true"></i>
                        )}
                      </button>
                    </div>
                  </div>
                )}
                <div className="d-grid mb20">
                  <button
                    className="ud-btn btn-thm"
                    type="button"
                    onClick={handleLoginOrReset}
                    disabled={
                      (!isForgotPassword && disable) || !loginData?.email
                    }
                  >
                    {isForgotPassword ? "Reset Password" : "Log In"}
                    {isLoading && (
                      <>
                        &nbsp;&nbsp; <Loader />
                      </>
                    )}
                  </button>
                </div>
                {!isForgotPassword && (
                  <div className="text-end">
                    <button
                      className="btn btn-link text-thm"
                      type="button"
                      onClick={handleForgotPassword}
                    >
                      Forgot Password?
                    </button>
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
