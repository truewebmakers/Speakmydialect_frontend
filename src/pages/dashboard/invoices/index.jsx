import MetaComponent from "@/components/common/MetaComponent";
import DashboardLayout from "@/components/dashboard/DashboardLayout";
import InvoiceInfo from "@/components/dashboard/section/InvoiceInfo";
import MobileNavigation2 from "@/components/header/MobileNavigation2";
import { metaData } from "@/constants/constant";
import React from "react";

const InvoiceComponent = () => {
  return (
    <div>
      <MetaComponent meta={metaData} />
      <MobileNavigation2 />
      <DashboardLayout>
        <InvoiceInfo />
      </DashboardLayout>
    </div>
  );
};

export default InvoiceComponent;
