import React from 'react'
import { FaEnvelope, FaMapMarker, FaMapMarkerAlt, FaMarker, FaPhone } from 'react-icons/fa'

const Contact = () => {
  return (
    <div className='flex flex-col items-center justify-center min-h-screen py-12 bg-cover bg-center '
    style={{backgroundImage : "url('https://images.pexels.com/photos/6214383/pexels-photo-6214383.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2')"}}>
      
      <div className='bg-white shadow-lg rounded-lg p-8 w-full max-w-lg '>
        <h1 className='text-4xl font-bold text-center mb-6 '>Contact Us</h1>
        <p className='text-gray-600 text-center mb-4'>
          We  would love to here from you! Please fill out the form below to contact us
        </p>
      <form className='space-y-4' action="">
        <div>
          <label className='block text-sm font-medium text-ellipsis text-red-700 '> 
          Name</label>
          <input type="text" required 
          className='mt-1 block w-full border border-gray-300 rounded-lg p-2 
          focus:outline-none focus:ring-2 focus:ring-blue-400 '/>
        </div>

        <div>
          <label className='block text-sm font-medium text-ellipsis text-red-700 '> 
          Email</label>
          <input type="email" required 
          className='mt-1 block w-full border border-gray-300 rounded-lg p-2 
          focus:outline-none focus:ring-2 focus:ring-blue-400 '/>
        </div>

        <div>
          <label className='block text-sm font-medium text-ellipsis text-red-700 '> 
          Message</label>
          <textarea 
          rows="4" required 
          className='mt-1 block w-full border border-gray-300 rounded-lg p-2 
          focus:outline-none focus:ring-2 focus:ring-blue-400 '/>
        </div>

      <button className='w-full bg-blue-500 text-white rounded-lg py-2 hover:bg-blue-600 transition  duration-3000 '>
        Send Message
      </button>
      </form>
      <div className='mt-8 text-center'>
        <h2 className='text-lg font-semibold  '>Contact Information</h2>
        <div className='flex flex-col items-center space-y-2 mt-4'>
          <div className='flex items-center'>
            <FaPhone className='text-blue-500 mr-2'/>
            <span>+91-9895048413</span>
          </div>
          <div className='flex items-center'>
            <FaEnvelope className='text-blue-500 mr-2'/>
            <span>najathabdulla@gmail.com</span>
          </div>
          <div className='flex items-center'>
            <FaMapMarkerAlt className='text-blue-500 mr-2'/>
            <span>Bangalore,India</span>
          </div>
        </div>
      </div>
      </div>
    </div>
  )
}

export default Contact