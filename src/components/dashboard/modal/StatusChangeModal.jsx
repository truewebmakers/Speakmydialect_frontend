import React, { useState } from "react";
import { LightgalleryProvider, LightgalleryItem } from "react-lightgallery";
import PT from "prop-types";
import "./style.css";
import SelectInput from "../option/SelectInput";

const GROUP1 = [
  [
    "https://images.unsplash.com/photo-1592549585866-486f41343aaf?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1950&q=80",
  ],
  [
    "https://images.unsplash.com/photo-1594614271360-0ed9a570ae15?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1950&q=80",
  ],
];

const PhotoItem = ({ image, thumb, group, handleFullView }) => (
  <div style={{ maxWidth: "250px", width: "200px", padding: "5px" }}>
    <LightgalleryItem
      group={group}
      src={image}
      thumb={thumb}
      onClick={() => handleFullView(image)}
    >
      <img src={image} style={{ width: "100%" }} />
    </LightgalleryItem>
  </div>
);

export default function StatusChangeModal({
  show,
  handleClose,
  option,
  setAction,
  setReason,
  handleSave,
  action,
  reason,
  content,
}) {
  const [fullViewImage, setFullViewImage] = useState(null);

  const handleFullView = (image) => {
    setFullViewImage(image);
  };

  const closeFullView = () => {
    setFullViewImage(null);
  };

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
              <div className="content">
                <h1 style={{ textAlign: "center" }}>Documents</h1>
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  {GROUP1.map((p, idx) => (
                    <PhotoItem
                      key={idx}
                      image={p[0]}
                      thumb={p[1]}
                      group="group1"
                      handleFullView={handleFullView}
                    />
                  ))}
                </div>
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
                  {content === "User Approval" && (
                    <div className="mb-3">
                      <label className="heading-color ff-heading fw500 mb10">
                        Reason{" "}
                      </label>
                      <textarea
                        name="any_info"
                        cols={30}
                        rows={2}
                        className="form-control"
                        value={reason}
                        onChange={(e) => setReason(e.target.value)}
                        autoComplete="off"
                      />
                    </div>
                  )}
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
      </div>

      {fullViewImage && (
        <div className="full-view-container">
          <div className="full-view-content">
            <button className="close-button" onClick={closeFullView}>
              &times;
            </button>
            <img
              src={fullViewImage}
              alt="Full View"
              className="full-view-image"
            />
          </div>
        </div>
      )}
    </>
  );
}

StatusChangeModal.propTypes = {
  show: PT.bool.isRequired,
  handleClose: PT.func.isRequired,
  option: PT.array,
  setAction: PT.func.isRequired,
  setReason: PT.func.isRequired,
  handleSave: PT.func.isRequired,
  action: PT.object,
  reason: PT.string,
  content: PT.string,
};

PhotoItem.propTypes = {
  image: PT.string.isRequired,
  thumb: PT.string,
  group: PT.string.isRequired,
  handleFullView: PT.func.isRequired,
};
