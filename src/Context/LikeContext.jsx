import useAuth from "@/Hooks/useAuth";
import useAxiosSecure from "@/Hooks/useAxiosSecure";
import { useQuery } from "@tanstack/react-query";
import React, { createContext, useContext, useEffect, useState } from "react";



const LikeContext = createContext();

export const LikeProvider = ({ children}) => {
  const axiosSecure = useAxiosSecure();
  const {user} = useAuth();
  const [isLiked, setIsLiked] = useState();

  // Fetch user-specific likes

   const {data : likes = [],refetch} = useQuery({
    queryKey : ['likes',user?.email],
    queryFn : async ()=>{
      const {data} = await axiosSecure.get(`/like?email=${user.email}`);
      return data;
    }
   })

    const checkIsLiked = (id) => {
  if (likes.length > 0) {
    const filter = likes.find((item) => item._id === id);
    setIsLiked(filter?.like)
  }
  };


  const handleVote = async (productId) => {
    const likeData = {
      liked_by: user?.email,
      productId,
      like: true,
    };

    setIsLiked(!isLiked); // Optimistic UI update
    try {
      await axiosSecure.post(`/like`, likeData);
    refetch(); // Refetch to ensure data is in sync with the backend
    } catch (error) {
      console.error("Error posting like:", error);
    }
  }
     return (
    <LikeContext.Provider
      value={{
        likes,
        isLiked,
        checkIsLiked,
        handleVote,
      }}
    >
      {children}
    </LikeContext.Provider>
  );

};

// Custom hook for using the LikeContext
export const useLike = () => {
  return useContext(LikeContext);
};
