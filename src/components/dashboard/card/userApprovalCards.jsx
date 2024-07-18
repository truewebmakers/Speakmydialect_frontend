import { CapitalizeFirstLetter } from "@/utils/helper";
import moment from "moment";

export default function UserApprovalCard({ data, openModal }) {
  return (
    <>
      <tr>
        <th scope="row">
          <div>
            {data?.fname
              ? CapitalizeFirstLetter(data?.fname) +
                " " +
                CapitalizeFirstLetter(data?.lname)
              : "-"}{" "}
          </div>
        </th>
        <td className="vam">{data?.email ? data?.email : "-"}</td>
        <td className="vam">
          {data?.user_type ? CapitalizeFirstLetter(data?.user_type) : "-"}
        </td>
        <td className="vam" title={data?.reason}>
          {data?.status ? (
            <span
              className={`pending-style ${
                data?.status === "hold" ? "style1" : ""
              } ${data.status === "in-review" ? "style1" : ""} ${
                data.status === "inactive" ? "style3" : ""
              }${data?.status === "reject" ? "style2" : ""} `}
            >
              {CapitalizeFirstLetter(data?.status)}
            </span>
          ) : (
            "-"
          )}
        </td>
        <td className="vam">
          {data?.created_at ? moment(data?.created_at).format("lll") : "-"}
        </td>
        <td className="vam">
          <a
            className="table-action fz15 fw500 text-thm2"
            id="view"
            onClick={() => openModal(data?.id)}
          >
            <span className="flaticon-website me-2 vam"> View</span>
          </a>
        </td>
      </tr>
    </>
  );
}
