import useAxiosSecure from "@/Hooks/useAxiosSecure"
import { useQuery } from "@tanstack/react-query"
import { motion } from "motion/react";
import PiChart from "./PiChart";


export default function StatisticPage() {
  const axiosSecure = useAxiosSecure();
  const {data : statistic = []} = useQuery({
    queryKey:['statistic'],
    queryFn:async()=>{
      const {data} = await axiosSecure.get('/admin/statistics')
      return data.data;
    }
  })
  console.log(statistic)
  return (
    <div className="mainContainer mt-20">
       <div>
        <motion.h2
          animate={{ color: ["rgb(97, 67, 133)", "rgb(81, 99, 149)", "#614385"] }}
          transition={{ duration: 2, repeat: Infinity }}
          className="text-4xl font-semibold mb-20  text-gradient"
        >
        Admin Statistics Page
        </motion.h2>

       </div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
  {/* Total Products Card */}
  <div className="border border-gray-300 rounded-lg shadow-lg glassy-bg p-6 text-center">
    <div className="flex justify-center items-center mb-4">
      <span className="bg-blue-500 text-white p-3 rounded-full">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={2}
          stroke="currentColor"
          className="w-6 h-6"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M3 10h18M9 21V3m6 18V3"
          />
        </svg>
      </span>
    </div>
    <h3 className="text-2xl font-bold color-text mb-2">Total Products</h3>
    <p className="text-white">Accepted: <span className="font-semibold">{statistic?.products?.Accepted}</span></p>
    <p className="text-white">Pending: <span className="font-semibold">{statistic?.products?.pending || 0}</span></p>
    <p className="text-white">Rejected: <span className="font-semibold">{statistic?.products?.Rejected}</span></p>
  </div>

  {/* Total Users Card */}
  <div className="border border-gray-300 rounded-lg shadow-lg glassy-bg p-6 text-center">
    <div className="flex justify-center items-center mb-4">
      <span className="bg-green-500 text-white p-3 rounded-full">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={2}
          stroke="currentColor"
          className="w-6 h-6"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M16 11V7a4 4 0 00-8 0v4M5.455 15h13.09A2.455 2.455 0 0121 17.455v1.09A2.455 2.455 0 0118.545 21H5.455A2.455 2.455 0 013 18.545v-1.09A2.455 2.455 0 015.455 15z"
          />
        </svg>
      </span>
    </div>
    <h3 className="text-2xl font-bold color-text mb-2">Total Users</h3>
    <p className="text-4xl font-bold text-white">{statistic?.users}</p>
  </div>

  {/* Total Reviews Card */}
  <div className="border border-gray-300 rounded-lg shadow-lg glassy-bg p-6 text-center">
    <div className="flex justify-center items-center mb-4">
      <span className="bg-red-500 text-white p-3 rounded-full">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={2}
          stroke="currentColor"
          className="w-6 h-6"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M17 8h2a2 2 0 012 2v10a2 2 0 01-2 2h-2M7 8H5a2 2 0 00-2 2v10a2 2 0 002 2h2m10-12H7m10 4H7m10 4H7"
          />
        </svg>
      </span>
    </div>
    <h3 className="text-2xl font-bold color-text mb-2">Total Reviews</h3>
    <p className="text-4xl font-bold text-white">{statistic?.reviews}</p>
  </div>

      </div>
       <div>
        <PiChart statistic={statistic}></PiChart>
       </div>
    </div>
  )
}
