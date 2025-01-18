import useAxiosSecure from "@/Hooks/useAxiosSecure"
import { useQuery } from "@tanstack/react-query"


import bgImg from '../../assets/home6-trending-jobs-bg.png'

import { motion } from "motion/react"
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { Rating } from '@smastrom/react-rating'

import '@smastrom/react-rating/style.css'
export default function ShowReview({_id}) {
  const axiosSecure = useAxiosSecure()
  const {data : reviews = []} = useQuery({
    queryKey : ['review',_id],
    queryFn : async ()=>{
      const {data} = await axiosSecure.get(`/review/byId/${_id}`)
      return data;
    }
  })
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

      <div className="container w-11/12 mx-auto text-center">
      <motion.h2 animate={{ color:["rgb(97, 67, 133)", "rgb(81, 99, 149)", "#614385"]}} 
        transition={{duration:2, repeat:Infinity}}
        
        className="text-4xl lg:text-6xl text-white font-semibold text-center mb-5">Reviews</motion.h2>
        <p className="text-2xl font-semibold text-TealBlueGreen mt-3">
          Customer Say
        </p>
      </div>
      <div className="border-b-[2px] border-TealBlueGreen w-[40%] mx-auto mt-5"></div>


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
          {reviews?.map((review, index) => (
            <div key={index} className="flex justify-center items-center h-full">
              <div className="text-center">
                <img
                  src={review.image}
                  alt={review.name}
                  className="w-24 h-24 lg:w-32 lg:h-32 rounded-full mx-auto mt-10 object-cover"
                />
                <p

                  className="text-2xl lg:text-3xl font-semibold text-TealBlueGreen mt-10 mb-3"
                >
                  {review.name}
                </p>
    
                <p
                  data-aos="zoom-in"
                  className="text-xl lg:text-2xl text-white mx-auto w-[80%] lg:w-[50%]"
                >
                  {review.description}
                </p>
                  <div className="flex items-center justify-center">
                    <Rating
                  style={{ maxWidth: 180 }}
                  value={review?.rating}
                  readOnly
                  />
                  </div>
              </div>
            </div>
          ))}
        </Slider>
      </div>
    </div>
  )
}
