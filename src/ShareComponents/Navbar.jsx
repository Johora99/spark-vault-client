
import userImg from "../assets/user.png";
import { IoMdLogIn } from "react-icons/io";
import { useState } from "react";
import { Link } from "react-router";
import useAuth from "@/Hooks/useAuth";

export default function Navbar() {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const {user,signOutUser} = useAuth();
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
          <div>
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
            <div className="mr-5">
              {
                user ? '' : <Link to="/logIn">
                <button className="btn-Style btn-grad btn-grad:hover flex items-center gap-2">
                  Login <IoMdLogIn className="text-white text-2xl" />
                </button>
              </Link>
              }
              
            </div>

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
                  onClick={closeDropdown} // Optional: Close when clicked inside
                >
                  <li>
                    <Link className="justify-between">{user?.displayName}</Link>
                  </li>
                  <li>
                    <Link to='/dashBoard'>
                      Dashboard
                    </Link>
                  </li>
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
