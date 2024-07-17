import DashboardNavigation from "../header/DashboardNavigation";
import Pagination1 from "@/components/section/Pagination1";
import PaymentMethod from "./PaymentMethod";
import PayoutCard1 from "../card/PayoutCard1";

export default function PayoutInfo({ payoutListing }) {
  return (
    <>
      <div className="dashboard__content hover-bgc-color">
        <div className="row pb40">
          <div className="col-lg-12">
            <DashboardNavigation />
          </div>
        </div>
        <div className="row align-items-center justify-content-between pb40">
          <div className="col-lg-6">
            <div className="dashboard_title_area">
              <h2>Payouts</h2>
            </div>
          </div>
        </div>
        <div className="row">
          <div className="col-xl-12">
            <div className="ps-widget bgc-white bdrs4 p30 mb60 overflow-hidden position-relative">
              <div className="packages_table table-responsive">
                <table className="table-style3 table at-savesearch">
                  <thead className="t-head">
                    <tr>
                      <th scope="col">Job Title</th>
                      <th scope="col">Paid At</th>
                      <th scope="col">Amount</th>
                      <th scope="col">Start At</th>
                      <th scope="col">End At</th>
                      <th scope="col">Payment Status</th>
                      <th scope="col">Action</th>
                    </tr>
                  </thead>
                  <tbody className="t-body">
                    {payoutListing?.map((item, i) => (
                      <PayoutCard1 key={i} data={item} />
                    ))}
                  </tbody>
                </table>
                <div className="mt30">{/* <Pagination1 /> */}</div>
              </div>
            </div>
            <div className="ps-widget bgc-white bdrs4 p30 mb30 position-relative">
              <div className="row">
                <div className="col-lg-9">
                  <PaymentMethod />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
