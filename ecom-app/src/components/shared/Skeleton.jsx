import React from 'react'

const Skeleton = ({text = "Loggin in ...."}) => {
  return (
    <div className="flex items-center gap-3">
      {/* Stylish Loader Spinner */}
      <div className="relative w-6 h-6">
        {/* Outer ring with glow */}
        <div className="absolute inset-0 border-2 border-t-transparent border-white rounded-full animate-spin shadow-md shadow-white/30"></div>
        {/* Inner ring slower, colored */}
        <div className="absolute inset-1 border-2 border-t-transparent border-blue-500 rounded-full animate-[spin_2s_linear_infinite]"></div>
        {/* Pulsing center dot */}
        <div className="absolute inset-2 rounded-full bg-blue-500 animate-ping"></div>
      </div>
      <span className="text-sm font-medium text-white tracking-wide animate-pulse">{text}</span>
    </div>
  
  )
}

export default Skeleton
