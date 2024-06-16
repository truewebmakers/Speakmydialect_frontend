import { experienceLocationType } from "@/constants/constant";
import { useState } from "react";
import SelectInput from "../dashboard/option/SelectInput";

export default function HireNowSection({ translatorProfile }) {
  const [hireNowForm, setHireNowForm] = useState({
    name: "",
    email: "",
    workMode: { option: "Select", value: null },
    startDate: "",
    endDate: "",
    questions: "",
  });

  const handleFieldChange = (field, option, value) => {
    if (field == "workMode") {
      setHireNowForm({
        ...hireNowForm,
        ["workMode"]: { option: option, value: value },
      });
    }
  };

  const handleInputChanges = (e) => {
    const { name, value } = e.target;
    setHireNowForm({ ...hireNowForm, [name]: value });
  };

  console.log(hireNowForm);
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
                      Fix Rate
                    </span>
                    <span>{translatorProfile?.user_meta?.fix_rate}</span>
                  </a>
                </div>
              </div>
            </div>
            <div className="col-lg-6 ml100">
              <div className="contact-page-form default-box-shadow1 bdrs8 bdr1 p50 mb30-md bgc-white">
                <h4 className="form-title mb25">Book your Translator Now</h4>
                <p className="text mb30">
                  Whether you have questions or you would just like to hire,
                  contact us.
                </p>
                <form className="form-style1">
                  <div className="row">
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
                          value={hireNowForm?.name}
                          onChange={handleInputChanges}
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
                          value={hireNowForm?.email}
                          onChange={handleInputChanges}
                        />
                      </div>
                    </div>
                    <div className="col-md-12">
                      <div className="mb20">
                        <SelectInput
                          label="Mode of Work"
                          defaultSelect={hireNowForm.workMode}
                          data={experienceLocationType?.map((item) => ({
                            option: item?.name,
                            value: item?.name,
                          }))}
                          handler={(option, value) =>
                            handleFieldChange("workMode", option, value)
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
                          type="date"
                          className="form-control"
                          placeholder="Choose Start Date"
                          name="startDate"
                          value={hireNowForm?.startDate}
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
                          type="date"
                          className="form-control"
                          placeholder="Choose End Date"
                          name="endDate"
                          value={hireNowForm?.endDate}
                          onChange={handleInputChanges}
                        />
                      </div>
                    </div>
                    <div className="col-md-12">
                      <div className="mb20">
                        <label className="heading-color ff-heading fw500 mb10">
                          Any Questions?
                        </label>
                        <textarea
                          cols={30}
                          rows={6}
                          placeholder="Ask here"
                          value={hireNowForm?.questions}
                          onChange={handleInputChanges}
                          name="questions"
                        />
                      </div>
                    </div>
                    <div className="col-md-12">
                      <div>
                        <button type="button" className="ud-btn btn-thm">
                          Pay Now <i className="fal fa-arrow-right-long" />
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
