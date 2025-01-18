import useAuth from "@/Hooks/useAuth";

import google from '../assets/google.png'
import { useLocation, useNavigate } from "react-router";
import useAxiosPublic from "@/Hooks/useAxiosPublic";



export default function GoogleSignIn() {
  const axiosPublic = useAxiosPublic();
  const navigator = useNavigate();
  const location = useLocation();
  const {googleSignIn} = useAuth();
  const handleGoogleSignIn = ()=>{
    googleSignIn()
    .then((res) =>{
        const userInfo = {
              name : res.user?.displayName,
              email : res.user?.email,
              image : res.user?.photoURL,
              role : 'user',
              Status: 'unverified',
                }
         axiosPublic.post('/user',userInfo)
        .then(res=>{
        console.log(res.data)
    
      })
      if(location.state?.from){
            navigator(location.state.from)
          }else{
            navigator('/')
          }
    })
    .catch(err =>{
      console.log(err)
    })
  }
  return (
    <div>
        <button onClick={handleGoogleSignIn} className="flex items-center gap-2 border-[1px] border-appleGreen py-1 px-5 rounded-lg mt-5"><img src={google} alt="" className="w-10"/> Sign Up With Google</button>
    </div>
  )
}
