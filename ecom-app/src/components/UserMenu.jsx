import { Avatar, Button, Menu, MenuItem } from '@mui/material';
import React from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { BiUser } from 'react-icons/bi';
import { FaShoppingBag, FaShoppingBasket, FaShoppingCart } from 'react-icons/fa';
import { IoMdExit } from 'react-icons/io';
import BackDrop from './BackDrop';
import { logoutUser } from '../store/actions';

const UserMenu = () => {

    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [anchorEl,setAnchorEl] = React.useState(null)
    const open = Boolean(anchorEl);
    const handleClick = (event) =>{
        setAnchorEl(event.currentTarget)
    };
    const handleClose = ()=> {
        setAnchorEl(null)
    };
    const logoutHandler = () =>{
      dispatch(logoutUser(navigate));
    }

    const { user } = useSelector((state) => state.auth); // Adjust according to your state
    const username = user?.username || " ";
    const capitalizeFirstLetter = (str) => { if (!str) return "";
        return str.charAt(0).toUpperCase() + str.slice(1);};

  return (
    <div className='relative z-30  '>
     <div
       className='sm:border-[1px] sm:border-slate-400 flex flex-row items-center gap-1 rounded-full cursor-pointer hover:shadow-md transition text-slate-700'
       onClick={handleClick}
     >
       <Avatar alt='Menu'>{username.charAt(0).toUpperCase()}</Avatar>
     </div>
     <Menu 
     sx={{width:"400px"}}
     id='basic-menu'
     open={open}
     anchorEl={anchorEl}
     onClose={handleClose}
     MenuListProps={{'aria-labelledby':'basic-button',
        sx:{width:160},
     }}
     >
        <Link to="/profile">
        <MenuItem className='flex gap-2' onClick={handleClose}>
            <BiUser className=' text-xl'/>
            <span className='font-bold text-[16px] mt-1'>
                {capitalizeFirstLetter(username)}</span>
        </MenuItem>
        </Link>
        <Link to="/profile/orders">
        <MenuItem className='flex gap-2' onClick={handleClose}>
            <FaShoppingCart className=' text-xl ' />
            <span className='font-semibold '>Order</span>
        </MenuItem>
        </Link>
        <MenuItem className='flex gap-2' onClick={logoutHandler}>
            <div className='font-semibold w-full flex gap-2 items-center bg-button-gradient px-4 py-1 text-white rounded-sm'>
            <IoMdExit className=' text-xl ' />
            <span className='font-semibold '>Logout</span>
            </div>
        </MenuItem>
     </Menu>
     {open && <BackDrop/>}
    </div>
  )
}

export default UserMenu
