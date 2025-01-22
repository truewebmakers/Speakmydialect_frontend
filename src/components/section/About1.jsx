import { Link } from "react-router-dom";

export default function About1() {
  const hideSection = location.pathname === "/about" ? "d-none" : "";
  const homePage = location.pathname === "/" ? "d-none" : "";

  return (
    <>
      <section className="our-about pt90 pb120 bgc-thm2 ">
        <div className="container">
          <div className="row align-items-center">
            <div className="col-xl-6">
              <div className="position-relative mb30-lg">
                <div className="iconbox-small1 at-home1 d-none d-md-block wow fadeInRight">
                  <span className="icon flaticon-review" />
                  <div className="details">
                    <h6>4.9/5</h6>
                    <p className="text fz13 mb-0">Clients rate professionals</p>
                  </div>
                </div>
                <div className="iconbox-small2 d-none d-md-block wow fadeInLeft">
                  <span className="icon flaticon-review" />
                  <div className="details">
                    <h6>+12M</h6>
                    <p className="text fz13 mb-0">Project Completed</p>
                  </div>
                </div>
                <div
                  className="about-img wow fadeInRight"
                  data-wow-delay="300ms"
                >
                  <img
                    className="w100 object-fit-contain"
                    src="/images/new/smd1.jpg"
                    alt="object"
                  />
                </div>
                <div className="imgbox-1 default-box-shadow1 text-center wow fadeInUp"></div>
              </div>
            </div>
            <div className="col-xl-5 offset-xl-1">
              <div
                className="position-relative wow fadeInLeft"
                data-wow-delay="300ms"
              >
                <div className={hideSection + " who-we-are"}>
                  <h2 className="text-white mb35">
                    Who Are We?{" "}
                    {/* <br className="d-none d-lg-block" /> Welcome to SpeakMyDialect */}
                  </h2>
                  <p className="text text-white mb35">
                  At Speakmydialect, we specialise in providing interpreting services to support local community members and organisations to bridge communication and language barriers. Our goal is to deliver clear, accurate, and reliable information through local interpreters, ensuring efficiency while minimising frustration, costs, and time delays. Our founders experienced issues in the industry with connecting people with the right interpreter based on misidentified dialects, and are dedicated to connecting you with the right person, facilitating seamless communication every time. 


                  </p>
                  <div className="list-style2 light-style">
                    <ul className="mb30">
                      <li>
                        <i className="far fa-check" />
                        Connect with Skilled, Certified Interpreters
                      </li>
                      <li>
                        <i className="far fa-check" />
                        Flexible, High-Quality Interpretation Services
                      </li>
                      <li>
                        <i className="far fa-check" />
                        Easy-to-Use Platform
                      </li>
                      <li>
                        <i className="far fa-check" />
                        Flexible, High-Quality Interpretation Services{" "}
                      </li>
                    </ul>
                  </div>
                </div>
                <div className={homePage + " what-platform-offers"}>
                  <h2 className="text-white mb35">
                    {" "}
                    What Our Platform Offers
                    <br className="d-none d-xl-block" />{" "}
                  </h2>
                  <p className="text text-white mb35">
                  Speakmydialect simplifies the process of finding and booking interpreters. Our platform allows you to effortlessly search for interpreters based on language and dialect, availability, schedule sessions, and manage appointments through an intuitive dashboard. We offer a range of session formats, including in-person, phone, and video calls, ensuring our services are accessible wherever you need them. Whether for personal, educational, or professional purposes, Speakmydialect guarantees clear and dependable communication across languages.
                  </p>
                </div>
                <Link to="/search" className="ud-btn btn-thm">
                  Find Interpreters
                  <i className="fal fa-arrow-right-long" />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
