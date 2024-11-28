import Pagination1 from "@/components/section/Pagination1";
import DashboardNavigation from "../header/DashboardNavigation";
import UseApi from "@/hook/useApi";
import { apiMethods, apiUrls } from "@/constants/constant";
import { useSelector } from "react-redux";
import { useEffect, useState } from "react";
import UserApprovalCard from "../card/userApprovalCards";
import { toast } from "react-toastify";
import StatusChangeModal from "../modal/StatusChangeModal";
import { userApprovalDropdown } from "@/constants/structuralConstant";
import ShowInfoModal from "../modal/showInfoModal";
import PageNotFound from "@/components/section/PageNotFound";
import NoDataFound from "@/components/noData/NoDataFound";

export default function UserApprovalInfo() {
  const [userApproval, setUserApproval] = useState([]);
  const { user } = useSelector((state) => state.auth);
  const [showModal, setShowModal] = useState(false);
  const [userId, setUserId] = useState("");
  const [action, setAction] = useState({ option: "Select", value: null });
  const [reason, setReason] = useState("");
  const [showReason, setShowReason] = useState(false);
  const [showData, setShowData] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  //fetch user bookings listing
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

  //updtae status api
  const handleSave = async () => {
    try {
      setIsLoading(true);
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
      }
    } catch (err) {
      toast.error(err);
    } finally {
      setIsLoading(false);
    }
  };

  //openModal
  const openModal = (id) => {
    setShowModal(true);
    setUserId(id);
  };

  // close modal while clicking on cross button
  const handleCloseModal = () => {
    setShowModal(false);
    fetchData();
  };

  //open Resaon Show Modal
  const openReasonModal = (reason) => {
    setShowReason(true);
    setShowData(reason);
  };

  // close Reason Show modal while clicking on cross button
  const handleCloseReasonModal = () => {
    setShowReason(false);
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
        </div>
        {userApproval?.length ? (
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
                        <th scope="col">Email Verified</th>
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
                          openModal={openModal}
                          openReasonModal={openReasonModal}
                          fetchData={fetchData}
                        />
                      ))}
                    </tbody>
                  </table>
                  <div className="mt30">{/* <Pagination1 /> */}</div>
                </div>
              </div>
            </div>
          </div>
        ) : (
          <PageNotFound />
        )}
      </div>
      <StatusChangeModal
        show={showModal}
        handleClose={handleCloseModal}
        option={userApprovalDropdown}
        setAction={setAction}
        action={action}
        reason={reason}
        setReason={setReason}
        handleSave={handleSave}
        content="User Approval"
        userId={userId}
        isLoading={isLoading}
      />
      <ShowInfoModal
        show={showReason}
        handleClose={handleCloseReasonModal}
        reason={reason}
        content="Reason"
        showData={showData}
      />
    </>
  );
}
