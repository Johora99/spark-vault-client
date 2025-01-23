

import useAuth from "@/Hooks/useAuth";
import { RxCross1 } from "react-icons/rx";
import { motion } from "motion/react";
import useAxiosSecure from "@/Hooks/useAxiosSecure";
import { toast } from "react-toastify";
export default function ModalBox({closeModal,coupon,cancelApply,refetch}) {
    const axiosSecure = useAxiosSecure();
  const {_id,couponCode,expiryDate,description,discountAmount} = coupon;
   const currentDate = new Date().toLocaleDateString('en-CA');
  const handleEditCoupon = async (e) =>{
    e.preventDefault();
        const couponCode = e.target.couponCode.value;
        const expiryDate = e.target.expiryDate.value;
        const description = e.target.description.value;
        const discountAmount = Number(e.target.discountAmount.value);
    
        const couponInfo = {
          couponCode,expiryDate,description,discountAmount
        }
        
      
        const { data } = await axiosSecure.put(`/coupon/${_id}`, couponInfo);
        if(data?.modifiedCount > 0){
          toast.success('Coupon Update Successfully')
          refetch();
          closeModal(_id);

        }
  
  }

  return (
    <div>
<dialog id={`${_id}`} className="modal rounded-2xl">
  <div className="glassy-bg">
    <div className="flex items-center justify-between gap-5 mb-5 p-10">
    <h3 className='text-xl lg:text-4xl color-text font-semibold '>Edit Coupon</h3>
    <div onClick={()=>cancelApply(_id)}><RxCross1 className="text-xl text-appleGreen font-bold cursor-pointer"/></div>
    </div>
   <form onSubmit={handleEditCoupon} className="space-y-6 text-appleGreen p-10">
        {/* Reviewer Name */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
          <div>
          <label className="block text-lg font-medium">Coupon Code</label>
          <input
            type="text"
            name="couponCode"
            defaultValue={couponCode}
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
            defaultValue={expiryDate}
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
            defaultValue={description}
            required
            className="input-field"
            rows="4"
          ></textarea>
        </div>

        {/* Rating */}
        <div>
          <label className="block text-lg font-medium">Discount Amount</label>
         <input type="number" name="discountAmount" defaultValue={discountAmount} className="input-field"/>
        </div>

        {/* Submit Button */}
        <motion.button
        onClick={()=>closeModal(_id)}
          type="submit"
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          className="btn-Style btn-grad"
        >
          Edit Coupon
        </motion.button>
      </form>
  </div>
</dialog>
    </div>
  )
}
