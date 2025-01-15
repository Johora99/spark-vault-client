import { Route, Routes } from "react-router";
import MainLayOut from "../LayOut/MainLayOut";
import HomePage from "../Pages/HomePage";
import LogInPage from "../Pages/LogInPage";
import SignUpPage from "@/Pages/SignUpPage";




export default function RouteProvider() {
  return <>
     <Routes>
        <Route path="/" element={<MainLayOut></MainLayOut>}>
            <Route index element={<HomePage></HomePage>}></Route>
            <Route path="/logIn" element={<LogInPage></LogInPage>}></Route>
            <Route path="/signUp" element={<SignUpPage></SignUpPage>}></Route>
        </Route>
     </Routes>
  </>
}

