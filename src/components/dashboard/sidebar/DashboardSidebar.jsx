import {
  adminNavigation,
  clientNavigation,
  translatorNavigation,
} from "@/data/dashboard";
import { useDispatch, useSelector } from "react-redux";
import { Link, Navigate, useNavigate } from "react-router-dom";
import { useLocation } from "react-router-dom";
import UseApi from "@/hook/useApi";
import { apiMethods, apiUrls } from "@/constants/constant";
import { toast } from "react-toastify";
import { logOutSuccess } from "@/redux/auth";

export default function DashboardSidebar() {
  const { pathname } = useLocation();
  const { user } = useSelector((state) => state.auth);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const logoutHandler = async () => {
    try {
      const headers = {
        Authorization: `Bearer ${user.token}`,
      };
      const response = await UseApi(
        apiUrls.logout,
        apiMethods.POST,
        null,
        headers
      );
      if (response?.status === 200 || response?.status === 201) {
        toast.success("Logged out");
        localStorage.clear();
        sessionStorage.clear();
        dispatch(logOutSuccess());
        navigate("/login");
      }
    } catch (error) {
      toast.error("Error in logging out");
    }
  };

  const renderNavigationItems = (navigation) => {
    return navigation.map((item, i) => (
      <div key={i} className="sidebar_list_item mb-1">
        {item.name !== "Logout" ? (
          <Link
            to={item.path}
            className={`items-center ${
              pathname === item.path ? "-is-active" : ""
            }`}
          >
            <i className={`${item.icon} mr15`} />

            {item.name}
          </Link>
        ) : (
          <Link className="items-center" onClick={() => logoutHandler()}>
            <i className={`${item.icon} mr15`} />
            {item.name}
          </Link>
        )}
      </div>
    ));
  };

  return (
    <div className="dashboard__sidebar d-none d-lg-block">
      <div className="dashboard_sidebar_list">
        {user?.token?.length > 0 &&
          (user?.userInfo?.user_type === "admin"
            ? renderNavigationItems(adminNavigation)
            : user?.userInfo?.user_type === "translator"
            ? renderNavigationItems(translatorNavigation)
            : renderNavigationItems(clientNavigation))}
      </div>
    </div>
  );
}
