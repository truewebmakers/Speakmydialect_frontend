import {
  experienceEmploymentType,
  experienceLocationType,
  monthsList,
  startYearDropdown,
} from "@/constants/constant";
import SelectInput from "../option/SelectInput";
import { useEffect, useState } from "react";

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
  editId,
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
                      <label className="form-label">Job Title</label>
                      <input
                        type="text"
                        className="form-control"
                        name="title"
                        value={experience?.title}
                        onChange={handleOnChange}
                        autoComplete="off"
                      />
                    </div>
                  </div>
                  <div className="col-md-6">
                    <div className="mb-3">
                      <label className="form-label">Company</label>
                      <input
                        type="text"
                        className="form-control"
                        name="company_name"
                        value={experience?.company_name}
                        onChange={handleOnChange}
                        autoComplete="off"
                      />
                    </div>
                  </div>
                  <div className="col-md-6">
                    <div className="mb-3">
                      <label className="form-label">Location</label>
                      <input
                        type="text"
                        className="form-control"
                        name="location"
                        value={experience?.location}
                        onChange={handleOnChange}
                        autoComplete="off"
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
                    <label className="form-label">Job Description</label>
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
                  {editId == true ? "Update" : "Save"}
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
