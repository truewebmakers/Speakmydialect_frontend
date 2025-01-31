import { CapitalizeFirstLetter } from "@/utils/helper";
import { Tooltip } from "react-tooltip";
import moment from "moment";
import { useNavigate } from "react-router-dom";

export default function UsersCard({ data, userType }) {
  const navigate = useNavigate();
  console.log(data, "dadadad");

  const handleEditProfile = (id) => {
    navigate(`/my-profile?superaccess=true&id=${id}&type=${userType}`);
  };

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
          {data?.status ? (
            <span
              className={`pending-style ${
                data?.status === "active" ? "style7" : ""
              }${data?.status === "hold" ? "style1" : ""} ${
                data.status === "in-review" ? "style1" : ""
              } ${data.status === "inactive" ? "style3" : ""} ${
                data?.status === "reject" ? "style2" : ""
              }`}
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
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <a
              className="icon me-2"
              id="edit"
              onClick={() => handleEditProfile(data?.id)}
            >
              <Tooltip anchorSelect="#edit" className="ui-tooltip">
                Edit
              </Tooltip>
              <span className="flaticon-pencil" />
            </a>
          </div>
        </td>
      </tr>
    </>
  );
}
