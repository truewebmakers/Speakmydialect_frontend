import MetaComponent from "@/components/common/MetaComponent";
import DashboardLayout from "@/components/dashboard/DashboardLayout";
import ContactInquiryInfo from "@/components/dashboard/section/ContactInquiryInfo";
import MobileNavigation2 from "@/components/header/MobileNavigation2";
import { metaData } from "@/constants/constant";
import React from "react";

const ContactInquiry = () => {
  return (
    <div>
      <MetaComponent meta={metaData} />
      <MobileNavigation2 />
      <DashboardLayout>
        <ContactInquiryInfo />
      </DashboardLayout>
    </div>
  );
};

export default ContactInquiry;
