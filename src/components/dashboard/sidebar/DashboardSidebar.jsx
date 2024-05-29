import { handleLogoutClick } from "@/components/common/logoutHandler";
import { useAuth } from "@/context/authContext";
import { clientNavigation, translatorNavigation } from "@/data/dashboard";
import { Link, Navigate } from "react-router-dom";
import { useLocation } from "react-router-dom";

export default function DashboardSidebar() {
  const { pathname } = useLocation();
  const { userInfo } = useAuth();
  return (
    <>
      <div className="dashboard__sidebar d-none d-lg-block">
        <div className="dashboard_sidebar_list">
          {userInfo && JSON.parse(userInfo)?.user_type == "admin"
            ? ""
            : JSON.parse(userInfo)?.user_type == "translator"
            ? translatorNavigation.map((item, i) =>
                item.name !== "Logout" ? (
                  <div key={i} className="sidebar_list_item mb-1">
                    <Link
                      to={item.path}
                      className={`items-center ${
                        pathname === item.path ? "-is-active" : ""
                      }`}
                    >
                      <i className={`${item.icon} mr15`} />
                      {item.name}
                    </Link>
                  </div>
                ) : (
                  <div key={i} className="sidebar_list_item mb-1">
                    <Link
                      // to={item.path}
                      className={`items-center ${
                        pathname === item.path ? "-is-active" : ""
                      }`}
                      onClick={handleLogoutClick}
                    >
                      <i className={`${item.icon} mr15`} />
                      {item.name}
                    </Link>
                  </div>
                )
              )
            : clientNavigation.map((item, i) =>
                item.name !== "Logout" ? (
                  <div key={i} className="sidebar_list_item mb-1">
                    <Link
                      to={item.path}
                      className={`items-center ${
                        pathname === item.path ? "-is-active" : ""
                      }`}
                    >
                      <i className={`${item.icon} mr15`} />
                      {item.name}
                    </Link>
                  </div>
                ) : (
                  <div key={i} className="sidebar_list_item mb-1">
                    <Link
                      // to={item.path}
                      className={`items-center ${
                        pathname === item.path ? "-is-active" : ""
                      }`}
                      onClick={handleLogoutClick}
                    >
                      <i className={`${item.icon} mr15`} />
                      {item.name}
                    </Link>
                  </div>
                )
              )}
        </div>
      </div>
    </>
  );
}
