import useAxiosSecure from "@/Hooks/useAxiosSecure"
import { useQuery } from "@tanstack/react-query"
import { motion } from "motion/react";
import { Link } from "react-router";
import { toast } from "react-toastify";
import { FaTimesCircle } from "react-icons/fa";

export default function ManageProduct() {
  const axiosSecure = useAxiosSecure();
  const {data:products = [],refetch} = useQuery({
    queryKey : ['all-product'],
    queryFn : async ()=>{
      const {data} = await axiosSecure.get('/product')
      return data
    }
  })
const handleMakeFeatured = async (id) => {
  try {
    const { data } = await axiosSecure.patch(`/product/featured/${id}`, { featured: true });
    console.log(data)
    if (data?.modifiedCount > 0) {
      toast.success("Product is Featured Successfully");
      refetch();
    }
  } catch (error) {
    if (error.response && error.response.data) {
      const errorMessage = error.response.data.message;
      toast.error(errorMessage); 
    } else {
      toast.error("Failed to make the product featured.");
  
    }
  }
};
 
const handleAccepted = async (id)=>{
  try {
    const { data } = await axiosSecure.patch(`/product/status/${id}`, { status:'Accepted'});
    if (data?.modifiedCount > 0) {
      toast.success("Product is Accepted Successfully");
      refetch();
    }
  } catch (error) {
    if (error.response && error.response.data) {
      const errorMessage = error.response.data.message;
      toast.error(errorMessage); 
    
    } else {
      toast.error("Failed to make the product featured.");

    }
  }

}

const handleRejected = async (id)=>{
    try {
    const { data } = await axiosSecure.patch(`/product/status/${id}`, { status:'Rejected'});
    if (data?.modifiedCount > 0) {
      toast.success("Product is Rejected Successfully");
      refetch();
    }
  } catch (error) {
    if (error.response && error.response.data) {
      const errorMessage = error.response.data.message;
      toast.error(errorMessage); 
    } else {
      toast.error("Failed to make the product featured.");
    }
  }

}
  return (
    <div className="px-4 lg:px-16 py-10">
      <div className="mainContainer mt-20">
        <motion.h2
          animate={{ color: ["rgb(97, 67, 133)", "rgb(81, 99, 149)", "#614385"] }}
          transition={{ duration: 2, repeat: Infinity }}
          className="text-4xl font-semibold mb-10 text-center text-gradient"
        >
        Product Review Queue
        </motion.h2>

        <div className="overflow-x-auto shadow-lg rounded-lg ">
          <table className="min-w-full text-sm text-gray-800">
            <thead className="bg-gradient-to-r from-[#614385] to-[#516395] text-white">
              <tr className="">
                <th className="p-4">#</th>
                <th className="p-4 text-center">Product Name</th>
                <th className="p-4 text-center">View Details</th>
                <th className="p-4 text-center">Make Featured</th>
                <th className="p-4 text-center">Accept</th>
                <th className="p-4 text-center">Reject</th>
              </tr>
            </thead>
            <tbody>
              {products.length > 0 ? (
                products.map((product, index) => (
                  <tr
                    key={product._id}
                    className="border-b border-b-appleGreen glassy-bg hover:bg-gray-100"
                  >
                    <th className="p-4 text-center font-semibold text-appleGreen">
                      {index + 1}
                    </th>
                    <td className="p-4 text-center text-purple-500 hover:text-purple-700">{product?.product_name}</td>
                  
                    
                    <td className="p-4 text-center">

                    <Link to={`/product/${product._id}`}>
                      <button 
                        className="text-purple-500 hover:text-purple-700 transition-colors"
                      
                      >
                    Product Details

                      </button>
                    </Link>
            
                    </td>
                  <td className="p-4 text-center">
  <button
    onClick={() => handleMakeFeatured(product?._id)}
    className={`transition-colors ${
      product?.featured
        ? "text-yellow-500 hover:text-yellow-700"
        : "text-red-500 hover:text-red-700"
    } ${product?.status === "Rejected" ? "opacity-50 cursor-not-allowed" : ""}`}
    disabled={product?.status === "Rejected"}
  >
    {product?.featured ? "Featured" : "Not Featured"}
  </button>
</td>

<td className="p-4 text-center">
  <button
    onClick={() => handleAccepted(product._id)}
    className={`transition-colors ${
      product?.status === "pending"
        ? "text-yellow-500 hover:text-yellow-700"
        : product?.status === "Rejected"
        ? "text-red-500 hover:text-red-700"
        : "text-green-500 hover:text-green-700"
    } ${product?.status === "Rejected" ? "opacity-50 cursor-not-allowed" : ""}`}
    disabled={product?.status === "Rejected"}
  >
    {product?.status || "Accept"}
  </button>
</td>

<td className="p-4 text-center">
  <button
    onClick={() => handleRejected(product._id)}
    className={`text-red-500 hover:text-red-700 transition-colors ${
      product?.featured || product?.status === "Accepted" || product?.status === "Rejected"
        ? "opacity-50 cursor-not-allowed"
        : ""
    }`}
    disabled={
      product?.featured || product?.status === "Accepted" || product?.status === "Rejected"
    }
  >
    <FaTimesCircle className="w-5 h-5 inline-block mr-2" />
  </button>
</td>


                  </tr>
                ))
              ) : (
                <tr>
                  <td
                    colSpan="6"
                    className="text-center text-gray-500 py-6 font-medium"
                  >
                    No User Available
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}
