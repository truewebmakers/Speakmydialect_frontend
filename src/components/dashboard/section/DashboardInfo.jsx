import { useSelector } from "react-redux";
import DashboardNavigation from "../header/DashboardNavigation";
import { useEffect, useState } from "react";
import UseApi from "@/hook/useApi";
import { apiMethods, apiUrls } from "@/constants/constant";
import { toast } from "react-toastify";
import {
  adminDashboardWidgets,
  clientDashboardWidgets,
  translatorDashboardWidgets,
} from "@/constants/structuralConstant";

export default function DashboardInfo() {
  const { user } = useSelector((state) => state.auth);
  const [adminCards, setAdminCards] = useState({});

  const fetchAdminCardDetails = async () => {
    try {
      const headers = { Authorization: `Bearer ${user?.token}` };
      const response = await UseApi(
        apiUrls.adminDashboardCards +
          user?.userInfo?.id +
          "&userType=" +
          user?.userInfo?.user_type,
        apiMethods.GET,
        null,
        headers
      );
      if (response?.status === 200 || response?.status === 201) {
        const cards = response?.data?.data;
        setAdminCards(cards);
      }
    } catch (error) {
      toast.error("Error fetching countries");
    }
  };

  useEffect(() => {
    fetchAdminCardDetails();
  }, []);

  return (
    <>
      <div
        className="dashboard__content hover-bgc-color"
        style={{ height: "800px" }}
      >
        <div className="row pb40">
          <div className="col-lg-12">
            <DashboardNavigation />
          </div>
          <div className="col-lg-12">
            <div className="dashboard_title_area">
              <h2>Dashboard</h2>
            </div>
          </div>
        </div>
        <div className="row">
          {user?.userInfo?.user_type === "admin"
            ? adminDashboardWidgets?.map((item, index) => (
                <div className="col-sm-6 col-xxl-3" key={index}>
                  <div className="d-flex align-items-center justify-content-between statistics_funfact">
                    <div className="details">
                      <div className="fz15">{item?.name}</div>
                      <div className="title">{adminCards[item?.key] || 0}</div>
                    </div>
                    <div className="icon text-center">
                      <i className="flaticon-contract" />
                    </div>
                  </div>
                </div>
              ))
            : user?.userInfo?.user_type === "client"
            ? clientDashboardWidgets?.map((item, index) => (
                <div className="col-sm-6 col-xxl-3" key={index}>
                  <div className="d-flex align-items-center justify-content-between statistics_funfact">
                    <div className="details">
                      <div className="fz15">{item?.name}</div>
                      <div className="title">{adminCards[item?.key] || 0}</div>
                    </div>
                    <div className="icon text-center">
                      <i className="flaticon-contract" />
                    </div>
                  </div>
                </div>
              ))
            : translatorDashboardWidgets?.map((item, index) => (
                <div className="col-sm-6 col-xxl-3" key={index}>
                  <div className="d-flex align-items-center justify-content-between statistics_funfact">
                    <div className="details">
                      <div className="fz15">{item?.name}</div>
                      <div className="title">{adminCards[item?.key] || 0}</div>
                    </div>
                    <div className="icon text-center">
                      <i className="flaticon-contract" />
                    </div>
                  </div>
                </div>
              ))}
        </div>
      </div>
    </>
  );
}
