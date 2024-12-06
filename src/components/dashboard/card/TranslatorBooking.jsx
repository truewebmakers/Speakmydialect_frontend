import { apiMethods, apiUrls } from "@/constants/constant";
import UseApi from "@/hook/useApi";
import { calculatePayment, formatTo12Hour } from "@/utils/commonFunctions";
import { CapitalizeFirstLetter } from "@/utils/helper";
import moment from "moment";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";

export default function TranslatorBooking({ data, i, currentTab, getData }) {
  const { user } = useSelector((state) => state.auth);

  const changeBookingStatus = async (status, id) => {
    try {
      const headers = { Authorization: `Bearer ${user?.token}` };
      let response = await UseApi(
        `${apiUrls.changeTranslatorBookingStatus}${id}/${status}`,
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

  const picture = data?.client_meta?.profile_pic
    ? data.client_meta.profile_pic.split("profile_pictures/")[1]
    : null;
  const newPicUrl =
    picture &&
    `https://speakmydialect.s3.ap-southeast-1.amazonaws.com/profile_pictures/${picture}`;

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
              {data?.client?.fname + " " + data?.client?.lname || "Unknown"}
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
            <b>Work Mode: </b>
            {CapitalizeFirstLetter(data?.availability) || "Not specified yet"}
          </p>
          {data?.availability &&
          data?.availability?.toLowerCase() === "in-person" ? (
            <p className="mb-0">
              <b>Address: </b>
              {CapitalizeFirstLetter(data?.client_meta?.address) ||
                "Not specified yet"}
            </p>
          ) : null}
          <p className="mb-0">
            <b>Payment Status: </b>
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
      {currentTab?.type === "new_booking" ? (
        <td className="vam">
          <a
            className="ud-btn btn-thm-border"
            onClick={() => changeBookingStatus("accept", data?.id)}
          >
            Accept
          </a>
        </td>
      ) : currentTab?.type === "today_booking" ? (
        <td className="vam">
          <a
            className="ud-btn btn-thm-border"
            onClick={() => changeBookingStatus("mark-completed", data?.id)}
          >
            Mark Complete
          </a>
        </td>
      ) : null}
      {currentTab?.type === "new_booking" && (
        <td className="vam">
          <a
            className="red-btn btn-red-border"
            onClick={() => changeBookingStatus("reject", data?.id)}
          >
            Reject
          </a>
        </td>
      )}
    </tr>
  );
}
