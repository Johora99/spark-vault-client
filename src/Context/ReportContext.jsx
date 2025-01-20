import useAuth from "@/Hooks/useAuth";
import useAxiosSecure from "@/Hooks/useAxiosSecure";
import { useQuery } from "@tanstack/react-query";
import React, { createContext, useContext, useEffect, useState } from "react";
import { toast } from "react-toastify";



const ReportContext = createContext();

export const ReportProvider = ({ children}) => {
  const axiosSecure = useAxiosSecure();
  const {user} = useAuth();
  const [isReport, setIsReport] = useState();

  // Fetch user-specific likes

   const {data : reports = [],refetch} = useQuery({
    queryKey : ['reports',user?.email],
    queryFn : async ()=>{
      const {data} = await axiosSecure.get(`/report?email=${user.email}`);
      return data;
    }
   })

    const checkIsReport = (id) => {
  if (reports.length > 0) {
    const filter = reports.find((item) => item._id === id);
    setIsReport(filter?.report)
  }
  };


  const handleReport = async (productId) => {
    const reportData = {
      report_by: user?.email,
      productId,
      report: true,
    };

    setIsReport(!isReport); // Optimistic UI update
    try {
    const {data} = await axiosSecure.post(`/report`, reportData);
    console.log(data.message)
    toast.success(data?.message);
    refetch(); // Refetch to ensure data is in sync with the backend
    } catch (error) {
      console.error("Error posting report:", error);
    }
  }
     return (
    <ReportContext.Provider
      value={{
        reports,
        isReport,
        checkIsReport,
        handleReport,
      }}
    >
      {children}
    </ReportContext.Provider>
  );

};

// Custom hook for using the LikeContext
export const useReport = () => {
  return useContext(ReportContext);
};
