import { loggedInMenu, menus } from "@/data/navigation";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { useLocation } from "react-router-dom";

export default function Navigation() {
  const { pathname } = useLocation();
  const { user, profileData } = useSelector((state) => state.auth);

  const picture = profileData?.user_meta?.profile_pic
    ? profileData?.user_meta?.profile_pic?.split("profile_pictures/")[1]
    : null;
  const newPicUrl =
    picture &&
    "https://speakmydialect.s3.ap-southeast-1.amazonaws.com/profile_pictures/" +
      picture;
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
        {/* if logged In show profile image, and hide other tabs */}
        {user?.token?.length > 0
          ? loggedInMenu?.map((item, i) =>
              item.id == 4 ? ( // if profile show image
                <li className="user_setting" key={i}>
                  <div className="dropdown">
                    <Link className="btn" to="/my-profile">
                      <img
                        src={newPicUrl || "/images/default/defaultProfile.png"}
                        alt="User Image"
                        height={45}
                        width={45}
                        style={{ borderRadius: "21px" }}
                      />
                    </Link>
                  </div>
                </li>
              ) : (
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
            )
          : menus?.map((item, i) => (
              <li // if not logged in show all tabs
                key={i}
                className={`visible_list menu-active ${
                  item.id == 1 ? "home-menu-parent" : ""
                } `}
              >
                <Link
                  to={item.path}
                  className={`list-item  ${
                    item.path === pathname ? "ui-active" : ""
                  }`}
                >
                  <span className="title">{item.name}</span>
                </Link>
              </li>
            ))}
      </ul>
    </>
  );
}
