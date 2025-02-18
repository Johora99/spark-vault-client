import { Link, NavLink } from "react-router";
import { IoHome } from "react-icons/io5";
import { FaUtensils } from "react-icons/fa";
import { AiFillProduct } from "react-icons/ai";
import useOneUser from "@/Hooks/useOneUser";
import useAdmin from "@/Hooks/useAdmin";
import useModerator from "@/Hooks/useModerator";
import { FaArrowLeftLong } from "react-icons/fa6";
export default function DashBoardSideBar() {
  const {userData} = useOneUser();
    const {isAdmin} = useAdmin();
    const {isModerator} = useModerator();
  
  return (
    <div>
      <div className="p-10">
        <div>
          <Link to='/'><FaArrowLeftLong className="text-2xl text-appleGreen mb-5"/></Link>
        </div>
          <div>
            <h3 className="text-3xl font-bold text-white" style={{textShadow: '8px 5px 2px rgba(97,67,133,0.6)' }}>
              <span className="color-text">Spark</span>Vault
            </h3>
          </div>
          <div>
          {
      userData?.role === 'user' && 
    <ul className='mt-10 *:text-white *:text-lg *:font-medium'>
    
      <li className="flex items-center gap-2">
        <IoHome />
        <NavLink to='/dashBoard/userProfile'>My Profile</NavLink>
      </li>
      <li className="my-3 flex items-center gap-2">
        <FaUtensils className='text-xl'/>
        <NavLink to='/dashBoard/addProduct'>Add Product</NavLink>
      </li>
      <li className="flex items-center gap-2">
        <AiFillProduct />
        <NavLink to='/dashBoard/myAddedProduct'>My Products</NavLink>
      </li>
    </ul>
  
}
  { isAdmin && 
    <ul className='mt-10 *:text-white *:text-lg *:font-medium'>
      <li className="flex items-center gap-2 mb-3">
        <IoHome />
        <NavLink to='/dashBoard/adminProfile'>
          Admin Profile
        </NavLink>
      </li>
      <li className="flex items-center gap-2">
        <IoHome />
        <NavLink to='/dashBoard/statistic'>Statistics Page</NavLink>
      </li>
      <li className="my-3 flex items-center gap-2">
        <FaUtensils className='text-xl'/>
        <NavLink to='/dashBoard/manageUser'>Manage Users</NavLink>
      </li>
      <li className="flex items-center gap-2">
        <AiFillProduct />
        <NavLink to='/dashBoard/manageCoupon'>Manage Coupons</NavLink>
      </li>
    
    </ul>
  
} 
{isModerator && 
    <ul className='mt-10 *:text-white *:text-lg *:font-medium'>
      <li className="flex items-center gap-2">
        <IoHome />
        <NavLink to='/dashBoard/manageProduct'>Product Review Queue</NavLink>
      </li>
      <li className="my-3 flex items-center gap-2">
        <FaUtensils className='text-xl'/>
        <NavLink to='/dashBoard/reportedProduct'>Reported Contents</NavLink>
      </li>

    </ul>
  
}

            
          </div>
      </div>
    </div>
  )
}
