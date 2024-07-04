import {
  apiMethods,
  apiUrls,
  jobAvailaibiltyType,
  paymentMode,
  routes,
} from "@/constants/constant";
import { useEffect, useState } from "react";
import SelectInput from "../dashboard/option/SelectInput";
import { useDispatch, useSelector } from "react-redux";
import UseApi from "@/hook/useApi";
import { toast } from "react-toastify";
import Loader from "../common/loader";
import { getProfileData } from "@/utils/commonFunctions";
import { getProfileDetails } from "@/redux/auth";
import { useNavigate } from "react-router-dom";

export default function HireNowSection({ translatorProfile }) {
  const [hireNowForm, setHireNowForm] = useState({
    client_id: "", //client_id from api
    translator_id: "", //translator_id from api
    payment_type: { option: "Select", value: null }, // Type of payment client will buy translator on: fix or hourly
    present_rate: "", // It will contain the price at which client hired the translator,
    availability: { option: "Select", value: null }, // Mode of Work:remote,hybrid,onsite
    status: { option: "Select", value: null }, // Translator job Status: accept,reject,cancel,in-process
    work_status: { option: "Select", value: null }, // Client request Status:approved,reject,disputed,pending
    payment_status: { option: "Select", value: null }, //Payment Status: paid,escrow,hold,dispute,none
    start_at: "", //2024-02-19 11:00:00
    end_at: "", //2024-02-20 11:00:00
    job_title: "",
  });
  const { user, profileData } = useSelector((state) => state.auth);
  const [isLoading, setIsLoading] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleFieldChange = (field, option, value) => {
    setHireNowForm({
      ...hireNowForm,
      [field]: { option: option, value: value },
    });
  };

  useEffect(() => {
    const fetchData = async () => {
      let res = await getProfileData(user?.userInfo?.id, user?.token);
      dispatch(getProfileDetails(res));
    };
    fetchData();
  }, [user]);

  const handleInputChanges = (e) => {
    const { name, value } = e.target;
    setHireNowForm({ ...hireNowForm, [name]: value });
  };

  const addBooking = async () => {
    setIsLoading(true);
    try {
      // headers
      const headers = {
        Authorization: `Bearer ${user?.token}`,
      };
      // Prepare data for API
      const bodyData = {
        client_id: profileData?.id,
        translator_id: translatorProfile?.id,
        payment_type: hireNowForm?.payment_type?.value,
        present_rate:
          hireNowForm?.payment_type?.value == "fix"
            ? +translatorProfile?.user_meta?.fix_rate
            : +translatorProfile?.user_meta?.hourly_rate,
        availability: hireNowForm?.availability?.value,
        status: "in-process ", // this is for transaltor's job
        work_status: "pending", // this status belongs to client's request
        payment_status: "none",
        start_at: hireNowForm?.start_at,
        end_at: hireNowForm?.end_at,
        job_title: hireNowForm?.job_title,
      };
      // Call API
      const response = await UseApi(
        apiUrls.addBooking,
        apiMethods.POST,
        bodyData,
        headers
      );
      if (response?.status == 201 || response?.status == 200) {
        toast.success(response?.data?.message);
        navigate(routes.Bookings);
        setIsLoading(false);
        setHireNowForm({
          client_id: "",
          translator_id: "",
          payment_type: { option: "Select", value: null },
          present_rate: "",
          availability: { option: "Select", value: null },
          status: { option: "Select", value: null },
          work_status: { option: "Select", value: null },
          payment_status: { option: "Select", value: null },
          start_at: "",
          end_at: "",
          job_title: "",
        });
        return;
      } else {
        setIsLoading(false);
        toast.error(response?.data?.message);
        return;
      }
    } catch (err) {
      setIsLoading(false);
      toast.error(err);
      return;
    }
  };
  return (
    <>
      <section className="pt-0">
        <div className="container">
          <div className="row wow fadeInUp" data-wow-delay="300ms">
            <div className="col-lg-4">
              <div className="position-relative price-widget bdrs8">
                <h3 className="widget-title">
                  <small className=" fw700">Translator Info</small>
                </h3>
                <div className="category-list mt20">
                  <a className="d-flex align-items-center justify-content-between bdrb1 pb-2">
                    <span className="text">
                      <i className="flaticon-place text-thm2 pe-2 vam" />
                      Email
                    </span>
                    <span>
                      {translatorProfile?.email
                        ? translatorProfile?.email
                        : "Not Specified Yet"}
                    </span>
                  </a>
                  <a className="d-flex align-items-center justify-content-between bdrb1 pb-2">
                    <span className="text">
                      <i className="flaticon-30-days text-thm2 pe-2 vam" />
                      Mobile No{" "}
                    </span>
                    <span>
                      {translatorProfile?.user_meta
                        ? translatorProfile?.user_meta?.phone
                        : "Not Specified Yet"}
                    </span>
                  </a>
                  <a className="d-flex align-items-center justify-content-between mb-3">
                    <span className="text">
                      <i className="flaticon-sliders text-thm2 pe-2 vam" />
                      {hireNowForm?.payment_type?.value == "fix"
                        ? " Fix Rate"
                        : "Hourly Rate"}
                    </span>
                    <span>
                      {hireNowForm?.payment_type?.value == "fix"
                        ? translatorProfile?.user_meta?.fix_rate
                        : translatorProfile?.user_meta?.hourly_rate}
                    </span>
                  </a>
                </div>
              </div>
            </div>
            <div className="col-lg-6 ml100">
              <div className="contact-page-form default-box-shadow1 bdrs8 bdr1 p50 mb30-md bgc-white">
                <h4 className="form-title mb25">Book your Translator Now</h4>
                <p className="text mb30">
                  If you would like to hire, contact us.
                </p>
                <form className="form-style1">
                  <div className="row">
                    <div className="col-md-12">
                      <div className="mb20">
                        <label className="heading-color ff-heading fw500 mb10">
                          Job Title
                        </label>
                        <textarea
                          type="text"
                          maxlength={155}
                          className="form-control"
                          placeholder="Enter Job Title"
                          name="job_title"
                          value={hireNowForm?.job_title}
                          onChange={handleInputChanges}
                        />
                      </div>
                    </div>
                    <div className="col-md-6">
                      <div className="mb20">
                        <label className="heading-color ff-heading fw500 mb10">
                          Name
                        </label>
                        <input
                          type="text"
                          className="form-control"
                          placeholder="Name"
                          name="name"
                          value={user?.userInfo?.fname}
                          disabled={true}
                        />
                      </div>
                    </div>
                    <div className="col-md-6">
                      <div className="mb20">
                        <label className="heading-color ff-heading fw500 mb10">
                          Email
                        </label>
                        <input
                          type="email"
                          className="form-control"
                          placeholder="Enter Email"
                          name="email"
                          value={user?.userInfo?.email}
                          disabled={true}
                        />
                      </div>
                    </div>

                    <div className="col-md-6">
                      <div className="mb20">
                        <SelectInput
                          label="Mode of Work"
                          defaultSelect={hireNowForm.availability}
                          data={jobAvailaibiltyType?.map((item) => ({
                            option: item?.name,
                            value: item?.value,
                          }))}
                          handler={(option, value) =>
                            handleFieldChange("availability", option, value)
                          }
                        />
                      </div>
                    </div>
                    <div className="col-md-6">
                      <div className="mb20">
                        <SelectInput
                          label="Payment Type"
                          defaultSelect={hireNowForm.payment_type}
                          data={paymentMode?.map((item) => ({
                            option: item?.name,
                            value: item?.value,
                          }))}
                          handler={(option, value) =>
                            handleFieldChange("payment_type", option, value)
                          }
                        />
                      </div>
                    </div>
                    <div className="col-md-6">
                      <div className="mb20">
                        <label className="heading-color ff-heading fw500 mb10">
                          Start Date & Time
                        </label>
                        <input
                          type="datetime-local"
                          className="form-control"
                          placeholder="Choose Start Date"
                          name="start_at"
                          value={hireNowForm?.start_at}
                          onChange={handleInputChanges}
                        />
                      </div>
                    </div>
                    <div className="col-md-6">
                      <div className="mb20">
                        <label className="heading-color ff-heading fw500 mb10">
                          End Date & Time
                        </label>
                        <input
                          type="datetime-local"
                          className="form-control"
                          placeholder="Choose End Date"
                          name="end_at"
                          value={hireNowForm?.end_at}
                          onChange={handleInputChanges}
                        />
                      </div>
                    </div>

                    <div className="col-md-12">
                      <div>
                        <button
                          type="button"
                          className="ud-btn btn-thm"
                          onClick={addBooking}
                        >
                          Book Now{" "}
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
        </div>
      </section>
    </>
  );
}
