import { CapitalizeFirstLetter } from "@/utils/helper";
import moment from "moment";

export default function PayoutCard1({ data, openModal }) {
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
        <td className="vam" title={data?.reason}>
          <span
            className={`pending-style ${
              data?.payment_status === "paid" ? "style7" : ""
            } ${data?.payment_status === "dispute" ? "style3" : ""} ${
              data?.payment_status === "none" ? "style2" : ""
            } ${data?.payment_status === "hold" ? "style1" : ""}`}
          >
            {CapitalizeFirstLetter(data?.payment_status)}
          </span>
        </td>
        {user?.userInfo?.user_type === "admin" && (
          <td className="vam">
            <a
              className="table-action fz15 fw500 text-thm2"
              id="view"
              onClick={() => openModal(data?.id)}
            >
              <span className="flaticon-website me-2 vam"> Update</span>
            </a>
          </td>
        )}
      </tr>
    </>
  );
}
