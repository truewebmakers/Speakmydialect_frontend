import React, { useEffect, useState } from "react";
import SelectInput from "../option/SelectInput";
import { Link } from "react-router-dom";
import { apiMethods, apiUrls } from "@/constants/constant";
import { toast } from "react-toastify";
import UseApi from "@/hook/useApi";
import { useAuth } from "@/context/authContext";

export default function ProfileDetails() {
  const [profileDetails, setProfileDetails] = useState({
    phone: "",
    fix_rate: "",
    hourly_rate: "",
    intro: "",
  });
  const [getGender, setGender] = useState({
    option: "Select",
    value: null,
  });
  const [getCountry, setCountry] = useState({
    option: "Select",
    value: null,
  });
  const [selectedImage, setSelectedImage] = useState(null);
  const [uploadPic, setUploadedPic] = useState(null);
  const { userId } = useAuth();
  const [countryList, setCountryList] = useState([]);

  const handleImageChange = (event) => {
    const file = event.target.files[0];
    setUploadedPic(file); // Store the File object directly, this will be sent to api
    const reader = new FileReader();
    reader.onload = function (event) {
      setSelectedImage(event.target.result); // This image will be shown on the ui
    };
    reader.readAsDataURL(file);
  };

  const genderHandler = (option, value) => {
    setGender({ option, value });
  };

  const countryHandler = (option, value) => {
    setCountry({ option, value });
  };

  const handleOnChange = (e) => {
    const { value, name } = e.target;
    setProfileDetails({ ...profileDetails, [name]: value });
  };

  useEffect(() => {
    const storedCountries = sessionStorage.getItem("countries");
    if (storedCountries) {
      setCountryList(JSON.parse(storedCountries));
    } else {
      getCountries();
    }
  }, []);

  const getCountries = async () => {
    try {
      const headers = {
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Methods": "GET,PUT,POST,DELETE,PATCH,OPTIONS",
      };
      const response = await UseApi(
        apiUrls.getCountries,
        apiMethods.GET,
        headers
      );
      const countryData = response?.data?.data;
      setCountryList(countryData);
      sessionStorage.setItem("countries", JSON.stringify(countryData));
    } catch (error) {
      toast.error("Error fetching countries");
    }
  };

  const handleSave = async () => {
    try {
      // set headers
      const headers = {
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Methods": "GET,PUT,POST,DELETE,PATCH,OPTIONS",
        "Content-Type": "multipart/form-data",
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      };
      // set body
      const bodyData = {
        phone: profileDetails?.phone,
        fix_rate: profileDetails.fix_rate,
        hourly_rate: profileDetails.hourly_rate,
        intro: profileDetails.intro,
        profile_pic: uploadPic,
        gender: getGender?.value,
        location: getCountry?.value,
      };
      // Call signup API
      const response = await UseApi(
        apiUrls.updateProfile + userId,
        apiMethods.POST,
        headers,
        bodyData
      );
      console.log(response, "responsee");
      if (response?.status == 200 || response?.status == 201) {
        toast.success(response?.data?.message);
        // navigate("/login");
        return;
      } else {
        toast.error(response?.data?.message);
      }
    } catch (err) {
      toast.error(err);
    }
  };

  return (
    <>
      <div className="ps-widget bgc-white bdrs4 p30 mb30 overflow-hidden position-relative">
        <div className="bdrb1 pb15 mb25">
          <h5 className="list-title">Profile Details</h5>
        </div>
        <div className="col-xl-7">
          <div className="profile-box d-sm-flex align-items-center mb30">
            <div className="profile-img mb20-sm">
              <img
                className="rounded-circle wa-xs"
                src={selectedImage ? selectedImage : "/images/team/fl-1.png"}
                style={{
                  height: "71px",
                  width: "71px",
                  objectFit: "cover",
                }}
                alt="profile"
              />
            </div>
            <div className="profile-content ml20 ml0-xs">
              <div className="d-flex align-items-center my-3">
                <a
                  className="tag-delt text-thm2"
                  onClick={() => setSelectedImage(null)}
                >
                  <span className="flaticon-delete text-thm2" />
                </a>
                <label>
                  <input
                    type="file"
                    accept=".png, .jpg, .jpeg"
                    className="d-none"
                    onChange={handleImageChange}
                  />
                  <a className="upload-btn ml10">Upload Images</a>
                </label>
              </div>
              <p className="text mb-0">
                Max file size is 1MB, Minimum dimension: 330x300 And Suitable
                files are .jpg &amp; .png
              </p>
            </div>
          </div>
        </div>
        <div className="col-lg-7">
          <form className="form-style1">
            <div className="row">
              <div className="col-sm-6">
                <div className="mb20">
                  <label className="heading-color ff-heading fw500 mb10">
                    Phone Number
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    placeholder="i will"
                    name="phone"
                    value={profileDetails?.phone}
                    onChange={handleOnChange}
                  />
                </div>
              </div>
              <div className="col-sm-6">
                <div className="mb20">
                  <label className="heading-color ff-heading fw500 mb10">
                    Fix Rate
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    placeholder="i will"
                    name="fix_rate"
                    value={profileDetails?.fix_rate}
                    onChange={handleOnChange}
                  />
                </div>
              </div>
              <div className="col-sm-6">
                <div className="mb20">
                  <label className="heading-color ff-heading fw500 mb10">
                    Hourly Rate
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    placeholder="i will"
                    name="hourly_rate"
                    value={profileDetails?.hourly_rate}
                    onChange={handleOnChange}
                  />
                </div>
              </div>
              <div className="col-sm-6">
                <div className="mb20">
                  <SelectInput
                    label="Gender"
                    defaultSelect={getGender}
                    data={[
                      { option: "Male", value: "male" },
                      {
                        option: "Female",
                        value: "female",
                      },
                      { option: "Other", value: "other" },
                    ]}
                    handler={genderHandler}
                  />
                </div>
              </div>
              <div className="col-sm-6">
                <div className="mb20">
                  <SelectInput
                    label="Country"
                    defaultSelect={getCountry}
                    data={countryList?.map((item) => ({
                      option: item?.name,
                      value: item?.id,
                    }))}
                    handler={countryHandler}
                  />
                </div>
              </div>
              <div className="col-md-12">
                <div className="mb10">
                  <label className="heading-color ff-heading fw500 mb10">
                    About you
                  </label>
                  <textarea
                    cols={30}
                    rows={6}
                    name="intro"
                    placeholder="Description"
                    value={profileDetails?.intro}
                    onChange={handleOnChange}
                  />
                </div>
              </div>
              <div className="col-md-12">
                <div className="text-start">
                  <button
                    className="ud-btn btn-thm default-box-shadow2"
                    type="button"
                    onClick={handleSave}
                  >
                    Save
                    <i className="fal fa-arrow-right-long" />
                  </button>
                </div>
              </div>
            </div>
          </form>
        </div>
      </div>
    </>
  );
}
