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
import AddProduct from "@/DashBoard/UserDashBoard/AddProduct";
import MyAddedProducts from "@/DashBoard/UserDashBoard/MyAddedProducts";
import UpdatePage from "@/DashBoard/UserDashBoard/UpdatePage";
import ManageUser from "@/DashBoard/AdminDashBoard/ManageUser";
import ManageProduct from "@/DashBoard/ModeratorDashBoard/ManageProduct";
import ReportedProduct from "@/DashBoard/ModeratorDashBoard/ReportedProduct";
import ErrorPage from "@/Pages/ErrorPage";
import StatisticPage from "@/DashBoard/AdminDashBoard/StatisticPage";
import ManageCoupon from "@/DashBoard/AdminDashBoard/ManageCoupon";
import AdminPrivatePage from "@/PrivatePage/AdminPrivatePage";
import ModeratorPrivatePage from "@/PrivatePage/ModeratorPrivatePage";
import AdminProfile from "@/DashBoard/AdminDashBoard/AdminProfile";




export default function RouteProvider() {
  return <>
     <Routes>
        <Route path="*" element={<ErrorPage></ErrorPage>}></Route>
        <Route path="/" element={<MainLayOut></MainLayOut>}>
            <Route index element={<HomePage></HomePage>}></Route>
            <Route path="/logIn" element={<LogInPage></LogInPage>}></Route>
            <Route path="/signUp" element={<SignUpPage></SignUpPage>}></Route>
            <Route path="/allProducts" element={<AllProductsPage></AllProductsPage>}></Route>
            <Route path="/product/:id" element={<UserPrivatePage><ProductsDetailsPage></ProductsDetailsPage></UserPrivatePage>}></Route>
        </Route>
        <Route path="/dashBoard" element={<UserPrivatePage><DashBoard></DashBoard></UserPrivatePage>}>
          <Route  path="/dashBoard/userProfile" element={<UserPrivatePage><UserProfile></UserProfile></UserPrivatePage>}></Route>
          <Route path="/dashBoard/addProduct" element={<UserPrivatePage><AddProduct></AddProduct></UserPrivatePage>}></Route>
          <Route path="/dashBoard/myAddedProduct" element={<UserPrivatePage><MyAddedProducts></MyAddedProducts></UserPrivatePage>}></Route>
          <Route path="/dashBoard/update/:id" element={<UserPrivatePage><UpdatePage></UpdatePage></UserPrivatePage>}></Route>
          
          <Route path="/dashBoard/manageUser" element={<AdminPrivatePage><ManageUser></ManageUser></AdminPrivatePage>}></Route>
          <Route path="/dashBoard/manageProduct" element={<ModeratorPrivatePage><ManageProduct></ManageProduct></ModeratorPrivatePage>}></Route>
          <Route path="/dashBoard/reportedProduct" element={<ModeratorPrivatePage><ReportedProduct></ReportedProduct></ModeratorPrivatePage>}></Route>
          <Route path="/dashBoard/statistic" element={<AdminPrivatePage><StatisticPage></StatisticPage></AdminPrivatePage>}></Route>
          <Route path="/dashBoard/manageCoupon" element={<AdminPrivatePage><ManageCoupon></ManageCoupon></AdminPrivatePage>}></Route>
          <Route path="/dashBoard/adminProfile" element={<AdminPrivatePage><AdminProfile></AdminProfile></AdminPrivatePage>}></Route>
        </Route>
     </Routes>
  </>
}

