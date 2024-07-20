import { Link } from "react-router-dom";
import FooterHeader from "./FooterHeader";
import { useLocation } from "react-router-dom";

import { overview, about, support } from "@/data/footer";
import { useSelector } from "react-redux";

export default function Footer() {
  const { pathname } = useLocation();
  const { user } = useSelector((state) => state.auth);

  return (
    <>
      <section
        className={`footer-style1 pt25 pb-0 at-home6 home2-footer-radius`}
      >
        <div className="container">
          <FooterHeader />
          <div className="row">
            <div className="col-sm-6 col-lg-3">
              <div
                className={`link-style1 mb-4 mb-sm-5 ${
                  pathname === "/home-4"
                    ? "light-style at-home8"
                    : pathname === "/home-11"
                    ? "light-style at-home11"
                    : ""
                }`}
              >
                <h5
                  className={`mb15 ${
                    pathname !== "/home-4" ? "text-white" : ""
                  }`}
                >
                  Overview
                </h5>
                <div className="link-list">
                  {user?.token?.length > 0
                    ? overview.map((item, i) => (
                        <Link key={i} to={item.path}>
                          {item.name}
                        </Link>
                      ))
                    : overview.map((item, i) =>
                        item.name == "My Account" ? (
                          <Link key={i} to={"/login"}>
                            {item.name}
                          </Link>
                        ) : item.name == "Join" ? (
                          <Link key={i} to={"/register"}>
                            {item.name}
                          </Link>
                        ) : (
                          <Link key={i} to={item.path}>
                            {item.name}
                          </Link>
                        )
                      )}
                </div>
              </div>
            </div>
            <div className="col-sm-6 col-lg-3">
              <div
                className={`link-style1 mb-4 mb-sm-5 ${
                  pathname === "/home-4"
                    ? "light-style at-home8"
                    : pathname === "/home-11"
                    ? "light-style at-home11"
                    : ""
                }`}
              >
                <h5
                  className={`mb15 ${
                    pathname !== "/home-4" ? "text-white" : ""
                  }`}
                >
                  About
                </h5>
                <ul className="ps-0">
                  {about.map((item, i) => (
                    <li key={i}>
                      <Link to={item.path}>{item.name}</Link>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
            <div className="col-sm-6 col-lg-3">
              <div
                className={`link-style1 mb-4 mb-sm-5 ${
                  pathname === "/home-4"
                    ? "light-style at-home8"
                    : pathname === "/home-11"
                    ? "light-style at-home11"
                    : ""
                }`}
              >
                <h5
                  className={`mb15 ${
                    pathname !== "/home-4" ? "text-white" : ""
                  }`}
                >
                  Support
                </h5>
                <ul className="ps-0">
                  {support.map((item, i) => (
                    <li key={i}>
                      <Link to={item.path}>{item.name}</Link>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
            {/* <div className="col-sm-6 col-lg-3">
              <div className="footer-widget">
                <div className="footer-widget mb-4 mb-sm-5">
                  <div className="mailchimp-widget">
                    <h5 className="title text-white mb20">Subscribe</h5>
                    <div
                      className={`mailchimp-style1 ${
                        pathname === "/home-11" ? " at-home11" : ""
                      }`}
                    >
                      <input
                        type="email"
                        className="form-control"
                        placeholder="Your email address"
                      />
                      <button type="submit">Send</button>
                    </div>
                  </div>
                </div>
                <div className="app-widget mb-4 mb-sm-5">
                  <h5 className="title text-white mb20">Apps</h5>
                  <div className="row mb-4 mb-lg-5">
                    <div className="col-lg-12">
                      <a className="app-list d-flex align-items-center mb10">
                        <i className="fab fa-apple fz17 mr15" />
                        <h6
                          className={`app-title fz15 fw400 mb-0 ${
                            pathname === "/home-11" ? "text-white" : ""
                          }`}
                        >
                          iOS App
                        </h6>
                      </a>
                      <a className="app-list d-flex align-items-center">
                        <i className="fab fa-google-play fz15 mr15" />
                        <h6
                          className={`app-title fz15 fw400 mb-0 ${
                            pathname === "/home-11" ? "text-white" : ""
                          }`}
                        >
                          Android App
                        </h6>
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            </div> */}
          </div>
        </div>
        <div className="container white-bdrt1 py-4">
          <div className="row align-items-center">
            <div className="col-md-6">
              <div className="text-center text-lg-start">
                <p
                  className={`copyright-text mb-2 mb-md-0  ${
                    pathname === "/home-11" ? "text-white" : "text-white-light"
                  } ff-heading`}
                >
                  Copyright © 2024
                  {new Date().getFullYear()}{" "}
                  <a
                    href="https://themeforest.net/user/ib-themes/portfolio"
                    target="_blank"
                    style={{ color: "inherit" }}
                  >
                    Powered By SpeakMyDialect.com.au ,{" "}
                  </a>
                  All rights reserved.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
