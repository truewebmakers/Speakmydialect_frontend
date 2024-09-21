import { useState } from "react";
import PayoutForm from "../element/PayoutForm";

export default function PaymentMethod() {
  return (
    <>
      <div className="ps-widget bgc-white bdrs4 p30 mb30 overflow-hidden position-relative">
        <h5 className="mb15">Payout Details</h5>
        <div className="navpill-style1 payout-style">
          <PayoutForm />
        </div>
      </div>
    </>
  );
}
