import React, { useState, useEffect } from "react";
import { toast } from "react-toastify"; // For notifications
import { useSelector } from "react-redux";
import Loader from "@/components/common/loader"; // Loader component
import UseApi from "@/hook/useApi"; // Custom API hook
import { apiMethods, apiUrls } from "@/constants/constant"; // API constants

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

  // Fetch availability on page load
  const fetchAvailability = async () => {
    setIsLoading(true);
    const headers = {
      Authorization: `Bearer ${user?.token}`,
    };

    try {
      const response = await UseApi(
        apiUrls.getUserAvailability + user?.userInfo?.id,
        apiMethods.GET,
        null,
        headers
      );
      if (response?.status === 200) {
        const fetchedData = response?.data?.data;
        console.log(fetchedData, "ddddddddd");

        // Initialize the transformed states
        const transformedAvailability = {
          Monday: [],
          Tuesday: [],
          Wednesday: [],
          Thursday: [],
          Friday: [],
          Saturday: [],
          Sunday: [],
        };
        const transformedEnabledDays = {
          Monday: false,
          Tuesday: false,
          Wednesday: false,
          Thursday: false,
          Friday: false,
          Saturday: false,
          Sunday: false,
        };

        // Populate states from the fetched data
        fetchedData.forEach((item) => {
          const day = item.day;
          transformedEnabledDays[day] = item.is_enabled === 1;

          transformedAvailability[day].push({
            start: item.start_time,
            end: item.end_time,
          });
        });

        // Fill empty days with a placeholder time slot if no times are set
        Object.keys(transformedAvailability).forEach((day) => {
          if (transformedAvailability[day].length === 0) {
            transformedAvailability[day].push({ start: "", end: "" });
          }
        });

        setAvailability(transformedAvailability);
        setEnabledDays(transformedEnabledDays);
      } else {
        toast.error("Failed to fetch availability.");
      }
    } catch (error) {
      toast.error("An error occurred while fetching availability.");
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchAvailability();
  }, []);

  // Handle adding new time slot
  const handleAddTime = (day) => {
    setAvailability({
      ...availability,
      [day]: [...availability[day], { start: "", end: "" }],
    });
  };

  // Handle input changes
  const handleInputChange = (day, index, field, value) => {
    const updatedTimes = [...availability[day]];
    updatedTimes[index][field] = value;
    setAvailability({ ...availability, [day]: updatedTimes });
  };

  // Handle day enable/disable toggle
  const handleChecked = (day, e) => {
    setEnabledDays({ ...enabledDays, [day]: e.target.checked });
  };

  // Save updated availability
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
      translator_id: user?.userInfo?.id,
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
        // Re-fetch availability after successful save
        fetchAvailability();
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
