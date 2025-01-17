import { Outlet} from "react-router";
import Navbar from "../ShareComponents/Navbar";
import Footer from "../ShareComponents/Footer";
import DotPattern from "@/Components/ui/dot-pattern";
import { cn } from "@/utils/cn";
import { BackgroundBeams } from "@/Components/ui/BackgroundBeams";


export default function MainLayOut() {

  return (
    
      <div className="inter bg-black">
   <Navbar></Navbar>
      <Outlet></Outlet>
       <Footer></Footer>
       <DotPattern
        width={20}
        height={20}
        cx={1}
        cy={1}
        cr={1}
        className={cn(
          "[mask-image:linear-gradient(to_bottom_right,white,transparent,transparent)] ",
        )}
      />
      
    </div>
  
  )
}
