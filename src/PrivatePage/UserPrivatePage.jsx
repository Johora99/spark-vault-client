import useAuth from "@/Hooks/useAuth";
import { Navigate, useLocation } from "react-router";


export default function UserPrivatePage({children}) {
  const {user,loading} = useAuth();
     const location = useLocation();
     if(loading){
      return <div className="w-full h-screen flex items-center justify-center">
                       <span className="loading loading-ring loading-xs text-TealBlueGreen"></span>
                        <span className="loading loading-ring loading-sm text-TealBlueGreen"></span>
                        <span className="loading loading-ring loading-md text-TealBlueGreen"></span>
                        <span className="loading loading-ring loading-lg text-TealBlueGreen"></span>                        
                        </div>
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
