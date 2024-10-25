import { CapitalizeFirstLetter } from "@/utils/helper";
import { Tooltip } from "react-tooltip";
import eyeIcon from "../../../../public/images/eye.svg";
import moment from "moment";
import { toast } from "react-toastify";
import { useSelector } from "react-redux";
import { apiMethods, apiUrls } from "@/constants/constant";
import UseApi from "@/hook/useApi";
import Swal from "sweetalert2"; // Import SweetAlert2

export default function UserApprovalCard({
  data,
  openModal,
  openReasonModal,
  fetchData,
}) {
  const { user } = useSelector((state) => state.auth);

  const deleteExperienceId = async (id) => {
    try {
      const headers = {
        Authorization: `Bearer ${user?.token}`,
      };
      const response = await UseApi(
        apiUrls.deleteUserApprovals + id,
        apiMethods.POST,
        null,
        headers
      );
      if (response?.status === 200 || response?.status === 201) {
        toast.success("Deleted Successfully");
        fetchData();
      }
    } catch (error) {
      toast.error("Error deleting experience");
    }
  };

  const confirmDelete = (id) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#3085d6",
      confirmButtonText: "Yes, delete it!",
      cancelButtonText: "Cancel",
    }).then((result) => {
      if (result.isConfirmed) {
        deleteExperienceId(id);
      }
    });
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
          {data?.user_type ? CapitalizeFirstLetter(data?.user_type) : "-"}
        </td>
        <td className="vam">
          {data?.email_verified_at ? (
            <span className="pending-style style7"> Verified </span>
          ) : (
            <span className={`pending-style style1`}> Pending</span>
          )}
        </td>
        <td
          className="vam"
          title={data?.reason}
          onClick={() => openReasonModal(data?.reason)}
          style={{ cursor: "pointer" }}
        >
          {data?.status ? (
            <span
              className={`pending-style ${
                data?.status === "hold" ? "style1" : ""
              } ${data.status === "in-review" ? "style1" : ""} ${
                data.status === "inactive" ? "style3" : ""
              } ${data?.status === "reject" ? "style2" : ""}`}
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
              className="table-action-view fz15 fw500 text-thm2"
              id="view"
              onClick={() => openModal(data?.id)}
              style={{ marginRight: "10px" }}
            >
              <Tooltip anchorSelect={`#view`} className="ui-tooltip">
                View & Take Action
              </Tooltip>
              <span>
                <img className="flaticon-view" src={eyeIcon} alt="View" />
              </span>
            </a>
            <a
              type="button"
              className="table-action-view fz15 fw500 text-thm2"
              id={`delete-${data?.id}`}
              onClick={() => confirmDelete(data?.id)} // Use confirmDelete
            >
              <Tooltip
                anchorSelect={`#delete-${data?.id}`}
                className="ui-tooltip"
              >
                Delete
              </Tooltip>
              <span className="flaticon-delete" />
            </a>
          </div>
        </td>
      </tr>
    </>
  );
}
