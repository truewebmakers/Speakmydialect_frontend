import menus from "@/data/navigation";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { useLocation } from "react-router-dom";

export default function Navigation() {
  const { pathname } = useLocation();
  const { user, profileData } = useSelector((state) => state.auth);

  return (
    <>
      <ul
        className={`ace-responsive-menu ui-navigation ${
          pathname == "/home-3" ||
          pathname == "/home-4" ||
          pathname == "/home-10"
            ? "menu-without-paddingy"
            : ""
        } `}
      >
        {menus?.map((item, i) =>
          // if logged In show profile image, and hide other tabs
          user?.token?.length > 0 ? (
            item?.id == 1 || item?.id == 2 || item?.id == 3 ? (
              <li
                key={i}
                className={`visible_list menu-active ${
                  item.id == 1 ? "home-menu-parent" : ""
                } `}
              >
                <Link
                  to={item.path}
                  className={`list-item
                                ${item.path === pathname ? "ui-active" : ""}`}
                >
                  <span className="title">{item.name}</span>
                </Link>
              </li>
            ) : (
              item?.id == 4 && (
                <li className="user_setting">
                  <div className="dropdown">
                    <Link className="btn" to="/my-profile">
                      <img
                        src={profileData?.user_meta?.profile_pic}
                        alt="user.png"
                        height={50}
                        width={50}
                        style={{ borderRadius: "21px" }}
                      />
                    </Link>
                  </div>
                </li>
              )
            )
          ) : (
            // if not logged in show all tabs
            <li
              key={i}
              className={`visible_list menu-active ${
                item.id == 1 ? "home-menu-parent" : ""
              } `}
            >
              <Link
                to={item.path}
                className={`list-item
                                ${item.path === pathname ? "ui-active" : ""}`}
              >
                <span className="title">{item.name}</span>
              </Link>
            </li>
          )
        )}
      </ul>
    </>
  );
}
