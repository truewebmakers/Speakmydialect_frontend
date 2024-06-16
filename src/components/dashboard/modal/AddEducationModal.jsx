import Loader from "@/components/common/loader";
import SelectInput from "../option/SelectInput";
import { useEffect, useState } from "react";
import { startYearDropdown } from "@/constants/constant";

export default function AddEducationModal({
  show,
  handleClose,
  education,
  handleOnChange,
  handleSave,
  editId,
  isLoading,
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
                {editId ? "Update Education" : "Add Education"}
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
                        Degree Name
                      </label>
                      <input
                        type="text"
                        className="form-control"
                        name="degree_name"
                        placeholder="Ex: Bachelor's"
                        value={education.degree_name}
                        onChange={handleOnChange}
                        autoComplete="off"
                      />
                    </div>
                  </div>
                  <div className="col-md-6">
                    <div className="mb-3">
                      <label className="heading-color ff-heading fw500 mb10">
                        University Name
                      </label>
                      <input
                        type="text"
                        className="form-control"
                        name="university_name"
                        placeholder="Ex: Boston University"
                        value={education.university_name}
                        onChange={handleOnChange}
                        autoComplete="off"
                      />
                    </div>
                  </div>
                </div>
                <div className="row">
                  <div className="col-md-6">
                    <div className="mb-3">
                      <SelectInput
                        label="Starting Year"
                        defaultSelect={education?.year_start}
                        data={years?.map((year) => ({
                          option: year,
                          value: year,
                        }))}
                        handler={(option, value) =>
                          handleOnChange({
                            target: { name: "year_start", value: value },
                          })
                        }
                      />
                    </div>
                  </div>
                  <div className="col-md-6">
                    <div className="mb-3">
                      <SelectInput
                        label="Ending Year"
                        defaultSelect={education?.year_end}
                        data={years?.map((year) => ({
                          option: year,
                          value: year,
                        }))}
                        handler={(option, value) =>
                          handleOnChange({
                            target: { name: "year_end", value: value },
                          })
                        }
                      />
                    </div>
                  </div>
                </div>
                <div className="mb-3">
                  <label className="heading-color ff-heading fw500 mb10">
                    Degree Info
                  </label>
                  <textarea
                    name="any_info"
                    cols={30}
                    rows={2}
                    className="form-control"
                    value={education.any_info}
                    onChange={handleOnChange}
                    autoComplete="off"
                  />
                </div>
                <button
                  type="button"
                  className="ud-btn btn-thm"
                  onClick={handleSave}
                >
                  {editId ? "Update" : "Save"}
                  {isLoading ? (
                    <>
                      &nbsp;&nbsp; <Loader />
                    </>
                  ) : (
                    <i className="fal fa-arrow-right-long" />
                  )}
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
