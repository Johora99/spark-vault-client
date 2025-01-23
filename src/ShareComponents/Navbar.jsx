
import userImg from "../assets/user.png";
import { IoMdLogIn } from "react-icons/io";
import { useState } from "react";
import { Link } from "react-router";
import useAuth from "@/Hooks/useAuth";
import { HiMenuAlt3, HiX } from "react-icons/hi";
import useAdmin from "@/Hooks/useAdmin";
import useModerator from "@/Hooks/useModerator";      
export default function Navbar() {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const {user,signOutUser} = useAuth();
    const {isAdmin} = useAdmin();
  const {isModerator} = useModerator();

  // Function to toggle dropdown visibility
  const toggleDropdown = () => {
    setIsDropdownOpen((prev) => !prev);
  };
  // Close dropdown when clicked outside (optional enhancement)
  const closeDropdown = () => {
    setIsDropdownOpen(false);
  };
   const handleSignOut = ()=>{
    signOutUser();
   }
   const toggleMenu = () => {
    setIsMenuOpen((prev) => !prev);
  };
  return (
    <div className="w-full sticky top-0 z-50 backdrop-blur-2xl shadow-lg py-3">
      <div className="mainContainer">
        <div className="navbar flex items-center justify-between">
          {/* Brand Section */}
          <div>
            <h3 className="text-3xl font-bold text-white" style={{textShadow: '8px 5px 2px rgba(97,67,133,0.6)' }}>
              <span className="color-text">Spark</span>Vault
            </h3>
          </div>

          {/* Navigation Links */}
          <div className="hidden lg:block">
            <ul className="flex items-center gap-5 text-xl font-medium *:text-white">
              <li>
                <Link to="/">Home</Link>
              </li>
              <li>
                <Link to="/allProducts">Products</Link>
              </li>
            </ul>
          </div>

          {/* Right Section */}
          <div className="flex items-center">
            {/* Login Button */}
            <div className="mr-5 hidden lg:block">
              {
                user ? '' : <>
                <div className="flex items-center gap-5">
                   <Link to="/logIn">
                <button className="btn-Style btn-grad btn-grad:hover flex items-center gap-2">
                  Login <IoMdLogIn className="text-white text-2xl" />
                </button>
              </Link>
                   <Link to="/signUp">
                <button className="btn-Style btn-grad btn-grad:hover flex items-center gap-2">
                  Registration <IoMdLogIn className="text-white text-2xl" />
                </button>
              </Link>
                </div>
                </>
              }
              
            </div>
             
              {/* Mobile Dropdown Menu */}
               <button
            onClick={toggleMenu}
            className="lg:hidden text-white text-3xl focus:outline-none"
          >
            {isMenuOpen ? <HiX className="text-appleGreen mr-3"/>  : <HiMenuAlt3 className="text-appleGreen mr-3"/>}
          </button>
        {isMenuOpen && (
          <div className="lg:hidden absolute top-2/3 right-5 bg-appleGreen p-5 rounded-lg mt-4 transition-all duration-300">
            <ul className="flex flex-col gap-4 text-xl font-medium text-white">
              <li>
                <Link to="/" onClick={toggleMenu}>
                  Home
                </Link>
              </li>
              <li>
                <Link to="/allProducts" onClick={toggleMenu}>
                  Products
                </Link>
              </li>
                    {
                user ? '' : <>
                <div className="flex flex-col  gap-5">
                   <Link to="/logIn">
                <button className="btn-Style btn-grad btn-grad:hover flex items-center gap-2">
                  Login <IoMdLogIn className="text-white text-2xl" />
                </button>
              </Link>
                   <Link to="/signUp">
                <button className="btn-Style btn-grad btn-grad:hover flex items-center gap-2">
                  Registration <IoMdLogIn className="text-white text-2xl" />
                </button>
              </Link>
                </div>
                </>
              }
            </ul>
          </div>
        )}



            {/* User Avatar with Dropdown */}
            <div className="relative">
              <button
                onClick={toggleDropdown}
                className="btn btn-ghost btn-circle avatar"
              >
                <div className="w-12 rounded-full">
                  {
                    user ? <img src={user?.photoURL} alt="User Avatar" className="w-12 h-12 rounded-full object-cover" referrerPolicy="no-referrer"/> :   <img src={userImg} alt="User Avatar" />
                  }
                
                </div>
              </button>
                  
              {isDropdownOpen && (
                user && 
                <ul
                  className="absolute right-0 mt-3 w-52 bg-appleGreen text-white  rounded-lg z-[1] shadow p-3"
                  role="menu"
                  onClick={closeDropdown} 
                >
                  <li>
                    <Link className="justify-between">{user?.displayName}</Link>
                  </li>
                  
                    {
                      user && !isAdmin && !isModerator && <li><Link to='/dashBoard/userProfile'>Dashboard</Link></li>
                    }
                    {
                      user && isAdmin && !isModerator && <li><Link to='/dashBoard/statistic'>Dashboard</Link></li>
                    }
                    {
                      user && !isAdmin && isModerator && <li><Link to='/dashBoard/manageProduct'>Dashboard</Link></li>
                    }
                  
                  <li>
                    <Link onClick={handleSignOut}>Logout</Link>
                  </li>
                </ul>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
