import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "./useAxiosSecure";
import useAuth from "./useAuth";



export default function useOneUser() {
  const axiosSecure = useAxiosSecure();
  const {user} = useAuth();
  const {data : userData = [],isLoading,refetch} = useQuery({
    queryKey : ['user',user?.email],
    queryFn : async ()=>{
    const {data} = await axiosSecure.get(`/user/byEmail/${user?.email}`);
    return data;
    }
  })
  return {userData,isLoading,refetch}
    
  
}