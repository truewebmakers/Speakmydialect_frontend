import PayNowForm from "@/components/section/PayNowForm";
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
const pubkey = 'pk_test_51P2poYFOjqYjuziSQehIuAQksSaw3hKCtNnK5r7mrLs5xwS6ULXbNQJCDmPwdUISPMzqvxdMvzl5g2sHZHpDk4zq00YjLu4h6C'; 
const stripePromise = loadStripe(pubkey);

const PayNow = () => (
    <Elements stripe={stripePromise}>
        <PayNowForm />
    </Elements>
);

export default PayNow;