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
import { formatTo12Hour, getProfileData } from "@/utils/commonFunctions";
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
    start_time: "",
    end_time: "",
    duration: { hours: 0, minutes: 0 }, // Duration fields
  });
  const [selectedSlots, setSelectedSlots] = useState([]); // New state for multiple slots

  const { user, profileData } = useSelector((state) => state.auth);
  const [isLoading, setIsLoading] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [error, setError] = useState({
    job_title: "",
    availability: "",
    payment_type: "",
    start_time: "",
    start_at: "",
    end_time: "",
  });
  const [timeSlots, setTimeSlots] = useState([]);
  const [getSlotsLoading, setGetSlotsLoading] = useState("idle");
  const [selectedDay, setSelectedDay] = useState("");

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

  const handleSlotSelection = (slot) => {
    const isSelected = selectedSlots?.some(
      (selectedSlot) =>
        selectedSlot?.start_time === slot?.start_time &&
        selectedSlot?.end_time === slot?.end_time
    );
    if (isSelected) {
      setSelectedSlots(
        selectedSlots?.filter(
          (selectedSlot) =>
            selectedSlot?.start_time !== slot?.start_time ||
            selectedSlot?.end_time !== slot?.end_time
        )
      );
    } else {
      setSelectedSlots([
        ...selectedSlots,
        { start_time: slot.start_time, end_time: slot.end_time },
      ]);
    }
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
        end_at: hireNowForm?.start_at,
        job_title: hireNowForm?.job_title,
        duration: {
          hours: "",
          minutes: "",
        },
        day: selectedDay,
        slots: selectedSlots,
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
          description: `Title is: ${hireNowForm?.job_title}`,
          clientUserName: user?.userInfo?.username,
          clientEmail: user?.userInfo?.email,
          presentRate: response?.data?.data?.present_rate,
          startDate: hireNowForm?.start_at,
          endDate: hireNowForm?.end_at,
          duration: response?.data?.duration_in_minutes,
          day: selectedDay,
          slots: selectedSlots,
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
    const day = new Intl.DateTimeFormat("en-US", { weekday: "long" }).format(
      date
    );

    setSelectedDay(day);
    getAvailableSlot(day, dateString);
  };

  const getAvailableSlot = async (day, dateString) => {
    setGetSlotsLoading("fetching");
    try {
      const headers = {
        Authorization: `Bearer ${user?.token}`,
      };
      const { data } = await UseApi(
        `${apiUrls.getAvailableSlots}${translatorProfile?.id}&day=${day}&currentDate=${dateString}`,
        apiMethods.POST,
        null,
        headers
      );
      setTimeSlots(data?.data || []);
    } catch (err) {
      toast.error("Failed to fetch time slots. Please try again.");
    } finally {
      setGetSlotsLoading("finish");
    }
  };

  return (
    <section className="pt-0">
      <div className="container">
        <div className="row wow fadeInUp" data-wow-delay="300ms">
          <div className="col-lg-6"></div>
          <div className="col-lg-6 ">
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
                        Book Your Slot
                      </label>
                      <DatePicker
                        onChange={handleStartDateChange}
                        className="form-control"
                        placeholderText="Select a Date"
                        style={{ width: "100%", maxWidth: "800px" }} // Increased width
                        disabledDate={(current) => {
                          return current && current < moment().startOf("day");
                        }}
                      />
                      {error?.start_at && (
                        <p style={{ color: "red" }}>{error.start_at}</p>
                      )}
                    </div>
                  </div>
                  {getSlotsLoading == "finish" ? (
                    hireNowForm?.start_at &&
                    (timeSlots?.length > 0 ? (
                      <div className="col-md-12 mb20">
                        <h5 className="heading-color ff-heading fw500">
                          Available Time Slots
                        </h5>
                        <div className="time-slots">
                          {timeSlots?.map((slot, index) => (
                            <button
                              key={index}
                              className={`btn btn-outline-primary ${
                                selectedSlots?.some(
                                  (selectedSlot) =>
                                    selectedSlot?.start_time ===
                                    slot?.start_time
                                )
                                  ? "active"
                                  : ""
                              }`}
                              onClick={(e) => {
                                e.preventDefault();
                                handleSlotSelection(slot); // Call the new handler
                              }}
                            >
                              {`${formatTo12Hour(
                                slot.start_time
                              )} - ${formatTo12Hour(slot.end_time)}`}
                            </button>
                          ))}
                        </div>
                      </div>
                    ) : (
                      <p className="text-danger">
                        No slots available for the selected day. Please choose
                        another day.
                      </p>
                    ))
                  ) : getSlotsLoading === "fetching" ? (
                    <p className="text-warning">Fetching available slots...</p>
                  ) : null}

                  <div className="col-md-12">
                    <div>
                      <button
                        type="button"
                        className="ud-btn btn-thm"
                        onClick={addBooking}
                        disabled={
                          isLoading ||
                          !hireNowForm?.job_title ||
                          !hireNowForm?.availability?.value ||
                          timeSlots?.length === 0
                        }
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
