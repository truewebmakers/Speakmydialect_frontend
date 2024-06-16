import { getCountryName, getLanguageName } from "@/utils/commonFunctions";
import { CapitalizeFirstLetter } from "@/utils/helper";
import moment from "moment";
import { Link } from "react-router-dom";

export default function FreelancerAbout1({ data }) {
  const storedCountries = sessionStorage.getItem("countries");

  return (
    <>
      <div className="price-widget pt25 bdrs8">
        <h3 className="widget-title">
          {data?.user_meta?.hourly_rate}||0
          <small className="fz15 fw500">/per hour</small>
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
          {/* <a className="d-flex align-items-center justify-content-between bdrb1 pb-2">
            <span className="text">
              <i className="flaticon-calendar text-thm2 pe-2 vam" />
              Last Delivery
            </span>
            <span>5 days</span>
          </a> */}
          <a className="d-flex align-items-center justify-content-between bdrb1 pb-2">
            <span className="text">
              <i className="flaticon-mars text-thm2 pe-2 vam" />
              Gender
            </span>
            <span>{CapitalizeFirstLetter(data?.user_meta?.gender)}</span>
          </a>
          <a className="d-flex align-items-center justify-content-between bdrb1 pb-2">
            <span className="text">
              <i className="flaticon-translator text-thm2 pe-2 vam" />
              Translator Status
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
            <span>{data?.user_meta?.fix_rate}</span>
          </a>
        </div>
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
      </div>
    </>
  );
}
