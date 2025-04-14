import React from 'react'
import { ClipLoader } from "react-spinners";


const Loader = ({text}) => {
  return (

 <div className='flex justify-center items-center w-full h-[450px]'>
      <div className="flex flex-col items-center gap-2">
        <ClipLoader color="#1976d2" size={50} />
        <p className='text-slate-800 font-semibold'>
            {text ? text : "Please wait....."}
        </p>
    </div>
    </div>
        
 
  )
}

export default Loader;
