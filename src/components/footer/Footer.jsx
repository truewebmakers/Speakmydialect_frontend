import { Link } from "react-router-dom";
import FooterHeader from "./FooterHeader";
import { useLocation } from "react-router-dom";

import { support, quickLinks1, quickLinks2 } from "@/data/footer";
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
              <div className="footer-widget">
                <div className="footer-logo">
                  <Link to="#" className="logo">
                    <img src="/images/logo.png" alt="logo" />
                  </Link>
                </div>
                <div className="footer-content">
                  <p className="footer-content-text">
                    At Speakmydialect, we specialise in providing interpreting
                    services to support local community members and
                    organisations to bridge communication and language barriers.
                  </p>
                </div>
              </div>
            </div>
            <div className="col-sm-6 col-lg-3" >
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
                  Quick Links
                </h5>
                <ul className="ps-0">
                  {quickLinks1.map((item, i) => (
                    <li key={i}>
                      <Link to={item.path} target="_blank">
                        {item.name}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
            <div className="col-sm-6 col-lg-3"  >
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
                  Quick Links
                </h5>
                <ul className="ps-0">
                  {quickLinks2.map((item, i) => (
                    <li key={i}>
                      <Link to={item.path} target="_blank">
                        {item.name}
                      </Link>
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
                  {support?.map((item, i) => (
                    <li key={i}>
                      <Link to={item.path}>{item.name}</Link>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>
        <div className="container">
          <span
            className={`copyright-text mb-2 mb-md-0  ${
              pathname === "/home-11" ? "text-white" : "text-white-light"
            } ff-heading`}
          >
            Speakmydialect acknowledges the Traditional Owners of Country
            throughout Australia. We pay our respects to Elders past and
            present. We recognise the First Peoples of this Nation and their
            ongoing cultural and spiritual connections to the lands, waters,
            seas, skies, and communities. We acknowledge First Nations Peoples
            as the Traditional Custodians and Lore Keepers of the oldest living
            culture and pay respects to their Elders past and present. We extend
            that respect to all First Nations Peoples.
          </span>
        </div>
        <div className="container white-bdrt1 py-4">
          <div className="row align-items-center">
            <div className="col-md-12">
              <div className="text-center  ">
                <p
                  className={`copyright-text mb-2 mb-md-0  ${
                    pathname === "/home-11" ? "text-white" : "text-white-light"
                  } ff-heading`}
                >
                  Copyright © {new Date().getFullYear()}{" "}
                  <a
                    href="https://themeforest.net/user/ib-themes/portfolio"
                    target="_blank"
                    style={{ color: "inherit" }}
                  >
                    SpeakMyDialect,{" "}
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
