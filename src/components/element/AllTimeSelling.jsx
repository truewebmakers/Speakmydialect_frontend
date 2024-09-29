export default function AllTimeSelling() {
  return (
    <>
      <div className="row wow fadeInUp" data-wow-delay="300ms">
        {[
          {
            icon: "flaticon-cv",
            title: "Sign Up",
            text: "Join our platform to start using our services.",
          },
          {
            icon: "flaticon-customer-service",
            title: "Find Interpreters",
            text: "Look for interpreters who fit your needs using our search tool.",
          },
          {
            icon: "flaticon-secure",
            title: "Book Your Interpreter",
            text: "Pick an interpreter and schedule your session.",
          },
          {
            icon: "flaticon-web-design",
            title: "Manage Your Session",
            text: "Keep track of your booking and connect easily through our platform.",
          },
        ].map((item, index) => (
          <div className="col-sm-6 col-lg-3" key={index}>
            <div className="iconbox-style1 border-less p-0 text-center">
              <div className="icon before-none">
                <span className={item.icon} />
              </div>
              <div className="details">
                <h4 className="title mt10 mb-3">{item.title}</h4>
                <p className="text" style={{ textAlign: "center" }}>
                  {item.text}
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </>
  );
}
