import React, { useEffect, useState } from "react";
import SelectInput from "../option/SelectInput";
import { apiMethods, apiUrls, skillLevel } from "@/constants/constant";
import UseApi from "@/hook/useApi";
import { toast } from "react-toastify";
import { useSelector } from "react-redux";
import { Tooltip } from "react-tooltip";
import Loader from "@/components/common/loader";
import { getDialects, getLanguages } from "@/utils/commonFunctions";

export default function Skill() {
  const [skills, setSkills] = useState([]);
  const [languageListing, setLanguageListing] = useState([]);
  const [dialectOptions, setDialectOptions] = useState([]); // Store dialect options for each language
  const { user } = useSelector((state) => state.auth);
  const [isLoading, setIsLoading] = useState(false);

  const handleFieldChange = (index, field, option, value) => {
    const newSkills = [...skills];
    newSkills[index][field] = {
      option: option,
      value: value,
    };
    setSkills(newSkills);
  };

  const handleChecked = (index, e) => {
    const newSkills = [...skills];
    newSkills[index].status = e.target.checked ? "active" : "inactive";
    setSkills(newSkills);
  };

  const handleAddLanguage = () => {
    toast.info("New Skill? Add It Here!");
    setSkills([
      {
        language: { option: "Select", value: null },
        level: { option: "Select", value: null },
        dialect: { option: "Select", value: null },
        status: "active",
      },
      ...skills,
    ]);
  };

  const handleDeleteLanguage = (index) => {
    const newSkills = [...skills];
    const id = newSkills[index]?.id;
    if (id !== undefined) {
      deleteExperienceId(id)
        .then(() => {
          newSkills.splice(index, 1);
          setSkills(newSkills);
        })
        .catch((error) => {
          toast.error("Failed to delete experience with id:", id, error);
        });
    } else {
      newSkills.splice(index, 1);
      setSkills(newSkills);
    }
  };

  const deleteExperienceId = async (id) => {
    try {
      const headers = {
        Authorization: `Bearer ${user?.token}`,
      };
      const response = await UseApi(
        apiUrls.deleteSkills + id,
        apiMethods.POST,
        null,
        headers
      );
      if (response?.status === 200 || response?.status === 201) {
        toast.success("Deleted Successfully");
      }
    } catch (error) {
      toast.error("Error fetching experience");
    }
  };

  const getSkills = async () => {
    try {
      const headers = {
        Authorization: `Bearer ${user?.token}`,
      };
      const response = await UseApi(
        apiUrls.getSkills + user?.userInfo?.id,
        apiMethods.GET,
        null,
        headers
      );
      if (response?.status === 200 || response?.status === 201) {
        const skillsData = response?.data?.data;
        const storedLanguages = sessionStorage.getItem("languages");
        const storedDialect = sessionStorage.getItem("dialect");

        const formattedSkills = skillsData?.map((skill) => ({
          id: skill.id,
          language: {
            option:
              (storedLanguages &&
                JSON.parse(storedLanguages)?.find(
                  (lang) => lang?.id == skill?.language
                )?.name) ||
              "Select",
            value: skill?.language,
          },
          dialect: {
            option:
              (storedDialect &&
                JSON.parse(storedDialect)?.find(
                  (dialect) => dialect?.dialect == skill?.dialect // Match by id for dialect
                )?.dialect) ||
              "Select", // Default to "Select" if no match is found
            value: skill?.dialect, // Use the id or value of the dialect
          },
          level: {
            option:
              skill?.level?.charAt(0)?.toUpperCase() + skill?.level?.slice(1),
            value: skill?.level,
          },
          status: skill?.status,
        }));

        setSkills(formattedSkills);
      }
    } catch (error) {
      toast.error("Error fetching skills");
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      const storedLanguages = sessionStorage.getItem("languages");
      const storedDialect = sessionStorage.getItem("dialect");
      if (storedLanguages?.length > 0) {
        setLanguageListing(JSON.parse(storedLanguages));
        getSkills();
      } else {
        await getLanguages(setLanguageListing);
        getSkills();
      }
      if (storedDialect?.length > 0) {
        setDialectOptions(JSON.parse(storedDialect));
        getSkills();
      } else {
        await getDialects(setDialectOptions);
        getSkills();
      }
    };
    fetchData();
  }, []);

  const handleSave = async () => {
    setIsLoading(true);
    try {
      // Validation: Check for empty fields
      for (const skill of skills) {
        if (
          !skill?.language?.value ||
          !skill?.level?.value ||
          !skill?.dialect?.value
        ) {
          toast.error("Please fill in all fields for each skill.");
          setIsLoading(false);
          return; // Stop the function if a field is empty
        }
      }

      const headers = {
        Authorization: `Bearer ${user?.token}`,
      };
      const bodyData = {
        skills: skills?.map((skill) => ({
          language: skill?.language?.value,
          level: skill?.level?.value,
          status: skill?.status?.toLowerCase(),
          dialect: skill?.dialect?.value,
        })),
      };
      const response = await UseApi(
        apiUrls.updateUserSkill + user?.userInfo?.id,
        apiMethods.POST,
        bodyData,
        headers
      );
      if (response?.status === 200 || response?.status === 201) {
        toast.success(response?.data?.message);
      } else {
        toast.error(response?.data?.message);
      }
    } catch (err) {
      toast.error(err);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="ps-widget bgc-white bdrs4 p30 mb30 position-relative">
      <div className="bdrb1 pb15 mb30 d-sm-flex justify-content-between align-items-center">
        <h5 className="list-title">Dialect Known</h5>
        <a
          className="add-more-btn text-thm d-flex align-items-center"
          onClick={handleAddLanguage}
        >
          <i className="add-icon far fa-plus mr10" />
          Add Dialect
        </a>
      </div>
      <div className="col-lg-14">
        <div className="row">
          {skills?.map((skill, index) => (
            <form key={index} className="form-style1">
              <div className="row align-items-center">
                <div className="col-sm-3 mb20">
                  <SelectInput
                    label="Language"
                    defaultSelect={{
                      option: skill?.language?.option || "Select",
                      value: skill?.language?.value || null,
                    }}
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
                    label="Dialect"
                    defaultSelect={{
                      option: skill?.dialect?.option || "Select",
                      value: skill?.dialect?.value || null,
                    }}
                    data={dialectOptions
                      ?.filter(
                        (item) => item?.languageId === skill?.language?.value
                      )
                      ?.map((item) => ({
                        option: item?.dialect,
                        value: item?.dialect,
                      }))}
                    handler={(option, value) =>
                      handleFieldChange(index, "dialect", option, value)
                    }
                  />
                </div>
                <div className="col-sm-3 mb20">
                  <SelectInput
                    label="Level"
                    defaultSelect={{
                      option: skill?.level?.option || "Select",
                      value: skill?.level?.value || null,
                    }}
                    data={skillLevel?.map((item) => ({
                      option: item?.name,
                      value: item?.name.toLowerCase(),
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
                        id={`flexSwitchCheckDefault-${index}`}
                        checked={skill?.status === "active"}
                        onChange={(e) => handleChecked(index, e)}
                      />
                    </div>
                  </div>
                </div>
                {index >= 0 && (
                  <div className="col-sm-3 mb20">
                    <div className="del-edit">
                      <div className="d-flex">
                        <a
                          type="button"
                          className="icon me-2"
                          id={`delete-${index}`}
                          onClick={() => handleDeleteLanguage(index)}
                        >
                          <Tooltip
                            anchorSelect={`#delete-${index}`}
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
    </div>
  );
}
