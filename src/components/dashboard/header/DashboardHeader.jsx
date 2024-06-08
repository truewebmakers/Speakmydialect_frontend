import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

export default function DashboardHeader() {
  const { profileData } = useSelector((state) => state.auth);

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
              <div className="col-6 col-lg-auto">
                <div className="text-center text-lg-end header_right_widgets">
                  <ul className="dashboard_dd_menu_list d-flex align-items-center justify-content-center justify-content-sm-end mb-0 p-0">
                    <li className="user_setting">
                      <div className="dropdown">
                        <Link className="btn" to="/my-profile">
                          <img
                            src={profileData?.user_meta?.profile_pic}
                            alt="user.png"
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
