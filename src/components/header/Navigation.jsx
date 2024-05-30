import { apiMethods, apiUrls } from "@/constants/constant";
import { useAuth } from "@/context/authContext";
import menus from "@/data/navigation";
import UseApi from "@/hook/useApi";
import { isActiveNavigation } from "@/utils/isActiveNavigation";
import { useEffect, useState } from "react";

import { Link } from "react-router-dom";
import { useLocation } from "react-router-dom";

export default function Navigation() {
  const { pathname } = useLocation();
  const { userInfo, token } = useAuth();
  const [profileImg, setProfileImg] = useState("/images/resource/user.png");
  const userId = userInfo?.length > 0 ? JSON.parse(userInfo)?.id : "";

  const getProfileData = async () => {
    try {
      const headers = { Authorization: `Bearer ${token}` };
      const response = await UseApi(
        apiUrls.getUserProfile + userId,
        apiMethods.GET,
        null,
        headers
      );
      if (response?.status === 200 || response?.status === 201) {
        setProfileImg(response?.data?.user?.user_meta?.profile_pic);
        localStorage.setItem(
          "picture",
          response?.data?.user?.user_meta?.profile_pic
        );
      }
    } catch (error) {
      return toast.error("Error fetching profile data");
    }
  };

  useEffect(() => {
    if (token?.length > 0) {
      getProfileData();
    }
  }, []);

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
        {menus.map((item, i) =>
          token?.length > 0 ? (
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
                        src={profileImg}
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
