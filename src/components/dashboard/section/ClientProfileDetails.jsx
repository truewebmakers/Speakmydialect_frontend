import React, { useEffect, useRef, useState } from "react";
import SelectInput from "../option/SelectInput";
import { apiMethods, apiUrls } from "@/constants/constant";
import { toast } from "react-toastify";
import UseApi from "@/hook/useApi";
import { CapitalizeFirstLetter } from "@/utils/helper";
import { useSelector } from "react-redux";
import Loader from "@/components/common/loader";
import { getCountries } from "@/utils/commonFunctions";
import { useNavigate } from "react-router-dom";

export default function ClientProfileDetails({ userId }) {
  const [profileDetails, setProfileDetails] = useState({
    fname: "",
    lname: "",
    phone_number: "",
    email: "",
    fix_rate: "77",
    hourly_rate: 0,
    intro: "",
    address: "",
  });
  const { user, profileData } = useSelector((state) => state.auth);
  const [selectedImage, setSelectedImage] = useState(null);
  const [uploadPic, setUploadedPic] = useState(null);
  const [getGender, setGender] = useState({ option: "Select", value: null });
  const [getCountry, setCountry] = useState({ option: "Australia", value: 14 });
  const [countryList, setCountryList] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const addressInputRef = useRef(null); // Create a ref for the address input

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

  useEffect(() => {
    const input = addressInputRef.current; // Use the ref for the address input
    const autocompleteInstance = new window.google.maps.places.Autocomplete(
      input,
      {
        fields: ["formatted_address"],
        types: ["address"],
      }
    );

    autocompleteInstance.addListener("place_changed", () => {
      const place = autocompleteInstance.getPlace();
      if (place && place?.formatted_address) {
        setProfileDetails((prevDetails) => ({
          ...prevDetails,
          address: place?.formatted_address, // Populate address from autocomplete
        }));
      }
    });

    // Clean up the listener on component unmount
    return () => {
      window.google.maps.event.clearInstanceListeners(autocompleteInstance);
    };
  }, []);

  const handleOnChange = (e) => {
    const { value, name } = e.target;
    if (name === "phone_number") {
      if ((value === "" || value.length <= 100) && !isNaN(value)) {
        setProfileDetails({ ...profileDetails, phone_number: value });
      }
    } else {
      setProfileDetails({ ...profileDetails, [name]: value });
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      const storedCountries = sessionStorage.getItem("countries");
      if (storedCountries?.length > 0) {
        setCountryList(JSON.parse(storedCountries));
      } else {
        await getCountries(setCountryList);
      }
    };
    fetchData();
  }, []);

  useEffect(() => {
    if (profileData) {

      // console.log("profileDetails",profileData)
      // Enter Profile Details
      setProfileDetails({
        fname: profileData?.fname || "",
        lname: profileData?.lname || "",
        phone_number: profileData?.user_meta?.phone
          ? profileData?.user_meta?.phone
          : profileData?.phone_number
          ? profileData?.phone_number
          : "",
        email: profileData?.email || "",
        fix_rate: "77" || "",
        hourly_rate: 0 || "",
        intro: profileData?.user_meta?.intro || "",
        address: profileData?.user_meta?.address || "", 
        profile_locked : profileData?.profile_locked

      });
      // Enter Gender
      setGender({
        option: CapitalizeFirstLetter(profileData?.user_meta?.gender),
        value: profileData?.user_meta?.gender,
      });
      // Enter Country
      if (profileData?.user_meta?.location && countryList?.length > 0) {
        const country = countryList?.find(
          (coun) => coun?.id == profileData?.user_meta?.location
        );
        if (country) {
          setCountry({
            option: country?.name, // Set the country name as the option
            value: country?.id, // Set the country ID as the value
          });
        }
      }
      const picture = profileData?.user_meta?.profile_pic
        ? profileData?.user_meta?.profile_pic?.split("profile_pictures/")[1]
        : null;
      const newPicUrl =
        picture &&
        "https://speakmydialect.s3.ap-southeast-1.amazonaws.com/profile_pictures/" +
          picture;
      setSelectedImage(newPicUrl);
    }
  }, [profileData]);

  const handleSave = async () => {
    setIsLoading(true);
    try {
      // set headers
      const headers = {
        "Content-Type": "multipart/form-data",
        Authorization: `Bearer ${user?.token}`,
      };
      // set body
      const bodyData = {
        fname: profileDetails?.fname,
        lname: profileDetails?.lname,
        phone_number: profileDetails?.phone_number || "",
        email: profileDetails?.email,
        fix_rate: profileDetails.fix_rate || 0,
        hourly_rate: 0,
        intro: profileDetails.intro,
        profile_pic: uploadPic,
        gender: getGender?.value,
        location: getCountry?.value,
        address: profileDetails?.address,
      };
      // Call signup API
      const response = await UseApi(
        apiUrls.updateProfile + (userId || user?.userInfo?.id),
        apiMethods.POST,
        bodyData,
        headers
      );
      if (response?.status == 200 || response?.status == 201) {
        toast.success(response?.data?.message);
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
  };

  return (
    <>
      <div className="ps-widget bgc-white bdrs4 p30 mb30 overflow-hidden position-relative">
        <div className="bdrb1 pb15 mb30 d-sm-flex justify-content-between">
          <h5
            className="list-title"
            style={{ textAlign: "center", paddingTop: "17px" }}
          >
            Profile Details
          </h5>
          {user?.userInfo?.user_type == "translator" && (
            <a
              href={`/profile/${profileData?.uuid}`}
              className="ud-btn btn-thm default-box-shadow2"
              target="_blank"
            >
              View Profile
              <i className="fal fa-arrow-right-long" />
            </a>
          )}
        </div>
        <div className="col-xl-7">
          <div className="profile-box d-sm-flex align-items-center mb30">
            <div className="profile-img mb20-sm">
              <img
                className="rounded-circle wa-xs"
                src={
                  selectedImage
                    ? selectedImage
                    : "/images/default/defaultProfile.png"
                }
                height={60}
                width={60}
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
        <div className="col-lg-12">
          <form className="form-style1">
            <div className="row">
              <div className="col-sm-6">
                <div className="mb20">
                  <label className="heading-color ff-heading fw500 mb10">
                    First Name
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    placeholder="Enter your first name"
                    name="fname"
                    value={profileDetails?.fname}
                    autoComplete="off"
                    onChange={handleOnChange}
                    disabled={(profileDetails?.profile_locked == 'Yes') ? true : false }
                  />
                </div>
              </div>
              <div className="col-sm-6">
                <div className="mb20">
                  <label className="heading-color ff-heading fw500 mb10">
                    Last Name
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    placeholder="Enter your last name"
                    name="lname"
                    value={profileDetails?.lname}
                    autoComplete="off"
                    onChange={handleOnChange}
                    disabled={(profileDetails?.profile_locked == 'Yes') ? true : false }
                  />
                </div>
              </div>
              <div className="col-sm-6">
                <div className="mb20">
                  <label className="heading-color ff-heading fw500 mb10">
                    Phone Number
                  </label>
                  <div style={{ position: "relative" }}>
                    <input
                      type="text"
                      className="form-control"
                      placeholder="Enter your phone number"
                      name="phone_number"
                      value={profileDetails?.phone_number}
                      autoComplete="off"
                      onChange={handleOnChange}
                      readOnly={true}
                      style={{ cursor: "not-allowed" }}
                      disabled={(profileDetails?.profile_locked == 'Yes') ? true : false }
                    />
                    {/* Display "Verified" text if the phone number has a value */}
                    {profileData?.otp_verified_at !== null ? (
                      <span className="verified">Verified</span>
                    ) : (
                      <span className="unverified">Unverified</span>
                    )}
                  </div>
                </div>
              </div>
              <div className="col-sm-6">
                <div className="mb20">
                  <label className="heading-color ff-heading fw500 mb10">
                    Email
                  </label>
                  <div style={{ position: "relative" }}>
                    <input
                      type="text"
                      className="form-control"
                      placeholder="Enter your email"
                      name="email"
                      value={profileDetails?.email}
                      autoComplete="off"
                      onChange={handleOnChange}
                      readOnly={true}
                      style={{ cursor: "not-allowed" }}
                      disabled={(profileDetails?.profile_locked == 'Yes') ? true : false }
                    />
                    {/* Display "Verified" text if the email has a value */}
                    {profileData?.email_verified_at !== null ? (
                      <span className="verified">Verified</span>
                    ) : (
                      <span className="unverified">Unverified</span>
                    )}
                  </div>
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
                    disabled={(profileDetails?.profile_locked == 'Yes') ? true : false }
                  />
                </div>
              </div>
              <div className="col-sm-6">
                <div className="mb20">
                  <label className="heading-color ff-heading fw500 mb10">
                    Address
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    placeholder="Enter your address"
                    name="address"
                    value={profileDetails?.address}
                    autoComplete="off"
                    onChange={handleOnChange}
                    ref={addressInputRef} // Attach the ref here
                    disabled={(profileDetails?.profile_locked == 'Yes') ? true : false }
                  />
                </div>
              </div>
              <div className="col-md-12">
                <div className="mb10">
                  <label className="heading-color ff-heading fw500 mb10">
                    About you (Min. 100 characters) 
                  </label>
                  <textarea
                    cols={30}
                    rows={6}
                    name="intro"
                    placeholder="Write about yourself"
                    value={profileDetails?.intro}
                    autoComplete="off"
                    onChange={handleOnChange}
                    disabled={(profileDetails?.profile_locked == 'Yes') ? true : false }
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
                    {isLoading ? (
                      <>
                        &nbsp;&nbsp; <Loader />
                      </>
                    ) : (
                      <i className="fal fa-arrow-right-long" />
                    )}
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
