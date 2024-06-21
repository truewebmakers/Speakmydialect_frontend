import { useEffect } from "react";
import DashboardNavigation from "../header/DashboardNavigation";
import ChangePassword from "./ChangePassword";
import ConfirmPassword from "./ConfirmPassword";
import Education from "./Education";
import ProfileDetails from "./ProfileDetails";
import Skill from "./Skill";
import WorkExperience from "./WorkExperience";
import UseApi from "@/hook/useApi";
import { apiMethods, apiUrls } from "@/constants/constant";
import { useDispatch, useSelector } from "react-redux";
import { getProfileDetails } from "@/redux/auth";
import { toast } from "react-toastify";
import { getProfileData } from "@/utils/commonFunctions";

export default function MyProfileInfo() {
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth);

  useEffect(() => {
    const fetchData = async () => {
      let res = await getProfileData(user?.userInfo?.id, user?.token);
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
            <ProfileDetails />
            {user?.userInfo?.user_type == "translator" && (
              <>
                <Skill />
                <Education />
                <WorkExperience />
              </>
            )}
            <ChangePassword />
            {/* <ConfirmPassword /> */}
          </div>
        </div>
      </div>
    </>
  );
}
