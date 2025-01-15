import { useForm } from "react-hook-form"
import google from '../assets/google.png'
import { IoMdLogIn } from "react-icons/io"
import Divider from "../ShareComponents/Divider"
import { BackgroundBeams } from "../Components/ui/BackgroundBeams"
import { Link } from "react-router"

export default function SignUpPage() {
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
        <div className="w-full">
           <div className="mainContainer flex items-center justify-center">
              <div className="lg:w-[40%] mx-auto glassy-bg shadow-lg p-10 my-10 text-white">
                <div>
                  <h2 className="text-4xl font-semibold text-white">Welcome <span className="color-text">Back!</span></h2>
                  <p className="mt-3 mb-20 text-lg ">Log in to your account to continue exploring.</p>
                </div>
                <div>
                  <button className="flex items-center gap-2 border-[1px] border-appleGreen py-1 px-5 rounded-lg mt-5"><img src={google} alt="" className="w-10"/> Sign Up With Google</button>
                </div>
                <Divider text={'Or create account with email'}></Divider>
              <form onSubmit={handleSubmit(onSubmit)}>
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
                   <label className="form-control w-full ">
                <div className="label">
               <span className="label-text text-lg font-medium">Name</span>
               </div>
               <input type="text" placeholder="Enter Your Name" className="input-field" />
              </label>
               <label htmlFor="">
                <span className="label-text text-lg font-medium">Email Address</span>
                <input type="email" placeholder="Enter Your Email Address" className="input-field" />
               </label>
                </div>
               <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
                <label htmlFor="">
                <span className="label-text text-lg font-medium">Password</span>
                <input type="password" placeholder="Enter Your Password" className="input-field" />
               </label>
                <label htmlFor="">
                  <span className="label-text text-lg font-medium">Upload Image</span>
              <input 
             type="file" 
             className="mb-5 w-full text-sm text-gray-500 file:mr-5  file:border-0 file:text-appleGreen file:bg-transparent file:cursor-pointer file:transition-all  rounded-lg focus:outline-none focus:ring-2 focus:ring-appleGreen focus:border-appleGreen input-field"
               />
                

           </label>
               </div>
               <button className="btn-Style btn-grad btn-grad:hover">Sign Up<IoMdLogIn className="text-white text-2xl"/></button>
        </form>
        <p className="font-medium mt-5">Already have an account! <Link to='/logIn' className="color-text"> Log In </Link></p>
              </div>
           </div>
        </div>
  
      </BackgroundBeams>
  )
}
