import { apiMethods, routes } from "@/constants/constant";
import UseApi from "@/hook/useApi";
import { handleValidations } from "@/utils/handleValidations";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";

export default function LoginPage() {
  const [loginData, setLoginData] = useState({
    email: "",
    password: "",
  });
  const [disable, setDisable] = useState(false);
  const [error, setError] = useState({ email: "", password: "" });

  const handleChange = (e) => {
    const { value, name } = e.target;
    setLoginData({ ...loginData, [name]: value });
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
    if (error?.email?.length || error?.password?.length) {
      setDisable(true);
      return;
    }
    setDisable(false);
  }, [error]);

  const handleClick = async () => {
    let newErr = {};
    for (let key in loginData) {
      newErr = { ...newErr, ...handleValidations(key, loginData[key]) };
    }
    setError(newErr);
    if (!hasErrors(error) && areAllFieldsFilled(loginData)) {
      try {
        // Prepare data for signup API
        const bodyData = {
          email: loginData.email,
          password: loginData.password,
        };
        // Call signup API
        const response = await UseApi(routes.login, apiMethods.POST, bodyData);
        if (response?.status == 201) {
          toast.success(response?.message);
          return;
        } else {
          toast.error(response?.data?.message);
        }
      } catch (err) {
        toast.error(err);
      }
    }
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
                <h2 className="title">Log In</h2>
                <p className="paragraph">
                  Give your visitor a smooth online experience with a solid UX
                  design
                </p>
              </div>
            </div>
          </div>
          <div className="row wow fadeInRight" data-wow-delay="300ms">
            <div className="col-xl-6 mx-auto">
              <div className="log-reg-form search-modal form-style1 bgc-white p50 p30-sm default-box-shadow1 bdrs12">
                <div className="mb30">
                  <h4>We're glad to see you again!</h4>
                  <p className="text">
                    Don't have an account?{" "}
                    <Link to="/register" className="text-thm">
                      Sign Up!
                    </Link>
                  </p>
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
                    value={loginData.email}
                    onChange={handleChange}
                  />
                  {error?.email && (
                    <p style={{ color: "red" }}>{error?.email}</p>
                  )}
                </div>
                <div className="mb15">
                  <label className="form-label fw600 dark-color">
                    Password
                  </label>
                  <input
                    type="password"
                    className="form-control"
                    placeholder="Enter your password"
                    name="password"
                    value={loginData.password}
                    onChange={handleChange}
                  />
                  {error?.password && (
                    <p style={{ color: "red" }}>{error?.password}</p>
                  )}
                </div>
                {/* <div className="checkbox-style1 d-block d-sm-flex align-items-center justify-content-between mb20">
                  <label className="custom_checkbox fz14 ff-heading">
                    Remember me
                    <input type="checkbox" defaultChecked="checked" />
                    <span className="checkmark" />
                  </label>
                  <a className="fz14 ff-heading">Lost your password?</a>
                </div> */}
                <div className="d-grid mb20">
                  <button
                    className="ud-btn btn-thm"
                    type="button"
                    onClick={handleClick}
                    disabled={disable}
                  >
                    Log In <i className="fal fa-arrow-right-long" />
                  </button>
                </div>
                {/* <div className="hr_content mb20">
                  <hr />
                  <span className="hr_top_text">OR</span>
                </div>
                <div className="d-md-flex justify-content-between">
                  <button
                    className="ud-btn btn-fb fz14 fw400 mb-2 mb-md-0"
                    type="button"
                  >
                    <i className="fab fa-facebook-f pr10" /> Continue Facebook
                  </button>
                  <button
                    className="ud-btn btn-google fz14 fw400 mb-2 mb-md-0"
                    type="button"
                  >
                    <i className="fab fa-google" /> Continue Google
                  </button>
                  <button className="ud-btn btn-apple fz14 fw400" type="button">
                    <i className="fab fa-apple" /> Continue Apple
                  </button>
                </div> */}
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
