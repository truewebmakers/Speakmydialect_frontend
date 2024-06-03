import { useEffect } from "react";
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
import { useDispatch, useSelector } from "react-redux";
import { getProfileDetails } from "@/redux/auth";
import { toast } from "react-toastify";

export default function MyProfileInfo() {
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth);

  const getProfileData = async () => {
    try {
      const headers = { Authorization: `Bearer ${user?.token}` };
      const response = await UseApi(
        apiUrls.getUserProfile + user?.userInfo?.id,
        apiMethods.GET,
        null,
        headers
      );
      if (response?.status === 200 || response?.status === 201) {
        // setProfileData(response?.data?.user);
        dispatch(getProfileDetails(response?.data?.user));
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
            <ProfileDetails />
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
