import DashboardNavigation from "../header/DashboardNavigation";
import UseApi from "@/hook/useApi";
import { apiMethods, apiUrls } from "@/constants/constant";
import { useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import ContactInquiryCard from "../card/ContactInquiryCard";
import PageNotFound from "@/components/section/PageNotFound";

export default function ContactInquiryInfo() {
  const { user } = useSelector((state) => state.auth);
  const [contactInquiries, setContactInquiries] = useState([]);

  // Fetch contact inquiries
  const fetchData = async () => {
    try {
      const headers = { Authorization: `Bearer ${user?.token}` };

      const response = await UseApi(
        apiUrls.getContactInquiries,
        apiMethods.GET,
        null,
        headers
      );
      if (response?.status === 200 || response?.status === 201) {
        setContactInquiries(response?.data?.data || []);
      }
    } catch (error) {
      toast.error("Error fetching contact inquiries");
    }
  };

  useEffect(() => {
    fetchData();
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
              <h2>Contact Inquiry</h2>
            </div>
          </div>
        </div>
        {contactInquiries?.length ? (
          <div className="row">
            <div className="col-xl-12">
              <div className="ps-widget bgc-white bdrs4 p30 mb30 overflow-hidden position-relative">
                <div className="packages_table table-responsive">
                  <table className="table-style3 table at-savesearch">
                    <thead className="t-head">
                      <tr>
                        <th scope="col">Name</th>
                        <th scope="col">Email</th>
                        <th scope="col">Phone</th>
                        <th scope="col">Subject</th>
                        <th scope="col">Query</th>
                        <th scope="col">Date & Time</th>
                      </tr>
                    </thead>
                    <tbody className="t-body">
                      {contactInquiries?.map((item, i) => (
                        <ContactInquiryCard key={i} data={item} />
                      ))}
                    </tbody>
                  </table>
                  <div className="mt30">{/* <Pagination1 /> */}</div>
                </div>
              </div>
            </div>
          </div>
        ) : (
          <PageNotFound />
        )}
      </div>
    </>
  );
}
