import Loading from "@/Components/Loading/Loading";
import useAuth from "@/Hooks/useAuth";
import { Navigate } from "react-router";


export default function ModeratorPrivatePage() {
const { user,loading} = useAuth; 
  if(loading){
        return <Loading></Loading>
       }
 if(user && user?.role === 'moderator'){
       return children;
      }else{
        
        return (
          <div>
          <Navigate state={{from:location.pathname}} to="/logIn"></Navigate>
       </div>
     )
    }
}
