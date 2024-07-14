import MetaComponent from "@/components/common/MetaComponent";
import DashboardLayout from "@/components/dashboard/DashboardLayout";
import UserApprovalInfo from "@/components/dashboard/section/UserApprovals";
import MobileNavigation2 from "@/components/header/MobileNavigation2";
import { metaData } from "@/constants/constant";
import React from "react";

const UserApprovals = () => {
  return (
    <div>
      <MetaComponent meta={metaData} />
      <MobileNavigation2 />
      <DashboardLayout>
        <UserApprovalInfo />
      </DashboardLayout>
    </div>
  );
};

export default UserApprovals;
