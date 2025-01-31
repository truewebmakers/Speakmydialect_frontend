import { useEffect } from "react";
import DashboardNavigation from "../header/DashboardNavigation";
import ChangePassword from "./ChangePassword";
import Education from "./Education";
import ClientProfileDetails from "./ClientProfileDetails";
import Skill from "./Skill";
import WorkExperience from "./WorkExperience";
import { useDispatch, useSelector } from "react-redux";
import { getProfileDetails } from "@/redux/auth";
import { getProfileData } from "@/utils/commonFunctions";
import TranslatorProfileDetails from "./TranslatorProfileDetails";
import UserAvailability from "./UserAvailability";
import { useLocation } from "react-router-dom";

export default function MyProfileInfo() {
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth);
  const params = useLocation();
  const isSuperAdmin = params?.search?.includes("superaccess");
  const clientProfileType = params?.search
    ? params?.search?.split("type=")[1]
    : null;
  const userId = params?.search
    ? params?.search?.split("id=")[1]?.split("&")[0]
    : user?.userInfo?.id;

  useEffect(() => {
    const fetchData = async () => {
      let res = await getProfileData(userId, user?.token);
      dispatch(getProfileDetails(res));
    };
    fetchData();
  }, [user]);

  return (
    <>
      <div className="dashboard__content hover-bgc-color">
        <div className="row pb40">
          <div className="col-lg-12">
            <DashboardNavigation />
          </div>
          <div className="col-lg-9">
            <div className="dashboard_title_area">
              <h2>My Profile</h2>
              {/* <p className="text">Lorem ipsum dolor sit amet, consectetur.</p> */}
            </div>
          </div>
        </div>
        <div className="row">
          <div className="col-xl-12">
            {/* Profile Details will be visible to everone */}
            {(user?.userInfo?.user_type == "client" ||
              (isSuperAdmin &&
                clientProfileType == "client" &&
                user?.userInfo?.id == 1)) && (
              <ClientProfileDetails userId={userId} />
            )}

            {/* Only Transaltor can see skills, education & work Expierence modules */}
            {(user?.userInfo?.user_type == "translator" ||
              (isSuperAdmin &&
                clientProfileType == "translator" &&
                user?.userInfo?.id == 1)) && (
              <>
                <TranslatorProfileDetails userId={userId} />
                <Skill userId={userId} />
                <UserAvailability userId={userId} />
                <Education userId={userId} />
                <WorkExperience userId={userId} />
              </>
            )}
            {/* Change Password will be visible to all  */}
            <ChangePassword userId={userId} />
          </div>
        </div>
      </div>
    </>
  );
}
