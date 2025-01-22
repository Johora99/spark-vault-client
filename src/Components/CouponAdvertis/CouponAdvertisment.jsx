import useAxiosSecure from "@/Hooks/useAxiosSecure"
import { useQuery } from "@tanstack/react-query"


import bgImg from '../../assets/home6-trending-jobs-bg.png'

import { motion } from "motion/react"
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { Rating } from '@smastrom/react-rating'

import '@smastrom/react-rating/style.css'

export default function CouponAdvertisment() {
  const axiosSecure = useAxiosSecure();
  const { data: coupons = [],refetch } = useQuery({
    queryKey: ['coupon'],
    queryFn: async () => {
      const { data } = await axiosSecure.get('/coupon');
      return data;
    }
  });
    const settings = {
    dots: false, 
    infinite: true,
    autoplay: true,
    autoplaySpeed: 3000,
    speed: 500,
    fade: true, 
    slidesToShow: 1,
    slidesToScroll: 1,
    arrows: false,
    pauseOnHover: false,
  };
  return (
    <div className="w-full  pt-20">

    <div className="relative container w-11/12 mx-auto text-center py-10">
  {/* Clip Path Decorative Background */}
  <div
    className="absolute inset-0 w-[90%] mx-auto h-28 lg:h-36 bg-gradient-to-r from-purple-900/30 via-blue-800/30 to-purple-900/30 rounded-xl"
    style={{
      clipPath: "polygon(0 50%, 10% 0, 90% 0, 100% 50%, 90% 100%, 10% 100%)",
    }}
  ></div>

  {/* Title Text */}
  <motion.h2
   animate={{ scale: [1, 1.1, 1], color: ["rgb(97, 67, 133)", "rgb(81, 99, 149)", "#614385"] }}
    transition={{ duration: 2, repeat: Infinity }}
    className="relative text-4xl lg:text-5xl font-bold text-white z-10"
  >
    Grab Your Exclusive Coupons Now!
  </motion.h2>

  {/* Subtitle Text */}
  <p className="relative text-lg lg:text-xl text-gray-300 mt-3 z-10">
    Unlock amazing discounts before they expire!
  </p>

  {/* Decorative Bottom Border */}
  <div className="relative mt-6 w-[50%] mx-auto h-2 bg-gradient-to-r from-TealBlueGreen to-blue-500 rounded-full z-10"></div>
</div>



      <div
        className="h-[500px] my-20 relative"
        style={{
          backgroundImage: `url(${bgImg})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundAttachment: "fixed",
        }}
      >
        <Slider {...settings} className="h-full">
          {
            coupons.length > 0 ? coupons?.map((coupon, index) => (
            <div key={index} className="flex justify-center items-center h-full">
              <div className="relative mx-auto mt-10 p-6 bg-gradient-to-r from-purple-900/30 via-blue-800/30 to-purple-900/30 rounded-lg shadow-lg text-white max-w-[90%] lg:max-w-[50%] border border-appleGreen">
  {/* Decorative Top Label */}
  <div className="absolute -top-4 left-1/2 transform -translate-x-1/2 px-4 py-1 bg-gradient-to-r from-purple-500 to-indigo-500 text-white rounded-full shadow-md text-sm font-bold uppercase tracking-wide">
    Coupon Code
  </div>

  {/* Content Section */}
  <div className="text-center">
    <h2 className="text-3xl lg:text-4xl font-bold mb-4 text-Tangerine drop-shadow-md">
      {coupon.couponCode}
    </h2>

    <p className="text-lg lg:text-xl text-gray-200 mb-4 px-4 lg:px-10 leading-relaxed">
      {coupon.description}
    </p>

    <div className="flex justify-center items-center space-x-4">
      <span className="text-2xl lg:text-3xl font-semibold bg-white text-purple-800 px-4 py-2 rounded-lg shadow-md border border-purple-300">
        ${coupon.discountAmount}
      </span>
      <span className="text-sm lg:text-base font-medium text-gray-300">
        Discount Amount
      </span>
    </div>

    <p className="text-base lg:text-lg text-gray-300 mt-5">
      <span className="font-semibold text-white">Expiry Date:</span> {coupon.expiryDate}
    </p>
  </div>

  {/* Decorative Bottom Border */}
  <div className="mt-6 border-t border-gray-500 pt-4 text-gray-400 text-sm">
    Use this coupon to unlock amazing deals before it expires!
  </div>
</div>

            </div>
          )):<div><p className="text-center text-xl text-white glassy-bg p-6 rounded-xl shadow-xl mt-8  mainContainer">
  No Coupon available.
</p>
</div>
          }
          
        </Slider>
      </div>
    </div>
  )
}
