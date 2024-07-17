import DashboardLayout from "@/components/dashboard/DashboardLayout";
import PayoutInfo from "@/components/dashboard/section/PayoutInfo";
import MobileNavigation2 from "@/components/header/MobileNavigation2";
import MetaComponent from "@/components/common/MetaComponent";
import { apiMethods, apiUrls, metaData } from "@/constants/constant";
import { useLocation } from "react-router-dom";
import PaymentMethod from "@/components/dashboard/section/PaymentMethod";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { useSelector } from "react-redux";
import UseApi from "@/hook/useApi";

export default function DasbPagePayouts() {
  const { pathname } = useLocation();

  return (
    <>
      <MetaComponent meta={metaData} />
      <MobileNavigation2 />
      <DashboardLayout>
        {pathname?.includes("/payout") ? (
          <PayoutInfo />
        ) : (
          <div className="ps-widget bgc-white bdrs4 p30 mb30 position-relative">
            <div className="row">
              <div className="col-lg-9">
                <PaymentMethod />
              </div>
            </div>
          </div>
        )}
      </DashboardLayout>
    </>
  );
}
