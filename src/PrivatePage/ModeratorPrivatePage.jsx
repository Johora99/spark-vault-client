import Loading from "@/Components/Loading/Loading";
import useAuth from "@/Hooks/useAuth";
import useModerator from "@/Hooks/useModerator";
import { Navigate, useLocation } from "react-router";


export default function ModeratorPrivatePage({children}) {
  const {user,loading} = useAuth();
  const {isModerator,isPending} = useModerator();
  if(loading || isPending){
    return <Loading></Loading>
  }
  if(user && isModerator){
    return children
  }
        
        return (
          <div>
          <Navigate to="/logIn"></Navigate>
       </div>
     )
    }

