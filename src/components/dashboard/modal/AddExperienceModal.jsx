import {
  experienceEmploymentType,
  experienceLocationType,
  monthsList,
  startYearDropdown,
} from "@/constants/constant";
import SelectInput from "../option/SelectInput";
import { useEffect, useState } from "react";
import { getCountries } from "@/utils/commonFunctions";

export default function AddExperienceModal({
  show,
  handleClose,
  experience,
  handleOnChange,
  handleSave,
  handleChecked,
  handleFieldChange,
  employment_type,
  location_type,
  location,
  editId,
  countryList,
}) {
  const [years, setYears] = useState([]);
  let startYear = startYearDropdown;
  let date = new Date();
  let endYear = date.getFullYear();

  useEffect(() => {
    let temp = [];
    for (let val = startYear; val <= endYear; val++) {
      temp.push(val);
    }
    setYears(temp);
  }, []);

  return (
    <>
      <div
        className={`modal fade ${show ? "show d-block" : ""}`}
        tabIndex="-1"
        id="proposalModal"
        aria-labelledby="proposalModalLabel"
        aria-hidden={!show}
      >
        <div className="modal-dialog modal-dialog-centered modal-lg">
          <div className="modal-content position-relative">
            <div className="bdrb1 pb10 mb30 d-sm-flex justify-content-center pt10">
              <h5 className="list-title pt10">
                {editId ? "Update Experience" : "Add Experience"}
              </h5>
            </div>
            <button
              type="button"
              className="btn-close position-absolute"
              data-bs-dismiss="modal"
              aria-label="Close"
              style={{ top: "10px", right: "10px", zIndex: "9" }}
              onClick={handleClose}
            />
            <div className="modal-body p-4">
              <form>
                <div className="row">
                  <div className="col-md-6">
                    <div className="mb-3">
                      <label className="heading-color ff-heading fw500 mb10">
                        Job Title
                      </label>
                      <input
                        type="text"
                        className="form-control"
                        name="title"
                        placeholder="Enter Job Title"
                        value={experience?.title}
                        onChange={handleOnChange}
                        autoComplete="off"
                      />
                    </div>
                  </div>
                  <div className="col-md-6">
                    <div className="mb-3">
                      <label className="heading-color ff-heading fw500 mb10">
                        Company
                      </label>
                      <input
                        type="text"
                        className="form-control"
                        name="company_name"
                        placeholder="Enter Company Name"
                        value={experience?.company_name}
                        onChange={handleOnChange}
                        autoComplete="off"
                      />
                    </div>
                  </div>
                  <div className="col-md-6">
                    <div className="mb-3">
                      <SelectInput
                        label="Location"
                        defaultSelect={location}
                        data={countryList?.map((item) => ({
                          option: item?.name,
                          value: item?.id,
                        }))}
                        handler={(option, value) =>
                          handleFieldChange("location", option, value)
                        }
                      />
                    </div>
                  </div>
                  <div className="col-sm-6 mb20">
                    <SelectInput
                      label="Location Type"
                      defaultSelect={location_type}
                      data={experienceLocationType?.map((item) => ({
                        option: item?.name,
                        value: item?.name,
                      }))}
                      handler={(option, value) =>
                        handleFieldChange("location_type", option, value)
                      }
                    />
                  </div>
                  <div className="col-sm-12 mb20">
                    <SelectInput
                      label="Employment Type"
                      defaultSelect={employment_type}
                      data={experienceEmploymentType?.map((item) => ({
                        option: item?.name,
                        value: item?.name,
                      }))}
                      handler={(option, value) =>
                        handleFieldChange("employment_type", option, value)
                      }
                    />
                  </div>
                  <div className="row">
                    <div className="col-md-6">
                      <div className="mb-3">
                        <SelectInput
                          label="Starting Month"
                          defaultSelect={experience?.start_month}
                          data={monthsList?.map((month) => ({
                            option: month?.name,
                            value: month?.name,
                          }))}
                          handler={(option, value) =>
                            handleOnChange({
                              target: { name: "start_month", value: value },
                            })
                          }
                        />
                      </div>
                    </div>

                    <div className="col-md-6">
                      <div className="mb-3">
                        <SelectInput
                          label="Starting Year"
                          defaultSelect={experience?.start_year}
                          data={years?.map((year) => ({
                            option: year,
                            value: year,
                          }))}
                          handler={(option, value) =>
                            handleOnChange({
                              target: { name: "start_year", value: value },
                            })
                          }
                        />
                      </div>
                    </div>
                    <div className="col-md-6">
                      <div className="mb-3">
                        <SelectInput
                          label="Ending Month"
                          defaultSelect={experience?.end_month}
                          data={monthsList?.map((month) => ({
                            option: month?.name,
                            value: month?.name,
                          }))}
                          handler={(option, value) =>
                            handleOnChange({
                              target: { name: "end_month", value: value },
                            })
                          }
                          disable={
                            experience?.present_working == 1 ? true : false
                          }
                        />
                      </div>
                    </div>
                    <div className="col-md-6">
                      <div className="mb-3">
                        <SelectInput
                          label="Ending Year"
                          defaultSelect={experience?.end_year}
                          data={years?.map((year) => ({
                            option: year,
                            value: year,
                          }))}
                          handler={(option, value) =>
                            handleOnChange({
                              target: { name: "end_year", value: value },
                            })
                          }
                          disable={
                            experience?.present_working == 1 ? true : false
                          }
                        />
                      </div>
                    </div>
                  </div>
                  <div className="col-md-8">
                    <div className="mb-3">
                      <label className="custom_checkbox">
                        I am currently working in this role
                        <input
                          type="checkbox"
                          onChange={(e) => handleChecked(e)}
                          checked={experience?.present_working}
                        />
                        <span className="checkmark" />
                      </label>
                    </div>
                  </div>
                  <div className="mb-3">
                    <label className="heading-color ff-heading fw500 mb10">
                      Job Description
                    </label>
                    <textarea
                      name="job_description"
                      cols={30}
                      rows={2}
                      className="form-control"
                      value={experience?.job_description}
                      onChange={handleOnChange}
                      autoComplete="off"
                    />
                  </div>
                </div>
                <button
                  type="button"
                  className="ud-btn btn-thm"
                  onClick={handleSave}
                >
                  {editId ? "Update" : "Save"}
                  <i className="fal fa-arrow-right-long" />
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
