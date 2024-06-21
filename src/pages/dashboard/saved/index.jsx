import DashboardLayout from "@/components/dashboard/DashboardLayout";
import JobAndOrdersManagement from "@/components/dashboard/section/SavedInfo";
import MobileNavigation2 from "@/components/header/MobileNavigation2";
import MetaComponent from "@/components/common/MetaComponent";
import { metaData } from "@/constants/constant";

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
