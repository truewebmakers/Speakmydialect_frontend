import MetaComponent from "@/components/common/MetaComponent";
import DashboardLayout from "@/components/dashboard/DashboardLayout";
import UsersInfo from "@/components/dashboard/section/UserInfo";
import MobileNavigation2 from "@/components/header/MobileNavigation2";
import { metaData } from "@/constants/constant";
import React from "react";

const Users = () => {
  return (
    <div>
      <MetaComponent meta={metaData} />
      <MobileNavigation2 />
      <DashboardLayout>
        <UsersInfo />
      </DashboardLayout>
    </div>
  );
};

export default Users;
