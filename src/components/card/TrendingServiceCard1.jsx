import { Link } from "react-router-dom";
import { useLocation } from "react-router-dom";
import { useEffect } from "react";
import { useState } from "react";
import { CapitalizeFirstLetter } from "@/utils/helper";
import {
  getCountries,
  getCountryName,
  getLanguageName,
  getLanguages,
} from "@/utils/commonFunctions";

export default function TrendingServiceCard1({ data }) {
  const [isFavActive, setFavActive] = useState(false);
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

  const { pathname } = useLocation();

  const picture = data?.user_meta?.profile_pic
    ? data?.user_meta?.profile_pic?.split("profile_pictures/")[1]
    : null;
  const newPicUrl =
    picture &&
    "https://speakmydialect.s3.ap-southeast-1.amazonaws.com/profile_pictures/" +
      picture;

  return (
    <>
      <div
        className={`listing-style1 ${
          pathname === "/home-4" ? "default-box-shadow1 bdrs8" : ""
        } ${pathname === "/home-6" ? "default-box-shadow1 border-0" : ""}
   ${pathname === "/home-9" ? "border-0 default-box-shadow1 bdrs16" : ""}
   ${pathname === "/home-10" ? "bdrs16" : ""}
   ${pathname === "/home-17" ? "bdrs16" : ""}
   ${pathname === "/home-15" ? "bdrs16" : ""}
   ${pathname === "/home-12" ? "bdrs16" : ""}
   ${pathname === "/home-5" ? "style4 default-box-shadow1 mb60" : ""}
   ${pathname === "/home-18" ? "style4 default-box-shadow1 mb60" : ""}
   ${pathname === "/home-19" ? "style4 default-box-shadow1 mb60" : ""}
   ${pathname === "/home-8" ? "style5" : ""}`}
      >
        <div className="list-thumb">
          <a
            onClick={() => setFavActive(!isFavActive)}
            className={`listing-fav fz12 ${isFavActive ? "ui-fav-active" : ""}`}
          >
            <span className="far fa-heart" />
          </a>
        </div>
        <div
          className={`list-content card ${
            pathname === "/home-8" ? "px-0" : ""
          }`}
        >
          <p className="list-text body-color fz14 mb-1">{data.category}</p>
          <h5 className="list-title">
            <Link to={`/service-single/${data.id}`}>
              {CapitalizeFirstLetter(data?.fname)}{" "}
              {CapitalizeFirstLetter(data?.lname)}
            </Link>
          </h5>
          <div className="review-meta d-flex align-items-center">
            <i className="flaticon-place fz16 vam text-thm2 me-1" />{" "}
            {data?.user_meta?.location && countryList?.length > 0
              ? getCountryName(data?.user_meta?.location, countryList)
              : "Location not specified"}
          </div>
          <p className="text mt10">{data?.user_meta?.intro}</p>
          <div className="skill-tags d-flex align-items-center justify-content-start">
            {data?.user_skills?.map((item, i) => (
              <span key={i} className={`tag ${i === 1 ? "mx10" : ""}`}>
                {getLanguageName(item?.language, languageList)}
              </span>
            ))}
          </div>
          <hr className="my-2" />
          <div className="list-meta d-flex justify-content-between align-items-center mt15">
            <a className="d-flex" href="#">
              <span className="position-relative mr10">
                <img
                  className="rounded-circle"
                  width={45}
                  height={45}
                  src={newPicUrl || "/images/default/defaultProfile.png"}
                  alt="interpreter Photo"
                />
                <span className="online-badges" />
              </span>
            </a>
            <div className="budget">
              <p className="mb-0 fz14 list-inline-item mb5-sm">
                <i className="flaticon-contract fz16 vam text-thm2 me-1 bdrl1 pl15 pl0-xs bdrn-xs" />{" "}
                {CapitalizeFirstLetter(data?.status) || "-"}
              </p>
              <i className="flaticon-gender fz16 vam text-thm2 me-1 bdrl1 pl15 pl0-xs bdrn-xs" />{" "}
              {CapitalizeFirstLetter(data?.user_meta?.gender) ||
                "Gender not specified"}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
