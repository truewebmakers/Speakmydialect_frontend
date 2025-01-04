import { CapitalizeFirstLetter } from "@/utils/helper";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

export default function MobileNavigation2() {
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
      <div className="mobilie_header_nav stylehome1">
        <div className="mobile-menu">
          <div className="header bdrb1">
            <div className="menu_and_widgets">
              <div className="mobile_menu_bar d-flex justify-content-between align-items-center">
                {/* Logo */}
                <Link className="mobile_logo logo" to="/">
                  <img
                    src="/images/logo.png"
                    alt="Header Logo"
                    width={50}
                    height={50}
                  />
                </Link>
                {/* Profile Image */}
                {user?.token && (
                  <div className="right-side text-end">
                    <a
                      className="menubar ml30"
                      data-bs-toggle="offcanvas"
                      data-bs-target="#offcanvasExample"
                      aria-controls="offcanvasExample"
                    >
                      {user?.userInfo?.user_type && (
                        <span class="mb25 me-4 badge-success">
                          {CapitalizeFirstLetter(user?.userInfo?.user_type)}
                        </span>
                      )}
                      <img
                        src={newPicUrl || "/images/default/defaultProfile.png"}
                        alt="User Image"
                        height={45}
                        width={45}
                        style={{ borderRadius: "21px" }}
                      />
                    </a>
                  </div>
                )}
              </div>
            </div>
            <div className="posr">
              <div className="mobile_menu_close_btn">
                <span className="far fa-times" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
