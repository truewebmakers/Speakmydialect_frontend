import { Link } from "react-router-dom";

export default function OurFunFact1() {
  return (
    <>
      <section className="bgc-light-yellow pb90 pb30-md overflow-hidden maxw1700 mx-auto bdrs4">
        <img
          className="left-top-img wow zoomIn d-none d-lg-block"
          src="/images/vector-img/left-top.png"
          alt="object"
        />
        <img
          className="right-bottom-img wow zoomIn d-none d-lg-block"
          src="/images/vector-img/right-bottom.png"
          alt="object"
        />
        <div className="container">
          <div className="row justify-content-center mb-5">
            {/* Heading and Subheading Section */}
            <div className="col-12 text-center mt-4">
              <h2 className="cta-title mb-4">Our Values</h2>
              <p className="fz15 dark-color">
                We believe in integrity, quality, and inclusivity. These values
                guide everything we do.
              </p>
            </div>
          </div>

          {/* Row Grid for Values */}
          <div className="row justify-content-center">
            <div className="col-sm-6 col-md-4 col-lg-3 mb-4">
              <div className="funfact-style1 bdrs16 text-center"> 
                <div className="timer title mb-3">Integrity</div>
                <p className="fz15 dark-color text-center">
                  We prioritise honesty, transparency, and ethical conduct
                  in every interaction. By being clear, upfront, and
                  accountable in our communication and processes, we build
                  trust with clients, interpreters, and partners, ensuring
                  accurate and reliable service every time.  

                </p> 
              </div>
            </div>

            <div className="col-sm-6 col-md-4 col-lg-3 mb-4">
              <div className="funfact-style1 bdrs16 text-center">
                <div className="timer title mb-3">Quality</div>
                <p className="fz15 dark-color">
                      We are committed to ensuring excellence in every service
                      we provide. Our dedication to being responsive ensures
                      that we meet your needs promptly, while our reliability
                      gives you the confidence that we will always deliver on
                      our promises. With us, quality means peace of mind,
                      knowing that you can depend on us at any time.
                </p>
              </div>
            </div>

            <div className="col-sm-6 col-md-4 col-lg-3 mb-4">
              <div className="funfact-style1 bdrs16 text-center">
                <div className="timer title mb-3">Inclusivity</div>
                <p className="fz15 dark-color">
                      We embrace a supportive and welcoming environment where
                      all individuals, regardless of their background, identity,
                      or language, are respected and valued. We are committed to
                      offering accessible and equitable services that cater to
                      diverse needs, ensuring that everyone can communicate
                      effectively and confidently.
                </p>
              </div>
            </div>
          </div>

          {/* Centered Button Section */}
          <div className="row justify-content-center mt-5">
            <div className="col-auto">
              <Link to="/contact" className="ud-btn btn-thm">
                Get Started
                <i className="fal fa-arrow-right-long" />
              </Link>
            </div>
          </div>
        </div>

        <div className="container d-none">
          <div className="row align-items-center">
            <div
              className="col-md-6 col-xl-4 offset-xl-1 wow fadeInRight"
              data-wow-delay="100ms"
            >
              <div className="cta-style6 mb30-sm">
                <h2 className="cta-title mb25">
                  Our Values
                  {/* <br className="d-none d-lg-block" />
                  get your business growing. */}
                </h2>
                {/* <p className="text-thm2 fz15 mb25">
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed
                  <br className="d-none d-md-block" /> do eiusmod tempor
                  incididunt.
                </p> */}
                <Link to="/contact" className="ud-btn btn-thm">
                  Get Started
                  <i className="fal fa-arrow-right-long" />
                </Link>
              </div>
            </div>
            <div
              className="col-md-6 col-xl-6 offset-xl-1 wow fadeInLeft"
              data-wow-delay="300ms"
            >
              <div
                className="row align-items-center"
                style={{ paddingTop: "50px" }}
              >
                <div className="col-sm-6">
                  <div className="funfact-style1 bdrs16 text-center ms-md-auto">
                    <ul className="ps-0 mb-0 d-flex justify-content-center">
                      <li>
                        <div className="timer title mb15">Integrity</div>
                      </li>
                    </ul>
                    <p className="fz15 dark-color">
                      We prioritise honesty, transparency, and ethical conduct
                      in every interaction. By being clear, upfront, and
                      accountable in our communication and processes, we build
                      trust with clients, interpreters, and partners, ensuring
                      accurate and reliable service every time. 
                    </p>
                  </div>
                  <div className="funfact-style1 bdrs16 text-center ms-md-auto">
                    <ul className="ps-0 mb-0 d-flex justify-content-center">
                      <li>
                        <div className="timer title mb15">Quality</div>
                      </li>
                      {/* <li>
                        <span>%</span>
                      </li> */}
                    </ul>
                    <p className="fz15 dark-color">
                      We are committed to ensuring excellence in every service
                      we provide. Our dedication to being responsive ensures
                      that we meet your needs promptly, while our reliability
                      gives you the confidence that we will always deliver on
                      our promises. With us, quality means peace of mind,
                      knowing that you can depend on us at any time. 
                    </p>
                  </div>
                </div>
                <div className="col-sm-6">
                  <div className="funfact-style1 bdrs16 text-center">
                    <ul className="ps-0 mb-0 d-flex justify-content-center">
                      <li>
                        <div className="title mb15">Inclusivity</div>
                      </li>
                    </ul>
                    <p className="fz15 dark-color">
                      We embrace a supportive and welcoming environment where
                      all individuals, regardless of their background, identity,
                      or language, are respected and valued. We are committed to
                      offering accessible and equitable services that cater to
                      diverse needs, ensuring that everyone can communicate
                      effectively and confidently.
                    </p>
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
