export default function AddEducationModal({
  show,
  handleClose,
  education,
  handleOnChange,
  handleSave,
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
                      <label className="form-label">Degree Name</label>
                      <input
                        type="text"
                        className="form-control"
                        name="degree_name"
                        placeholder="Ex: Bachelor's"
                        value={education.degree_name}
                        onChange={handleOnChange}
                      />
                    </div>
                  </div>
                  <div className="col-md-6">
                    <div className="mb-3">
                      <label className="form-label">University Name</label>
                      <input
                        type="text"
                        className="form-control"
                        name="university_name"
                        placeholder="Ex: Boston University"
                        value={education.university_name}
                        onChange={handleOnChange}
                      />
                    </div>
                  </div>
                </div>
                <div className="row">
                  <div className="col-md-6">
                    <div className="mb-3">
                      <label className="form-label">Starting Year</label>
                      <input
                        type="date"
                        className="form-control"
                        name="year_start"
                        value={education.year_start}
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
                        name="year_end"
                        value={education.year_end}
                        onChange={handleOnChange}
                      />
                    </div>
                  </div>
                </div>
                <div className="mb-3">
                  <label className="form-label">Degree Info</label>
                  <textarea
                    name="any_info"
                    cols={30}
                    rows={2}
                    className="form-control"
                    value={education.any_info}
                    onChange={handleOnChange}
                  />
                </div>
                <button
                  type="button"
                  className="ud-btn btn-thm"
                  onClick={handleSave}
                >
                  Update
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
