import { useEffect, useState } from "react";
import DashboardNavigation from "../header/DashboardNavigation";
import Award from "./Award";
import ChangePassword from "./ChangePassword";
import ConfirmPassword from "./ConfirmPassword";
import Education from "./Education";
import ProfileDetails from "./ProfileDetails";
import Skill from "./Skill";
import WorkExperience from "./WorkExperience";
import UseApi from "@/hook/useApi";
import { apiMethods, apiUrls } from "@/constants/constant";
import { useAuth } from "@/context/authContext";

export default function MyProfileInfo() {
  const { userInfo, token } = useAuth();
  const [profileData, setProfileData] = useState({});
  const userId = userInfo?.length > 0 ? JSON.parse(userInfo)?.id : "";

  const getProfileData = async () => {
    try {
      const headers = { Authorization: `Bearer ${token}` };
      const response = await UseApi(
        apiUrls.getUserProfile + userId,
        apiMethods.GET,
        null,
        headers
      );
      if (response?.status === 200 || response?.status === 201) {
        setProfileData(response?.data?.user);
      }
    } catch (error) {
      return toast.error("Error fetching profile data");
    }
  };

  useEffect(() => {
    getProfileData();
  }, []);

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
              <p className="text">Lorem ipsum dolor sit amet, consectetur.</p>
            </div>
          </div>
        </div>
        <div className="row">
          <div className="col-xl-12">
            <ProfileDetails profileData={profileData} />
            <Skill />
            <Education />
            <WorkExperience />
            <Award />
            <ChangePassword />
            <ConfirmPassword />
          </div>
        </div>
      </div>
    </>
  );
}
