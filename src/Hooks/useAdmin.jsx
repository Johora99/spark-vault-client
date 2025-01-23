import { useQuery } from "@tanstack/react-query";
import useAuth from "./useAuth";
import useAxiosSecure from "./useAxiosSecure"

export default function useAdmin() {
  const axiosSecure = useAxiosSecure();
  const {user} = useAuth();
  const {data : isAdmin,isPending} = useQuery({
     queryKey : [user?.email,'isAdmin'],
    queryFn : async ()=>{
      const {data} = await axiosSecure.get(`/user/admin/${user?.email}`);
      return data?.admin;
    }
  })
  return {isAdmin,isPending}
}
