import React from "react";
import "./style.css";

export default function ShowInfoModal({
  show,
  handleClose,
  content,
  showData,
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
            <div className="bdrb1 pb10 mb30 d-sm-flex justify-content-center pt10">
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
              <div className="content">{showData}</div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
