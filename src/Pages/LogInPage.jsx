import { useForm } from "react-hook-form"
import { IoMdLogIn } from "react-icons/io"
import { Link, useLocation, useNavigate } from "react-router"
import Divider from "../ShareComponents/Divider"
import { BackgroundBeams } from "../Components/ui/BackgroundBeams"
import GoogleSignIn from "@/ShareComponents/GoogleSignIn"
import useAuth from "@/Hooks/useAuth"
import { useState } from "react"
import { Helmet } from "react-helmet"
import { Meteors } from "@/Components/ui/Meteor"



export default function LogInPage() {
  const navigate = useNavigate();
  const location = useLocation();
  const [error,setError] = useState('')
  const {userLogIn} = useAuth();
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm()
   const onSubmit = (data) =>{  
        userLogIn(data.email,data.password)
        .then(res=>{
          if(location.state?.from){
          navigate(location.state.from)
        }else{
          navigate('/')
        }
        }).catch(err =>{
      setError(err)
    })
  }
  return (
    
 
       <div className="mainContainer flex items-center justify-center">
         <Helmet>
        <title>Spark Vault || Log In Page</title>
    </Helmet>
          <div className="relative z-10 lg:w-[40%] mx-auto glassy-bg shadow-lg p-10 my-20 text-white">
            
            <div>
              <h2 className="text-4xl font-semibold text-white">Welcome <span className="color-text">Back!</span></h2>
              <p className="mt-3 mb-20 text-lg ">Log in to your account to continue exploring.</p>
            </div>
            <div>
              <GoogleSignIn></GoogleSignIn>
            </div>
      
            <Divider text={'Or login with email'}></Divider>
          <form onSubmit={handleSubmit(onSubmit)}>
             <label className=" w-full ">
            <div className="label">
           <span className="label-text text-lg font-medium">Email Address</span>
           </div>
           <input type="text" {...register("email",{ required: true })} name="email" placeholder="Enter Your Email Address" className="input-field mb-8" />
           {errors.email && <span className=" text-red-500 mt-1 inline-block">Enter Your email</span>}
          </label>
           <label htmlFor="" className="">
            <span className="label-text text-lg font-medium">Password</span>
            <input type="password" {...register("password",{ required: true })} name="password" placeholder="Enter Your Password" className="input-field" />
            {errors.password && <span className=" text-red-500 mt-1 inline-block">Enter Your Password</span>}
           </label>
          
           <button className="btn-Style btn-grad btn-grad:hover mt-5">Log In <IoMdLogIn className="text-white text-2xl"/></button>
           <div>
          {
            error && <p className="text-red-500 mt-2">Please check your credentials and try again.</p>
          }
          </div>
          </form>
           <p className="mt-5">First time on <span className="color-text"> SparkVault </span> ? Let's get you started!    <Link to='/signUp' className="color-text"> Sign Up </Link></p>
    
          </div>
       </div>
  

  
  )
}
