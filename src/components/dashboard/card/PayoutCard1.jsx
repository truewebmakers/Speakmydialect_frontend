import { formatTo12Hour } from "@/utils/commonFunctions";
import { CapitalizeFirstLetter } from "@/utils/helper";
import moment from "moment";
import { useSelector } from "react-redux";

export default function PayoutCard1({ data, openModal }) {
  const { user } = useSelector((state) => state.auth);

  return (
    <>
      {data?.payment_status !== "hold" && (
        <tr>
          <th scope="row">
            {data?.job_title ? CapitalizeFirstLetter(data?.job_title) : "-"}
          </th>
          <td className="vam">
            {data?.start_at
              ? moment(data?.start_at).format("ll") +
                " " +
                formatTo12Hour(data?.start_time)
              : "-"}
          </td>
          <td className="vam">
            {data?.end_at
              ? moment(data?.end_at).format("ll") +
                " " +
                formatTo12Hour(data?.end_time)
              : "-"}
          </td>
          <td className="vam">
            {data?.payment_by_client_at ? data?.payment_by_client_at : "-"}
          </td>
          <td className="vam">
            {data?.present_rate ? "$" + data?.present_rate?.toFixed(2) : "0"}
          </td>

          <td className="vam">
            <span
              className={`pending-style ${
                data?.payment_status === "paid" ? "style7" : ""
              } ${data?.payment_status === "dispute" ? "style3" : ""} ${
                data?.payment_status === "none" ? "style2" : ""
              } ${data?.payment_status === "hold" ? "style1" : ""} 
            ${data?.payment_status === "escrow" ? "style1" : ""}`}
            >
              {data?.payment_status
                ? data?.payment_status === "hold"
                  ? "In-Progress"
                  : data?.payment_status === "escrow"
                  ? "Paid"
                  : CapitalizeFirstLetter(data?.payment_status)
                : "-"}
            </span>
          </td>
          {user?.userInfo?.user_type === "admin" && (
            <td className="vam">
              <a
                className="table-action fz15 fw500 text-thm2"
                id="view"
                onClick={() => openModal(data?.id)}
              >
                <span> Update</span>
              </a>
            </td>
          )}
        </tr>
      )}
    </>
  );
}
