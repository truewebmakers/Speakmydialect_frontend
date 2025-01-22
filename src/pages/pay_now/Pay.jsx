import MetaComponent from "@/components/common/MetaComponent";
import PayNowForm from "@/components/section/PayNowForm";
import { metaData } from "@/constants/constant";
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
const pubkey = 'pk_test_51QjsNuCXqBSDKbWMlx4JiFxUQd04XpQI67aoyE8hT7tGrbTA6ex0sHFr23iinnp6mCx3z5ieiW8jb2qiEQ0Lm3XO00P4fQOrpj'; 
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