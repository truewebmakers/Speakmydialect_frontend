import LineChart from "../chart/LineChart";
import DashboardNavigation from "../header/DashboardNavigation";

export default function DashboardInfo() {
  const clientWidgets = [
    "Upcoming Bookings",
    "Current Bookings",
    "Completed Bookings",
    "Approved Bookings",
  ];

  return (
    <>
      <div className="dashboard__content hover-bgc-color">
        <div className="row pb40">
          <div className="col-lg-12">
            <DashboardNavigation />
          </div>
          <div className="col-lg-12">
            <div className="dashboard_title_area">
              <h2>Dashboard</h2>
              {/* <p className="text">Lorem ipsum dolor sit amet, consectetur.</p> */}
            </div>
          </div>
        </div>
        <div className="row">
          {clientWidgets?.map((item, index) => (
            <div className="col-sm-6 col-xxl-3" key={index}>
              <div className="d-flex align-items-center justify-content-between statistics_funfact">
                <div className="details">
                  <div className="fz15">{item}</div>
                  <div className="title">0</div>
                </div>
                <div className="icon text-center">
                  <i className="flaticon-contract" />
                </div>
              </div>
            </div>
          ))}
        </div>
        <div className="row">
          <div className="col-xl-12">
            <LineChart />
          </div>
        </div>
      </div>
    </>
  );
}
