import React, { useState } from 'react'
import { useForm } from 'react-hook-form';
import { Link, useNavigate } from 'react-router-dom'
import { AiOutlineLogin } from "react-icons/ai";
import InputField from '../shared/InputField';
import { useDispatch } from 'react-redux';
import { authenticateSignInUser } from '../../store/actions';
import toast from 'react-hot-toast';
import Loader from '../shared/Loader';
import Skeleton from '../shared/Skeleton';


const Login = () => {
    const dispatch = useDispatch();
    const navigate =useNavigate();
    const [loader,setLoader] = useState(false);
    const{
        register,
        handleSubmit,
        reset,
        formState:{errors},
    } = useForm({
        mode:"onTouched"
    })

    const loginHandler = async (data) => {
            console.log("login Clicked... ");
            dispatch(authenticateSignInUser(data, toast, reset, navigate, setLoader));
            
        
        
    }
  return (
    <div className='min-h-[calc(100vh-64px)] flex justify-center items-center'>
        <form 
        onSubmit={handleSubmit(loginHandler)}
        className='sm-w-[450px] w-[360px] shadow-custom py-8 sm:px-8 px-4'>
            <div className='flex flex-col items-center justify-center space-y-4'>
                <AiOutlineLogin  
                className='text-slate-500 text-5xl'/>
                <h1 className='text-slate-800 text-center font-montserrat lg:text-3xl text-2xl font-bold'>
                    Login Here
                </h1>
            </div>
            <hr className='mt-2 mb-5 text-black'/>
            <div className=' flex flex-col gap-3'>
                <InputField 
                    label="UserName"
                    required
                    id="username"
                    type="text"
                    message="* UserName is Required"
                    register={register}
                    errors={errors}
                    placeholder="Enter your username"
                />
                <InputField 
                    label="Password"
                    required
                    id="password"
                    type="password"
                    message="* Password is Required"
                    register={register}
                    errors={errors}
                    placeholder="Enter your password"
                />
                <button
                disabled={loader}
                className='bg-button-gradient flex gap-3 items-center justify-center font-semibold text-white w-full py-2 hover:text-slate-400 transition-colors duration-100 rounded-sm my-3'
                type='submit'
                >
                 {loader ? <Skeleton text="Logging in..." /> : <>Login</>}
                </button>
                <p className='text-center text-sm text-slate-700 mt-6'>
                    Dont have an account ?
                    <Link to='/register'
                    className='font-semibold underline hover:text-black'>
                    <span >SignUp</span>
                    </Link>
                </p>
            </div>
        </form>
    </div>
  )
}

export default Login