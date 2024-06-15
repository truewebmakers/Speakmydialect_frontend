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
  const navigate = useNavigate();
  const { pathname } = useLocation();
  const [isLoading, setIsLoading] = useState(false);

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
        toast.error(err);
        setIsLoading(false);
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
                    placeholder="abc@xyz.com"
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
                  <input
                    type="password"
                    className="form-control"
                    placeholder="*******"
                    name="password"
                    value={data.password}
                    onChange={handleChange}
                    autoComplete="off"
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
