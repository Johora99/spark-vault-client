import Loading from "@/Components/Loading/Loading";
import useAuth from "@/Hooks/useAuth";
import { Navigate, useLocation } from "react-router";


export default function UserPrivatePage({children}) {
  const {user,loading} = useAuth();
     const location = useLocation();
     if(loading){
      return <Loading></Loading>
     }
     if(user){
       return children;
      }else{
        
        return (
          <div>
          <Navigate state={{from:location.pathname}} to="/logIn"></Navigate>
       </div>
     )
    }
}
