import Banner from "@/components/common/banner";
import { apiMethods, apiUrls } from "@/constants/constant";
import UseApi from "@/hook/useApi";
import { CapitalizeFirstLetter } from "@/utils/helper";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

export default function DashboardHeader() {
  const { profileData, user } = useSelector((state) => state.auth);
  const [profileCompletionMessage, setProfileCompletionMessage] = useState("");

  const picture = profileData?.user_meta?.profile_pic
    ? profileData?.user_meta?.profile_pic?.split("profile_pictures/")[1]
    : null;
  const newPicUrl =
    picture &&
    "https://speakmydialect.s3.ap-southeast-1.amazonaws.com/profile_pictures/" +
      picture;

  const isProfileComplete = async () => {
    try {
      const headers = {
        Authorization: `Bearer ${user?.token}`,
      };
      const { data } = await UseApi(
        apiUrls.checkProfileCompletion + user?.userInfo?.id, // API URL
        apiMethods.GET,
        null,
        headers
      );
      if (data?.status == false) {
        setProfileCompletionMessage(data?.message);
      } else {
        setProfileCompletionMessage("");
      }
    } catch (err) {
      return err;
    }
  };

  useEffect(() => {
    if (user?.token?.length) {
      isProfileComplete();
    }
  }, [user]);

  return (
    <>
      <header className="header-nav nav-innerpage-style menu-home4 dashboard_header main-menu">
        <nav className="posr">
          <div className="container-fluid pr30 pr15-xs pl30 posr menu_bdrt1">
            <div className="row align-items-center justify-content-between">
              <div className="col-6 col-lg-auto">
                <div className="text-center text-lg-start d-flex align-items-center">
                  <div className="dashboard_header_logo position-relative me-2 me-xl-5">
                    <Link to="/" className="logo">
                      <img src="/images/logo.jpeg" alt="logo" />
                    </Link>
                  </div>
                </div>
              </div>
              {user?.userInfo?.user_type == "translator"
                ? profileCompletionMessage && (
                    <Banner message={profileCompletionMessage} />
                  )
                : null}
              <div className="col-6 col-lg-auto">
                <div className="text-center text-lg-end header_right_widgets">
                  <ul className="dashboard_dd_menu_list d-flex align-items-center justify-content-center justify-content-sm-end mb-0 p-0">
                    <li className="user_setting">
                      <div className="dropdown">
                        <Link className="btn" to="/my-profile">
                          {user?.userInfo?.user_type && (
                            <span class="mb25 me-4 badge-success">
                              {user?.userInfo?.user_type == "translator"
                                ? "Interpreter"
                                : CapitalizeFirstLetter(
                                    user?.userInfo?.user_type
                                  )}
                            </span>
                          )}
                          <img
                            src={
                              newPicUrl || "/images/default/defaultProfile.png"
                            }
                            alt="User Image"
                            height={45}
                            width={45}
                            style={{ borderRadius: "21px" }}
                          />
                        </Link>
                      </div>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </nav>
      </header>
    </>
  );
}
