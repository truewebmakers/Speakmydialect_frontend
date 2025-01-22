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
              ? "bgc-white"
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
                    At Speakmydialect, we specialise in providing interpreting services to support local community members and organisations to bridge communication and language barriers. Our goal is to deliver clear, accurate, and reliable information through local interpreters, ensuring efficiency while minimising frustration, costs, and time delays. Our founders experienced issues in the industry with connecting people with the right interpreter based on misidentified dialects, and are dedicated to connecting you with the right person, facilitating seamless communication every time.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <img
            className="cta-banner3-img wow fadeInLeft h-100 object-fit-cover"
            src="/images/new/smd3.jpg"
            alt="cta banner 3"
            data-wow-delay="300ms"
          />
        </div>
      </section>
    </>
  );
}
