import {
  getCountries,
  getCountryName,
  getLanguageName,
  getLanguages,
} from "@/utils/commonFunctions";
import { CapitalizeFirstLetter } from "@/utils/helper";
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
  const picture = data?.user_meta?.profile_pic
    ? data?.user_meta?.profile_pic?.split("profile_pictures/")[1]
    : null;
  const newPicUrl =
    picture &&
    "https://speakmydialect.s3.ap-southeast-1.amazonaws.com/profile_pictures/" +
      picture;

  return (
    <div className="freelancer-style1 bdr1 hover-box-shadow row ms-0 align-items-lg-center">
      <div className="col-lg-8 ps-0">
        <div className="d-lg-flex bdrr1 bdrn-xl pr15 pr0-lg">
          <div className="thumb w60 position-relative rounded-circle mb15-md">
            <img
              className="rounded-circle mx-auto"
              src={newPicUrl || "/images/default/defaultProfile.png"}
              height={45}
              width={45}
              alt="profile"
            />
            <span className="online-badge2" />
          </div>
          <div className="details ml15 ml0-md mb15-md">
            <h5 className="title mb-3">
              {CapitalizeFirstLetter(data?.fname)}{" "}
              {CapitalizeFirstLetter(data?.lname)}
            </h5>
            <p className="mb-0 fz14 list-inline-item mb5-sm pe-1">
              <i className="flaticon-place fz16 vam text-thm2 me-1" />{" "}
              {data?.user_meta?.address
                ? data?.user_meta?.address
                : data?.user_meta?.location && countryList?.length > 0
                ? getCountryName(data?.user_meta?.location, countryList)
                : "Location not specified"}
            </p>
            <p className="mb-0 fz14 list-inline-item mb5-sm pe-1">
              <i className="flaticon-gender fz16 vam text-thm2 me-1 bdrl1 pl15 pl0-xs bdrn-xs" />{" "}
              {CapitalizeFirstLetter(data?.user_meta?.gender) ||
                "Gender not specified"}
            </p>
            <p className="text mt10">
              {data?.user_meta?.intro
                ? data?.user_meta?.intro?.split(" ")?.slice(0, 20)?.join(" ") +
                  "...."
                : ""}
            </p>
            <div className="skill-tags d-flex align-items-center justify-content-start">
              {data?.user_skills?.length > 0 && // Check if user_skills is not empty
                data.user_skills.map((item, i) =>
                  getLanguageName(item?.language, languageList) ? ( // Check if item?.language is not empty or null
                    <span key={i} className={`tag asd${i === 1 ? "mx10" : ""}`}>
                      {getLanguageName(item?.language, languageList)}
                    </span>
                  ) : (
                    ""
                  )
                )}
            </div>
          </div>
        </div>
      </div>
      <div className="col-lg-4 ps-0 ps-xl-3 pe-0">
        <div className="details">
          {/* though it is hourky rayte but for now we only need to show fix rate */}

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
