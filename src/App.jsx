import "./globals.css";
import Footer from "@/components/footer/Footer";
import { useEffect } from "react";
import BottomToTop from "@/components/button/BottomToTop";
import SearchModal1 from "@/components/modal/SearchModal1";
import { useLocation } from "react-router-dom";
import { header1, sidebarEnable } from "@/data/header";
import toggleStore from "@/store/toggleStore";
import { footer } from "@/data/footer";
import "react-tooltip/dist/react-tooltip.css";
import NavSidebar from "@/components/sidebar/NavSidebar";
import WOW from "wow.js";

import ScrollTopBehaviour from "./components/common/ScrollTopBehaviour";
import Header1 from "./components/header/Header1";
import AppRoutes from "./route";

if (typeof window !== "undefined") {
  import("bootstrap");
}

export function App() {
  const isListingActive = toggleStore((state) => state.isListingActive);

  const { pathname } = useLocation();

  useEffect(() => {
    new WOW({
      live: false,
    }).init();
  }, [pathname]);

  return (
    <div
      className={` ${
        pathname === "/register" || pathname === "/login"
          ? "bgc-thm4 mm-wrapper mm-wrapper--position-left-front"
          : sidebarEnable.includes(pathname)
          ? isListingActive
            ? "menu-hidden-sidebar-content"
            : ""
          : ""
      }`}
    >
      {!footer.includes(pathname) ? (
        <div className="wrapper ovh mm-page mm-slideout">
          {header1.find(
            (elm) => elm?.split("/")[1] == pathname?.split("/")[1]
          ) && <Header1 />}

          <SearchModal1 />
          <div className="body_content">
            {/* {children} */}
            <AppRoutes />
            {/* footer */}
            {/* {pathname === "/home-4" ||
            pathname === "/home-7" ||
            pathname === "/home-13" ? (
              <Footer2 />
            ) : pathname === "/home-5" ? (
              <Footer3 />
            ) : pathname === "/home-8" ? (
              <Footer4 />
            ) : pathname === "/home-9" ? (
              <Footer5 />
            ) : pathname === "/home-12" ? (
              <Footer12 />
            ) : pathname === "/home-14" ? (
              <Footer14 />
            ) : pathname === "/home-15" ? (
              <Footer15 />
            ) : pathname === "/home-18" ? (
              <Footer18 />
            ) : pathname === "/home-20" ? (
              <Footer20 />
            ) : (
              pathname !== "/service-7" &&
              pathname !== "/invoices" && <Footer />
            )} */}
            {!pathname.includes("/invoices") && <Footer />}

            {/* bottom to top */}
            <BottomToTop />
          </div>
        </div>
      ) : (
        <div className="wrapper mm-page mm-slideout">
          <AppRoutes />
          {/* {children} */}
          {/* bottom to top */}
          <BottomToTop />
        </div>
      )}

      {/* sidebar mobile navigation */}
      <NavSidebar />
      <ScrollTopBehaviour />
    </div>
  );
}
