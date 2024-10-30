import {
  apiMethods,
  apiUrls,
  fixRate,
  jobAvailaibiltyType,
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
import { validateBookingForm } from "@/utils/handleValidations";
import { DatePicker } from "antd";
import moment from "moment";

export default function HireNowSection({ translatorProfile }) {
  const [hireNowForm, setHireNowForm] = useState({
    client_id: "",
    translator_id: "",
    payment_type: "fix",
    present_rate: "",
    availability: { option: "Select", value: null },
    status: { option: "Select", value: null },
    work_status: { option: "Select", value: null },
    payment_status: { option: "Select", value: null },
    start_at: "",
    end_at: "",
    job_title: "",
    duration: { hours: 0, minutes: 0 }, // Duration fields
  });

  const { user, profileData } = useSelector((state) => state.auth);
  const [isLoading, setIsLoading] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [error, setError] = useState({
    job_title: "",
    availability: "",
    payment_type: "",
    start_at: "",
    end_at: "",
  });

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

  const handleDurationChange = (e) => {
    const { name, value } = e.target;
    const newValue = Math.max(0, Number(value)); // Ensure the value is not negative
    const updatedDuration = { ...hireNowForm.duration, [name]: newValue };

    setHireNowForm({ ...hireNowForm, duration: updatedDuration });

    // Calculate end_at when duration changes
    calculateEndTime(hireNowForm.start_at, updatedDuration);
  };

  const calculateEndTime = (startAt, duration) => {
    if (!startAt) return;

    // Create a Date object from the start_at string in UTC
    const startDate = new Date(startAt + "Z"); // Append 'Z' to treat as UTC

    // Calculate the new date by adding the duration
    const endDate = new Date(startDate.getTime()); // Clone the start date

    // Add duration to the endDate
    endDate.setUTCHours(endDate.getUTCHours() + duration.hours); // Add hours
    endDate.setUTCMinutes(endDate.getUTCMinutes() + duration.minutes); // Add minutes

    // Update the end_at field with the new date in local time format
    setHireNowForm((prev) => ({
      ...prev,
      end_at: endDate.toISOString().slice(0, 16), // Format as 'YYYY-MM-DDTHH:mm'
    }));
  };

  const addBooking = async () => {
    const formErrors = validateBookingForm(hireNowForm);
    if (Object.keys(formErrors)?.length > 0) {
      setError(formErrors);
      return;
    }
    setIsLoading(true);
    try {
      const headers = {
        Authorization: `Bearer ${user?.token}`,
      };
      const bodyData = {
        client_id: profileData?.id,
        translator_id: translatorProfile?.id,
        payment_type: "fix",
        present_rate: +translatorProfile?.user_meta?.fix_rate || fixRate,
        availability: hireNowForm?.availability?.value,
        status: "in-process",
        work_status: "pending",
        payment_status: "none",
        start_at: hireNowForm?.start_at,
        end_at: hireNowForm?.end_at,
        job_title: hireNowForm?.job_title,
        duration: {
          hours: hireNowForm?.duration?.hours,
          minutes: hireNowForm?.duration?.minutes,
        },
      };
      const response = await UseApi(
        apiUrls.addBooking,
        apiMethods.POST,
        bodyData,
        headers
      );
      if (response?.status === 201 || response?.status === 200) {
        const data = {
          jobId: response?.data?.data?.id,
          description: `Title is: ${hireNowForm?.job_title}, Start Date is: ${hireNowForm?.start_at}, End Date is: ${hireNowForm?.end_at}`,
          clientUserName: user?.userInfo?.username,
          clientEmail: user?.userInfo?.email,
          presentRate: response?.data?.data?.present_rate,
          startDate: hireNowForm?.start_at,
          endDate: hireNowForm?.end_at,
          duration: {
            hours: hireNowForm?.duration?.hours,
            minutes: hireNowForm?.duration?.minutes,
          },
        };
        navigate(routes.PayNow, { state: data });
        setIsLoading(false);
        setHireNowForm({
          client_id: "",
          translator_id: "",
          payment_type: "fix",
          present_rate: "",
          availability: { option: "Select", value: null },
          status: { option: "Select", value: null },
          work_status: { option: "Select", value: null },
          payment_status: { option: "Select", value: null },
          start_at: "",
          end_at: "",
          job_title: "",
          duration: { hours: 0, minutes: 0 },
        });
        return;
      } else {
        setIsLoading(false);
        toast.error(response?.data?.message);
        return;
      }
    } catch (err) {
      setIsLoading(false);
      toast.error(err?.message);
      return;
    }
  };

  const handleStartDateChange = (date, dateString) => {
    setHireNowForm((prev) => ({
      ...prev,
      start_at: dateString,
    }));
    calculateEndTime(dateString, hireNowForm?.duration);
  };

  return (
    <section className="pt-0">
      <div className="container">
        <div className="row wow fadeInUp" data-wow-delay="300ms">
          <div className="col-lg-4"></div>
          <div className="col-lg-6 ml100">
            <div className="contact-page-form default-box-shadow1 bdrs8 bdr1 p50 mb30-md bgc-white">
              <h4 className="form-title mb25">Book your Interpreter Now</h4>
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
                      <input
                        type="text"
                        maxLength={155}
                        className="form-control"
                        placeholder="Enter Job Title"
                        name="job_title"
                        value={hireNowForm?.job_title}
                        autoComplete="off"
                        onChange={handleInputChanges}
                      />
                      {error?.job_title && (
                        <p style={{ color: "red" }}>{error?.job_title}</p>
                      )}
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
                        defaultSelect={hireNowForm?.availability}
                        data={jobAvailaibiltyType?.map((item) => ({
                          option: item?.name,
                          value: item?.value,
                        }))}
                        handler={(option, value) =>
                          handleFieldChange("availability", option, value)
                        }
                      />
                      {error?.availability && (
                        <p style={{ color: "red" }}>{error?.availability}</p>
                      )}
                    </div>
                  </div>
                  <div className="col-md-6">
                    <div className="mb20">
                      <label className="heading-color ff-heading fw500 mb10">
                        Payment Type
                      </label>
                      <input
                        type="text"
                        className="form-control"
                        placeholder="Enter Email"
                        name="payment_type"
                        value={"fix"}
                        disabled={true}
                      />
                    </div>
                  </div>
                  <div className="col-md-6">
                    <div className="mb20">
                      <label className="heading-color ff-heading fw500 mb10">
                        Start Date & Time
                      </label>
                      <DatePicker
                        showTime={{ minuteStep: 15 }} // Set step for minutes
                        format="YYYY-MM-DD HH:mm"
                        className="form-control"
                        onChange={handleStartDateChange}
                      />
                      {error.start_at && (
                        <p style={{ color: "red" }}>{error.start_at}</p>
                      )}
                    </div>
                  </div>
                  <div className="col-md-6">
                    <div className="mb20">
                      <label className="heading-color ff-heading fw500 mb10">
                        End Date & Time
                      </label>
                      <DatePicker
                        showTime={{ minuteStep: 15 }} // Set step for minutes
                        format="YYYY-MM-DD HH:mm"
                        className="form-control"
                        value={
                          hireNowForm?.end_at
                            ? moment(hireNowForm?.end_at)
                            : null
                        }
                        onChange={(date, dateString) => {
                          setHireNowForm((prev) => ({
                            ...prev,
                            end_at: dateString,
                          }));
                        }}
                        disabled // Make it read-only since we calculate it based on duration
                      />
                      {error?.end_at && (
                        <p style={{ color: "red" }}>{error?.end_at}</p>
                      )}
                    </div>
                  </div>

                  <div className="col-md-6">
                    <div className="mb20">
                      <label className="heading-color ff-heading fw500 mb10">
                        Duration (Hours)
                      </label>
                      <input
                        type="number"
                        className="form-control"
                        name="hours"
                        placeholder="Enter Hours"
                        value={hireNowForm?.duration?.hours || ""}
                        onFocus={() =>
                          setHireNowForm((prev) => ({
                            ...prev,
                            duration: { ...prev?.duration, hours: "" },
                          }))
                        }
                        onChange={handleDurationChange}
                      />
                    </div>
                  </div>

                  <div className="col-md-6">
                    <div className="mb20">
                      <label className="heading-color ff-heading fw500 mb10">
                        Duration (Minutes)
                      </label>
                      <input
                        type="number"
                        className="form-control"
                        name="minutes"
                        placeholder="Enter Minutes"
                        value={hireNowForm?.duration?.minutes || ""}
                        onFocus={() =>
                          setHireNowForm((prev) => ({
                            ...prev,
                            duration: { ...prev?.duration, minutes: "" },
                          }))
                        }
                        onChange={handleDurationChange}
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
  );
}
