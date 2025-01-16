import { useForm } from "react-hook-form"
import google from '../assets/google.png'
import { IoMdLogIn } from "react-icons/io"

import { Link } from "react-router"
import Divider from "../ShareComponents/Divider"
import { BackgroundBeams } from "../Components/ui/BackgroundBeams"

export default function LogInPage() {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm()
   const onSubmit = (data) =>{  

    console.log(data)
  }
  return (
    <BackgroundBeams>
       <div className="mainContainer flex items-center justify-center">
          <div className="relative z-10 lg:w-[40%] mx-auto glassy-bg shadow-lg p-10 my-10 text-white">
            <div>
              <h2 className="text-4xl font-semibold text-white">Welcome <span className="color-text">Back!</span></h2>
              <p className="mt-3 mb-20 text-lg ">Log in to your account to continue exploring.</p>
            </div>
            <div>
              <button className="flex items-center gap-2 border-[1px] border-appleGreen py-1 px-5 rounded-lg"><img src={google} alt="" className="w-10"/> Log In With Google</button>
            </div>
      
            <Divider text={'Or login with email'}></Divider>
          <form onSubmit={handleSubmit(onSubmit)}>
             <label className=" w-full ">
            <div className="label">
           <span className="label-text text-lg font-medium">Email Address</span>
           </div>
           <input type="text" placeholder="Enter Your Email Address" className="input-field mb-8" />
          </label>
           <label htmlFor="" className="">
            <span className="label-text text-lg font-medium">Password</span>
            <input type="text" placeholder="Enter Your Password" className="input-field" />
           </label>
          
           <button className="btn-Style btn-grad btn-grad:hover mt-5">Log In <IoMdLogIn className="text-white text-2xl"/></button>
          </form>
           <p className="mt-5">First time on <span className="color-text"> SparkVault </span> ? Let's get you started!    <Link to='/signUp' className="color-text"> Sign Up </Link></p>
        
          </div>
       </div>

    </BackgroundBeams>
  )
}
