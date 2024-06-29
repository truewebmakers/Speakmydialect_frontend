import DashboardNavigation from "../header/DashboardNavigation";
import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import {
  apiMethods,
  apiUrls,
  ordersManagementTab,
  translatorBookingTab,
} from "@/constants/constant";
import { useSelector } from "react-redux";
import UseApi from "@/hook/useApi";
import { toast } from "react-toastify";
import Loader from "@/components/common/loader";
import ClientBookings from "../card/ClientBookings";
import TranslatorBooking from "../card/TranslatorBooking";

export default function JobAndOrdersManagement() {
  const [getCurrentTab, setCurrentTab] = useState({
    id: 0,
    name: "",
    status: "in-process",
    type: "new_booking",
  });
  const [getClientCurrentTab, setClientCurrentTab] = useState({
    id: 0,
    name: "",
    status: "pending",
    type: "upcoming_booking",
  });
  const { pathname } = useLocation();
  const { user } = useSelector((state) => state.auth);
  const [userJobListing, setUserJobListing] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const handleJobManagement = async () => {
    setIsLoading(true);
    try {
      const status = getCurrentTab?.status || "in-process";
      const typeOfBooking = getCurrentTab?.type || "new_booking";

      const headers = { Authorization: `Bearer ${user?.token}` };
      const response = await UseApi(
        `${apiUrls.getTranslatorAllJobs}${user?.userInfo?.id}/${status}?type=${typeOfBooking}`,
        apiMethods.GET,
        null,
        headers
      );
      if (response?.status === 200 || response?.status === 201) {
        setUserJobListing(response?.data?.data);
        setIsLoading(false);
      }
      setIsLoading(false);
    } catch (error) {
      setIsLoading(false);
      toast.error("Error fetching profile data");
    }
  };

  const handleOrdersManagement = async () => {
    setIsLoading(true);
    try {
      const status = getClientCurrentTab?.status || "pending";
      const typeOfBooking = getClientCurrentTab?.type || "upcoming_booking";

      const headers = { Authorization: `Bearer ${user?.token}` };
      const response = await UseApi(
        `${apiUrls.getClientOrders}${user?.userInfo?.id}/${status}?type=${typeOfBooking}`,
        apiMethods.GET,
        null,
        headers
      );
      if (response?.status === 200 || response?.status === 201) {
        setUserJobListing(response?.data?.data);
        setIsLoading(false);
      }
      setIsLoading(false);
    } catch (error) {
      toast.error("Error fetching profile data");
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (pathname?.includes("/jobs")) {
      handleJobManagement();
    } else {
      handleOrdersManagement();
    }
  }, [pathname, getCurrentTab, getClientCurrentTab]);

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

              {/* <p className="text">Lorem ipsum dolor sit amet, consectetur.</p> */}
            </div>
          </div>
        </div>
        <div className="row">
          <div className="col-xl-12">
            <div className="ps-widget bgc-white bdrs4 p30 mb30 position-relative">
              <div className="navtab-style1">
                <nav>
                  <div className="nav nav-tabs mb30">
                    {pathname?.includes("jobs")
                      ? translatorBookingTab?.map((item, i) => (
                          <button
                            onClick={() =>
                              setCurrentTab({
                                id: item?.id,
                                name: item?.name,
                                status: item?.status,
                                type: item?.type,
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
                              setClientCurrentTab({
                                id: item?.id,
                                name: item?.name,
                                status: item?.status,
                                type: item?.type,
                              })
                            }
                            key={i}
                            className={`nav-link fw500 ps-0 ${
                              getClientCurrentTab?.id === item?.id
                                ? "active"
                                : ""
                            }`}
                          >
                            {item?.name}
                          </button>
                        ))}
                  </div>
                </nav>

                {/* Table Section */}
                {isLoading ? (
                  <Loader />
                ) : (
                  <>
                    {pathname?.includes("jobs") ? (
                      <div className="packages_table table-responsive">
                        <table className="table-style3 table at-savesearch">
                          <tbody className="t-body">
                            {userJobListing?.length ? (
                              userJobListing?.map((item, i) => (
                                <TranslatorBooking
                                  key={i}
                                  data={item}
                                  i={i}
                                  isLoading={isLoading}
                                  currentTab={getCurrentTab}
                                  getData={handleJobManagement}
                                />
                              ))
                            ) : (
                              <tr>
                                <td colSpan="4">No Bookings Found</td>
                              </tr>
                            )}
                          </tbody>
                        </table>
                      </div>
                    ) : (
                      <div className="packages_table table-responsive">
                        <table className="table-style3 table at-savesearch">
                          <tbody className="t-body">
                            {userJobListing?.length ? (
                              userJobListing?.map((item, i) => (
                                <ClientBookings
                                  key={i}
                                  data={item}
                                  i={i}
                                  isLoading={isLoading}
                                  currentTab={getClientCurrentTab}
                                  getData={handleOrdersManagement}
                                />
                              ))
                            ) : (
                              <tr>
                                <td colSpan="4">No Bookings Found</td>
                              </tr>
                            )}
                          </tbody>
                        </table>
                      </div>
                    )}
                  </>
                )}
              </div>

              {/* <Pagination1 /> */}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
