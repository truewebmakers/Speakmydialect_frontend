import Loader from "@/components/common/loader";
import { apiMethods, apiUrls } from "@/constants/constant";
import UseApi from "@/hook/useApi";
import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";

export default function PayoutForm() {
  const [formData, setFormData] = useState({
    account_holder_name: "",
    bank_name: "",
    account_number: "",
    bsb: "",
    ifsc: "Fghv5656",
  });

  const [isLoading, setIsLoading] = useState(false); // Loading state for API call
  const [error, setError] = useState(""); // Error state for feedback
  const [isEditMode, setIsEditMode] = useState(false); // Tracks if it's edit mode
  const { user } = useSelector((state) => state.auth);

  // Function to prefill data from the API
  const prefillData = async () => {
    setIsLoading(true);
    try {
      const headers = {
        Authorization: `Bearer ${user?.token}`,
      };
      const { data } = await UseApi(
        apiUrls.getBankDetails + user?.userInfo?.id, // API URL
        apiMethods.GET,
        null,
        headers
      );

      // Check if the data is valid
      if (data?.data) {
        setFormData({
          account_holder_name: data?.data?.account_holder_name || "",
          bank_name: data?.data?.bank_name || "",
          account_number: data?.data?.account_number || "",
          bsb: data?.data?.bsb || "",
          ifsc: data?.data?.ifsc || "",
        });
        setIsEditMode(true); // Set edit mode to true if data exists
        setError("");
      } else {
        setIsEditMode(false); // Set edit mode to false if no data exists
        setError("Failed to fetch bank details.");
      }
    } catch (err) {
      setIsEditMode(false); // Set edit mode to false in case of error
      setError("An error occurred while fetching bank details.");
    } finally {
      setIsLoading(false);
    }
  };

  // Use effect to prefill data when the component mounts
  useEffect(() => {
    prefillData();
  }, []);

  // Validation function
  const validateForm = (data) => {
    const { account_holder_name, bank_name, account_number, bsb, ifsc } = data;

    if (
      !account_holder_name ||
      !bank_name ||
      !account_number ||
      !bsb ||
      !ifsc
    ) {
      return "Please fill in all the fields.";
    }

    const nameRegex = /^[a-zA-Z\s]+$/;
    if (!nameRegex.test(account_holder_name)) {
      return "Account holder name must contain only letters and spaces.";
    }

    // if (!/^\d{8}$/.test(account_number)) {
    //   return "Account number must be numeric & can't be more than 8 digits.";
    // }

    if (!/^\d{6}$/.test(bsb)) {
      return "BSB must be exactly 6 digits.";
    }

    return null;
  };

  // Handle form input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    const validationError = validateForm(formData);
    if (validationError) {
      setError(validationError);
      return;
    }

    setIsLoading(true);
    setError("");

    try {
      const headers = {
        Authorization: `Bearer ${user?.token}`,
      };
      const bodyData = {
        account_holder_name: formData.account_holder_name,
        bank_name: formData.bank_name,
        account_number: formData.account_number,
        bsb: formData.bsb,
        ifsc: formData.ifsc,
      };
      let response = {};
      isEditMode
        ? (response = await UseApi(
            apiUrls.updateBankDetails + user?.userInfo?.id,
            apiMethods.POST,
            bodyData,
            headers
          ))
        : (response = await UseApi(
            apiUrls.addBankDetails,
            apiMethods.POST,
            bodyData,
            headers
          ));

      if (response?.data?.message === "bank details store.") {
        toast.success(
          isEditMode
            ? "Bank details updated successfully!"
            : "Bank details added successfully!"
        );
        setError("");
        setIsEditMode(true); // Switch to edit mode after successful submission
      }
    } catch (err) {
      setError("An error occurred. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <form className="form-style1" onSubmit={handleSubmit}>
        <div className="row">
          {/* Bank Name */}
          <div className="col-sm-6">
            <div className="mb20">
              <label className="heading-color ff-heading fw500 mb-1">
                Account Holder
              </label>
              <input
                type="text"
                name="account_holder_name"
                className="form-control"
                placeholder="Account Holder"
                value={formData?.account_holder_name}
                onChange={handleChange}
              />
            </div>
          </div>

          {/* Bank Account Number */}
          <div className="col-sm-6">
            <div className="mb20">
              <label className="heading-color ff-heading fw500 mb-1">
                Bank Name
              </label>
              <input
                type="text"
                name="bank_name"
                className="form-control"
                placeholder="Enter Your Bank Name"
                value={formData?.bank_name}
                onChange={handleChange}
              />
            </div>
          </div>

          {/* Bank Account Holder Name */}
          <div className="col-sm-6">
            <div className="mb20">
              <label className="heading-color ff-heading fw500 mb-1">
                Account Number
              </label>
              <input
                type="text"
                name="account_number"
                className="form-control"
                placeholder="Enter Your Account Number"
                value={formData?.account_number}
                onChange={handleChange}
              />
            </div>
          </div>

          {/* Bank Routing Number */}
          <div className="col-sm-6">
            <div className="mb20">
              <label className="heading-color ff-heading fw500 mb-1">BSB</label>
              <input
                type="text"
                name="bsb"
                className="form-control"
                placeholder="BSB"
                value={formData?.bsb}
                onChange={handleChange}
              />
            </div>
          </div>

          {/* Bank IFSC */}
          {/* <div className="col-sm-6">
            <div className="mb20">
              <label className="heading-color ff-heading fw500 mb-1">
                IFSC Code
              </label>
              <input
                type="text"
                name="ifsc"
                className="form-control"
                placeholder="IFSC Code"
                value={formData?.ifsc}
                onChange={handleChange}
              />
            </div>
          </div> */}
        </div>

        {/* Error Message */}
        {error && <div className="alert alert-danger">{error}</div>}

        {/* Save or Edit Button */}
        <div className="row">
          <div className="col-md-12">
            <div className="text-start">
              <button
                type="submit"
                className="ud-btn btn-thm"
                disabled={isLoading}
              >
                {isLoading ? (
                  <Loader />
                ) : isEditMode ? (
                  "Update Details"
                ) : (
                  "Save Details"
                )}
                <i className="fal fa-arrow-right-long" />
              </button>
            </div>
          </div>
        </div>
      </form>
    </>
  );
}
