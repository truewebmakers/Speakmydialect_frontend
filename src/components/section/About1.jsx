import { Link } from "react-router-dom";

export default function About1() {
  return (
    <>
      <section className="our-about pt90 pb120 bgc-thm2">
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
                <div className="imgbox-1 default-box-shadow1 text-center wow fadeInUp">
                  <img
                    className="img-1 bounce-y w-f"
                    src="/images/about/happy-client.png"
                    alt="object"
                  />
                </div>
              </div>
            </div>
            <div className="col-xl-5 offset-xl-1">
              <div
                className="position-relative wow fadeInLeft"
                data-wow-delay="300ms"
              >
                <h2 className="text-white mb35">
                Who Are We? {" "}
                  {/* <br className="d-none d-lg-block" /> Welcome to SpeakMyDialect */}
                </h2>
                <p className="text text-white mb35">
                    Welcome to SpeakMyDialect, your premier platform for finding local interpreters. We connect
                    individuals and organisations with qualified interpreters fluent in a myriad of languages,
                    enhancing communication and cultural understanding. At SpeakMyDialect, we are committed to
                    bridging communication gaps, providing skilled interpreters who facilitate essential multicultural
                    connections. Whether your needs are personal, educational, or professional, we ensure that our
                    services are accessible and affordable for everyone.
                </p>
                <div className="list-style2 light-style">
                  <ul className="mb30">
                    <li>
                      <i className="far fa-check" />
                      Connect to freelancers with proven business experience
                    </li>
                    <li>
                      <i className="far fa-check" />
                      Get matched with the perfect talent by a customer success
                      manager
                    </li>
                    <li>
                      <i className="far fa-check" />
                      Unmatched quality of remote, hybrid, and flexible jobs
                    </li>
                  </ul>
                </div>
                <Link to="/search" className="ud-btn btn-thm">
                  Find Talent
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
