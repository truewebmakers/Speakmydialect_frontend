import { freelancer1 } from "@/data/product";
import { getCountryName } from "@/utils/commonFunctions";
import { CapitalizeFirstLetter } from "@/utils/helper";
import moment from "moment";

export default function Breadcumb17({ translatorProfile }) {
  const storedCountries = sessionStorage.getItem("countries");

  return (
    <>
      <section className="breadcumb-section pt-0">
        <div className="cta-service-v1 freelancer-single-style mx-auto maxw1700 pt120 pt60-sm pb120 pb60-sm bdrs16 position-relative overflow-hidden d-flex align-items-center mx20-lg px30-lg">
          <img
            className="left-top-img wow zoomIn"
            src="/images/vector-img/left-top.png"
            alt="vector-img"
          />
          <img
            className="right-bottom-img wow zoomIn"
            src="/images/vector-img/right-bottom.png"
            alt="vector-img"
          />
          <div className="container">
            <div className="row wow fadeInUp">
              <div className="col-xl-7">
                <div className="position-relative">
                  <div className="list-meta d-sm-flex align-items-center mt30">
                    <a className="position-relative freelancer-single-style">
                      <span className="online" />
                      {translatorProfile?.user_meta?.profile_pic ? (
                        <img
                          className="rounded-circle  wa-sm mb15-sm"
                          src={translatorProfile?.user_meta?.profile_pic}
                          alt="Freelancer Photo"
                          height={80}
                          width={80}
                        />
                      ) : (
                        <img
                          className="rounded-circle w-100 wa-sm mb15-sm"
                          src="/images/team/fl-1.png"
                          alt="Freelancer Photo"
                        />
                      )}
                    </a>
                    <div className="ml20 ml0-xs">
                      <h5 className="title mb-1">
                        {translatorProfile?.fname} {translatorProfile?.lname}
                      </h5>

                      <p className="mb-0">
                        {translatorProfile?.user_meta?.intro
                          ? CapitalizeFirstLetter(
                              translatorProfile?.user_meta?.intro
                            )
                          : "-"}
                      </p>
                      <p className="mb-0 dark-color fz15 fw500 list-inline-item mb5-sm">
                        <i className="fas fa-star vam fz10 review-color me-2" />{" "}
                        {translatorProfile?.user_meta?.gender
                          ? CapitalizeFirstLetter(
                              translatorProfile?.user_meta?.gender
                            )
                          : null}
                      </p>
                      <p className="mb-0 dark-color fz15 fw500 list-inline-item ml15 mb5-sm ml0-xs">
                        <i className="flaticon-place vam fz20 me-2" />{" "}
                        {storedCountries?.length > 0
                          ? getCountryName(
                              translatorProfile?.user_meta?.location,
                              JSON.parse(storedCountries)
                            )
                          : "Not Specified Yet"}
                      </p>
                      <p className="mb-0 dark-color fz15 fw500 list-inline-item ml15 mb5-sm ml0-xs">
                        <i className="flaticon-30-days vam fz20 me-2" /> Member
                        since{" "}
                        {translatorProfile?.user_meta?.created_at
                          ? moment(
                              translatorProfile?.user_meta?.created_at
                            ).format("YYYY, DD MMM")
                          : null}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
