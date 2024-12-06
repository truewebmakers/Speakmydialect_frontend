import { apiMethods, apiUrls } from "@/constants/constant";
import UseApi from "@/hook/useApi";
import { calculatePayment, formatTo12Hour } from "@/utils/commonFunctions";
import { CapitalizeFirstLetter } from "@/utils/helper";
import moment from "moment";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import Swal from "sweetalert2";

export default function ClientBookings({ data, i, currentTab, getData }) {
  const { user } = useSelector((state) => state.auth);
  const [disable, setDisable] = useState(false);

  const changeBookingStatus = async (status, id) => {
    try {
      const headers = { Authorization: `Bearer ${user?.token}` };
      let response = await UseApi(
        `${apiUrls.changeClientBookingStatus}${id}/${status}`,
        apiMethods.POST,
        null,
        headers
      );
      if (response?.status === 200 || response?.status === 201) {
        toast.success(response?.data?.message);
        getData();
      }
    } catch (error) {
      toast.error("Error fetching profile data");
    }
  };

  const isRejectDisabled = () => {
    const now = moment();
    const startAt = moment(data?.start_at);
    const diffInMinutes = startAt.diff(now, "minutes");
    return diffInMinutes < 120;
  };

  useEffect(() => {
    let disableValue = isRejectDisabled();
    setDisable(disableValue);
  }, [data]);

  const handleApproveBookings = (id) => {
    Swal.fire({
      title: "Are you sure you want to Approve this Work?",
      showCancelButton: true,
      confirmButtonText: "Approve",
    }).then((result) => {
      if (result.isConfirmed) {
        Swal.fire("Approved!", "", "success");
        changeBookingStatus("approved", id);
      }
    });
  };

  const handleRejectedBookings = (id) => {
    Swal.fire({
      title: "Are you sure you want to Reject this Work?",
      showCancelButton: true,
      confirmButtonText: "Reject",
    }).then((result) => {
      if (result.isConfirmed) {
        Swal.fire("Rejected!", "", "success");
        changeBookingStatus("reject", id);
      }
    });
  };

  const picture = data?.translator_meta?.profile_pic
    ? data?.translator_meta?.profile_pic?.split("profile_pictures/")[1]
    : null;
  const newPicUrl =
    picture &&
    "https://speakmydialect.s3.ap-southeast-1.amazonaws.com/profile_pictures/" +
      picture;

  return (
    <tr>
      <th className={`ps-0 ${i === 0 ? "pt-0" : ""}`} scope="row">
        <div className="job-list-style1 at-dashboard p-0 d-flex align-items-start mb-0">
          <div className="icon2 me-3">
            <img
              className="wa"
              src={newPicUrl || "/images/default/defaultProfile.png"}
              height={40}
              width={40}
              alt="Profile"
            />
          </div>
          <div className="details">
            <h5>
              {data?.job_title ? CapitalizeFirstLetter(data?.job_title) : "-"}
            </h5>
            <h6 className="mb-3">
              <Link to={`/profile/${data?.translator?.uuid}`} target="_blank">
                {data?.translator?.fname + " " + data?.translator?.lname ||
                  "Unknown"}
              </Link>
            </h6>
          </div>
        </div>
      </th>
      <td className="vam">
        <div className="d-flex flex-column">
          <p className="mb-0">
            <b>Start At:</b>{" "}
            {moment(data?.start_at).format("ll") +
              " " +
              formatTo12Hour(data?.start_time) || "-"}
          </p>
          <p className="mb-0">
            <b>Ends At:</b>{" "}
            {moment(data?.end_at).format("ll") +
              " " +
              formatTo12Hour(data?.end_time) || "-"}
          </p>

          <p className="mb-0">
            <b>Work Mode: </b>{" "}
            {CapitalizeFirstLetter(data?.availability) || "Not specified yet"}
          </p>
          <p className="mb-0">
            <b> Payment Status: </b>
            {data?.payment_status === "none"
              ? "Not Paid"
              : data?.payment_status === "escrow"
              ? "Payment Escrow"
              : data?.payment_status === "hold"
              ? "Payment on hold"
              : data?.payment_status === "dispute"
              ? "Payment Not Confirmed"
              : data?.payment_status === "Paid"
              ? "Paid"
              : "Unknown"}
          </p>
          <p className="mb-0">
            <b>
              {CapitalizeFirstLetter(data?.payment_type) + " Rate: " ||
                "Not Mentioned Yet"}
            </b>
            $
            {calculatePayment(
              data?.present_rate,
              data?.start_time,
              data?.end_time
            )?.amountToReceive || "Not specified yet"}
          </p>
        </div>
      </td>
      {currentTab?.type === "completed_booking" ? (
        <td className="vam">
          <button
            className="ud-btn btn-thm-border"
            onClick={() => handleApproveBookings(data?.id)}
          >
            Approve
          </button>
        </td>
      ) : null}
      {currentTab?.type === "current_booking" ||
      currentTab?.type === "upcoming_booking" ? (
        <td className="vam">
          <button
            className="red-btn btn-red-border"
            onClick={() => changeBookingStatus("cancel", data?.id)}
            disabled={disable}
          >
            Cancel
          </button>
        </td>
      ) : null}
      {currentTab?.type === "completed_booking" ? (
        <td className="vam">
          <button
            className="red-btn btn-red-border"
            onClick={() => handleRejectedBookings(data?.id)}
          >
            Reject
          </button>
        </td>
      ) : null}
      {currentTab?.type === "rejected_booking" ? (
        <td className="vam">
          <button
            className="ud-btn btn-thm-border"
            onClick={() => handleApproveBookings(data?.id)}
          >
            ReApprove
          </button>
        </td>
      ) : null}
    </tr>
  );
}
