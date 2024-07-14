import SelectInput from "../option/SelectInput";
import { useState } from "react";
import { apiMethods, apiUrls, startYearDropdown } from "@/constants/constant";
import { userApprovalDropdown } from "@/constants/structuralConstant";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";
import UseApi from "@/hook/useApi";

export default function UserApprovalModal({ show, handleClose, userId }) {
  const [action, setAction] = useState({ option: "Select", value: null });
  const [reason, setReason] = useState("");
  const { user } = useSelector((state) => state.auth);

  const handleSave = async () => {
    try {
      const headers = {
        Authorization: `Bearer ${user?.token}`,
      };
      const bodyData = {
        status: action?.value,
        reason: reason,
      };
      const response = await UseApi(
        apiUrls.adminApproveUsers + userId,
        apiMethods.POST,
        bodyData,
        headers
      );
      if (response?.status === 200 || response?.status === 201) {
        toast.success(response?.data?.message);
        handleClose();
      } else {
        toast.error(response?.data?.message);
        handleClose();
      }
    } catch (err) {
      toast.error(err);
    }
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
              <h5 className="list-title pt10">{"User Approval"}</h5>
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
                <div className="row"></div>
                <div className="row">
                  <div className="col-md-12">
                    <div className="mb-3">
                      <SelectInput
                        label="Choose Action"
                        defaultSelect={action}
                        data={userApprovalDropdown?.map((year) => ({
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
                <button
                  type="button"
                  className="ud-btn btn-thm"
                  onClick={() => handleSave()}
                >
                  {"Save"}
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
