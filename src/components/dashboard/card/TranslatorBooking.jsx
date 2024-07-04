import { apiMethods, apiUrls } from "@/constants/constant";
import UseApi from "@/hook/useApi";
import { CapitalizeFirstLetter } from "@/utils/helper";
import moment from "moment";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
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

  return (
    <>
      <tr>
        <th className={`ps-0 ${i === 0 ? "pt-0" : ""}`} scope="row">
          <div className="job-list-style1 at-dashboard p-0 d-xl-flex align-items-start mb-0">
            <div className="icon2 mb10-lg mb-0 me-3 bg-transparent">
              <img
                className="wa"
                src={
                  data?.client_meta?.profile_pic ||
                  "/images/default/defaultProfile.png"
                }
                height={40}
                width={40}
                alt="icon2"
              />
            </div>
            <div className="details">
              <h5>{data?.job_title || "-"}</h5>
              <h6 className="mb-3">
                {" "}
                {data?.client?.fname + " " + data?.client?.lname || "Unknown"}
              </h6>
            </div>
          </div>
        </th>
        <td className="vam">
          <p className="list-inline-item mb-0">
            <b>
              {" "}
              {CapitalizeFirstLetter(data?.payment_type) + " Rate: " ||
                "Not Mentioned Yet"}{" "}
            </b>
            ${data?.present_rate || "Not specified yet"}{" "}
          </p>
          <p className="list-inline-item mb-0 bdrl1 pl15 bdrn-lg pl5-lg">
            <b> Start At</b> : {moment(data?.start_at).format("lll") || "-"}
          </p>
          <p className="list-inline-item mb-0 bdrl1 pl15 bdrn-lg pl5-lg">
            <b> Ends At: </b>
            {moment(data?.end_at).format("lll") || "-"}
          </p>
          <p className="list-inline-item mb-0 bdrl1 pl15 bdrn-lg pl5-lg">
            {CapitalizeFirstLetter(data?.availability) || "Not specified yet"}
          </p>
          <p className="list-inline-item mb-0 bdrl1 pl15 bdrn-lg pl5-lg">
            {data?.payment_status == "none"
              ? "Not Paid"
              : data?.payment_status == "escrow"
              ? "Payment Escrow"
              : data?.payment_status == "hold"
              ? "Payment on hold"
              : data?.payment_status == "dispute"
              ? "Payment Not Confirmed"
              : data?.payment_status == "Paid"}
          </p>
        </td>
        {currentTab?.type == "new_booking" ? (
          <td className="vam">
            <a
              className="ud-btn btn-thm-border"
              onClick={() => changeBookingStatus("accept", data?.id)}
            >
              Accept
            </a>
          </td>
        ) : currentTab?.type == "today_booking" ? (
          <td className="vam">
            <a
              className="ud-btn btn-thm-border"
              onClick={() => changeBookingStatus("mark-completed", data?.id)}
            >
              Mark Complete
            </a>
          </td>
        ) : null}
        {currentTab?.type == "new_booking" ? (
          <td className="vam">
            <a
              className="red-btn btn-red-border"
              onClick={() => changeBookingStatus("reject", data?.id)}
            >
              Reject
            </a>
          </td>
        ) : null}
      </tr>
    </>
  );
}
