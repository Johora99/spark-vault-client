
import useAxiosSecure from './useAxiosSecure';
import useAuth from './useAuth';
import { useQuery } from '@tanstack/react-query';

export default function useModerator() {
  const axiosSecure = useAxiosSecure();
  const {user} = useAuth();
  const {data : isModerator,isPending} = useQuery({
     queryKey : [user?.email,'isModerator'],
    queryFn : async ()=>{
      const {data} = await axiosSecure.get(`/user/moderator/${user?.email}`);
      return data?.moderator;
    }
  })
  return {isModerator,isPending}
}
