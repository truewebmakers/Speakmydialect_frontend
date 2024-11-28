// DocumentUploadForm.js
import { useState } from "react";
import { toast } from "react-toastify";
import { apiMethods, apiUrls } from "@/constants/constant";
import Loader from "@/components/common/loader";
import UseApi from "@/hook/useApi";

const DocumentUploadForm = ({
  uploadedFiles,
  setUploadedFiles,
  fileUpload,
  setFileUpload,
  isLoading,
  handleSubmit,
}) => {
  const handleFileUpload = async (e, fileType) => {
    const { name, files } = e.target;
    const file = files[0];
    setFileUpload((prevState) => ({ ...prevState, [name]: file }));

    try {
      const headers = { "Content-Type": "multipart/form-data" };
      const bodyData = { file, type: fileType, side: "front" };
      const response = await UseApi(
        apiUrls.uploadDoc,
        apiMethods.POST,
        bodyData,
        headers
      );
      if (response?.status === 201 || response?.status === 200) {
        const newFileData = {
          path: response.data.path,
          type: fileType,
          side: "front",
        };
        setUploadedFiles((prev) => [...prev, newFileData]);
      } else {
        toast.error(response.data.message);
      }
    } catch (err) {
      toast.error(err.message);
    }
  };

  return (
    <div>
      <h4>Upload your documents</h4>
      {[
        { type: "primaryId", desc: "Primary Identification." },
        { type: "secondaryId", desc: "Secondary Identification." },
        { type: "policeCheck", desc: "Police Check." },
        { type: "wwcCheck", desc: "WWC Check." },
        { type: "supportingDocs", desc: "Supporting Documents." },
      ].map(({ type, desc }) => (
        <div className="mb25" key={type}>
          <label className="form-label fw500 dark-color">{type}:</label>
          <p className="description">{desc}</p>
          <div
            className="upload-box"
            onClick={() => document.getElementById(`${type}Input`).click()}
          >
            <input
              id={`${type}Input`}
              type="file"
              name={type}
              accept=".png, .jpg, .jpeg, .pdf"
              onChange={(e) =>
                handleFileUpload(
                  e,
                  type.replace(/([A-Z])/g, "_$1").toLowerCase()
                )
              }
              required
              style={{ display: "none" }}
            />
            <button type="button" className="upload-button">
              Select Files
            </button>
          </div>
          {fileUpload[type] && (
            <p className="file-name">Selected file: {fileUpload[type]?.name}</p>
          )}
        </div>
      ))}

      <div className="d-grid mb20">
        <button
          className="ud-btn btn-thm default-box-shadow2"
          onClick={handleSubmit}
        >
          Create Account{" "}
          {isLoading ? <Loader /> : <i className="fal fa-arrow-right-long" />}
        </button>
      </div>
    </div>
  );
};

export default DocumentUploadForm;
