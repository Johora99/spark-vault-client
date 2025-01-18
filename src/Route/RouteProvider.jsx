import { Route, Routes } from "react-router";
import MainLayOut from "../LayOut/MainLayOut";
import HomePage from "../Pages/HomePage";
import LogInPage from "../Pages/LogInPage";
import SignUpPage from "@/Pages/SignUpPage";
import AllProductsPage from "@/Pages/AllProductsPage";
import ProductsDetailsPage from "@/Pages/ProductsDetailsPage";
import UserPrivatePage from "@/PrivatePage/UserPrivatePage";
import DashBoard from "@/LayOut/DashBoard";
import UserProfile from "@/DashBoard/UserDashBoard/UserProfile";




export default function RouteProvider() {
  return <>
     <Routes>
        <Route path="/" element={<MainLayOut></MainLayOut>}>
            <Route index element={<HomePage></HomePage>}></Route>
            <Route path="/logIn" element={<LogInPage></LogInPage>}></Route>
            <Route path="/signUp" element={<SignUpPage></SignUpPage>}></Route>
            <Route path="/allProducts" element={<AllProductsPage></AllProductsPage>}></Route>
            <Route path="/product/:id" element={<UserPrivatePage><ProductsDetailsPage></ProductsDetailsPage></UserPrivatePage>}></Route>
        </Route>
        <Route path="/dashBoard" element={<DashBoard></DashBoard>}>
          <Route index element={<UserProfile></UserProfile>}></Route>
        </Route>
     </Routes>
  </>
}

