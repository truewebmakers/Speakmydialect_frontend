import { Link } from "react-router-dom";
import Mega from "./Mega";

import Navigation from "./Navigation";
import useStickyMenu from "@/hook/useStickyMenu";
import MobileNavigation1 from "./MobileNavigation1";

export default function Header1() {
  const sticky = useStickyMenu(50);

  return (
    <>
      <header
        className={`header-nav nav-homepage-style stricky main-menu animated   ${
          sticky ? "slideInDown stricky-fixed" : "slideIn"
        }`}
      >
        <nav className="posr">
          <div className="container-fluid posr menu_bdrt1 px30">
            <div className="row align-items-center justify-content-between">
              <div className="col-auto px-0">
                <div className="d-flex align-items-center justify-content-between">
                  <div className="logos br-white-light pr30 pr5-xl">
                    <Link className="header-logo logo1" to="/">
                      <img src="/images/logo.jpeg" alt="Header Logo" />
                    </Link>
                    <Link className="header-logo logo2" to="/">
                      <img src="/images/logo.jpeg" alt="Header Logo" />
                    </Link>
                  </div>
                </div>
              </div>
              <div className="col-auto px-0">
                <div className="d-flex align-items-center">
                  <Navigation />
                </div>
              </div>
            </div>
          </div>
        </nav>
      </header>
      <MobileNavigation1 />
    </>
  );
}
