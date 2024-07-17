import Pagination1 from "@/components/section/Pagination1";
import DashboardNavigation from "../header/DashboardNavigation";
import UseApi from "@/hook/useApi";
import { apiMethods, apiUrls } from "@/constants/constant";
import { useSelector } from "react-redux";
import { useEffect, useState } from "react";
import UserApprovalCard from "../card/userApprovalCards";
import { toast } from "react-toastify";
import UserApprovalModal from "../modal/UserApprovalModal";
import { userApprovalDropdown } from "@/constants/structuralConstant";

export default function UserApprovalInfo() {
  const [userApproval, setUserApproval] = useState([]);
  const { user } = useSelector((state) => state.auth);
  const [showModal, setShowModal] = useState(false);
  const [userId, setUserId] = useState(0);
  const [action, setAction] = useState({ option: "Select", value: null });
  const [reason, setReason] = useState("");

  const fetchData = async () => {
    try {
      const headers = { Authorization: `Bearer ${user?.token}` };

      const response = await UseApi(
        apiUrls.adminGetUserApprovals,
        apiMethods.GET,
        null,
        headers
      );
      if (response?.status == 200 || response?.status == 201) {
        const users = response?.data?.data;
        setUserApproval(users);
      }
    } catch (error) {
      toast.error("Error fetching countries");
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  // close modal while clicking on cross button
  const handleCloseModal = () => {
    setShowModal(false);
    fetchData();
  };

  const handleSave = async () => {
    try {
      const headers = {
        Authorization: `Bearer ${user?.token}`,
      };
      const bodyData = {
        status: action?.value,
        reason: reason,
      };
      const response = await UseApi(
        apiUrls.adminApproveUsers + userId,
        apiMethods.POST,
        bodyData,
        headers
      );
      if (response?.status === 200 || response?.status === 201) {
        toast.success(response?.data?.message);
        handleCloseModal();
      } else {
        toast.error(response?.data?.message);
        handleCloseModal();
      }
    } catch (err) {
      toast.error(err);
    }
  };

  return (
    <>
      <div className="dashboard__content hover-bgc-color">
        <div className="row pb40">
          <div className="col-lg-12">
            <DashboardNavigation />
          </div>
        </div>
        <div className="row align-items-center justify-content-between pb40">
          <div className="col-xl-4">
            <div className="dashboard_title_area">
              <h2>User Approvals</h2>
            </div>
          </div>
          {/* <div className="col-xl-4">
            <div className="dashboard_search_meta">
              <div className="search_area">
                <input
                  type="text"
                  className="form-control bdrs4"
                  placeholder="Search Invoice"
                />
                <label>
                  <span className="far fa-magnifying-glass" />
                </label>
              </div>
            </div>
          </div> */}
        </div>
        <div className="row">
          <div className="col-xl-12">
            <div className="ps-widget bgc-white bdrs4 p30 mb30 overflow-hidden position-relative">
              <div className="packages_table table-responsive">
                <table className="table-style3 table at-savesearch">
                  <thead className="t-head">
                    <tr>
                      <th scope="col">Name</th>
                      <th scope="col">Email</th>
                      <th scope="col">User Type</th>
                      <th scope="col">Status</th>
                      <th scope="col">Joined on</th>
                      <th scope="col">Action</th>
                    </tr>
                  </thead>
                  <tbody className="t-body">
                    {userApproval?.map((item, i) => (
                      <UserApprovalCard
                        key={i}
                        data={item}
                        setUserId={setUserId}
                        setShowModal={setShowModal}
                      />
                    ))}
                  </tbody>
                </table>
                <div className="mt30">{/* <Pagination1 /> */}</div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <UserApprovalModal
        show={showModal}
        handleClose={handleCloseModal}
        option={userApprovalDropdown}
        setAction={setAction}
        action={action}
        reason={reason}
        setReason={setReason}
        handleSave={handleSave}
      />
    </>
  );
}
