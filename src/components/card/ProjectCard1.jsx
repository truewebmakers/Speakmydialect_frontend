import { routes } from "@/constants/constant";
import {
  getCountries,
  getCountryName,
  getLanguageName,
  getLanguages,
} from "@/utils/commonFunctions";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

export default function ProjectCard1({ data }) {
  const [countryList, setCountryList] = useState([]);
  const [languageList, setLanguageList] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const storedCountries = sessionStorage.getItem("countries");
      const storedLanguages = sessionStorage.getItem("languages");

      if (storedCountries?.length > 0) {
        setCountryList(JSON.parse(storedCountries));
      } else {
        await getCountries(setCountryList);
      }
      if (storedLanguages?.length > 0) {
        setLanguageList(JSON.parse(storedLanguages));
      } else {
        await getLanguages(setLanguageList);
      }
    };
    fetchData();
  }, []);

  return (
    <div className="freelancer-style1 bdr1 hover-box-shadow row ms-0 align-items-lg-center">
      <div className="col-lg-8 ps-0">
        <div className="d-lg-flex bdrr1 bdrn-xl pr15 pr0-lg">
          <div className="thumb w60 position-relative rounded-circle mb15-md">
            <img
              className="rounded-circle mx-auto"
              src={data?.user_meta?.profile_pic}
              height={45}
              width={45}
              alt="profile"
            />
            <span className="online-badge2" />
          </div>
          <div className="details ml15 ml0-md mb15-md">
            <h5 className="title mb-3">
              {data?.fname} {data?.lname}
            </h5>
            <p className="mb-0 fz14 list-inline-item mb5-sm pe-1">
              <i className="flaticon-place fz16 vam text-thm2 me-1" />{" "}
              {data?.user_meta?.location && countryList?.length > 0
                ? getCountryName(data?.user_meta?.location, countryList)
                : "Location not specified"}
            </p>
            <p className="mb-0 fz14 list-inline-item mb5-sm pe-1">
              <i className="flaticon-gender fz16 vam text-thm2 me-1 bdrl1 pl15 pl0-xs bdrn-xs" />{" "}
              {data?.user_meta?.gender || "Gender not specified"}
            </p>
            <p className="mb-0 fz14 list-inline-item mb5-sm">
              <i className="flaticon-contract fz16 vam text-thm2 me-1 bdrl1 pl15 pl0-xs bdrn-xs" />{" "}
              {data?.status}
            </p>
            <p className="text mt10">{data?.user_meta?.intro}</p>
            <div className="skill-tags d-flex align-items-center justify-content-start">
              {data?.user_skills?.map((item, i) => (
                <span key={i} className={`tag ${i === 1 ? "mx10" : ""}`}>
                  {getLanguageName(item?.language, languageList)}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>
      <div className="col-lg-4 ps-0 ps-xl-3 pe-0">
        <div className="details">
          {data?.user_meta?.hourly_rate ? (
            <div className="text-lg-end">
              <h4>${data?.user_meta?.hourly_rate}</h4>
              <p className="text">Hourly Rate</p>
            </div>
          ) : (
            <div className="text-lg-end">
              <h4>
                {data?.user_meta?.fix_rate
                  ? "$" + data?.user_meta?.fix_rate
                  : "Not Mentioned Yet"}
              </h4>
              <p className="text">Fixed Rate</p>
            </div>
          )}
          <div className="d-grid mt15">
            <Link
              to={`/profile/${data?.uuid}`}
              className="ud-btn btn-light-thm"
            >
              View Profile
              <i className="fal fa-arrow-right-long" />
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
