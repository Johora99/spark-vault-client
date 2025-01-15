import { Outlet} from "react-router";
import Navbar from "../ShareComponents/Navbar";
import Footer from "../ShareComponents/Footer";


export default function MainLayOut() {

  return (
    <div className="inter bg-black">
   <Navbar></Navbar>
      <Outlet></Outlet>
       <Footer></Footer>
    </div>
  )
}
