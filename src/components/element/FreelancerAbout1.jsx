import { fixRate } from "@/constants/constant";
import { getCountryName, getLanguageName } from "@/utils/commonFunctions";
import { CapitalizeFirstLetter } from "@/utils/helper";
import moment from "moment";
import { useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";

export default function FreelancerAbout1({ data }) {
  const storedCountries = sessionStorage.getItem("countries");
  const { user } = useSelector((state) => state.auth);
  const navigate = useNavigate();

  const handleLoginRedirection = () => {
    sessionStorage.setItem("redirectAfterLogin", window.location.pathname);
    navigate("/login");
  };
  const handleSignupRedirection = () => {
    sessionStorage.setItem("redirectAfterLogin", window.location.pathname);
    navigate("/register-client");
  };

  return (
    <>
      <div className="price-widget pt25 bdrs8">
        <h3 className="widget-title">
          ${data?.user_meta?.fix_rate || fixRate}
          {/* <small className="fz15 fw500">Fix Rate</small> */}
        </h3>
        <div className="category-list mt20">
          <a className="d-flex align-items-center justify-content-between bdrb1 pb-2">
            <span className="text">
              <i className="flaticon-place text-thm2 pe-2 vam" />
              Location
            </span>
            <span>
              {storedCountries?.length > 0
                ? getCountryName(
                    data?.user_meta?.location,
                    JSON.parse(storedCountries)
                  )
                : "Not Specified Yet"}
            </span>
          </a>
          <a className="d-flex align-items-center justify-content-between bdrb1 pb-2">
            <span className="text">
              <i className="flaticon-30-days text-thm2 pe-2 vam" />
              Member since
            </span>
            <span>
              {moment(data?.user_meta?.created_at).format("YYYY, DD MMM")}
            </span>
          </a>

          <a className="d-flex align-items-center justify-content-between bdrb1 pb-2">
            <span className="text">
              <i className="flaticon-mars text-thm2 pe-2 vam" />
              Gender
            </span>
            <span>
              {CapitalizeFirstLetter(data?.user_meta?.gender) ||
                "Not Specified"}
            </span>
          </a>
          <a className="d-flex align-items-center justify-content-between bdrb1 pb-2">
            <span className="text">
              <i className="flaticon-translator text-thm2 pe-2 vam" />
              Interpreter Status
            </span>
            <span>
              {data?.status ? CapitalizeFirstLetter(data?.status) : "-"}
            </span>
          </a>
          <a className="d-flex align-items-center justify-content-between mb-3">
            <span className="text">
              <i className="flaticon-sliders text-thm2 pe-2 vam" />
              Fix Rate
            </span>
            <span>${data?.user_meta?.fix_rate || fixRate}</span>
          </a>
        </div>
        {data?.fname && (
          <p>
            Do you want to work with {data?.fname} {data?.lname}?
          </p>
        )}
        {user?.token?.length > 0 ? (
          <div className="d-grid">
            <Link
              to={`/hire/${data?.uuid}`}
              className="ud-btn btn-thm"
              state={data}
            >
              Hire Now
              <i className="fal fa-arrow-right-long" />
            </Link>
          </div>
        ) : (
          <div className="d-grid">
            <span
              className="ud-btn btn-thm"
              state={data}
              onClick={handleSignupRedirection}
              style={{ cursor: "pointer" }}
            >
              Sign Up
              <i className="fal fa-arrow-right-long" />
            </span>
            <p className="text mt20">
              Already have an account?{" "}
              <span
                className="text-thm"
                onClick={handleLoginRedirection}
                style={{ cursor: "pointer" }}
              >
                Log In!
              </span>
            </p>
          </div>
        )}
      </div>
    </>
  );
}
