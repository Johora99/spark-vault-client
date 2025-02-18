import { createUserWithEmailAndPassword, onAuthStateChanged, sendPasswordResetEmail, signInWithEmailAndPassword, signInWithPopup, signOut, updateProfile } from "firebase/auth";
import { useEffect, useState } from "react";
import { GoogleAuthProvider } from "firebase/auth";
import AuthContext from "../Context/AuthContext";
import auth from "../Firebase/firebase.init";
import UseAxiosPublic from "../Hooks/useAxiosPublic";

export default function AuthProvider({children}) {
  const axiosPublic = UseAxiosPublic();
  const provider = new GoogleAuthProvider();
  const [user,setUser] = useState(null);
  const [loading,setLoading] = useState(true);
  // user creat by using firebase ============================
   const creatUser = (email,password)=>{
    setLoading(true)
    return createUserWithEmailAndPassword(auth,email,password);
   }
  //  user login by using firebase ============================
  const userLogIn = (email,password)=>{
    setLoading(true);
    return signInWithEmailAndPassword(auth,email,password);
  }
  // set current user =================================
  useEffect(()=>{
    const unsubscribe = onAuthStateChanged(auth, currentUser =>{
      setUser(currentUser);
      if(currentUser){
        const userInfo = {email : currentUser.email};
         axiosPublic.post('/jwt',userInfo)
         .then(res =>{
          if(res.data.token){
            localStorage.setItem('token',res.data.token)
            setLoading(false)
          }
         })
      }else{
         localStorage.removeItem('token')
           setLoading(false)
      }
      setLoading(false)
    })
    return ()=> unsubscribe();
  },[axiosPublic])
//  update profile ===========================
const userUpdateProfile = (name,photoURL)=>{
  return updateProfile(auth.currentUser,{
    displayName:name,photoURL:photoURL
  })
}
// handle sign out by firebase =========================
const signOutUser = ()=>{
  setLoading(true)
 signOut(auth)
 .then(res =>{
  
 })
 .catch(err =>{
  console.log(err)
 })
  
}
// google sign in by using firebase =====================
const googleSignIn = ()=>{
  setLoading(true);
  return signInWithPopup(auth,provider);
}
// reset password ================================
const resetPassword = (email)=>{
   return sendPasswordResetEmail(auth,email);
}
  const authInfo = {
   creatUser,
   userLogIn,
   user,
   signOutUser,
   googleSignIn,
   userUpdateProfile,
   resetPassword,
   loading
  }
  return (
    <AuthContext.Provider value={authInfo}>
      {children}
    </AuthContext.Provider>
  )
}

