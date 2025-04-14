import { Badge } from '@mui/material'
import React, { useState } from 'react'
import { FaShoppingCart, FaSignInAlt, FaStore } from 'react-icons/fa'
import { Link, useLocation } from 'react-router-dom'
import { RxCross2 } from 'react-icons/rx';
import { IoIosMenu } from 'react-icons/io';

const Navbar = () => {
    const path = useLocation().pathname;
    const [navbarOpen, setNavbarOpen] = useState(false);

    return (
        <div className='h-[70px] bg-custom-gradient text-white z-50 flex items-center sticky top-0'>
            <div className='lg:px-14 sm:px-8 w-full flex justify-between px-4'>
                <Link to='/'
                    className='flex items-center text-2xl font-bold'>
                    <FaStore className='mr-2 text-3xl' />
                    <span className='font-[Poppins]'>E-Shop</span>
                </Link>

                {/* Navbar links */}
                <ul className={`flex sm:gap-10 gap-4 sm:items-center text-slate-800 sm:static absolute left-0 top-[70px] sm:shadow-none shadow-md 
                    ${navbarOpen ? "h-fit sm:pb-5 p-6" : "h-0 overflow-hidden"}
                    transition-all duration-300 sm:h-fit sm:bg-none bg-custom-gradient text-white sm:w-fit w-full sm:flex-row flex-col px-4 sm:px-0`}>

                    {/* Home */}
                    <li className='font-[500] transition-all duration-150'>
                        <Link
                            to='/'
                            className={`${
                                path === "/" ? 'bg-white text-black font-semibold' : 'text-gray-200'
                            } px-2 py-1 rounded-md`}>
                            Home
                        </Link>
                    </li>

                    {/* Products */}
                    <li className='font-[500] transition-all duration-150'>
                        <Link
                            to='/products'
                            className={`${
                                path === "/products" ? 'bg-white text-black font-semibold' : 'text-gray-200'
                            } px-2 py-1 rounded-md`}>
                            Products
                        </Link>
                    </li>

                    {/* About */}
                    <li className='font-[500] transition-all duration-150'>
                        <Link
                            to='/about'
                            className={`${
                                path === "/about" ? 'bg-white text-black font-semibold' : 'text-gray-200'
                            } px-2 py-1 rounded-md`}>
                            About
                        </Link>
                    </li>

                    {/* Contact */}
                    <li className='font-[500] transition-all duration-150'>
                        <Link
                            to='/contact'
                            className={`${
                                path === "/contact" ? 'bg-white text-black font-semibold' : 'text-gray-200'
                            } px-2 py-1 rounded-md`}>
                            Contact
                        </Link>
                    </li>

                    {/* Cart */}
                    <li className='font-[500] transition-all duration-150'>
                        <Link
                            to='/cart'
                            className={`${
                                path === "/cart" ? 'bg-white text-black font-semibold' : 'text-gray-200'
                            } px-2 py-1 rounded-md`}>
                            <Badge
                                showZero
                                badgeContent={0}
                                color='primary'
                                overlap='circular'
                                anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
                            >
                                <FaShoppingCart size={25} />
                            </Badge>
                        </Link>
                    </li>

                    {/* Login */}
                    <li className='font-[500] transition-all duration-150'>
                        <Link
                            to='/login'
                            className='flex items-center space-x-2 px-4 py-[6px]
                                bg-gradient-to-r from-purple-600 to-red-500
                                text-white font-semibold rounded-md shadow-lg
                                hover:from-purple-500 hover:to-red-400 transition
                                duration-300 ease-in-out transform'>
                            <FaSignInAlt />
                            <span>Login</span>
                        </Link>
                    </li>
                </ul>

                {/* Mobile Toggle Button */}
                <button onClick={() => setNavbarOpen(!navbarOpen)}
                    className='sm:hidden flex items-center text-3xl'>
                    {navbarOpen ? (
                        <RxCross2 className='text-white' />
                    ) : (
                        <IoIosMenu className='text-white' />
                    )}
                </button>
            </div>
        </div>
    )
}

export default Navbar;
