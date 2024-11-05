import React, { useEffect, useState } from "react";
import "./style.css";
import SelectInput from "../option/SelectInput";
import { useSelector } from "react-redux";
import UseApi from "@/hook/useApi";
import { apiMethods, apiUrls } from "@/constants/constant";

export default function PayoutStatusChangeModal({
  userId,
  show,
  handleClose,
  option,
  setAction,
  handleSave,
  action,
  content,
}) {
  const { user } = useSelector((state) => state.auth);
  const [bankingDetails, setBankDetails] = useState({});
  const [error, setError] = useState(""); // Error state for feedback

  const bankDetails = async () => {
    try {
      const headers = {
        Authorization: `Bearer ${user?.token}`,
      };
      const { data } = await UseApi(
        apiUrls.getBankDetails + userId, // API URL
        apiMethods.GET,
        null,
        headers
      );
      setBankDetails(data?.data);
    } catch (err) {
      setError("An error occurred while fetching bank details.");
    }
  };

  useEffect(() => {
    if (userId > 0) {
      bankDetails();
    }
  }, [userId]);

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
              {/* Bank Details Section */}
              <div className="mb-4">
                <h5 className="list-title pb-3">Bank Details</h5>
                {error ? (
                  <div className="alert alert-danger">{error}</div>
                ) : (
                  <div className="row">
                    <div className="col-sm-6">
                      <p>
                        <strong>Account Holder Name:</strong>{" "}
                        {bankingDetails?.account_holder_name || "N/A"}
                      </p>
                    </div>
                    <div className="col-sm-6">
                      <p>
                        <strong>Bank Name:</strong>{" "}
                        {bankingDetails?.bank_name || "N/A"}
                      </p>
                    </div>
                    <div className="col-sm-6">
                      <p>
                        <strong>Account Number:</strong>{" "}
                        {bankingDetails?.account_number || "N/A"}
                      </p>
                    </div>
                    <div className="col-sm-6">
                      <p>
                        <strong>BSB:</strong> {bankingDetails?.bsb || "N/A"}
                      </p>
                    </div>
                  </div>
                )}
              </div>

              {/* Action Selection Section */}
              <form>
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
