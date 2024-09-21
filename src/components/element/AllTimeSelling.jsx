export default function AllTimeSelling() {
  return (
    <>
      <div className="row wow fadeInUp" data-wow-delay="300ms">
        <div className="col-sm-6 col-lg-3">
          <div className="iconbox-style1 border-less p-0">
            <div className="icon before-none">
              <span className="flaticon-cv" />
            </div>
            <div className="details">
              <h4 className="title mt10 mb-3">Sign Up</h4>
              <p className="text">
                Join our platform to start using our services.
              </p>
            </div>
          </div>
        </div>
        <div className="col-sm-6 col-lg-3">
          <div className="iconbox-style1 border-less p-0">
            <div className="icon before-none">
              <span className="flaticon-customer-service" />
            </div>
            <div className="details">
              <h4 className="title mt10 mb-3">Find Interpreters</h4>
              <p className="text">
                Look for interpreters who fit your needs using our search tool.{" "}
                {/* <br className="d-none d-xxl-block" /> the specific language. */}
              </p>
            </div>
          </div>
        </div>
        <div className="col-sm-6 col-lg-3">
          <div className="iconbox-style1 border-less p-0">
            <div className="icon before-none">
              <span className="flaticon-secure" />
            </div>
            <div className="details">
              <h4 className="title mt10 mb-3">Book Your Interpreter</h4>
              <p className="text">
                Pick an interpreter and schedule your session.{" "}
                {/* <br className="d-none d-xxl-block" /> you prefer. */}
              </p>
            </div>
          </div>
        </div>
        <div className="col-sm-6 col-lg-3">
          <div className="iconbox-style1 border-less p-0">
            <div className="icon before-none">
              <span className="flaticon-web-design" />
            </div>
            <div className="details">
              <h4 className="title mt10 mb-3">Manage Your Session</h4>
              <p className="text">
                Keep track of your booking and connect easily through our
                platform.
                {/* <br className="d-none d-xxl-block" /> in your details. */}
              </p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
