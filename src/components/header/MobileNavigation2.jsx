import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

export default function MobileNavigation2() {
  const { user, profileData } = useSelector((state) => state.auth);

  return (
    <>
      <div className="mobilie_header_nav stylehome1">
        <div className="mobile-menu">
          <div className="header bdrb1">
            <div className="menu_and_widgets">
              <div className="mobile_menu_bar d-flex justify-content-between align-items-center">
                {/* Logo */}
                <Link className="mobile_logo" to="/">
                  <img src="/images/logo.jpeg" alt="Header Logo" />
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
                      <img
                        src={
                          profileData?.user_meta?.profile_pic ||
                          "/images/default/defaultProfile.png"
                        }
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
