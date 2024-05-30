import { useAuth } from "@/context/authContext";
import toggleStore from "@/store/toggleStore";
import { Link } from "react-router-dom";
import { useLocation } from "react-router-dom";

export default function DashboardHeader() {
  let image = localStorage.getItem("picture");

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
                    <li className="d-none d-sm-block">
                      <a
                        className="text-center mr5 text-thm2 dropdown-toggle fz20"
                        type="button"
                        data-bs-toggle="dropdown"
                      >
                        <span className="flaticon-notification" />
                      </a>
                      <div className="dropdown-menu">
                        <div className="dboard_notific_dd px30 pt10 pb15">
                          <div className="notif_list d-flex align-items-center bdrb1 pb15 mb10">
                            <img
                              src="/images/resource/notif-1.png"
                              alt="notif"
                            />
                            <div className="details ml10">
                              <p className="text mb-0">Your resume</p>
                              <p className="text mb-0">updated!</p>
                            </div>
                          </div>
                          <div className="notif_list d-flex align-items-center bdrb1 pb15 mb10">
                            <img
                              src="/images/resource/notif-2.png"
                              alt="notif"
                            />
                            <div className="details ml10">
                              <p className="text mb-0">You changed</p>
                              <p className="text mb-0">password</p>
                            </div>
                          </div>
                          <div className="notif_list d-flex align-items-center bdrb1 pb15 mb10">
                            <img
                              src="/images/resource/notif-3.png"
                              alt="notif"
                            />
                            <div className="details ml10">
                              <p className="text mb-0">Your account has been</p>
                              <p className="text mb-0">created successfully</p>
                            </div>
                          </div>
                          <div className="notif_list d-flex align-items-center bdrb1 pb15 mb10">
                            <img
                              src="/images/resource/notif-4.png"
                              alt="notif"
                            />
                            <div className="details ml10">
                              <p className="text mb-0">
                                You applied for a job{" "}
                              </p>
                              <p className="text mb-0">Front-end Developer</p>
                            </div>
                          </div>
                          <div className="notif_list d-flex align-items-center">
                            <img
                              src="/images/resource/notif-5.png"
                              alt="notif"
                            />
                            <div className="details ml10">
                              <p className="text mb-0">Your course uploaded</p>
                              <p className="text mb-0">successfully</p>
                            </div>
                          </div>
                        </div>
                      </div>
                    </li>
                    <li className="d-none d-sm-block">
                      <a
                        className="text-center mr5 text-thm2 dropdown-toggle fz20"
                        type="button"
                        data-bs-toggle="dropdown"
                      >
                        <span className="flaticon-mail" />
                      </a>
                      <div className="dropdown-menu">
                        <div className="dboard_notific_dd px30 pt20 pb15">
                          <div className="notif_list d-flex align-items-start bdrb1 pb25 mb10">
                            <img
                              className="img-2"
                              src="/images/testimonials/testi-1.png"
                              alt="testimonials"
                            />
                            <div className="details ml15">
                              <p className="dark-color fw500 mb-2">Ali Tufan</p>
                              <p className="text mb-2">
                                Lorem ipsum dolor sit amet, consectetur
                                adipiscing.
                              </p>
                              <p className="mb-0 text-thm">4 hours ago</p>
                            </div>
                          </div>
                          <div className="notif_list d-flex align-items-start mb25">
                            <img
                              className="img-2"
                              src="/images/testimonials/testi-2.png"
                              alt="testimonials"
                            />
                            <div className="details ml15">
                              <p className="dark-color fw500 mb-2">Ali Tufan</p>
                              <p className="text mb-2">
                                Lorem ipsum dolor sit amet, consectetur
                                adipiscing.
                              </p>
                              <p className="mb-0 text-thm">4 hours ago</p>
                            </div>
                          </div>
                          <div className="d-grid">
                            <Link
                              to="/message"
                              className="ud-btn btn-thm w-100"
                            >
                              View All Messages
                              <i className="fal fa-arrow-right-long" />
                            </Link>
                          </div>
                        </div>
                      </div>
                    </li>
                    <li className="d-none d-sm-block">
                      <a
                        className="text-center mr5 text-thm2 dropdown-toggle fz20"
                        type="button"
                        data-bs-toggle="dropdown"
                      >
                        <span className="flaticon-like" />
                      </a>
                      <div className="dropdown-menu">
                        <div className="dboard_notific_dd px30 pt10 pb15">
                          <div className="notif_list d-flex align-items-center bdrb1 pb15 mb10">
                            <img
                              src="/images/resource/notif-1.png"
                              alt="notif"
                            />
                            <div className="details ml10">
                              <p className="text mb-0">Your resume</p>
                              <p className="text mb-0">updated!</p>
                            </div>
                          </div>
                          <div className="notif_list d-flex align-items-center bdrb1 pb15 mb10">
                            <img
                              src="/images/resource/notif-2.png"
                              alt="notif"
                            />
                            <div className="details ml10">
                              <p className="text mb-0">You changed</p>
                              <p className="text mb-0">password</p>
                            </div>
                          </div>
                          <div className="notif_list d-flex align-items-center bdrb1 pb15 mb10">
                            <img
                              src="/images/resource/notif-3.png"
                              alt="notif"
                            />
                            <div className="details ml10">
                              <p className="text mb-0">Your account has been</p>
                              <p className="text mb-0">created successfully</p>
                            </div>
                          </div>
                          <div className="notif_list d-flex align-items-center bdrb1 pb15 mb10">
                            <img
                              src="/images/resource/notif-4.png"
                              alt="notif"
                            />
                            <div className="details ml10">
                              <p className="text mb-0">
                                You applied for a job{" "}
                              </p>
                              <p className="text mb-0">Front-end Developer</p>
                            </div>
                          </div>
                          <div className="notif_list d-flex align-items-center">
                            <img
                              src="/images/resource/notif-5.png"
                              alt="notif"
                            />
                            <div className="details ml10">
                              <p className="text mb-0">Your course uploaded</p>
                              <p className="text mb-0">successfully</p>
                            </div>
                          </div>
                        </div>
                      </div>
                    </li>
                    <li className="user_setting">
                      <div className="dropdown">
                        <Link
                          className="btn"
                          // data-bs-toggle="dropdown"
                          to="/my-profile"
                        >
                          <img
                            src={image}
                            alt="user.png"
                            height={50}
                            width={50}
                            style={{ borderRadius: "21px" }}
                          />
                        </Link>
                        {/* <div className="dropdown-menu">
                          <div className="user_setting_content">
                            <p className="fz15 fw400 ff-heading mb10 pl30">
                              Start
                            </p>
                            {userInfo &&
                            JSON.parse(userInfo)?.user_type == "admin"
                              ? ""
                              : JSON.parse(userInfo)?.user_type == "translator"
                              ? translatorNavigation.map((item, i) =>
                                  item.name !== "Logout" ? (
                                    <Link
                                      key={i}
                                      className={`dropdown-item ${
                                        pathname === item.path ? "active" : ""
                                      }`}
                                      to={item.path}
                                    >
                                      <i className={`${item.icon} mr10`} />
                                      {item.name}
                                    </Link>
                                  ) : (
                                    <Link
                                      key={i}
                                      className={`dropdown-item ${
                                        pathname === item.path ? "active" : ""
                                      }`}
                                      onClick={handleLogoutClick}
                                    >
                                      <i className={`${item.icon} mr10`} />
                                      {item.name}
                                    </Link>
                                  )
                                )
                              : clientNavigation.map((item, i) =>
                                  item.name !== "Logout" ? (
                                    <Link
                                      key={i}
                                      className={`dropdown-item ${
                                        pathname === item.path ? "active" : ""
                                      }`}
                                      to={item.path}
                                    >
                                      <i className={`${item.icon} mr10`} />
                                      {item.name}
                                    </Link>
                                  ) : (
                                    <Link
                                      key={i}
                                      className={`dropdown-item ${
                                        pathname === item.path ? "active" : ""
                                      }`}
                                      onClick={handleLogoutClick}
                                    >
                                      <i className={`${item.icon} mr10`} />
                                      {item.name}
                                    </Link>
                                  )
                                )}
                          </div>
                        </div> */}
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
