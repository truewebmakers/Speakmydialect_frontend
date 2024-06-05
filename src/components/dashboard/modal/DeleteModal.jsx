import PropTypes from "prop-types";

function DeleteModal({ show, handleClose }) {
  return (
    <div
      className={`modal fade ${show ? "show d-block" : ""}`}
      tabIndex="-1"
      aria-labelledby="deleteModalLabel"
      aria-hidden={!show}
    >
      <div className="modal-dialog modal-dialog-centered">
        <div className="modal-content position-relative">
          <button
            type="button"
            className="btn-close position-absolute"
            aria-label="Close"
            style={{ top: "10px", right: "10px", zIndex: "9" }}
            onClick={handleClose}
          />
          <div className="modal-body px-4 pt-5">
            <div className="pb20">
              <h4 className="pb10 text-center text-black">
                Are you sure you want to delete?
              </h4>
              <p className="text-center">
                Do you really want to delete this record? This process can't be
                undone.
              </p>
            </div>
            <div className="d-flex justify-content-center gap-3 ">
              <button
                className="ud-btn bg-danger text-white mb25"
                onClick={handleClose}
              >
                Delete
                <i className="fal fa-arrow-right-long" />
              </button>
              <button className="ud-btn btn-dark mb25" onClick={handleClose}>
                Cancel
                <i className="fal fa-arrow-right-long" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

DeleteModal.propTypes = {
  show: PropTypes.bool.isRequired,
  handleClose: PropTypes.func.isRequired,
};

export default DeleteModal;
