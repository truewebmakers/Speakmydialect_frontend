import { CapitalizeFirstLetter } from "@/utils/helper";
import moment from "moment";
import UserApprovalModal from "../modal/UserApprovalModal";
import { useState } from "react";
import { PaymentStatusChangeDropdown } from "@/constants/structuralConstant";
import UseApi from "@/hook/useApi";
import { apiMethods, apiUrls } from "@/constants/constant";
import { toast } from "react-toastify";
import { useSelector } from "react-redux";

export default function PayoutCard1({ data }) {
  const [showModal, setShowModal] = useState(false);
  const [userId, setUserId] = useState(0);
  const { user } = useSelector((state) => state.auth);
  const [action, setAction] = useState({ option: "Select", value: null });
  const [reason, setReason] = useState("");

  const handleView = () => {
    setShowModal(true);
    setUserId(data?.id);
  };

  const handleCloseModal = () => {
    setShowModal(false);
    fetchData();
  };
  console.log(data, "dataa");
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
        apiUrls.adminChangePaymentStatus +
          userId +
          "?payment_status=" +
          action?.value,
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
      <tr>
        <th scope="row">{data?.job_title ? data?.job_title : "-"}</th>
        <td className="vam">
          {data?.payment_by_client_at ? data?.payment_by_client_at : "-"}
        </td>
        <td className="vam">{data?.present_rate ? data?.present_rate : "-"}</td>
        <td className="vam">
          {data?.start_at ? moment(data?.start_at).format("lll") : "-"}
        </td>
        <td className="vam">
          {data?.end_at ? moment(data?.end_at).format("lll") : "-"}
        </td>
        <td className="vam">
          <span
            className={`pending-style ${
              data?.payment_status === "paid" ? "style7" : ""
            } ${data?.payment_status === "dispute" ? "style3" : ""} ${
              data?.payment_status === "none" ? "style3" : ""
            } ${data?.payment_status === "hold" ? "style1" : ""}`}
          >
            {CapitalizeFirstLetter(data?.payment_status)}
          </span>
        </td>
        <td className="vam">
          <a
            className="table-action fz15 fw500 text-thm2"
            id="view"
            onClick={() => handleView()}
          >
            <span className="flaticon-website me-2 vam"> Update Status</span>
          </a>
        </td>
      </tr>
      <UserApprovalModal
        show={showModal}
        handleClose={handleCloseModal}
        option={PaymentStatusChangeDropdown}
        setAction={setAction}
        action={action}
        reason={reason}
        setReason={setReason}
        handleSave={handleSave}
      />
    </>
  );
}
