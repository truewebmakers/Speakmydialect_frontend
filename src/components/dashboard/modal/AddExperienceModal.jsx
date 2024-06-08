import {
  experienceEmploymentType,
  experienceLocationType,
} from "@/constants/constant";
import SelectInput from "../option/SelectInput";

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
                        <label className="form-label">Starting Month</label>
                        <input
                          type="date"
                          className="form-control"
                          name="start_month"
                          value={experience?.start_month}
                          onChange={handleOnChange}
                        />
                      </div>
                    </div>

                    <div className="col-md-6">
                      <div className="mb-3">
                        <label className="form-label">Starting Year</label>
                        <input
                          type="date"
                          className="form-control"
                          name="start_year"
                          value={experience?.start_year}
                          onChange={handleOnChange}
                        />
                      </div>
                    </div>
                    <div className="col-md-6">
                      <div className="mb-3">
                        <label className="form-label">Ending Month</label>
                        <input
                          type="date"
                          className="form-control"
                          name="end_month"
                          value={experience?.end_month}
                          onChange={handleOnChange}
                        />
                      </div>
                    </div>
                    <div className="col-md-6">
                      <div className="mb-3">
                        <label className="form-label">Ending Year</label>
                        <input
                          type="date"
                          className="form-control"
                          name="end_year"
                          value={experience?.end_year}
                          onChange={handleOnChange}
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
                          value={Number(experience?.present_working)}
                          onChange={(e) => handleChecked(e)}
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
