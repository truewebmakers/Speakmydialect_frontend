import { apiMethods, apiUrls } from "@/constants/constant";
import UseApi from "@/hook/useApi";
import { useState } from "react";
import { toast } from "react-toastify";
import Loader from "../common/loader";

export default function ContactInfo1() {
  const [data, setData] = useState({
    first_name: "",
    last_name: "",
    email: "",
    subject: "",
    query: "",
  });
  const [errors, setErrors] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false); // Track if the form has been submitted

  const validate = () => {
    const newErrors = {};

    if (!data.first_name) {
      newErrors.first_name = "First name is required.";
    } else if (data.first_name.length < 3) {
      newErrors.first_name = "First name must be at least 3 characters.";
    }

    if (!data.last_name) {
      newErrors.last_name = "Last name is required.";
    } else if (data.last_name.length < 3) {
      newErrors.last_name = "Last name must be at least 3 characters.";
    }

    if (!data.email) {
      newErrors.email = "Email is required.";
    } else if (!/\S+@\S+\.\S+/.test(data.email)) {
      newErrors.email = "Email is invalid.";
    }

    if (!data.subject) {
      newErrors.subject = "Subject is required.";
    } else if (data.subject.length < 5 || data.subject.length > 10) {
      newErrors.subject = "Subject must be 5 to 10 characters long.";
    }

    if (!data.query) {
      newErrors.query = "Query is required.";
    } else if (data.query.length < 20 || data.query.length > 40) {
      newErrors.query = "Query must be between 20 to 40 characters long.";
    }

    return newErrors;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setData((prevData) => ({
      ...prevData,
      [name]: value,
    }));

    // Validate field only if the form has been submitted at least once
    if (isSubmitted) {
      const currentErrors = validate();
      setErrors((prevErrors) => ({
        ...prevErrors,
        [name]: currentErrors[name], // Update only the relevant field's error
      }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitted(true); // Set form submitted state to true
    const validationErrors = validate(); // Validate on submit
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return; // Stop if there are errors
    }

    try {
      setIsLoading(true);
      let response = await UseApi(
        `${apiUrls.contactUsSendEmail}`,
        apiMethods.POST,
        data
      );
      if (response?.data?.message === "Email Sent") {
        toast.success(response?.data?.message);
      }
      setData({
        first_name: "",
        last_name: "",
        email: "",
        subject: "",
        query: "",
      });
      setErrors({}); // Clear errors
    } catch (error) {
      toast.error(error?.message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <section className="pt-0">
        <div className="container">
          <div className="row wow fadeInUp" data-wow-delay="300ms">
            <div className="col-lg-6">
              <div className="position-relative mt40">
                <div className="main-title">
                  <h4 className="form-title mb25">Keep In Touch With Us.</h4>
                  <p className="text">
                    Reach out to speakmydialect.com.au for support and
                    inquiries.
                  </p>
                </div>
                <div className="iconbox-style1 contact-style d-flex align-items-start mb30">
                  <div className="icon flex-shrink-0 d-flex align-items-center">
                    <span className="flaticon-mail" />
                    <div className="details d-flex align-items-center">
                      <p className="mb-0 text" style={{ fontSize: "17px" }}>
                        Info@speakmydialect.com.au
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-lg-6">
              <div className="contact-page-form default-box-shadow1 bdrs8 bdr1 p50 mb30-md bgc-white">
                <h4 className="form-title mb25">Tell us about yourself</h4>
                <p className="text mb30">
                  Whether you have questions or you would just like to say
                  hello, contact us.
                </p>
                <form className="form-style1" onSubmit={handleSubmit}>
                  <div className="row">
                    <div className="col-md-6">
                      <div className="mb20">
                        <label className="heading-color ff-heading fw500 mb10">
                          First Name
                        </label>
                        <input
                          type="text"
                          className="form-control"
                          placeholder="Enter First Name"
                          name="first_name"
                          value={data.first_name}
                          onChange={handleChange}
                        />
                        {errors.first_name && (
                          <p className="text-danger">{errors.first_name}</p>
                        )}
                      </div>
                    </div>
                    <div className="col-md-6">
                      <div className="mb20">
                        <label className="heading-color ff-heading fw500 mb10">
                          Last Name
                        </label>
                        <input
                          type="text"
                          className="form-control"
                          placeholder="Enter Last Name"
                          name="last_name"
                          value={data.last_name}
                          onChange={handleChange}
                        />
                        {errors.last_name && (
                          <p className="text-danger">{errors.last_name}</p>
                        )}
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
                          value={data.email}
                          onChange={handleChange}
                        />
                        {errors.email && (
                          <p className="text-danger">{errors.email}</p>
                        )}
                      </div>
                    </div>
                    <div className="col-md-6">
                      <div className="mb20">
                        <label className="heading-color ff-heading fw500 mb10">
                          Subject
                        </label>
                        <input
                          type="text"
                          className="form-control"
                          placeholder="Enter Subject"
                          name="subject"
                          value={data.subject}
                          onChange={handleChange}
                        />
                        {errors.subject && (
                          <p className="text-danger">{errors.subject}</p>
                        )}
                      </div>
                    </div>
                    <div className="col-md-12">
                      <div className="mb20">
                        <label className="heading-color ff-heading fw500 mb10">
                          Query
                        </label>
                        <textarea
                          cols={30}
                          rows={6}
                          placeholder="Enter Your Query"
                          name="query"
                          value={data.query}
                          onChange={handleChange}
                        />
                        {errors.query && (
                          <p className="text-danger">{errors.query}</p>
                        )}
                      </div>
                    </div>
                    <div className="col-md-12">
                      <div>
                        <button
                          type="submit"
                          className="ud-btn btn-thm"
                          disabled={isLoading}
                        >
                          {isLoading ? <Loader /> : "Send Messages"}
                          <i className="fal fa-arrow-right-long" />
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
