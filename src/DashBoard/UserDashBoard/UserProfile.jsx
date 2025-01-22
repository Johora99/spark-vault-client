import { Meteors } from "@/Components/ui/Meteor";
import useAuth from "@/Hooks/useAuth";
import useOneUser from "@/Hooks/useOneUser";
import PayMentModal from "./PayMentModal";
import { useState } from "react";

const UserProfile = () => {
  const { userData } = useOneUser();
  const { user } = useAuth();
  const [isModalOpen, setIsModalOpen] = useState(false);



  const openModal = () => {
  const modal = document.getElementById("payMent");
  if (modal) {
    modal.showModal(); // Open the modal
    setIsModalOpen(true);
  }
};

   const closeModal = () => {
    console.log('close')
  const modal = document.getElementById('payMent');
  setIsModalOpen(false);
  if (modal) {
    modal.close();
  }
};

  return (
    <div className="w-full min-h-screen bg-gray-900 flex items-center justify-center relative">
      {/* Top Decorative Shape */}
      <div
        className="absolute top-0 left-0 w-full h-72 bg-gradient-to-r from-purple-900/30 via-blue-800/30 to-purple-900/30"
        style={{
          clipPath: "polygon(0 0, 100% 0, 100% 70%, 0 100%)",
        }}
      ></div>
      {/* User Card */}
      <div className="relative block overflow-hidden rounded-lg border border-appleGreen bg-gradient-to-r from-gray-800 to-gray-900 p-6 shadow-lg transition duration-300 hover:scale-105 hover:shadow-xl glassy-bg">
       {/* Decorative Clip-Path Overlay */}
      <div className="absolute inset-0 bg-gradient-to-r from-purple-600 via-transparent to-gray-900 opacity-20 clip-path-triangle z-[-1]"></div>
        {/* Header Section with Avatar */}
        <div className="relative">
          <div className=" inset-x-0 -bottom-12 flex justify-center">
            <img
              src={user?.photoURL}
              alt="User Avatar"
              className="w-24 h-24 rounded-full border-4 border-gray-800 shadow-lg object-cover"
            />
          </div>
        </div>

        {/* User Info */}
        <div className=" mt-5 text-center px-6">
          <h1 className="text-2xl font-bold text-white">
            {user?.displayName || "Guest User"}
          </h1>
          <p className="text-gray-400">{user?.email || "No Email Provided"}</p>
        </div>

        {/* Membership Section */}
        <div className="mt-8 px-6">
          {userData?.status === 'unverified' && (
            <div className="text-center">
              <button onClick={openModal} className="w-full text-white py-3 px-6 rounded-md shadow-md font-medium btn-grad transition-all duration-300">
                Subscribe to Membership
              </button>
              <p className="text-sm text-gray-400 mt-2">
                Unlock exclusive benefits and features.
              </p>
            </div>
          ) }
        </div>

        {/* Membership Benefits */}
        {userData?.status === 'verified' && (
          <div className="mt-8 px-6 text-center">
          <h3
  className="text-lg font-bold text-center px-6 py-3 mb-4 bg-gradient-to-r from-emerald-500 to-teal-500 text-white border-2 border-teal-300 shadow-lg neon-glow relative"
  style={{
    clipPath: "polygon(10% 0%, 90% 0%, 100% 50%, 90% 100%, 10% 100%, 0% 50%)",
  }}
>
  Status: Verified ✅
</h3>

          </div>
        )}

          <Meteors number={30} className="custom-meteor-class" />
      </div>
       <div>
        <PayMentModal closeModal={closeModal}></PayMentModal>
       </div>
      {/* Bottom Decorative Shape */}
      <div
        className="absolute bottom-0 right-0 w-full h-64 bg-gradient-to-r from-purple-900/30 via-blue-800/30 to-purple-900/30"
        style={{
          clipPath: "polygon(0 30%, 100% 0, 100% 100%, 0 100%)",
        }}
      ></div>
      
    </div>
  );
};

export default UserProfile;
