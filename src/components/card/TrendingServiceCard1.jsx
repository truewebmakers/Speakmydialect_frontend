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
    <div
      className={`listing-style1 ${
        pathname === "/home-4" ? "default-box-shadow1 bdrs8" : ""
      } ${pathname === "/home-6" ? "default-box-shadow1 border-0" : ""} ${
        pathname === "/home-9" ? "border-0 default-box-shadow1 bdrs16" : ""
      } ${pathname === "/home-10" ? "bdrs16" : ""} ${
        pathname === "/home-17" ? "bdrs16" : ""
      } ${pathname === "/home-15" ? "bdrs16" : ""} ${
        pathname === "/home-12" ? "bdrs16" : ""
      } ${pathname === "/home-5" ? "style4 default-box-shadow1 mb60" : ""} ${
        pathname === "/home-18" ? "style4 default-box-shadow1 mb60" : ""
      } ${pathname === "/home-19" ? "style4 default-box-shadow1 mb60" : ""} ${
        pathname === "/home-8" ? "style5" : ""
      }`}
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
        className={`list-content card ${pathname === "/home-8" ? "px-0" : ""}`}
      >
        {/* Image placed before name */}
        <div className="d-flex align-items-center">
          <img
            className="rounded-circle me-2"
            width={45}
            height={45}
            src={newPicUrl || "/images/default/defaultProfile.png"}
            alt="interpreter Photo"
          />
          <h5 className="list-title">
            <Link to={`/service-single/${data.id}`}>
              {CapitalizeFirstLetter(data?.fname)}{" "}
              {CapitalizeFirstLetter(data?.lname)}
            </Link>
          </h5>
        </div>
        <p className="list-text body-color fz14 mb-1">{data?.category}</p>
        <p className="text mt10">
          {data?.user_meta?.intro
            ? (() => {
                const words = data?.user_meta?.intro?.split(" ");
                if (words[0]?.length > 20) {
                  // If the first word is too long, truncate it to 12 characters
                  return words[0]?.substring(0, 20) + "...";
                } else {
                  // Otherwise, show up to 5 words
                  return words?.slice(0, 8)?.join(" ") + " ...";
                }
              })()
            : "No Intro"}
        </p>
        <div className="skill-tags d-flex align-items-center justify-content-start">
          {data?.user_skills?.map((item, i) => (
            <span key={i} className={`tag ${i === 1 ? "mx10" : "asdasd"}`}>
              {getLanguageName(item?.language, languageList)}
            </span>
          ))}
        </div>
        <hr className="my-2" />
        <div className="list-meta d-flex justify-content-between align-items-center mt15">
          <div className="budget">
            <img src="/images/location.png" height={23} width={23} />{" "}
            {data?.user_meta?.location && countryList?.length > 0
              ? getCountryName(data?.user_meta?.location, countryList)
              : "Location not specified "}
            <br />
            <img src="/images/gender.png" height={23} width={23} />{" "}
            {CapitalizeFirstLetter(data?.user_meta?.gender) ||
              "Gender not specified"}
          </div>
        </div>
      </div>
    </div>
  );
}
