import { CapitalizeFirstLetter } from "@/utils/helper";
import { Tooltip } from "react-tooltip";

export default function JobCard1({ data, i }) {
  return (
    <>
      <tr>
        <th className={`ps-0 ${i === 0 ? "pt-0" : ""}`} scope="row">
          <div className="job-list-style1 at-dashboard p-0 d-xl-flex align-items-start mb-0">
            <div className="icon2 mb10-lg mb-0 me-3 bg-transparent">
              <img className="wa" src={data?.profile_pic} alt="icon2" />
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
            ${data?.present_rate || "nil"}{" "}
          </p>
          <p className="list-inline-item mb-0 bdrl1 pl15 bdrn-lg pl5-lg">
            Joining Date:{data?.start_at}
          </p>
          <p className="list-inline-item mb-0 bdrl1 pl15 bdrn-lg pl5-lg">
            Sign Off: {data?.end_at}
          </p>
          <p className="list-inline-item mb-0 bdrl1 pl15 bdrn-lg pl5-lg">
            {CapitalizeFirstLetter(data?.availability) || " Not-specified yet"}
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
        <td className="vam">
          <a className="icon" id={`delete${data.id}`}>
            <Tooltip
              anchorSelect={`#delete${data.id}`}
              events={["click"]}
              place={"left-start"}
              className="ui-tooltip"
            >
              Accept Item
            </Tooltip>
            <span className="flaticon-tick" />
          </a>
        </td>
        <td className="vam">
          <a className="icon" id={`delete${data.id}`}>
            <Tooltip
              anchorSelect={`#delete${data.id}`}
              events={["click"]}
              place={"left-start"}
              className="ui-tooltip"
            >
              Reject Item
            </Tooltip>
            <span className="flaticon-delete" />
          </a>
        </td>
      </tr>
    </>
  );
}
