import { handleLogoutClick } from "@/components/common/logoutHandler";
import { clientNavigation, translatorNavigation } from "@/data/dashboard";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { useLocation } from "react-router-dom";

export default function DashboardSidebar() {
  const { pathname } = useLocation();
  const { user } = useSelector((state) => state.auth);

  return (
    <>
      <div className="dashboard__sidebar d-none d-lg-block">
        <div className="dashboard_sidebar_list">
          {user?.token?.length > 0 &&
            (user?.userInfo?.user_type == "admin"
              ? ""
              : user?.userInfo?.user_type == "translator"
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
                ))}
        </div>
      </div>
    </>
  );
}
