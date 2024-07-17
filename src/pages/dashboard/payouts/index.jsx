import DashboardLayout from "@/components/dashboard/DashboardLayout";
import PayoutInfo from "@/components/dashboard/section/PayoutInfo";
import MobileNavigation2 from "@/components/header/MobileNavigation2";
import MetaComponent from "@/components/common/MetaComponent";
import { apiMethods, apiUrls, metaData } from "@/constants/constant";
import { useLocation } from "react-router-dom";
import PaymentMethod from "@/components/dashboard/section/PaymentMethod";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { useSelector } from "react-redux";
import UseApi from "@/hook/useApi";

export default function DasbPagePayouts() {
  const { pathname } = useLocation();
  const [payoutListing, setPayoutListing] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const { user } = useSelector((state) => state.auth);

  const getPayoutDetails = async () => {
    try {
      const headers = { Authorization: `Bearer ${user?.token}` };
      const response = await UseApi(
        `${apiUrls.adminGetPayoutsListing}`,
        apiMethods.GET,
        null,
        headers
      );
      if (response?.status === 200 || response?.status === 201) {
        setPayoutListing(response?.data?.data);
        setIsLoading(false);
      }
      setIsLoading(false);
    } catch (error) {
      toast.error("Error fetching profile data");
      setIsLoading(false);
    }
  };

  useEffect(() => {
    getPayoutDetails();
  }, []);

  return (
    <>
      <MetaComponent meta={metaData} />
      <MobileNavigation2 />
      <DashboardLayout>
        {pathname?.includes("/payout") ? (
          <PayoutInfo payoutListing={payoutListing} />
        ) : (
          <div className="ps-widget bgc-white bdrs4 p30 mb30 position-relative">
            <div className="row">
              <div className="col-lg-9">
                <PaymentMethod />
              </div>
            </div>
          </div>
        )}
      </DashboardLayout>
    </>
  );
}
