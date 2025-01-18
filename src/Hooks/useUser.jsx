import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "./useAxiosSecure";



export default function useUser() {
  const axiosSecure = useAxiosSecure();
  const {data : user = [],isLoading,refetch} = useQuery({
    queryKey : ['user'],
    queryFn : async ()=>{
    const {data} = await axiosSecure.get('/user');
    return data;
    }
  })
  return {user,isLoading,refetch}
    
  
}