import { apiMethods, apiUrls } from "@/constants/constant";
import { useAuth } from "@/context/authContext";
import UseApi from "@/hook/useApi";
import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

export default function LoginPage() {
  const [loginData, setLoginData] = useState({
    email: "",
    password: "",
  });
  const [disable, setDisable] = useState(false);
  const navigate = useNavigate();
  const { setToken, setUserId } = useAuth();

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

  const handleClick = async () => {
    if (areAllFieldsFilled(loginData)) {
      try {
        // Prepare data for signup API
        const bodyData = {
          email: loginData.email,
          password: loginData.password,
        };
        // Call signup API
        const response = await UseApi(apiUrls.login, apiMethods.POST, bodyData);
        if (response?.status == 200 || response?.status == 201) {
          setToken(response?.data?.token);
          let info = JSON.stringify(response?.data?.userInfo);
          setUserId(info);
          navigate("/my-profile");
          toast.success(response?.data?.message);
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
                    <span>
                      Sign up as a{" "}
                      <Link to="/register-translator" className="text-thm">
                        Translator
                      </Link>{" "}
                      or{" "}
                      <Link to="/register-client" className="text-thm">
                        Hire one!
                      </Link>
                    </span>
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
                </div>
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
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
