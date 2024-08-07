import MetaComponent from "@/components/common/MetaComponent";
import PayNowForm from "@/components/section/PayNowForm";
import { metaData } from "@/constants/constant";
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
const pubkey = 'pk_test_51P2poYFOjqYjuziSQehIuAQksSaw3hKCtNnK5r7mrLs5xwS6ULXbNQJCDmPwdUISPMzqvxdMvzl5g2sHZHpDk4zq00YjLu4h6C'; 
const stripePromise = loadStripe(pubkey);

const PayNow = () => {
    
    return(
    <Elements stripe={stripePromise}>
              <MetaComponent meta={metaData} />
        
        <PayNowForm />
    </Elements>
)
}

export default PayNow;