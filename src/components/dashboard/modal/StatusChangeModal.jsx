import React, { useEffect, useState } from "react";
import "./style.css";
import SelectInput from "../option/SelectInput";
import UseApi from "@/hook/useApi";
import { apiMethods, apiUrls } from "@/constants/constant";
import { useSelector } from "react-redux";
import Loader from "@/components/common/loader";

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
  userId,
  isLoading,
}) {
  const { user } = useSelector((state) => state.auth);
  const [images, setImages] = useState([]);
  const [previewImage, setPreviewImage] = useState(null);

  const getUserDocuments = async () => {
    try {
      const headers = { Authorization: `Bearer ${user?.token}` };

      const response = await UseApi(
        apiUrls.getUserDocuments + userId,
        apiMethods.GET,
        null,
        headers
      );
      if (response?.status == 200 || response?.status == 201) {
        const imgs = response?.data?.data;
        setImages(imgs);
      }
    } catch (error) {
      toast.error("Error fetching countries");
    }
  };

  useEffect(() => {
    if (userId) {
      getUserDocuments();
    }
  }, [userId]);

  return (
    <>
      {previewImage && (
        <div className="preview-container">
          <div
            className="preview-overlay"
            onClick={() => setPreviewImage(null)}
          ></div>
          <div className="preview-content">
            <button
              className="btn-close preview-close"
              onClick={() => setPreviewImage(null)}
            >
              <i class="fa fa-times" aria-hidden="true"></i>
            </button>
            <img src={previewImage} alt="Preview" className="preview-image" />
          </div>
        </div>
      )}
      <div
        className={`modal fade ${show ? "show d-block" : ""}`}
        tabIndex="-1"
        id="proposalModal"
        aria-labelledby="proposalModalLabel"
        aria-hidden={!show}
      >
        <div className="modal-dialog modal-dialog-centered modal-lg">
          <div className="modal-content position-relative">
            <div className="bdrb1 pb10 mb5 d-sm-flex justify-content-center pt10">
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
            <div className="modal-body p-4 pt-2">
              <h4 className="content mb15">
                {images?.length > 0 ? "Documents" : "No Document Uploaded"}
              </h4>
              <div className="image-grid">
                {images?.map((image, index) => (
                  <img
                    key={index}
                    src={image?.path}
                    alt={image?.type}
                    className="icon-image"
                    onClick={() => setPreviewImage(image?.path)}
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
                  {isLoading ? <Loader /> : "Save"}
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
