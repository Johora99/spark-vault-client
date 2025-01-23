import { Meteors } from "@/Components/ui/Meteor";
import useAxiosSecure from "@/Hooks/useAxiosSecure";
import { useQuery } from "@tanstack/react-query";
import { motion } from "motion/react";
import AddCouponForm from "./AddCouponForm";
import { toast } from "react-toastify";
import { useState } from "react";
import ModalBox from "./ModalBox";

export default function ManageCoupon() {
  const axiosSecure = useAxiosSecure();
    const [isModalOpen, setIsModalOpen] = useState(false);
  const { data: coupons = [],refetch } = useQuery({
    queryKey: ['coupon'],
    queryFn: async () => {
      const { data } = await axiosSecure.get('/coupon');
      return data;
    }
  });

const openModal = (id) => {
  const modal = document.getElementById(`${id}`);
  if (modal) {
    modal.showModal(); // Open the modal
    setIsModalOpen(true);
  }
};

   const closeModal = (id) => {
  const modal = document.getElementById(`${id}`);
  setIsModalOpen(false);
  if (modal) {
    modal.close();
  }
};
const cancelApply = (id)=>{
  const modal = document.getElementById(`${id}`);
    if (modal) {
    modal.close();
  }
 }
  const handleDelete = async (id) => {
    try {
      const {data} = await axiosSecure.delete(`/coupon/${id}`)
      if(data?.deletedCount > 0){
        toast.success('Coupon is deleted successfully');
        refetch();
      }
    
    } catch (error) {
      console.error("Error deleting coupon:", error);
    }
  };

  return (
    <div className="mainContainer mt-20 px-4 lg:px-20">
      <div>
        <motion.h2
          animate={{ color: ["rgb(97, 67, 133)", "rgb(81, 99, 149)", "#614385"] }}
          transition={{ duration: 2, repeat: Infinity }}
          className="text-4xl font-semibold mb-20  text-gradient"
        >
          Admin Coupon Management Page
        </motion.h2>
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {
          coupons.length > 0 ? coupons.map((coupon) => (
            <div key={coupon._id} className="relative block overflow-hidden rounded-lg border border-appleGreen bg-gradient-to-r from-gray-800 to-gray-900 p-6 shadow-lg transition duration-300 hover:scale-105 hover:shadow-xl glassy-bg">
              {/* Decorative Clip-Path Overlay */}
              <div className="absolute inset-0 bg-gradient-to-r from-purple-600 via-transparent to-gray-900 opacity-20 clip-path-triangle"></div>

              {/* Content Wrapper */}
              <div className="relative z-10 p-6 space-y-4">
                {/* Coupon Code */}
                <div className="text-lg font-bold  px-6 py-2  mb-4 color-text ">
                  {coupon?.couponCode}
                </div>

                {/* Coupon Description */}
                <h3 className="text-xl font-bold text-white text-center">
                  {coupon?.description}
                </h3>

                {/* Discount Information */}
                <p className="text-2xl font-bold text-white text-center mb-4">
                  ${coupon?.discountAmount}
                </p>

                {/* Expiry Date */}
                <p className="text-sm text-gray-300 text-center">
                  Expiry Date: <span className="font-semibold">{coupon?.expiryDate}</span>
                </p>

                {/* Actions Section */}
                <div className="flex items-center justify-center gap-3 mt-6">
                

                  {/* Edit Button */}
                  <button
                    onClick={()=>openModal(coupon._id)}
                    className="px-4 py-2 text-white rounded-full font-semibold btn-grad transition duration-300 border-[1px] border-appleGreen"
                  >
                    Edit
                  </button>

                  {/* Delete Button */}
                  <button
                    onClick={() => handleDelete(coupon._id)}
                    className="px-4 py-2 text-white rounded-full font-semibold btn-grad transition duration-300 border-[1px] border-appleGreen"
                  >
                    Delete
                  </button>
                </div>
              </div>
              <Meteors number={30} className="custom-meteor-class" />
      <div>
        <ModalBox coupon={coupon} closeModal={closeModal} cancelApply={cancelApply} refetch={refetch}></ModalBox>
      </div>
            </div>
          )) : <p className="text-gray-400">No Coupons Available</p>
        }
      </div>
      <div>
        <AddCouponForm refetch={refetch}></AddCouponForm>

      </div>
    </div>
  );
}
