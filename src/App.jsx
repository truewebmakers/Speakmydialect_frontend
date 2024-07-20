import "./globals.css";
import Footer from "@/components/footer/Footer";
import { useEffect } from "react";
import BottomToTop from "@/components/button/BottomToTop";
import SearchModal1 from "@/components/modal/SearchModal1";
import { useLocation } from "react-router-dom";
import {
  header1,
  header10,
  header11,
  header2,
  header3,
  header4,
  header5,
  header6,
  header7,
  header8,
  header9,
  sidebarEnable,
} from "@/data/header";
import toggleStore from "@/store/toggleStore";
import { footer } from "@/data/footer";
import "react-tooltip/dist/react-tooltip.css";
import NavSidebar from "@/components/sidebar/NavSidebar";
import WOW from "wow.js";

import ScrollTopBehaviour from "./components/common/ScrollTopBehaviour";
import Header1 from "./components/header/Header1";
import AppRoutes from "./route";
import Header3 from "./components/header/Header3";

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
        pathname === "/register" ||
        pathname === "/register-translator" ||
        pathname === "/register-client" ||
        pathname === "/login"
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
          {header2.find(
            (elm) => elm?.split("/")[1] == pathname?.split("/")[1]
          ) && <Header3 />}
          {header3.find(
            (elm) => elm?.split("/")[1] == pathname?.split("/")[1]
          ) && <Header3 />}
          {header4.find(
            (elm) => elm?.split("/")[1] == pathname?.split("/")[1]
          ) && <Header3 />}
          {header5.find(
            (elm) => elm?.split("/")[1] == pathname?.split("/")[1]
          ) && <Header3 />}
          {header6.find(
            (elm) => elm?.split("/")[1] == pathname?.split("/")[1]
          ) && <Header3 />}
          {header7.find(
            (elm) => elm?.split("/")[1] == pathname?.split("/")[1]
          ) && <Header3 />}
          {header8.find(
            (elm) => elm?.split("/")[1] == pathname?.split("/")[1]
          ) && <Header3 />}
          {header9.find(
            (elm) => elm?.split("/")[1] == pathname?.split("/")[1]
          ) && <Header3 />}
          {header10.find(
            (elm) => elm?.split("/")[1] == pathname?.split("/")[1]
          ) && <Header3 />}
          {header11.find(
            (elm) => elm?.split("/")[1] == pathname?.split("/")[1]
          ) && <Header3 />}

          <SearchModal1 />
          <div className="body_content">
            {/* {children} */}
            <AppRoutes />
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
