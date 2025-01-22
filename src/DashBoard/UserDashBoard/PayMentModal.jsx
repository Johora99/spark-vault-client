import { Elements } from "@stripe/react-stripe-js";
import { RxCross1 } from "react-icons/rx";
import CheckoutForm from "./CheckoutForm";
import { loadStripe } from "@stripe/stripe-js";
import { useState } from "react";

const stripePromise = loadStripe(import.meta.env.VITE_PAYMENT_API);
export default function PayMentModal({closeModal}) {
  const [couponCode,setCouponCode] = useState('');
  
  return (
      <div>
<dialog id='payMent' className="modal rounded-2xl">
  <div className="glassy-bg p-10">
    <div className="flex items-center justify-between gap-5">
    <h3 className='text-xl lg:text-4xl color-text font-semibold mb-10'>Pay $20 for Subscription</h3>
    <div onClick={closeModal}><RxCross1 className="text-xl text-appleGreen font-bold cursor-pointer "/></div>
    </div>
        <div>
          <div>
            <input onChange={(e)=>setCouponCode(e.target.value)} type="text" name="" id="" className="mb-5 bg-transparent border border-appleGreen rounded-lg"/>
            <span className="ml-2 color-text">User Coupon Code</span>
          </div>
          <div>
             <Elements stripe={stripePromise}>
                <CheckoutForm couponCode={couponCode} closeModal={closeModal}></CheckoutForm>
             </Elements>
          </div>
        </div>
  </div>
</dialog>
    </div>
  )
}
