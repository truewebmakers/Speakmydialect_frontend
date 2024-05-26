import { Link, useNavigate } from "react-router-dom";
import MetaComponent from "@/components/common/MetaComponent";
import { useEffect, useState } from "react";
import { handleValidations } from "@/utils/handleValidations";
import UseApi from "@/hook/useApi";
import { apiMethods, env, routes } from "@/constants/constant";
import { toast } from "react-toastify";

const metadata = {
  title: "Freeio - Freelance Marketplace ReactJs Template | Register",
};
export default function RegisterPage() {
  <MetaComponent meta={metadata} />;
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
  const navigate = useNavigate();

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
    if (!hasErrors(error) && areAllFieldsFilled(data)) {
      try {
        // Prepare data for signup API
        const bodyData = {
          fname: data.firstName,
          lname: data.lastName,
          username: data.userName,
          email: data.email,
          password: data.password,
        };
        // Call signup API
        const response = await UseApi(routes.signup, apiMethods.POST, bodyData);
        if (response?.status == 201) {
          toast.success(response?.data?.message);
          navigate("/login");
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
      <section className="our-register">
        <div className="container">
          <div className="row">
            <div
              className="col-lg-6 m-auto wow fadeInUp"
              data-wow-delay="300ms"
            >
              <div className="main-title text-center">
                <h2 className="title">Register</h2>
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
                    value={data.firstName}
                    onChange={handleChange}
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
                    value={data.lastName}
                    onChange={handleChange}
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
                    value={data.userName}
                    onChange={handleChange}
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
                    placeholder="abc@xyz.com"
                    name="email"
                    value={data.email}
                    onChange={handleChange}
                  />
                  {error?.email && (
                    <p style={{ color: "red" }}>{error?.email}</p>
                  )}
                </div>
                <div className="mb15">
                  <label className="form-label fw500 dark-color">
                    Password
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    placeholder="*******"
                    name="password"
                    value={data.password}
                    onChange={handleChange}
                  />
                  {error?.password && (
                    <p style={{ color: "red" }}>{error?.password}</p>
                  )}
                </div>
                <div className="d-grid mb20">
                  <button
                    className="ud-btn btn-thm default-box-shadow2"
                    type="button"
                    onClick={handleClick}
                    disabled={disable}
                  >
                    Create Account <i className="fal fa-arrow-right-long" />
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
