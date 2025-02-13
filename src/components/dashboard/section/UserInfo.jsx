import DashboardNavigation from "../header/DashboardNavigation";
import UseApi from "@/hook/useApi";
import { apiMethods, apiUrls } from "@/constants/constant";
import { useSelector } from "react-redux"; 
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import PageNotFound from "@/components/section/PageNotFound";
import UsersCard from "../card/usersCard";

export default function UsersInfo() {
  const [userApproval, setUserApproval] = useState([]);
  const [userType, setUserType] = useState("client");
  const { user } = useSelector((state) => state.auth);

  //fetch user bookings listing
  const fetchData = async () => {
    try {
      const headers = { Authorization: `Bearer ${user?.token}` };
      const response = await UseApi(
        apiUrls.UserTypes + userType,
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
  }, [userType]);

  return (
    <>
      <div className="dashboard__content hover-bgc-color">
        <div className="row pb40">
          <div className="col-lg-12">
            <DashboardNavigation />
          </div>
        </div>
        <div className="row align-items-center justify-content-between pb-4">
      <div className="col-12">
        <div className="d-flex flex-column flex-md-row align-items-center justify-content-between">
          <h2 className="dashboard-title mb-3 mb-md-0">Users</h2>
          <div className="d-flex">
            <button
              className="btn me-2"
              style={{
                backgroundColor: userType === "client" ? "#5bbb7b" : "#5bbb7b",
                color: userType === "client" ? "#000" : "#fff",
                border: "2px solid #5bbb7b",
                padding: "8px 16px",
                borderRadius: "4px",
                fontSize: "14px",
              }}
              onClick={() => setUserType("client")}
            >
              Client
            </button>
            <button
              className="btn"
              style={{
                backgroundColor: userType === "translator" ? "#5bbb7b" : "#5bbb7b",
                color: userType === "translator" ? "#000" : "#fff",
                border: "2px solid #5bbb7b",
                padding: "8px 16px",
                borderRadius: "4px",
                fontSize: "14px",
              }}
              onClick={() => setUserType("translator")}
            >
              Interpreter
            </button>
          </div>
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
                        <th scope="col">Status</th>
                        <th scope="col">Joined on</th>
                        <th scope="col">Action</th>
                      </tr>
                    </thead>
                    <tbody className="t-body">
                      {userApproval?.map((item, i) => (
                        <UsersCard key={i} data={item} userType={userType} />
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
    </>
  );
}
