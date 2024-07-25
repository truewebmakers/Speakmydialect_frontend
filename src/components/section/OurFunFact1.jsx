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
              <div className="row align-items-center">
                <div className="col-sm-6">
                  <div className="funfact-style1 bdrs16 text-center ms-md-auto">
                    <ul className="ps-0 mb-0 d-flex justify-content-center">
                      <li>
                        <div className="timer title mb15">Integrity</div>
                      </li>

                    </ul>
                    <p className="fz15 dark-color">
                    Upholding honesty and transparency in all our interactions
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
                    Ensuring excellence in every service we provide.
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
                    Embracing and supporting diversity within our community and across our
                    services.
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
