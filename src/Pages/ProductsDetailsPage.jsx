import useAxiosSecure from "@/Hooks/useAxiosSecure";
import { useQuery } from "@tanstack/react-query";
import { useParams } from "react-router";
import { motion } from "motion/react";
import ReviewForm from "@/Components/Review/ReviewForm";
import { useEffect, useState } from "react";
import useAuth from "@/Hooks/useAuth";
import { useLike } from "@/Context/LikeContext";
import { Meteors } from "@/Components/ui/Meteor";
import ShowReview from "@/Components/Review/ShowReview";
import { useReport } from "@/Context/ReportContext";
import { toast } from "react-toastify";
import { Helmet } from "react-helmet";


export default function ProductsDetailsPage() {
 const {user} = useAuth();
 const {checkIsLiked,handleVote,isLiked} = useLike();
 const {handleReport,isReport} = useReport();
  const axiosSecure = useAxiosSecure();
  const { id } = useParams();
  const { data: product = {},refetch } = useQuery({
    queryKey: ["product-details", id],
    queryFn: async () => {
      const { data } = await axiosSecure.get(`/product/byId/${id}`);
      return data;
    },
  });
  
  const {_id, product_name, product_image, description, tags, web_link, votes, timestamp, owner_name, reportCount } = product;


   useEffect(()=>{
    checkIsLiked(id);
   },[id])


const vote = async (id) => {
await  handleVote(id);
await refetch();
};
const report = async (id)=>{
  await handleReport(id)
  refetch();
}
  return (
    <div className="w-full  text-white">
       <Helmet>
        <title>Spark Vault || Product Details</title>
    </Helmet>
      <div className="mainContainer py-20">
        {/* Card Section */}
        <div className="card-bg glassy-bg p-10 rounded-lg shadow-lg mx-auto max-w-4xl">
          <div className="flex flex-col md:flex-row gap-10">
            {/* Product Image */}
            <motion.div
              animate={{ scale: [1, 1.05, 1] }}
              transition={{ duration: 2, repeat: Infinity }}
              className="flex-shrink-0"
            >
              <img src={product_image} alt={product_name} className="w-72 rounded-lg shadow-lg border-2 border-purple-500" />
            </motion.div>

            {/* Product Details */}
            <div className="flex flex-col justify-between">
              <motion.h2
                animate={{ color: ["rgb(97, 67, 133)", "rgb(81, 99, 149)", "#614385"] }}
                transition={{ duration: 2, repeat: Infinity }}
                className="text-4xl font-semibold mb-5"
              >
                {product_name}
              </motion.h2>
              <p className="text-gray-300 mb-5 text-lg">{description}</p>

              {/* Tags */}
              <div className="flex flex-wrap gap-2 mb-5">
                {tags?.map((tag, index) => (
                  <span
                    key={index}
                    className="rounded-full bg-gray-700 px-3 py-1 text-sm text-purple-300 shadow-sm"
                  >
                    #{tag}
                  </span>
                ))}
              </div>

              {/* Additional Info */}
              <div className="mt-5 space-y-3">
                <p className="text-sm">
                  <span className="font-semibold">Added By:</span> {owner_name || "Unknown"}
                </p>
                <p className="text-sm">
                  <span className="font-semibold">Votes:</span> {votes || 0}
                </p>
                <p className="text-sm">
                  <span className="font-semibold">Report Count:</span> {reportCount || 0}
                </p>
                <p className="text-sm">
                  <span className="font-semibold">Published:</span>{" "}
                  {new Date(timestamp).toLocaleDateString("en-GB", {
                    day: "numeric",
                    month: "long",
                    year: "numeric",
                  })}
                </p>
              </div>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="mt-10 flex flex-col gap-3 lg:flex-row lg:justify-between lg:items-center">
            <a
              href={web_link}
              target="_blank"
              rel="noopener noreferrer"
              className="px-10 py-3 btn-grad"
            >
              Visit Site
            </a>
            <div className="flex flex-col lg:flex-row gap-3">
            <button onClick={()=>vote(_id)} className="px-6 py-3 bg-gray-800 text-white rounded-lg hover:bg-purple-500 transition shadow-lg flex items-center">
            <svg
              className={`w-5 h-5 mr-2 ${isLiked ? 'text-red-500' : 'text-white'}`} 
              xmlns="http://www.w3.org/2000/svg"
              fill="currentColor"
              viewBox="0 0 24 24"
            >
              <path d="M12 4.248c-3.148-5.402-12-3.254-12 2.944 0 3.053 2.22 5.877 5.314 8.389l6.686 5.419 6.686-5.419c3.094-2.512 5.314-5.336 5.314-8.389 0-6.198-8.852-8.346-12-2.944z" />
            </svg>
            Like ({votes || 0})
          </button>

          <button
  className={`px-6 py-3 rounded-lg transition shadow-lg  bg-gray-800 text-white hover:bg-purple-500"`}
  onClick={() => report(_id)} 
>
  Report Product
</button>


            </div>
          </div>
          <div className="w-full border-b-[1px] border-b-appleGreen my-10"></div>
          {/* review from */}
          <div>
            <ReviewForm _id={_id}></ReviewForm>
          </div>
          <Meteors number={30} className="custom-meteor-class" />
        </div>
        <div>
        </div>
      </div>
          <ShowReview _id={_id}></ShowReview>
    </div>
  );
}
