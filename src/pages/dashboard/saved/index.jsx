import DashboardLayout from "@/components/dashboard/DashboardLayout";
import JobAndOrdersManagement from "@/components/dashboard/section/SavedInfo";
import MobileNavigation2 from "@/components/header/MobileNavigation2";
import MetaComponent from "@/components/common/MetaComponent";
import { apiMethods, apiUrls, metaData } from "@/constants/constant";
import { useSelector } from "react-redux";
import UseApi from "@/hook/useApi";
import { toast } from "react-toastify";
import { useEffect, useState } from "react";

export default function DasbPageSaved() {
  return (
    <>
      <MetaComponent meta={metaData} />
      <MobileNavigation2 />
      <DashboardLayout>
        <JobAndOrdersManagement />
      </DashboardLayout>
    </>
  );
}
