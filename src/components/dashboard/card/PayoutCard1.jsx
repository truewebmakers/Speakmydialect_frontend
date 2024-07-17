import { CapitalizeFirstLetter } from "@/utils/helper";
import moment from "moment";

export default function PayoutCard1({ data }) {
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
              data?.payment_status === "active" ? "style7" : ""
            } ${data?.payment_status === "inactive" ? "style3" : ""} ${
              data?.payment_status === "none" ? "style3" : ""
            } `}
          >
            {CapitalizeFirstLetter(data?.payment_status)}
          </span>
        </td>
      </tr>
    </>
  );
}
