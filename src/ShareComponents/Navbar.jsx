
import userImg from "../assets/user.png";
import { IoMdLogIn } from "react-icons/io";
import { useState } from "react";
import { Link } from "react-router";

export default function Navbar() {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  // Function to toggle dropdown visibility
  const toggleDropdown = () => {
    setIsDropdownOpen((prev) => !prev);
  };

  // Close dropdown when clicked outside (optional enhancement)
  const closeDropdown = () => {
    setIsDropdownOpen(false);
  };

  return (
    <div className="w-full sticky top-0 z-50 backdrop-blur-2xl shadow-lg py-3">
      <div className="mainContainer">
        <div className="navbar flex items-center justify-between">
          {/* Brand Section */}
          <div>
            <h3 className="text-3xl font-bold text-white">
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
                <Link to="/products">Products</Link>
              </li>
            </ul>
          </div>

          {/* Right Section */}
          <div className="flex items-center">
            {/* Login Button */}
            <div className="mr-5">
              <Link to="/logIn">
                <button className="btn-Style btn-grad btn-grad:hover flex items-center gap-2">
                  Login <IoMdLogIn className="text-white text-2xl" />
                </button>
              </Link>
            </div>

            {/* User Avatar with Dropdown */}
            <div className="relative">
              <button
                onClick={toggleDropdown}
                className="btn btn-ghost btn-circle avatar"
              >
                <div className="w-12 rounded-full">
                  <img src={userImg} alt="User Avatar" />
                </div>
              </button>

              {isDropdownOpen && (
                <ul
                  className="absolute right-0 mt-3 w-52 bg-appleGreen text-white  rounded-lg z-[1] shadow p-3"
                  role="menu"
                  onClick={closeDropdown} // Optional: Close when clicked inside
                >
                  <li>
                    <a className="justify-between">Profile</a>
                  </li>
                  <li>
                    <a>Settings</a>
                  </li>
                  <li>
                    <a>Logout</a>
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
