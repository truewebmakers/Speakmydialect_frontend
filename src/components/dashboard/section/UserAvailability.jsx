import Loader from "@/components/common/loader";
import React, { useState } from "react";
import { toast } from "react-toastify"; // Assuming you're using toast for notifications
import UseApi from "@/hook/useApi"; // Your custom API hook
import { apiMethods, apiUrls } from "@/constants/constant"; // API constants
import { useSelector } from "react-redux";

export default function UserAvailability() {
  const [availability, setAvailability] = useState({
    Monday: [{ start: "", end: "" }],
    Tuesday: [{ start: "", end: "" }],
    Wednesday: [{ start: "", end: "" }],
    Thursday: [{ start: "", end: "" }],
    Friday: [{ start: "", end: "" }],
    Saturday: [{ start: "", end: "" }],
    Sunday: [{ start: "", end: "" }],
  });
  const [enabledDays, setEnabledDays] = useState({
    Monday: true,
    Tuesday: true,
    Wednesday: true,
    Thursday: true,
    Friday: true,
    Saturday: true,
    Sunday: true,
  });
  const [isLoading, setIsLoading] = useState(false);
  const { user } = useSelector((state) => state.auth);

  const handleAddTime = (day) => {
    setAvailability({
      ...availability,
      [day]: [...availability[day], { start: "", end: "" }],
    });
  };

  const handleInputChange = (day, index, field, value) => {
    const updatedTimes = [...availability[day]];
    updatedTimes[index][field] = value;
    setAvailability({ ...availability, [day]: updatedTimes });
  };

  const handleChecked = (day, e) => {
    setEnabledDays({ ...enabledDays, [day]: e.target.checked });
  };

  const handleSave = async () => {
    setIsLoading(true);

    // Convert availability data to the required format
    const formattedAvailability = {};
    Object.keys(availability).forEach((day) => {
      formattedAvailability[day] = {
        is_enabled: enabledDays[day],
        times: availability[day]
          .filter((time) => time.start && time.end) // Exclude incomplete time ranges
          .map((time) => ({
            start_time: time.start,
            end_time: time.end,
          })),
      };
    });

    // Prepare data for the API
    const bodyData = {
      translator_id: 1, // Replace with the actual translator ID
      availability: formattedAvailability,
    };
    const headers = {
      Authorization: `Bearer ${user?.token}`,
    };
    try {
      const response = await UseApi(
        apiUrls.userAvailability,
        apiMethods.POST,
        bodyData,
        headers
      );
      if (response?.status === 200 || response?.status === 201) {
        toast.success("Availability updated successfully!");
      } else {
        toast.error(
          response?.data?.message || "Failed to update availability."
        );
      }
    } catch (error) {
      toast.error("An error occurred while updating availability.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="ps-widget bgc-white bdrs4 p30 mb30 position-relative">
      <div className="bdrb1 pb15 mb30 d-sm-flex justify-content-between align-items-center">
        <h5 className="list-title">Available days and times (24h format)</h5>
        <p>
          Keep this up to date so you get booked for the time that suits you.
        </p>
      </div>
      <div className="col-lg-14">
        <div className="availability-container">
          {Object.keys(availability).map((day, index) => (
            <div key={day} className="day-section">
              <div className="day-header">
                <div className="col-sm-3 mb20">
                  <label className="heading-color ff-heading fw500 mb10">
                    {day}
                  </label>
                  <div className="switch-style1">
                    <div className="form-check form-switch mb20">
                      <input
                        className="form-check-input"
                        type="checkbox"
                        id={`flexSwitchCheckDefault-${index}`}
                        checked={enabledDays[day]}
                        onChange={(e) => handleChecked(day, e)}
                      />
                    </div>
                  </div>
                </div>
              </div>
              {enabledDays[day] &&
                availability[day].map((time, index) => (
                  <div key={index} className="time-row">
                    <input
                      type="time"
                      value={time.start}
                      onChange={(e) =>
                        handleInputChange(day, index, "start", e.target.value)
                      }
                      placeholder="Start time (24h format)"
                    />
                    <input
                      type="time"
                      value={time.end}
                      onChange={(e) =>
                        handleInputChange(day, index, "end", e.target.value)
                      }
                      placeholder="End time (24h format)"
                    />
                  </div>
                ))}
              {enabledDays[day] && (
                <button
                  className="add-time-btn"
                  onClick={() => handleAddTime(day)}
                >
                  + Add another time
                </button>
              )}
            </div>
          ))}
        </div>
        <div className="col-md-12">
          <div className="text-start">
            <button
              className="ud-btn btn-thm default-box-shadow2"
              type="button"
              onClick={handleSave}
              disabled={isLoading}
            >
              Save
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
    </div>
  );
}
