import React, { useEffect, useState } from "react";
import { CardElement, useStripe, useElements } from "@stripe/react-stripe-js";
import UseApi from "@/hook/useApi";
import { apiMethods, apiUrls, routes } from "@/constants/constant";
import { useLocation, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { useSelector } from "react-redux";
import Loader from "../common/loader";
import "./index.css";
import { calculatePayment } from "@/utils/commonFunctions";

const PayNowForm = () => {
  const [totalAmount, setTotalAmount] = useState(0);
  const [amountToReceive, setAmountToReceive] = useState(0);
  const [receiptUrl, setReceiptUrl] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [calculating, setCalculating] = useState(true);
  const { state } = useLocation();
  const { user } = useSelector((state) => state.auth);
  const navigate = useNavigate();

  useEffect(() => {
    if (state?.presentRate && state?.startDate && state?.endDate) {
      const { presentRate, startDate, endDate } = state;

      setCalculating(true);
      const { amountToReceive, totalAmount } = calculatePayment(
        presentRate,
        startDate,
        endDate
      );
      setAmountToReceive(amountToReceive);
      setTotalAmount(totalAmount);
      setCalculating(false);
    }
  }, [state]);

  const stripe = useStripe();
  const elements = useElements();

  const handleSubmit = async (event) => {
    event.preventDefault();
    setIsLoading(true);
    try {
      if (!stripe || !elements) {
        return;
      }
      const cardElement = elements.getElement(CardElement);
      const { token, error } = await stripe.createToken(cardElement);
      if (error) {
        toast.error(error.message);
      } else {
        const headers = {
          Authorization: `Bearer ${user?.token}`,
        };
        const bodyData = {
          amount: state?.presentRate,
          token: token?.id,
          currency: "aud",
          job_id: state?.jobId,
          description: state?.description,
          email: state?.clientEmail,
          user_name: state?.clientUserName,
        };
        const { data } = await UseApi(
          apiUrls.payNow,
          apiMethods.POST,
          bodyData,
          headers
        );
        if (data?.status === true) {
          setReceiptUrl(data?.invoice_url);
          toast.success(data?.message);
          navigate(routes.Bookings);
        } else {
          toast.error(data?.message);
        }
      }
    } catch (err) {
      toast.error(err.message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <section className="pt-0">
      <div className="checkout-page">
        <div className="checkout-form-container">
          <h2>Make Payment</h2>
          <form onSubmit={handleSubmit} className="checkout-form">
            <div className="form-group">
              <label htmlFor="card-element">Credit or Debit Card</label>
              <CardElement
                id="card-element"
                className="card-element"
                options={{
                  hidePostalCode: true, // Disable ZIP code field
                }}
              />
            </div>

            <div className="amount-info">
              {receiptUrl && (
                <a href={receiptUrl} className="download-receipent" download>
                  Download Receipt
                </a>
              )}
              <p>
                <b>Stripe Processing Fee Percentage:</b> 3.50% (approx.)
              </p>
              <p>
                <b>Tax Percentage:</b> 0.38%
              </p>
              <p>
                <b>Amount to Receive:</b> ${amountToReceive}
              </p>
              <p>
                <b>Total Amount Charged:</b>{" "}
                {calculating ? <Loader /> : `$${totalAmount}`}
              </p>
            </div>

            <button
              type="submit"
              disabled={!stripe || calculating}
              className="submit-button"
            >
              {isLoading ? (
                <Loader />
              ) : calculating ? (
                "Calculating..."
              ) : (
                `Pay $${totalAmount}`
              )}
            </button>
          </form>
        </div>
      </div>
    </section>
  );
};

export default PayNowForm;
