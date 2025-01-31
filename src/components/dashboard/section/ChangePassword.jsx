import Loader from "@/components/common/loader";
import { apiMethods, apiUrls } from "@/constants/constant";
import UseApi from "@/hook/useApi";
import { passwordValidations } from "@/utils/handleValidations";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";

export default function ChangePassword({ userId }) {
  const [pass, setPass] = useState({
    oldPassword: "",
    newPassword: "",
    confirmPassword: "",
  });
  const [disable, setDisable] = useState(false);
  const [error, setError] = useState({
    oldPassword: "",
    newPassword: "",
    confirmPassword: "",
  });
  const { user } = useSelector((state) => state.auth);
  const [isLoading, setIsLoading] = useState(false);

  const handleOnChange = (e) => {
    const { name, value } = e.target;
    setPass({ ...pass, [name]: value });
    if (disable) {
      const newErr = passwordValidations(name, value);
      setError((prevError) => ({ ...prevError, ...newErr }));
    }
  };
  const hasErrors = (error) => {
    return Object.values(error).some((err) => err);
  };

  const areAllFieldsFilled = (data) => {
    return Object.values(data).every((field) => field);
  };

  useEffect(() => {
    if (hasErrors(error)) {
      setDisable(true);
      return;
    }
    setDisable(false);
  }, [error]);

  const handleChangePassword = async (e) => {
    e.preventDefault();
    let newErr = {};
    for (let key in pass) {
      newErr = { ...newErr, ...passwordValidations(key, pass[key]) };
    }
    setError(newErr);
    if (!hasErrors(error) && areAllFieldsFilled(pass)) {
      apiCall();
    }
  };

  const apiCall = async () => {
    setIsLoading(true);
    try {
      // headers
      const headers = {
        Authorization: `Bearer ${user?.token}`,
      };
      // Prepare data for API
      const bodyData = {
        old_password: pass.oldPassword,
        password: pass.newPassword,
        password_confirmation: pass.confirmPassword,
      };
      // Call API
      const response = await UseApi(
        apiUrls.changePassword + (userId || user?.userInfo?.id),
        apiMethods.POST,
        bodyData,
        headers
      );
      if (response?.status == 201 || response?.status == 200) {
        toast.success(response?.data?.message);
        setPass({
          oldPassword: "",
          newPassword: "",
          confirmPassword: "",
        });
        setIsLoading(false);
        return;
      } else {
        toast.error(response?.data?.message);
        setIsLoading(false);
      }
    } catch (err) {
      toast.error(err);
      setIsLoading(false);
    }
  };

  return (
    <>
      <div className="ps-widget bgc-white bdrs4 p30 mb30 overflow-hidden position-relative">
        <div className="bdrb1 pb15 mb25">
          <h5 className="list-title">Change password</h5>
        </div>
        <div className="col-lg-7">
          <div className="row">
            <form className="form-style1">
              <div className="row">
                <div className="col-sm-12">
                  <div className="mb20">
                    <label className="heading-color ff-heading fw500 mb10">
                      Old Password
                    </label>
                    <input
                      type="text"
                      className="form-control"
                      placeholder="********"
                      name="oldPassword"
                      onChange={(e) => handleOnChange(e)}
                    />
                    {error?.oldPassword && (
                      <p style={{ color: "red" }}>{error?.oldPassword}</p>
                    )}
                  </div>
                </div>
              </div>
              <div className="row">
                <div className="col-sm-12">
                  <div className="mb20">
                    <label className="heading-color ff-heading fw500 mb10">
                      New Password
                    </label>
                    <input
                      type="text"
                      className="form-control"
                      placeholder="********"
                      name="newPassword"
                      onChange={(e) => handleOnChange(e)}
                    />
                    {error?.newPassword && (
                      <p style={{ color: "red" }}>{error?.newPassword}</p>
                    )}
                  </div>
                </div>
                <div className="col-sm-12">
                  <div className="mb20">
                    <label className="heading-color ff-heading fw500 mb10">
                      Confirm New Password
                    </label>
                    <input
                      type="text"
                      className="form-control"
                      placeholder="********"
                      name="confirmPassword"
                      onChange={(e) => handleOnChange(e)}
                    />
                    {error?.confirmPassword && (
                      <p style={{ color: "red" }}>{error?.confirmPassword}</p>
                    )}
                  </div>
                </div>
                <div className="col-md-12">
                  <div className="text-start">
                    <button
                      type="button"
                      className="ud-btn btn-thm"
                      onClick={(e) => handleChangePassword(e)}
                      disabled={disable}
                    >
                      Change Password
                      {isLoading ? (
                        <>
                          &nbsp;&nbsp; <Loader />
                        </>
                      ) : (
                        <i className="fal fa-arrow-right-long" />
                      )}
                    </button>
                  </div>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
}
