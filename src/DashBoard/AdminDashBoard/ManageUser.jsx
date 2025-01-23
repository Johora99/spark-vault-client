import useAxiosSecure from "@/Hooks/useAxiosSecure"
import { useQuery } from "@tanstack/react-query"
import { motion } from "motion/react";
import { toast } from "react-toastify";

export default function ManageUser() {
  const axiosSecure = useAxiosSecure();
  const {data : user = [],refetch} = useQuery({
    queryKey:['user'],
    queryFn:async ()=>{
      const {data} = await axiosSecure.get('/user')
      return data
    }
  })
  const handleModerator = async (email)=>{
    const {data} = await axiosSecure.patch(`/user/moderator/${email}`,{role:'moderator'})
    if(data?.modifiedCount > 0){
      toast.success('Role Update Successfully');
      refetch();
    }
  }
  const handleAdmin = async (email)=>{
    const {data} = await axiosSecure.patch(`/user/admin/${email}`,{role:'admin'})
      if(data?.modifiedCount > 0){
      toast.success('Role Update Successfully');
      refetch();
    }
  }
  return (
    <div className="px-4 lg:px-16 py-10">
      <div className="mainContainer my-20">
        <motion.h2
          animate={{ color: ["rgb(97, 67, 133)", "rgb(81, 99, 149)", "#614385"] }}
          transition={{ duration: 2, repeat: Infinity }}
          className="text-4xl font-semibold my-20 text-center text-gradient"
        >
          Manage User
        </motion.h2>

        <div className="overflow-x-auto shadow-lg rounded-lg ">
          <table className="min-w-full text-sm text-gray-800">
            <thead className="bg-gradient-to-r from-[#614385] to-[#516395] text-white">
              <tr className="">
                <th className="p-4">#</th>
                <th className="p-4 text-center">User name</th>
                <th className="p-4 text-center">User email</th>
                <th className="p-4 text-center">Role</th>
                <th className="p-4 text-center">Make Moderator</th>
                <th className="p-4 text-center">Make Admin</th>
              </tr>
            </thead>
            <tbody>
              {user.length > 0 ? (
                user.map((person, index) => (
                  <tr
                    key={person._id}
                    className="border-b border-b-appleGreen glassy-bg hover:bg-gray-100"
                  >
                    <th className="p-4 text-center font-semibold text-appleGreen">
                      {index + 1}
                    </th>
                    <td className="p-4 text-center text-purple-500 hover:text-purple-700">{person?.name}</td>
                    <td className="p-4 text-center text-blue-500">
                      {person?.email}
                    </td>
                    <td
  className={`p-4 text-center ${
    person?.role === 'admin'
      ? 'text-red-500 font-bold' // Admin style
      : person?.role === 'moderator'
      ? 'text-green-500 font-medium' // Moderator style
      : 'text-yellow-500' // User style
  }`}
>
  {person?.role}
</td>

                    
                    <td className="p-4 text-center">

                      <button onClick={()=>handleModerator(person?.email)}
                        className="text-purple-500 hover:text-purple-700 transition-colors"
                      
                      >
                    Make Moderator

                      </button>
            
                    </td>
                    <td className="p-4 text-center">
                      <button onClick={()=>handleAdmin(person?.email)}
                        className="text-blue-500 hover:text-blue-700 transition-colors"
                      
                      >
                       Make Admin
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
