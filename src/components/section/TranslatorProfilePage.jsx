import { product1 } from "@/data/product";
import FreelancerAbout1 from "../element/FreelancerAbout1";
import FreelancerSkill1 from "../element/FreelancerSkill1";
import ServiceDetailComment1 from "../element/ServiceDetailComment1";
import ServiceDetailReviewInfo1 from "../element/ServiceDetailReviewInfo1";
import FreelancerFutureCard1 from "../card/FreelancerFutureCard1";
import moment from "moment";
import { CapitalizeFirstLetter } from "@/utils/helper";
import { getLanguageName } from "@/utils/commonFunctions";

export default function TranslatorProfilePage({ translatorProfile }) {
  const storedLanguages = sessionStorage.getItem("languages");

  return (
    <>
      <section className="pt10 pb90 pb30-md">
        <div className="container">
          <div className="row wow fadeInUp">
            <div className="col-lg-8">
              <div className="service-about">
                <h4>Description</h4>
                <p className="text mb30">
                  {translatorProfile?.user_meta?.intro
                    ? translatorProfile?.user_meta?.intro
                    : "-"}
                </p>
                {/* Education */}
                <hr className="opacity-100 mb60 mt60" />
                <h4 className="mb30">Education</h4>
                <div className="educational-quality">
                  {translatorProfile?.user_education?.map((item, index) => (
                    <div key={index}>
                      <div className="m-circle text-thm">M</div>
                      <div className="wrapper mb40">
                        <span className="tag">
                          {moment(item?.year_start).format("yyyy")}
                          {" - "}
                          {moment(item?.year_end).format("yyyy")}
                        </span>
                        <h5 className="mt15">{item?.degree_name}</h5>
                        <h6 className="text-thm">{item?.university_name}</h6>
                        <p>{item?.any_info}</p>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Skills */}
                <hr className="opacity-100 mb60 mt60" />
                <h4 className="mb30">Languages & Skills</h4>
                <div className="educational-quality">
                  {translatorProfile?.user_skills?.map((item, index) => (
                    <div key={index}>
                      <div className="m-circle text-thm">M</div>
                      <div className="wrapper mb40">
                        <h5 className="mt15">
                          {storedLanguages?.length > 0
                            ? getLanguageName(
                                item?.language,
                                JSON.parse(storedLanguages)
                              )
                            : "Not Specified Yet"}
                        </h5>
                        <h6 className="text-thm">
                          {CapitalizeFirstLetter(item?.level) + " level"}
                        </h6>
                        <p>
                          {"Status: " + CapitalizeFirstLetter(item?.status)}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
                {/* Work & Experience */}
                <hr className="opacity-100 mb60 mt60" />
                <h4 className="mb30">Work & Experience</h4>
                <div className="educational-quality">
                  {translatorProfile?.user_work_experince?.map(
                    (item, index) => (
                      <div key={index}>
                        <div className="m-circle text-thm">M</div>
                        <div className="wrapper mb40">
                          <span className="tag">
                            {item?.start_year
                              ? moment(item?.start_year).format("yyyy")
                              : "-"}
                            {" - "}
                            {item?.end_year
                              ? moment(item?.end_year).format("yyyy")
                              : "Present"}
                          </span>
                          <h5 className="mt15">
                            {CapitalizeFirstLetter(item?.title)}
                          </h5>
                          <h6 className="text-thm">
                            {CapitalizeFirstLetter(item?.company_name) +
                              ", " +
                              CapitalizeFirstLetter(item?.location)}
                          </h6>
                          <p>{item?.job_description}</p>
                        </div>
                      </div>
                    )
                  )}
                </div>

                {/* <hr className="opacity-100 mb60" />
                <h4 className="mb30">Featured Services</h4>
                <div className="row mb35">
                  {product1.slice(0, 3).map((item, i) => (
                    <div className="col-sm-6 col-xl-4" key={i}>
                      <FreelancerFutureCard1 data={item} />
                    </div>
                  ))}
                </div> */}
                {/* <hr className="opacity-100" />
                <ServiceDetailReviewInfo1 />
                <ServiceDetailComment1 /> */}
              </div>
            </div>
            <div className="col-lg-4">
              <div className="blog-sidebar ms-lg-auto">
                <FreelancerAbout1 data={translatorProfile} />
                <FreelancerSkill1 data={translatorProfile} />
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
