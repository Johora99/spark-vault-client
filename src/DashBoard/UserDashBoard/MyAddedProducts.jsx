import useAuth from "@/Hooks/useAuth";
import useAxiosSecure from "@/Hooks/useAxiosSecure";
import { useQuery } from "@tanstack/react-query";
import { motion } from "motion/react";
import { TfiWrite } from "react-icons/tfi";
import { RiDeleteBin6Line } from "react-icons/ri";
import { toast } from "react-toastify";
import { Link } from "react-router";

export default function MyAddedProducts() {
  const axiosSecure = useAxiosSecure();
  const { user } = useAuth();
  const { data: myProducts = [] ,refetch} = useQuery({
    queryKey: ["my-Product", user?.email],
    queryFn: async () => {
      const { data } = await axiosSecure.get(`/product/byEmail/${user?.email}`);
      return data;
    },
  });
   const handleDelete = async (id)=>{
    const {data} = await axiosSecure.delete(`product/${id}`)
    console.log(data)
    if(data.deletedCount){
      toast.success('Your product Successfully Deleted')
      refetch()
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
          My Products
        </motion.h2>

        <div className="overflow-x-auto shadow-lg rounded-lg ">
          <table className="min-w-full text-sm text-gray-800">
            <thead className="bg-gradient-to-r from-[#614385] to-[#516395] text-white">
              <tr className="">
                <th className="p-4">#</th>
                <th className="p-4 text-center">Product Name</th>
                <th className="p-4 text-center">Total Votes</th>
                <th className="p-4 text-center">Status</th>
                <th className="p-4 text-center">Update</th>
                <th className="p-4 text-center">Delete</th>
              </tr>
            </thead>
            <tbody>
              {myProducts.length > 0 ? (
                myProducts.map((myProduct, index) => (
                  <tr
                    key={myProduct._id}
                    className="border-b border-b-appleGreen glassy-bg hover:bg-gray-100"
                  >
                    <th className="p-4 text-center font-semibold text-appleGreen">
                      {index + 1}
                    </th>
                    <td className="p-4 text-center text-purple-500 hover:text-purple-700">{myProduct.product_name}</td>
                    <td className="p-4 text-center text-blue-500">
                      {myProduct.votes || 0}
                    </td>
                    <td className="p-4 text-center">
                    <span
       className={`px-2 py-1 rounded-lg text-sm font-medium ${
       myProduct.status === "Accepted"
      ? "bg-green-100 text-green-600"
      : myProduct.status === "Rejected"
      ? "bg-red-100 text-red-600"
      : "bg-yellow-100 text-yellow-600"
  }`}
>
  {myProduct.status}
</span>
                    </td>
                    <td className="p-4 text-center">
                      <Link to={`/dashBoard/update/${myProduct._id}`}>
                      <button
                        className="text-purple-500 hover:text-purple-700 transition-colors"
                        title="Edit Product"
                      >
                        <TfiWrite size={18} />
                      </button>
                      </Link>
                    </td>
                    <td className="p-4 text-center">
                      <button onClick={()=>handleDelete(myProduct._id)}
                        className="text-red-500 hover:text-red-700 transition-colors"
                        title="Delete Product"
                      >
                        <RiDeleteBin6Line size={18} />
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
                    No Product Available
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
