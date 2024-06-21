import Loader from "@/components/common/loader";
import { apiMethods, apiUrls } from "@/constants/constant";
import UseApi from "@/hook/useApi";
import { CapitalizeFirstLetter } from "@/utils/helper";
import moment from "moment";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";

export default function JobCard1({ data, i, currentTab, isLoading }) {
  const { user } = useSelector((state) => state.auth);

  const changeBookingStatus = async (status, id) => {
    try {
      const headers = { Authorization: `Bearer ${user?.token}` };
      const response = await UseApi(
        `${apiUrls.changeTranslatorBookingStatus}${id}/${status}`,
        apiMethods.POST,
        null,
        headers
      );
      if (response?.status === 200 || response?.status === 201) {
        toast.success(response?.data?.message);
      }
    } catch (error) {
      toast.error("Error fetching profile data");
    }
  };
  return (
    <>
      {isLoading ? (
        <Loader />
      ) : (
        <tr>
          <th className={`ps-0 ${i === 0 ? "pt-0" : ""}`} scope="row">
            <div className="job-list-style1 at-dashboard p-0 d-xl-flex align-items-start mb-0">
              <div className="icon2 mb10-lg mb-0 me-3 bg-transparent">
                <img
                  className="wa"
                  src={
                    data?.profile_pic || "/images/default/defaultProfile.png"
                  }
                  alt="icon2"
                />
              </div>
              <div className="details">
                <h5>New Work From {data?.fname || "Nobody"}</h5>
                <h6 className="mb-3 text-thm">
                  {data?.location || "Not specified yet"}
                </h6>
              </div>
            </div>
          </th>
          <td className="vam">
            <p className="list-inline-item mb-0">
              {CapitalizeFirstLetter(data?.payment_type) + " Rate: " ||
                "Not Mentioned Yet"}{" "}
              ${data?.present_rate || "Not specified yet"}{" "}
            </p>
            <p className="list-inline-item mb-0 bdrl1 pl15 bdrn-lg pl5-lg">
              Start At : {moment(data?.start_at).format("lll") || "-"}
            </p>
            <p className="list-inline-item mb-0 bdrl1 pl15 bdrn-lg pl5-lg">
              Sign Off: {moment(data?.end_at).format("lll") || "-"}
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
                className="ud-btn btn-red-border"
                onClick={() => changeBookingStatus("reject", data?.id)}
              >
                Reject
              </a>
            </td>
          ) : null}
        </tr>
      )}
    </>
  );
}
