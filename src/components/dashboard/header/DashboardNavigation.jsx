import { clientNavigation, translatorNavigation } from "@/data/dashboard";
import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import { useLocation } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import UseApi from "@/hook/useApi";
import { apiMethods, apiUrls } from "@/constants/constant";
import { toast } from "react-toastify";
import { logOutSuccess } from "@/redux/auth";

export default function DashboardNavigation() {
  const [isActive, setActive] = useState(false);
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
          <li
            className={
              pathname == item.path ? "mobile-dasboard-menu-active" : ""
            }
            onClick={() => setActive(false)}
            key={i}
          >
            <Link to={item.path}>
              <i className={`${item.icon} mr10`} />
              {item.name}
            </Link>
          </li>
        ) : (
          <li
            className={
              pathname == item.path ? "mobile-dasboard-menu-active" : ""
            }
            onClick={() => setActive(false)}
            key={i}
          >
            <Link onClick={() => logoutHandler()}>
              <i className={`${item.icon} mr10`} />
              {item.name}
            </Link>
          </li>
        )}
      </div>
    ));
  };

  return (
    <>
      <div className="dashboard_navigationbar d-block d-lg-none">
        <div className="dropdown">
          <button onClick={() => setActive(!isActive)} className="dropbtn">
            <i className="fa fa-bars pr10" /> Dashboard Navigation
          </button>
          <ul className={`dropdown-content ${isActive ? "show" : ""}`}>
            <li>
              <p className="fz15 fw400 ff-heading mt30 pl30">Start</p>
            </li>
            {user?.token?.length > 0 &&
              (user?.userInfo?.user_type == "admin"
                ? ""
                : user?.userInfo?.user_type == "translator"
                ? renderNavigationItems(translatorNavigation)
                : renderNavigationItems(clientNavigation))}
          </ul>
        </div>
      </div>
    </>
  );
}
