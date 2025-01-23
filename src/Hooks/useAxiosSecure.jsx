import axios from "axios"
import { useNavigate } from "react-router";
import useAuth from "./useAuth";




const axiosSecure = axios.create({
  baseURL:`${import.meta.env.VITE_API}`
})
export default function useAxiosSecure() {
  const navigate = useNavigate();
  const {signOutUser} = useAuth()
  axiosSecure.interceptors.request.use(function (config) {
    const token = localStorage.getItem('token')
    config.headers.authorization = `Bearer ${token}`
    return config;
  }, function (error) {
    return Promise.reject(error);
  });

   axiosSecure.interceptors.response.use(
  function (response) {
    return response;
  },async (error) => {
    const status = error.response?.status;
    if (status === 401 || status === 403) {
       signOutUser();
      navigate('/logIn',{replace : true})
  
    }
    return Promise.reject(error);
  }
);





  return axiosSecure;
  
  
}
