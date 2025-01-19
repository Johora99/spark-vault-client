import { Link } from "react-router";
import { Meteors } from "../ui/Meteor";
import { useLike } from "@/Context/LikeContext";
import { useEffect } from "react";


export default function TrendingProductsCard({ product,refetch }) {
  const {_id, product_name, product_image, description, tags, web_link, votes, timestamp, owner_name, reportCount } = product;
  const {checkIsLiked,handleVote,isLiked} = useLike();
     useEffect(()=>{
      checkIsLiked(_id);
     },[_id])
  
  
  const vote = async (id) => {
  await  handleVote(id);
   await refetch()
  }
  return (
  
      <div className="relative block overflow-hidden rounded-lg border border-appleGreen bg-gradient-to-r from-gray-800 to-gray-900 p-6 shadow-lg transition duration-300 hover:scale-105 hover:shadow-xl glassy-bg">
      {/* Decorative Clip-Path Overlay */}
      <div className="absolute inset-0 bg-gradient-to-r from-purple-600 via-transparent to-gray-900 opacity-20 clip-path-triangle"></div>

      {/* Content Wrapper */}
      <div className="relative z-10 p-6 space-y-4">
        {/* Product Image */}
        <div className="w-20 h-20 mx-auto rounded-full overflow-hidden bg-gray-700 shadow-md border-2 border-purple-500">
          <img
            src={product_image}
            alt={product_name}
            className="w-full h-full object-cover"
          />
        </div>

        {/* Product Name */}
        <h3 className="text-xl font-bold text-white text-center">{product_name}</h3>

        {/* Product Added By */}
        <p className="text-sm text-gray-400 text-center">Added by {owner_name}</p>

        {/* Product Description */}
        <p className="text-sm text-gray-300 text-center line-clamp-3">
          {description || "Explore this amazing product, perfect for enhancing your creativity and productivity!"}
        </p>

        {/* Tags Section */}
        <div className="flex justify-center gap-2 flex-wrap">
          {tags?.map((tag, index) => (
            <span
              key={index}
              className="text-xs px-3 py-1 rounded-full bg-purple-600 text-white shadow-md hover:bg-purple-500 transition"
            >
              {tag}
            </span>
          ))}
        </div>

        {/* Actions Section */}
        <div className="flex items-center justify-center gap-3 mt-6">
          {/* Like Button */}
          <button onClick={()=>vote(_id)} className="flex items-center  text-white px-4 py-2 rounded-full text-sm shadow-md btn-grad transition">
            <svg
              className="w-5 h-5 mr-2"
              xmlns="http://www.w3.org/2000/svg"
              fill="currentColor"
              viewBox="0 0 24 24"
            >
              <path d="M12 4.248c-3.148-5.402-12-3.254-12 2.944 0 3.053 2.22 5.877 5.314 8.389l6.686 5.419 6.686-5.419c3.094-2.512 5.314-5.336 5.314-8.389 0-6.198-8.852-8.346-12-2.944z" />
            </svg>
            Like ({votes || 0})
          </button>
          <Link to={`/product/${_id}`}>
          <button className="btn-grad py-2 px-5 text-sm">Details</button>
          </Link>
    <Meteors number={30} className="custom-meteor-class" />
        </div>
      </div>
    </div>
  );
}
