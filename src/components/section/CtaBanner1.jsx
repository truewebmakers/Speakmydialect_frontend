import { useLocation } from "react-router-dom";

export default function CtaBanner1() {
  const { pathname } = useLocation();

  const whyChooseUs = [];

  return (
    <>
      <section className="p-0 mt-5  py-lg-0 mt-5">
        <div
          className={`cta-banner3 mx-auto pt40 pt60-lg pb90 pb60-lg position-relative overflow-hidden ${
            pathname === "/" || pathname === "/about"
              ? "bgc-light-yellow"
              : pathname === "/become-seller"
              ? "bgc-thm4"
              : ""
          }`}
        >
          <div className="container">
            <div className="row">
              <div className="col-xl-5 wow fadeInRight" data-wow-delay="300ms">
                <div className="mb30">
                  <div className="main-title">
                    {pathname === "/" ? (
                      <h2 className="title">
                        {" "}
                        Why Choose Us? <br className="d-none d-xl-block" />{" "}
                      </h2>
                    ) : (
                      <h2 className="title">
                        {" "}
                        What Our Platform Offers
                        <br className="d-none d-xl-block" />{" "}
                      </h2>
                    )}
                    {pathname === "/" ? (
                      <p className="c  mb35">
                        At SpeakMyDialect, we offer unparalleled access to a
                        network of certified interpreters who specialize in a
                        wide range of languages. Here’s why you should choose us
                        for your interpreting needs:
                      </p>
                    ) : (
                      <p className="text  mb35">
                        SpeakMyDialect is designed to streamline the process of
                        finding and booking qualified interpreters. Our platform
                        enables users to easily search for interpreters based on
                        language expertise and availability, book sessions, and
                        manage appointments through a user-friendly dashboard.
                        We support a variety of session formats, including
                        in-person, phone, and video calls, making our services
                        accessible wherever you are. Whether for personal use,
                        educational purposes, or professional needs,
                        SpeakMyDialect ensures effective and reliable
                        communication across different languages.
                      </p>
                    )}
                  </div>
                </div>

                <div className="why-chose-list">
                  {pathname === "/" ? (
                    <div className="list-one d-flex align-items-start mb30">
                      <span className="list-icon flex-shrink-0 flaticon-badge" />
                      <div className="list-content flex-grow-1 ml20">
                        <h4 className="mb-1">Expert Interpreters</h4>
                        <p className="text mb-0 fz15">
                          Our interpreters undergo rigorous testing to verify
                          their language
                          <br className="d-none d-lg-block" /> proficiency and
                          interpreting skills, ensuring top-notch service.
                        </p>
                      </div>
                    </div>
                  ) : (
                    <div className="list-one d-flex align-items-start mb30">
                      <span className="list-icon flex-shrink-0 flaticon-badge" />
                      <div className="list-content flex-grow-1 ml20">
                        <h4 className="mb-1">Our Mission</h4>
                        <p className="text mb-0 fz15">
                          To provide accessible, reliable, and high-quality
                          interpreting services that bridge communication gaps,
                          ensuring that every individual and organization can
                          thrive in a multilingual world.
                        </p>
                      </div>
                    </div>
                  )}

                  {pathname === "/" ? (
                    <div className="list-one d-flex align-items-start mb30">
                      <span className="list-icon flex-shrink-0 ">
                        <img
                          src="/images/language.png"
                          height={30}
                          width={30}
                        />
                      </span>

                      <div className="list-content flex-grow-1 ml20">
                        <h4 className="mb-1">Wide Language Selection</h4>
                        <p className="text mb-0 fz15">
                          We offer a vast array of languages, catering to both
                          widely spoken and less common dialects
                        </p>
                      </div>
                    </div>
                  ) : (
                    <div className="list-one d-flex align-items-start mb30">
                      <span className="list-icon flex-shrink-0 flaticon-money" />
                      <div className="list-content flex-grow-1 ml20">
                        <h4 className="mb-1">Our Vision</h4>
                        <p className="text mb-0 fz15">
                          To be the leading platform for interpreting services,
                          recognised for our commitment to integrity and
                          customer satisfaction
                        </p>
                      </div>
                    </div>
                  )}
                  {pathname === "/" && (
                    <div className="list-one d-flex align-items-start mb30">
                      <span className="list-icon flex-shrink-0 flaticon-security" />
                      <div className="list-content flex-grow-1 ml20">
                        <h4 className="mb-1">User-Friendly Platform</h4>
                        <p className="text mb-0 fz15">
                          Our platform is designed for ease of use, allowing for
                          quick and efficient booking of interpreters.
                        </p>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
          <img
            className="cta-banner3-img wow fadeInLeft h-100 object-fit-cover"
            src="/images/about/about-5.jpg"
            alt="cta banner 3"
            data-wow-delay="300ms"
          />
        </div>
      </section>
    </>
  );
}
