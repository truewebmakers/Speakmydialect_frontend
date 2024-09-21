import Pagination1 from "@/components/section/Pagination1";
import DashboardNavigation from "../header/DashboardNavigation";
import InvoiceCard1 from "../card/InvoiceCard1";
import { invoice } from "@/data/dashboard";
import { useEffect, useState } from "react";
import UseApi from "@/hook/useApi";
import { apiMethods, apiUrls } from "@/constants/constant";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";

export default function InvoiceInfo() {
  const { user } = useSelector((state) => state.auth);
  const [invoiceListing, setInvoiceListing] = useState([]);
  const [invoiveUrl, setInvoiceUrl] = useState("");

  const getInvoiceDetail = async () => {
    try {
      const headers = { Authorization: `Bearer ${user?.token}` };
      const response = await UseApi(
        `${apiUrls.getInvoiceListing}` + user?.userInfo?.id,
        apiMethods.GET,
        null,
        headers
      );
      if (response?.status === 200 || response?.status === 201) {
        setInvoiceListing(response?.data?.data);
        setInvoiceUrl(response?.data?.invoice_url);
      }
    } catch (error) {
      toast.error("Error fetching profile data");
    }
  };

  useEffect(() => {
    getInvoiceDetail();
  }, []);

  return (
    <>
      <div className="dashboard__content hover-bgc-color">
        <div className="row pb40">
          <div className="col-lg-12">
            <DashboardNavigation />
          </div>
        </div>
        <div className="row align-items-center justify-content-between pb40">
          <div className="col-xl-4">
            <div className="dashboard_title_area">
              <h2>Invoice</h2>
            </div>
          </div>
          {/* <div className="col-xl-4">
            <div className="dashboard_search_meta">
              <div className="search_area">
                <input
                  type="text"
                  className="form-control bdrs4"
                  placeholder="Search Invoice"
                />
                <label>
                  <span className="far fa-magnifying-glass" />
                </label>
              </div>
            </div>
          </div> */}
        </div>
        <div className="row">
          <div className="col-xl-12">
            <div className="ps-widget bgc-white bdrs4 p30 mb30 overflow-hidden position-relative">
              <div className="packages_table table-responsive">
                <table className="table-style3 table at-savesearch">
                  <thead className="t-head">
                    <tr>
                      <th scope="col">Job Title</th>
                      <th scope="col">Name</th>
                      <th scope="col">Email</th>
                      <th scope="col">Tx Price ($/hr)</th>
                      <th scope="col">Payment Status</th>
                      <th scope="col">View Reciept</th>

                      {/* <th scope="col">Action</th> */}
                    </tr>
                  </thead>
                  <tbody className="t-body">
                    {invoiceListing?.map((item, i) => (
                      <InvoiceCard1
                        key={i}
                        data={item}
                        invoiceUrl={invoiveUrl}
                      />
                    ))}
                  </tbody>
                </table>
                {/* <div className="mt30">
                  <Pagination1 />
                </div> */}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
