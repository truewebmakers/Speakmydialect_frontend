import { Link } from "react-router-dom";
import MobileNavigation2 from "./MobileNavigation2";
import Navigation from "./Navigation";

import { useLocation } from "react-router-dom";

export default function Header3() {
  return (
    <>
      <header className="header-nav nav-innerpage-style main-menu  ">
        <nav className="posr">
          <div className="container-fluid posr menu_bdrt1">
            <div className="row align-items-center justify-content-between">
              <div className="col-auto pe-0">
                <div className="d-flex align-items-center">
                  {/* <Link className="header-logo bdrr1 pr30 pr5-xl" to="/">
                    <img
                      className="w-100 h-100 object-fit-contain"
                      src="/images/header-logo-dark.svg"
                      alt="Header Logo"
                    />
                  </Link> */}
                  <Link className="logo" to="/">
                    <img src="/images/logo.png" alt="Header Logo" />
                  </Link>
                </div>
              </div>
              <div className="col-auto">
                <div className="d-flex align-items-center">
                  <Navigation />
                </div>
              </div>
            </div>
          </div>
        </nav>
      </header>
      <MobileNavigation2 />
    </>
  );
}
