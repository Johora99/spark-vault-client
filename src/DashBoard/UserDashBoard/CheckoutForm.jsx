import useAuth from "@/Hooks/useAuth";
import useAxiosSecure from "@/Hooks/useAxiosSecure";
import { CardElement, useElements, useStripe } from "@stripe/react-stripe-js";
import { useQuery } from "@tanstack/react-query";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";



export default function CheckoutForm({couponCode,closeModal}) {
  const {user} = useAuth();
  const [error,setError] = useState('');
  const [clientSecret,setClientSecret] = useState('');
  const [transaction,setTransaction] = useState('')
  const [price, setPrice] = useState(100);
  const [discountMessage, setDiscountMessage] = useState("");
  const stripe = useStripe();
  const elements = useElements();
  const axiosSecure  = useAxiosSecure()

  
  const { data: coupons = [],refetch } = useQuery({
    queryKey: ['coupon'],
    queryFn: async () => {
      const { data } = await axiosSecure.get('/coupon');
      return data;
    }
  });
  const applyCoupon = async () => {
    // Find the matching coupon
    const matchedCoupon = await coupons.find(
      (coupon) => coupon.couponCode === couponCode
    );
  
    if (matchedCoupon) {
      console.log(couponCode)
      // Check if the coupon is expired
      const today = new Date();
      const expiryDate = new Date(matchedCoupon.expiryDate);
      

      if (expiryDate >= today) {
        // Apply the discount
        setPrice(100 - matchedCoupon.discountAmount);
        
        setDiscountMessage(
          `Coupon applied! You received a discount of $${matchedCoupon.discountAmount}.`
        );
      } else {
        setDiscountMessage("This coupon has expired.");
      }
    } 
  };
useEffect(() => {
  applyCoupon(); // Apply the coupon when couponCode or coupons change
}, [coupons, couponCode]);
  useEffect(()=>{
      if(price > 0){
        axiosSecure.post('/create-checkout-session',{price : price})
      .then(res =>{
        // console.log(res.data.clientSecret)
        setClientSecret(res.data.clientSecret)
      })
      }
    },[axiosSecure,price])
  const handleSubmit = async (e)=>{
         e.preventDefault();
         if (!stripe || !elements) {
           return;
             }
       const card = elements.getElement(CardElement);
       if (card == null) {
        return;
       }
      const {error, paymentMethod} = await stripe.createPaymentMethod({
      type: 'card',
      card,
    });
    if (error) {
      console.log('[error]', error);
      setError(error.message)
    } else {
      console.log('[PaymentMethod]', paymentMethod);
      setError('')
    }
    // confirm payment ==========================
    const {paymentIntent,error : confirmError} = await stripe.confirmCardPayment(clientSecret,{
      payment_method : {
        card : card ,
        billing_details : {
           email : user?.email || 'anonymous',
           name : user?.displayName || 'anonymous'
        }
      }
    })
    if(confirmError){
      console.log('confirm error')
    }
    else{
      console.log('payment intent',paymentIntent)
      if(paymentIntent.status === 'succeeded'){
        // console.log('transaction id',paymentIntent.id)
        setTransaction(paymentIntent.id)
        if(paymentIntent.id){
          const {data} = axiosSecure.patch(`/userStatus/${user?.email}`,{status :'verified'})
         toast.success('Your Subscription Successfully Done')
        }
      }
    }
  }
  return (
    <div>
     <form onSubmit={handleSubmit}>
      <CardElement
        options={{
          style: {
            base: {
              fontSize: '16px',
              color: '#424770',
              '::placeholder': {
                color: '#aab7c4',
              },
            },
            invalid: {
              color: '#9e2146',
            },
          },
        }}
      />
      <button onClick={closeModal}  type="submit" className="btn-grad mt-5 py-2 px-5" disabled={!stripe || !clientSecret}>
        Pay
      </button>
      <p className="text-red-500">{error}</p>
      {transaction && <p className="text-green-500">Your transaction id {transaction}</p>}
      {
        discountMessage && <p className="text-green-500 mt-2">{discountMessage}</p>
      }
    </form>
    </div>
  )
}
