import { Badge } from "@mui/material";
import { useState , useEffect, useRef} from "react";
import { FaShoppingCart, FaSignInAlt, FaStore } from "react-icons/fa";
import { IoIosMenu } from "react-icons/io";
import { RxCross2 } from "react-icons/rx";
import { useSelector } from "react-redux";
import { Link, useLocation } from "react-router-dom";
import UserMenu from "../UserMenu";

const Navbar = () => {
    const path = useLocation().pathname;
    const [navbarOpen, setNavbarOpen] = useState(false);
    const menuRef = useRef(null);
    const {cart} =useSelector((state)=> state.carts)
    const {user} =useSelector((state)=> state.auth)
   
    // Auto-close menu on route click (mobile)
    const handleLinkClick = () => {
        if (window.innerWidth < 768) {
            setNavbarOpen(false);
        }
    };

    // Close menu on outside click
    useEffect(() => {
        const handleClickOutside = (event) => {
            if (navbarOpen && menuRef.current && !menuRef.current.contains(event.target)) {
                setNavbarOpen(false);
            }
        };
        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, [navbarOpen]);

    return (
        <div className='h-[70px] bg-custom-gradient text-white z-50 flex items-center sticky top-0'>
            <div className='md:px-14 px-4 w-full flex justify-between items-center'>

                {/* Logo */}
                <Link to='/' className='flex items-center text-2xl font-bold'>
                    <FaStore className='mr-2 text-3xl' />
                    <span className='font-[Poppins]'>E-Shop</span>
                </Link>

                {/* Nav Links */}
                <ul
                    ref={menuRef}
                    className={`flex md:gap-8 gap-4 md:items-center md:static fixed top-[70px] left-0 w-full
                        md:w-auto md:bg-transparent bg-custom-gradient z-40 text-white flex-col md:flex-row
                        transition-all duration-300 ease-in-out md:shadow-none shadow-lg
                        ${navbarOpen ? 'h-auto py-6 px-4' : 'h-0 overflow-hidden md:h-auto md:py-0 md:px-0'}`}>
                    
                    {/* Nav Items */}
                    {[
                        { to: '/', label: 'Home' },
                        { to: '/products', label: 'Products' },
                        { to: '/about', label: 'About' },
                        { to: '/contact', label: 'Contact' }
                    ].map((item) => (
                        <li key={item.to} className='font-[500] transition-all duration-150'>
                            <Link
                                to={item.to}
                                onClick={handleLinkClick}
                                className={`${
                                    path === item.to
                                        ? 'bg-white text-black font-semibold'
                                        : 'text-gray-200'
                                } px-2 py-1 rounded-md block w-full`}>
                                {item.label}
                            </Link>
                        </li>
                    ))}

                    {/* Cart */}
                    <li className='font-[500] transition-all duration-150'>
                        <Link
                            to='/cart'
                            onClick={handleLinkClick}
                            className={`${
                                path === "/cart" ? 'bg-white text-black font-semibold' : 'text-gray-200'
                            } px-2 py-1 rounded-md block w-full`}>
                            <Badge
                                showZero
                                badgeContent={cart?.length || 0}
                                color='primary'
                                overlap='circular'
                                anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
                            >
                                <FaShoppingCart size={22} />
                            </Badge>
                        </Link>
                    </li>

                    {/* Login Button */}
                    {user && user.id ? (
                      <UserMenu/>
                    ) :
                    (
                        <li className='mt-2 md:mt-0'>
                        <Link
                            to='/login'
                            onClick={handleLinkClick}
                            className='flex items-center justify-center space-x-2 px-4 py-[6px]
                                bg-gradient-to-r from-purple-600 to-red-500
                                text-white font-semibold rounded-md shadow-lg
                                hover:from-purple-500 hover:to-red-400 transition
                                duration-300 ease-in-out transform w-full md:w-auto'>
                            <FaSignInAlt />
                            <span>Login</span>
                        </Link>
                    </li>
                    )}
                   
                </ul>

                {/* Mobile Menu Toggle */}
                <button
                    onClick={() => setNavbarOpen(!navbarOpen)}
                    className='md:hidden z-50 text-3xl ml-4'>
                    {navbarOpen ? <RxCross2 className='text-white' /> : <IoIosMenu className='text-white' />}
                </button>
            </div>
        </div>
    );
};


export default Navbar;