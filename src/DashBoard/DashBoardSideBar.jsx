import { NavLink } from "react-router";
import { IoHome } from "react-icons/io5";
import { FaUtensils } from "react-icons/fa";
import { AiFillProduct } from "react-icons/ai";
import useOneUser from "@/Hooks/useOneUser";
export default function DashBoardSideBar() {
  const {userData} = useOneUser();
  console.log(userData.role)
  return (
    <div>
      <div className="p-10">
          <div>
            <h3 className="text-3xl font-bold text-white" style={{textShadow: '8px 5px 2px rgba(97,67,133,0.6)' }}>
              <span className="color-text">Spark</span>Vault
            </h3>
          </div>
          <div>
             <ul className='mt-10 *:text-white *:text-lg *:font-medium'>
          <li className="flex items-center gap-2">
            <IoHome />
            <NavLink>My Profile</NavLink>
          </li>
          <li className="my-3 flex items-center gap-2">
            <FaUtensils className='text-xl'/>
            <NavLink>Add Product</NavLink>
          </li>
          <li className="flex items-center gap-2">
            <AiFillProduct />
            <NavLink>My Products</NavLink>
          </li>
        </ul>
          </div>
      </div>
    </div>
  )
}
