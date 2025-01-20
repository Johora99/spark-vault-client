
import useAxiosSecure from "@/Hooks/useAxiosSecure";
import { useQuery } from "@tanstack/react-query";
import { motion } from "motion/react";
import { RiDeleteBin6Line } from "react-icons/ri";
import { Link } from "react-router";
import { toast } from "react-toastify";
export default function ReportedProduct() {
  const axiosSecure = useAxiosSecure()
  const {data : reportProducts = [],refetch} = useQuery({
    queryKey:['report-product'],
    queryFn : async()=>{
      const {data} = await axiosSecure.get('/product/report')
      return data;
    }
  })
const handleDelete = async (id)=>{
    const {data} = await axiosSecure.delete(`/reportedProduct/${id}`)
    console.log(data)
    if(data.deletedCount){
      toast.success('Successfully Deleted')
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
        Reported Products
        </motion.h2>

        <div className="overflow-x-auto shadow-lg rounded-lg ">
          <table className="min-w-full text-sm text-gray-800">
            <thead className="bg-gradient-to-r from-[#614385] to-[#516395] text-white">
              <tr className="">
                <th className="p-4">#</th>
                <th className="p-4 text-center">Product Name</th>
                <th className="p-4 text-center">View Details</th>
                <th className="p-4 text-center">Delete</th>
              </tr>
            </thead>
            <tbody>
                {reportProducts.length > 0 ? (
                reportProducts.map((product, index) => (
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
                  <button onClick={()=>handleDelete(product._id)}
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
