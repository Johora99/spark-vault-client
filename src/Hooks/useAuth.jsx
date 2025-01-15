import { useContext } from "react";
import AuthContext from "../Context/AuthContext";

export default function useAuth() {
 const authContext = useContext(AuthContext);
 return authContext;
}