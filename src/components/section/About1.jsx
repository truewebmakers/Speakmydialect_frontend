import { Link } from "react-router-dom";

export default function About1() {
  const hideSection = (location.pathname === "/about") ? 'd-none' :'';
  const homePage = (location.pathname === "/") ? 'd-none' :'';
  console.log("location.pathname",location.pathname)
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
                    src="/images/about/about-1.png"
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
                <div className={hideSection+" who-we-are"}>

                
                <h2 className="text-white mb35">
                  Who Are We?{" "}
                  {/* <br className="d-none d-lg-block" /> Welcome to SpeakMyDialect */}
                </h2>
                <p className="text text-white mb35">
                  Welcome to SpeakMyDialect, your premier platform for finding
                  local interpreters. We connect individuals and organisations
                  with qualified interpreters fluent in a myriad of languages,
                  enhancing communication and cultural understanding. At
                  SpeakMyDialect, we are committed to bridging communication
                  gaps, providing skilled interpreters who facilitate essential
                  multicultural connections. Whether your needs are personal,
                  educational, or professional, we ensure that our services are
                  accessible and affordable for everyone.
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
                  <div className={homePage +" what-platform-offers"}>
                  <h2 className="text-white mb35">
                    {" "}
                    What Our Platform Offers
                    <br className="d-none d-xl-block" />{" "}
                  </h2>
                  <p className="text text-white mb35">
                    SpeakMyDialect is designed to streamline the process of
                    finding and booking qualified interpreters. Our platform
                    enables users to easily search for interpreters based on
                    language expertise and availability, book sessions, and
                    manage appointments through a user-friendly dashboard. We
                    support a variety of session formats, including in-person,
                    phone, and video calls, making our services accessible
                    wherever you are. Whether for personal use, educational
                    purposes, or professional needs, SpeakMyDialect ensures
                    effective and reliable communication across different
                    languages.
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
