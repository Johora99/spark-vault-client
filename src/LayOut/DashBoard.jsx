import DashBoardSideBar from "@/DashBoard/DashBoardSideBar";
import { Outlet } from "react-router";


export default function DashBoard() {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-12">
      <div className="col-span-2 min-h-screen h-full glassy-bg" style={{borderRadius : '0'}}>
        <DashBoardSideBar></DashBoardSideBar>
      </div>
      <div className="col-span-10">
        <Outlet></Outlet>
      </div>
    </div>
  )
}
