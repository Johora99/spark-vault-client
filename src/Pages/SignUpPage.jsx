import { useForm } from "react-hook-form"

import { IoMdLogIn } from "react-icons/io"
import Divider from "../ShareComponents/Divider"
import { BackgroundBeams } from "../Components/ui/BackgroundBeams"
import { Link, useNavigate } from "react-router"
import useAuth from "../Hooks/useAuth"
import { imageData } from "@/api/utilities/imagebb"
import GoogleSignIn from "@/ShareComponents/GoogleSignIn"
import useAxiosPublic from "@/Hooks/useAxiosPublic"
import { Helmet } from "react-helmet"


export default function SignUpPage() {
  const {register,handleSubmit,watch,formState: { errors },reset} = useForm();
  const {creatUser,userUpdateProfile} = useAuth();
  const navigate = useNavigate();
  const axiosPublic = useAxiosPublic();
     const onSubmit = async (data) =>{  
      const name = data.name;
        const image = data.file[0]
        const photoURL = await imageData(image);
        creatUser(data.email,data.password)
      .then(async(res)=>{
        const userInfo = {
              name : data.name,
              email : data.email,
              image : photoURL,
              role : 'user',
              status: 'unverified',
                }
      await userUpdateProfile(name,photoURL)
      await axiosPublic.post('/user',userInfo)
      .then(res=>{
        console.log(res.data)
        navigate('/');
        reset();
      })
        
      }).catch(err=>{
        console.log(err)
      })
    
    
    }
  return (
  
    
        <div className="w-full">
           <Helmet>
        <title>Spark Vault || Sign Up Page</title>
    </Helmet>
           <div className="mainContainer flex items-center justify-center">
              <div className="lg:w-[40%] mx-auto glassy-bg shadow-lg p-10 my-20 text-white">
                <div>
                  <h2 className="text-4xl font-semibold text-white">Welcome <span className="color-text">Back!</span></h2>
                  <p className="mt-3 mb-20 text-lg ">Log in to your account to continue exploring.</p>
                </div>
                <div>
                 <GoogleSignIn></GoogleSignIn>
                </div>
                <Divider text={'Or create account with email'}></Divider>
              <form onSubmit={handleSubmit(onSubmit)}>
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
                   <label className="form-control w-full ">
                <div className="label">
               <span className="label-text text-lg font-medium">Name</span>
               </div>
               <input type="text" {...register("name",{ required: true,maxLength: 20 })} name="name" placeholder="Enter Your Name" className="input-field" />
               {errors.name && errors.name.type === 'required' && <span className=" text-red-500 mt-1 inline-block">Enter Your name</span>}
          {
        errors.name && errors.name.type === 'maxLength' && <span className=" text-red-500 mt-1 inline-block">Name should be a maximum of 20 characters</span>
          }
              </label>
               <label htmlFor="">
                <span className="label-text text-lg font-medium">Email Address</span>
                <input type="email" {...register("email",{ required: true })} name="email" placeholder="Enter Your Email Address" className="input-field" />
                {errors.email && <span className=" text-red-500 mt-1 inline-block">Enter Your email</span>}
               </label>
                </div>
               <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
                <label htmlFor="" className="mt-8">
                <span className="label-text text-lg font-medium">Password</span>
                <input type="password" {...register("password",{required:true,minLength :{
        value:8,
        message:"Password must be at least 8 characters",
      },pattern:{
        value: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*\W).+$/,
        message :"Password must contain at least one uppercase letter, one lowercase letter, one number, and one special character",
      }})} name="password" placeholder="Enter Your Password" className="input-field" />
      {
        errors.password && <p className=" text-red-500 my-2 w-full inline-block">{errors.password.message}</p>
      }
               </label>
                <label htmlFor="" className="mt-8">
                  <span className="label-text text-lg font-medium">Upload Image</span>
              <input 
             type="file" {...register("file",{ required: true })} name="file"
             className="mb-5 w-full text-sm text-gray-500 file:mr-5  file:border-0 file:text-appleGreen file:bg-transparent file:cursor-pointer file:transition-all  rounded-lg focus:outline-none focus:ring-2 focus:ring-appleGreen focus:border-appleGreen input-field"
               />
                
               {errors.email && <span className=" text-red-500 mt-1 inline-block"> Upload Your Image</span>}
           </label>
               </div>
               <button className="btn-Style btn-grad btn-grad:hover">Sign Up<IoMdLogIn className="text-white text-2xl"/></button>
        </form>
        <p className="font-medium mt-5">Already have an account! <Link to='/logIn' className="color-text"> Log In </Link></p>
        
              </div>
           </div>
        </div>
  
      
  )
}
