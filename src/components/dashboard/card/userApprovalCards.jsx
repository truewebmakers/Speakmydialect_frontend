import { CapitalizeFirstLetter } from "@/utils/helper";
import moment from "moment";

export default function UserApprovalCard({ data, setUserId, setShowModal }) {
  const updateStatus = () => {
    setShowModal(true);
    setUserId(data?.id);
  };
  const handleViewDocs = () => {};
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
        <td
          className="vam"
          title="Click to update status"
          onClick={() => updateStatus()}
        >
          {data?.status ? (
            <span
              className={`pending-style ${
                data?.status === "hold" ? "style2" : ""
              } ${data.status === "in-review" ? "style1" : ""} ${
                data.status === "inactive" ? "style3" : ""
              } `}
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
            onClick={() => handleViewDocs()}
          >
            <span className="flaticon-website me-2 vam"> View</span>
          </a>
        </td>
      </tr>
    </>
  );
}
