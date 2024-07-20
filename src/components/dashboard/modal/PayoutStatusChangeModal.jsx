import React from "react";
import "./style.css";
import SelectInput from "../option/SelectInput";

export default function PayoutStatusChangeModal({
  show,
  handleClose,
  option,
  setAction,
  handleSave,
  action,
  content,
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
            <div className="bdrb1 pb10 mb10 d-sm-flex justify-content-center pt10">
              <h5 className="list-title pt10">{content}</h5>
            </div>
            <button
              type="button"
              className="btn-close position-absolute"
              data-bs-dismiss="modal"
              aria-label="Close"
              style={{ top: "10px", right: "10px" }}
              onClick={handleClose}
            />
            <div className="modal-body p-4">
              <form>
                <div className="row"></div>
                <div className="row">
                  <div className="col-md-12">
                    <div className="mb-3">
                      <SelectInput
                        label="Choose Action"
                        defaultSelect={action}
                        data={option?.map((year) => ({
                          option: year?.name,
                          value: year?.key,
                        }))}
                        handler={(option, value) =>
                          setAction({
                            option: option,
                            value: value,
                          })
                        }
                      />
                    </div>
                  </div>
                </div>
                <button
                  type="button"
                  className="ud-btn btn-thm"
                  onClick={() => handleSave()}
                >
                  Save
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
