import Pagination1 from "@/components/section/Pagination1";
import DashboardNavigation from "../header/DashboardNavigation";
import { useEffect, useState } from "react";
import JobCard1 from "../card/JobCard1";
import { useLocation } from "react-router-dom";
import {
  apiMethods,
  apiUrls,
  jobManagementTab,
  ordersManagementTab,
} from "@/constants/constant";
import { useSelector } from "react-redux";
import UseApi from "@/hook/useApi";
import { toast } from "react-toastify";

export default function JobAndOrdersManagement() {
  const [getCurrentTab, setCurrentTab] = useState({
    id: 0,
    name: "",
    status: "",
  });
  const { pathname } = useLocation();
  const { user } = useSelector((state) => state.auth);
  const [userJobListing, setUserJobListing] = useState([]);

  const handleJobManagement = async () => {
    try {
      const status = getCurrentTab?.status || "in-process";
      const headers = { Authorization: `Bearer ${user?.token}` };
      const response = await UseApi(
        `${apiUrls.getTranslatorAllJobs}${user?.userInfo?.id}/${status}`,
        apiMethods.GET,
        null,
        headers
      );
      if (response?.status === 200 || response?.status === 201) {
        setUserJobListing(response?.data?.data);
      }
    } catch (error) {
      toast.error("Error fetching profile data");
    }
  };

  const handleOrdersManagement = async () => {
    try {
      const status = getCurrentTab?.status || "pending";
      const headers = { Authorization: `Bearer ${user?.token}` };
      const response = await UseApi(
        `${apiUrls.getClientOrders}${user?.userInfo?.id}/${status}`,
        apiMethods.GET,
        null,
        headers
      );
      if (response?.status === 200 || response?.status === 201) {
        setUserJobListing(response?.data?.data);
      }
    } catch (error) {
      toast.error("Error fetching profile data");
    }
  };

  useEffect(() => {
    if (pathname?.includes("/jobs")) {
      handleJobManagement();
    } else {
      handleOrdersManagement();
    }
  }, [pathname, getCurrentTab]);

  return (
    <>
      <div className="dashboard__content hover-bgc-color">
        <div className="row pb40">
          <div className="col-lg-12">
            <DashboardNavigation />
          </div>
          <div className="col-lg-12">
            <div className="dashboard_title_area">
              {pathname?.includes("/jobs") ? (
                <h2>Job Management</h2>
              ) : (
                <h2>Bookings</h2>
              )}

              <p className="text">Lorem ipsum dolor sit amet, consectetur.</p>
            </div>
          </div>
        </div>
        <div className="row">
          <div className="col-xl-12">
            <div className="ps-widget bgc-white bdrs4 p30 mb30 position-relative">
              <div className="navtab-style1">
                <nav>
                  <div className="nav nav-tabs mb30">
                    {pathname?.includes("/jobs")
                      ? jobManagementTab?.map((item, i) => (
                          <button
                            onClick={() =>
                              setCurrentTab({
                                id: item?.id,
                                name: item?.name,
                                status: item?.status,
                              })
                            }
                            key={i}
                            className={`nav-link fw500 ps-0 ${
                              getCurrentTab?.id === item?.id ? "active" : ""
                            }`}
                          >
                            {item?.name}
                          </button>
                        ))
                      : ordersManagementTab?.map((item, i) => (
                          <button
                            onClick={() =>
                              setCurrentTab({
                                id: item?.id,
                                name: item?.name,
                                status: item?.status,
                              })
                            }
                            key={i}
                            className={`nav-link fw500 ps-0 ${
                              getCurrentTab?.id === item?.id ? "active" : ""
                            }`}
                          >
                            {item?.name}
                          </button>
                        ))}
                  </div>
                </nav>

                {/* Table Section */}
                {pathname?.includes("jobs") ? (
                  <div className="packages_table table-responsive">
                    <table className="table-style3 table at-savesearch">
                      <tbody className="t-body">
                        {userJobListing?.length ? (
                          userJobListing?.map((item, i) => (
                            <JobCard1 key={i} data={item} i={i} />
                          ))
                        ) : (
                          <tr>
                            <td colSpan="4">No jobs found</td>
                          </tr>
                        )}
                      </tbody>
                    </table>
                  </div>
                ) : (
                  <div className="packages_table table-responsive">
                    <table className="table-style3 table at-savesearch">
                      <tbody className="t-body">
                        {/* Replace with actual data fetching and display for orders */}
                        <tr>
                          <td colSpan="4">Bookings data here</td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                )}
              </div>

              <Pagination1 />
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
