import { clientNavigation, translatorNavigation } from "@/data/dashboard";
import { Link } from "react-router-dom";
import { useState } from "react";
import { useLocation } from "react-router-dom";
import { handleLogoutClick } from "@/components/common/logoutHandler";
import { useSelector } from "react-redux";

export default function DashboardNavigation() {
  const [isActive, setActive] = useState(false);
  const { pathname } = useLocation();
  const { user } = useSelector((state) => state.auth);

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
                ? translatorNavigation.map((item, i) =>
                    item.name !== "Logout" ? (
                      <li
                        className={
                          pathname == item.path
                            ? "mobile-dasboard-menu-active"
                            : ""
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
                          pathname == item.path
                            ? "mobile-dasboard-menu-active"
                            : ""
                        }
                        onClick={() => setActive(false)}
                        key={i}
                      >
                        <Link onClick={handleLogoutClick}>
                          <i className={`${item.icon} mr10`} />
                          {item.name}
                        </Link>
                      </li>
                    )
                  )
                : clientNavigation.map((item, i) =>
                    item.name !== "Logout" ? (
                      <li
                        className={
                          pathname == item.path
                            ? "mobile-dasboard-menu-active"
                            : ""
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
                          pathname == item.path
                            ? "mobile-dasboard-menu-active"
                            : ""
                        }
                        onClick={() => setActive(false)}
                        key={i}
                      >
                        <Link onClick={handleLogoutClick}>
                          <i className={`${item.icon} mr10`} />
                          {item.name}
                        </Link>
                      </li>
                    )
                  ))}
          </ul>
        </div>
      </div>
    </>
  );
}
