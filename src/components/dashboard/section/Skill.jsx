import { useState } from "react";
import SelectInput from "../option/SelectInput";
import { Link } from "react-router-dom";

export default function Skill() {
  const [getSkill, setSkill] = useState({
    option: "Designer",
    value: null,
  });
  const [getPoint, setPoint] = useState({
    option: "80",
    value: null,
  });
  const [getSkill2, setSkill2] = useState({
    option: "Developer",
    value: null,
  });
  const [getPoint2, setPoint2] = useState({
    option: "70",
    value: null,
  });
  const [getSkill3, setSkill3] = useState({
    option: "Video Editor",
    value: null,
  });
  const [getPoint3, setPoint3] = useState({
    option: "75",
    value: null,
  });

  // handlers
  const skillHandler = (option, value) => {
    setSkill({ option, value });
  };
  const pointHandler = (option, value) => {
    setPoint({ option, value });
  };
  const skillHandler2 = (option, value) => {
    setSkill2({ option, value });
  };
  const pointHandler2 = (option, value) => {
    setPoint2({ option, value });
  };
  const skillHandler3 = (option, value) => {
    setSkill3({ option, value });
  };
  const pointHandler3 = (option, value) => {
    setPoint3({ option, value });
  };
  return (
    <>
      <div className="ps-widget bgc-white bdrs4 p30 mb30 overflow-hidden position-relative">
        <div className="bdrb1 pb15 mb25">
          <h5 className="list-title">Skills</h5>
        </div>
        <div className="col-lg-7">
          <div className="row">
            <form className="form-style1">
              <div className="row">
                <div className="col-sm-6">
                  <div className="mb20">
                    <SelectInput
                      label="Skills 1"
                      defaultSelect={getSkill}
                      data={[
                        {
                          option: "Designer",
                          value: "designer",
                        },
                        {
                          option: "UI/UX",
                          value: "ui-ux",
                        },
                      ]}
                      handler={skillHandler}
                    />
                  </div>
                </div>
                <div className="col-sm-6">
                  <div className="mb20">
                    <SelectInput
                      label="Point"
                      defaultSelect={getPoint}
                      data={[
                        {
                          option: "80",
                          value: "80",
                        },
                        {
                          option: "90",
                          value: "90",
                        },
                      ]}
                      handler={pointHandler}
                    />
                  </div>
                </div>
                <div className="col-sm-6">
                  <div className="mb20">
                    <SelectInput
                      label="Skills 2"
                      defaultSelect={getSkill2}
                      data={[
                        {
                          option: "Developer",
                          value: "developer",
                        },
                        {
                          option: "Programmer",
                          value: "programmer",
                        },
                      ]}
                      handler={skillHandler2}
                    />
                  </div>
                </div>
                <div className="col-sm-6">
                  <div className="mb20">
                    <SelectInput
                      label="Point"
                      defaultSelect={getPoint2}
                      data={[
                        {
                          option: "70",
                          value: "70",
                        },
                        {
                          option: "80",
                          value: "80",
                        },
                      ]}
                      handler={pointHandler2}
                    />
                  </div>
                </div>
                <div className="col-sm-6">
                  <div className="mb20">
                    <SelectInput
                      label="Skills 3"
                      defaultSelect={getSkill3}
                      data={[
                        {
                          option: "Video Editor",
                          value: "video-editor",
                        },
                        {
                          option: "Programmer",
                          value: "programmer",
                        },
                      ]}
                      handler={skillHandler3}
                    />
                  </div>
                </div>
                <div className="col-sm-6">
                  <div className="mb20">
                    <SelectInput
                      label="Point"
                      defaultSelect={getPoint3}
                      data={[
                        {
                          option: "75",
                          value: "75",
                        },
                        {
                          option: "80",
                          value: "80",
                        },
                      ]}
                      handler={pointHandler3}
                    />
                  </div>
                </div>
                <div className="col-md-12">
                  <div className="text-start">
                    <Link className="ud-btn btn-thm" to="/contact">
                      Save
                      <i className="fal fa-arrow-right-long" />
                    </Link>
                  </div>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
}

// import React, { useEffect, useState } from "react";
// import SelectInput from "../option/SelectInput";
// import {
//   apiMethods,
//   apiUrls,
//   skillLevel,
//   skillStatus,
// } from "@/constants/constant";
// import UseApi from "@/hook/useApi";
// import { toast } from "react-toastify";
// import { useAuth } from "@/context/authContext";

// export default function Skill() {
//   const [languages, setLanguages] = useState([
//     {
//       language: { option: "Select", value: null },
//       level: { option: "Select", value: null },
//       status: null,
//     },
//   ]);
//   const [languageListing, setLanguageListing] = useState([]);
//   const { token, userId } = useAuth();

//   const handleLanguageChange = (index, key, value) => {
//     const newLanguages = [...languages];
//     newLanguages[index][key] = value;
//     setLanguages(newLanguages);
//   };

//   const handleAddLanguage = () => {
//     setLanguages([
//       ...languages,
//       {
//         language: { option: "Select", value: null },
//         level: { option: "Select", value: null },
//         status: null,
//       },
//     ]);
//   };

//   const handleDeleteLanguage = (index) => {
//     const newLanguages = [...languages];
//     newLanguages.splice(index, 1);
//     setLanguages(newLanguages);
//   };

//   const handleStatusChange = (index, id, name) => {
//     const newLanguages = [...languages];
//     newLanguages[index].status = id === languages[index].status ? null : name;
//     setLanguages(newLanguages);
//   };

//   const getLanguages = async () => {
//     try {
//       const response = await UseApi(apiUrls.getLanguages, apiMethods.GET);
//       if (response?.status == 200 || response?.status == 201) {
//         const languageData = response?.data?.data;
//         setLanguageListing(languageData);
//         sessionStorage.setItem("languages", JSON.stringify(languageData));
//       }
//     } catch (error) {
//       toast.error("Error fetching languages");
//     }
//   };

//   useEffect(() => {
//     const storedLanguages = sessionStorage.getItem("languages");
//     if (storedLanguages) {
//       setLanguageListing(JSON.parse(storedLanguages));
//     } else {
//       getLanguages();
//     }
//   }, []);

//   const handleSave = async () => {
//     try {
//       if (!languages || languages.length === 0) {
//         console.error("Languages state is null or empty");
//         return;
//       }

//       // Check if any language object in languages state is null
//       const nullLanguage = languages.find(
//         (language) => !language || typeof language !== "object"
//       );
//       if (nullLanguage) {
//         console.error(
//           "One or more language objects in languages state is null or not an object"
//         );
//         return;
//       }
//       // set headers
//       const headers = {
//         Authorization: `Bearer ${token}`,
//       };
//       console.log("hii");

//       // set body
//       const bodyData = { skills: languages };
//       console.log(bodyData);
//       // Call signup API
//       const response = await UseApi(
//         apiUrls.updateUserSkill + userId,
//         apiMethods.POST,
//         bodyData,
//         headers
//       );
//       console.log(response, "resss");
//       if (response?.status == 200 || response?.status == 201) {
//         toast.success(response?.data?.message);
//         return;
//       } else {
//         toast.error(response?.data?.message);
//       }
//     } catch (err) {
//       toast.error(err);
//     }
//   };

//   return (
//     <>
//       <div className="ps-widget bgc-white bdrs4 p30 mb30 overflow-hidden position-relative">
//         <div className="bdrb1 pb15 mb25">
//           <h5 className="list-title">Skills</h5>
//         </div>

//         <div className="col-lg-7">
//           <button
//             className="ud-btn btn-thm default-box-shadow2 small-plus-btn"
//             onClick={handleAddLanguage}
//           >
//             Add Skill
//           </button>
//           <div className="row">
//             {languages?.map((language, index) => (
//               <form key={index} className="form-style1">
//                 <div className="row align-items-center">
//                   <div className="col-sm-3 mb20">
//                     <SelectInput
//                       label="Language"
//                       defaultSelect={languages[index]?.language}
//                       data={languageListing?.map((item) => ({
//                         option: item?.id,
//                         value: item?.id,
//                       }))}
//                       handler={(value) =>
//                         handleLanguageChange(index, "language", value)
//                       }
//                     />
//                   </div>
//                   <div className="col-sm-3 mb20">
//                     <SelectInput
//                       label="Level"
//                       defaultSelect={languages[index]?.level}
//                       data={skillLevel?.map((item) => ({
//                         option: item?.name,
//                         value: item?.name,
//                       }))}
//                       handler={(value) =>
//                         handleLanguageChange(index, "level", value)
//                       }
//                     />
//                   </div>
//                   <div className="col-sm-3 mb20">
//                     <label className="heading-color ff-heading fw500 mb10">
//                       Status
//                     </label>
//                     {skillStatus?.map((item) => (
//                       <div key={item?.id}>
//                         <input
//                           type="checkbox"
//                           checked={language?.status === item?.id}
//                           onChange={() =>
//                             handleStatusChange(index, item?.id, item?.name)
//                           }
//                         />{" "}
//                         <label>{item?.name}</label>
//                       </div>
//                     ))}
//                   </div>
//                   {index > 0 && (
//                     <div className="col-sm-3 mb20">
//                       <label className="heading-color ff-heading fw500 mb10">
//                         Action
//                       </label>
//                       <button
//                         className="ud-btn btn-thm default-box-shadow2 form-control"
//                         type="button"
//                         onClick={() => handleDeleteLanguage(index)}
//                       >
//                         Delete
//                       </button>
//                     </div>
//                   )}
//                 </div>
//               </form>
//             ))}
//           </div>
//           <div className="col-md-12">
//             <div className="text-start">
//               <button
//                 className="ud-btn btn-thm default-box-shadow2"
//                 type="button"
//                 onClick={handleSave}
//               >
//                 Save
//                 <i className="fal fa-arrow-right-long" />
//               </button>
//             </div>
//           </div>
//         </div>
//       </div>
//     </>
//   );
// }
