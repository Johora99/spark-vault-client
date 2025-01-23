import { Navigate, useLocation } from "react-router-dom"; // Import useLocation
import Loading from "@/Components/Loading/Loading";
import useAuth from "@/Hooks/useAuth";
import useAdmin from "@/Hooks/useAdmin";

export default function AdminPrivatePage({ children }) {
    const {user,loading, signOutUser} = useAuth();
  const {isAdmin,isPending} = useAdmin();
  if(loading || isPending){
    return <Loading></Loading>
  }
  if(user && isAdmin){
    return children
  }
  else{
     signOutUser(); 
    return (
      <div>
        <Navigate to="/logIn"></Navigate>
      </div>
    )
  }
}
