import { Link, useLocation } from "react-router-dom";

export default function OurStory() {
  const { pathname } = useLocation();

  const whyChooseUs = [];

  return (
    <>
      <section className="p-0 mt-5 py-lg-0 mt-5">
        <div
          className={`cta-banner3 mx-auto pt120 pt60-lg pb90 pb60-lg position-relative overflow-hidden ${
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
                    <h2 className="title">
                      {" "}
                      Our Story
                      <br className="d-none d-xl-block" />{" "}
                    </h2>

                    <p className="text  mb35">
                      SpeakMyDialect was founded to address the frequent
                      challenges encountered in the interpreting industry, such
                      as unreliable services, lack of qualified interpreters,
                      and overpriced offerings. Moses and Ayak, our founders,
                      experienced these issues firsthand and were driven to
                      create a platform that guarantees reliable access to
                      qualified and fairly priced interpreting services
                    </p>
                  </div>
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
