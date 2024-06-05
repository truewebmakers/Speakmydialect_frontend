import React, { useEffect, useState } from "react";
import SelectInput from "../option/SelectInput";
import { apiMethods, apiUrls, skillLevel } from "@/constants/constant";
import UseApi from "@/hook/useApi";
import { toast } from "react-toastify";
import { useSelector } from "react-redux";
import { Tooltip } from "react-tooltip";

export default function Skill() {
  const [languages, setLanguages] = useState([
    {
      language: { option: "Select", value: null },
      level: { option: "Select", value: null },
      status: "active",
    },
  ]);
  const [languageListing, setLanguageListing] = useState([]);
  const { user } = useSelector((state) => state.auth);

  const handleFieldChange = (index, field, option, value) => {
    const newLanguages = [...languages];
    newLanguages[index][field] = {
      option: option,
      value: value,
    };
    setLanguages(newLanguages);
  };

  const handleAddLanguage = () => {
    setLanguages([
      ...languages,
      {
        language: { option: "Select", value: null },
        level: { option: "Select", value: null },
        status: "active",
      },
    ]);
  };

  const handleDeleteLanguage = (index) => {
    const newLanguages = [...languages];
    newLanguages.splice(index, 1);
    setLanguages(newLanguages);
  };

  const handleChecked = (index, e) => {
    const newLanguages = [...languages];
    newLanguages[index].status = e.target.checked ? "active" : "inactive";
    setLanguages(newLanguages);
  };

  const getLanguages = async () => {
    try {
      const response = await UseApi(apiUrls.getLanguages, apiMethods.GET);
      if (response?.status == 200 || response?.status == 201) {
        const languageData = response?.data?.data;
        setLanguageListing(languageData);
        sessionStorage.setItem("languages", JSON.stringify(languageData));
      }
    } catch (error) {
      toast.error("Error fetching languages");
    }
  };

  useEffect(() => {
    const storedLanguages = sessionStorage.getItem("languages");
    if (storedLanguages) {
      setLanguageListing(JSON.parse(storedLanguages));
    } else {
      getLanguages();
    }
  }, []);

  const handleSave = async () => {
    try {
      // set headers
      const headers = {
        Authorization: `Bearer ${user?.token}`,
      };
      // set body
      const bodyData = {
        skills: languages?.map((lang) => ({
          language: lang?.language?.value,
          level: lang?.level?.value,
          status: lang?.status?.toLowerCase(),
        })),
      };
      // Call signup API
      const response = await UseApi(
        apiUrls.updateUserSkill + user?.userInfo?.id,
        apiMethods.POST,
        bodyData,
        headers
      );
      if (response?.status == 200 || response?.status == 201) {
        toast.success(response?.data?.message);
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
        <div className="bdrb1 pb15 mb30 d-sm-flex justify-content-between">
          <h5 className="list-title">Skills</h5>
          <a className="add-more-btn text-thm" onClick={handleAddLanguage}>
            <i className="icon far fa-plus mr10" />
            Add Skill
          </a>
        </div>
        <div className="col-lg-14">
          <div className="row">
            {languages?.map((language, index) => (
              <form key={index} className="form-style1">
                <div className="row align-items-center">
                  <div className="col-sm-3 mb20">
                    <SelectInput
                      label="Language"
                      defaultSelect={languages[index]?.language}
                      data={languageListing?.map((item) => ({
                        option: item?.name,
                        value: item?.id,
                      }))}
                      handler={(option, value) =>
                        handleFieldChange(index, "language", option, value)
                      }
                    />
                  </div>

                  <div className="col-sm-3 mb20">
                    <SelectInput
                      label="Level"
                      defaultSelect={languages[index]?.level}
                      data={skillLevel?.map((item) => ({
                        option: item?.name,
                        value: item?.name?.toLowerCase(),
                      }))}
                      handler={(option, value) =>
                        handleFieldChange(index, "level", option, value)
                      }
                    />
                  </div>
                  <div className="col-sm-3 mb20">
                    <label className="heading-color ff-heading fw500 mb10">
                      Status
                    </label>
                    <div className="switch-style1">
                      <div className="form-check form-switch mb20">
                        <input
                          className="form-check-input"
                          type="checkbox"
                          id={`flexSwitchCheckDefault`}
                          onChange={(e) => handleChecked(index, e)}
                          defaultChecked={language?.status}
                          value={language?.status}
                        />
                      </div>
                    </div>
                  </div>
                  {index > 0 && (
                    <div className="col-sm-3 mb20">
                      <div className="del-edit">
                        <div className="d-flex">
                          <a
                            className="icon me-2"
                            id={`edit-${index}`}
                            onClick={() => handleDeleteLanguage(index)}
                          >
                            <Tooltip
                              anchorSelect={`#edit-${index}`}
                              className="ui-tooltip"
                            >
                              Delete
                            </Tooltip>
                            <span className="flaticon-delete" />
                          </a>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              </form>
            ))}
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
      </div>
    </>
  );
}
