import React from 'react'

export default function SliderContent({Img,title,text}) {
  return (
      <div className="w-[300px] h-full flex flex-col items-center justify-center p-10 bg-gradient-to-b from-gray-900 via-gray-800 to-gray-700 rounded-2xl shadow-lg relative overflow-hidden group border-[1px] border-appleGreen">
    {/* Decorative Background Overlay */}
    <div className="absolute inset-0 bg-gradient-to-t from-purple-600 via-transparent to-transparent opacity-20 group-hover:opacity-40 transition-all duration-500"></div>
    
    {/* Image Container */}
    <div className="relative w-28 h-28 rounded-full overflow-hidden border-4 border-appleGreen shadow-md group-hover:scale-105 transition-transform duration-500">
      <img
        src={Img}
        alt=""
        className="w-full h-full object-cover"
      />
      {/* Floating Decorative Ring */}
      <span className="absolute inset-0 rounded-full border-4 border-dashed border-blue-400 animate-spin-slow"></span>
    </div>
    
    {/* Title */}
    <h3 className="text-center mt-6 text-white text-xl font-bold tracking-wide group-hover:text-purple-300 transition-colors duration-500">
      {title}
    </h3>
    
    {/* Description */}
    <p className="text-center text-sm mt-2 text-gray-400 group-hover:text-gray-200 transition-colors duration-500">
      {text}
    </p>
    
    {/* CTA Button */}
    <button className="mt-5 px-6 py-3  text-white font-medium text-sm rounded-lg shadow-lg btn-grad transition-all duration-300 ">
      Explore Now
    </button>
    
    {/* Floating Gradient Effect */}
    <div className="absolute -top-10 -left-10 w-32 h-32 bg-gradient-to-br from-pink-500 to-purple-500 rounded-full blur-3xl opacity-30 group-hover:opacity-50 transition-all duration-500"></div>
    <div className="absolute -bottom-10 -right-10 w-32 h-32 bg-gradient-to-br from-blue-500 to-cyan-500 rounded-full blur-3xl opacity-30 group-hover:opacity-50 transition-all duration-500"></div>
  </div>
  )
}
