
import { motion } from "motion/react";
import useAxiosSecure from "@/Hooks/useAxiosSecure";
import { toast } from "react-toastify";
export default function AddCouponForm({refetch}) {
    const axiosSecure = useAxiosSecure();
    const handleAddCoupon = async (e)=>{
    e.preventDefault();
    const couponCode = e.target.couponCode.value;
    const expiryDate = e.target.expiryDate.value;
    const description = e.target.description.value;
    const discountAmount = Number(e.target.discountAmount.value);

    const couponInfo = {
      couponCode,expiryDate,description,discountAmount
    }
  
   try {
    const { data } = await axiosSecure.post('/coupon', couponInfo);
    if (data.insertedId) {
      toast.success('Coupon is added successfully');
      refetch();
      e.target.reset();
    }
  } catch (error) {
    if (error.response && error.response.status === 409) {
      toast.error(error.response.data.message);
      e.target.reset();
    } else {
      toast.error('Something went wrong. Please try again later.');
    }
  }
  
  }
  return (
    <div className="w-full glassy-bg p-8 rounded-lg shadow-lg my-20">
      <h2 className="text-2xl font-semibold text-white mb-4">Add a Coupon</h2>
      <form onSubmit={handleAddCoupon} className="space-y-6 text-white">
        {/* Reviewer Name */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
          <div>
          <label className="block text-lg font-medium">Coupon Code</label>
          <input
            type="text"
            name="couponCode"
            required
            className="input-field"
          />
        </div>

        {/* Reviewer Image */}
        <div>
          <label className="block text-lg font-medium">Expiry Date</label>
          <input
            type="date"
            name="expiryDate"
            required
            className="input-field"
          />
        </div>
      </div>

        {/* Review Description */}
        <div>
          <label className="block text-lg font-medium">Coupon Code Description</label>
          <textarea
          name="description"
            placeholder="Write your coupon description here..."
            required
            className="input-field"
            rows="4"
          ></textarea>
        </div>

        {/* Rating */}
        <div>
          <label className="block text-lg font-medium">Discount Amount</label>
         <input type="number" name="discountAmount" className="input-field"/>
        </div>

        {/* Submit Button */}
        <motion.button
          type="submit"
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          className="btn-Style btn-grad"
        >
          Add Coupon
        </motion.button>
      </form>
    </div>
  )
}
