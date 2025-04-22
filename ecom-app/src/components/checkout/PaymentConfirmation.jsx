import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { useLocation } from 'react-router-dom'
import SkeletonLoader from '../shared/SkeletonLoader';
import { FaCheckCircle } from 'react-icons/fa';
import { stripePaymentConfirmation } from '../../store/actions';
import toast from 'react-hot-toast';
import { send } from 'vite';

const PaymentConfirmation = () => {
    const location = useLocation();
    const searchParams = new URLSearchParams(location.search);
    const dispatch = useDispatch();
    const [errorMessage,setErrorMessage ] = useState(false);
    const {  cart } = useSelector((state) => state.carts)
    const [loading,setLoading] = useState(false);
    
   const paymentIntent = searchParams.get("payment_Intent");
    const clientSecret = searchParams.get("payment_Intent_client_secret")
    const redirectStatus = searchParams.get("redirect_status");
    const  selectedUserCheckoutAddress  = localStorage.getItem("CHECKOUT_ADDRESS") ?
        JSON.parse(localStorage.getItem("CHECKOUT_ADDRESS")) 
        : []; 
   
    useEffect(()=>{
        if (paymentIntent && clientSecret && redirectStatus && cart?.length > 0) {
            const sendData = {
                "addressId": selectedUserCheckoutAddress.addressId,
                "pgName": "Stripe",
                "pgPaymentId": "payment_Intent",
                "pgStatus": "Success",
                "pgResponseMessage": "Payment successfull"
            };
                console.log(sendData);
                console.log(selectedUserCheckoutAddress);
            dispatch(stripePaymentConfirmation(sendData,setErrorMessage,setLoading,toast));
        }
    },[paymentIntent,clientSecret,redirectStatus]);

  return (
    <div className='min-h-screen flex items-center justify-center'>
      {loading ? (
        <div className='max-w-xl mx-auto' >
            <SkeletonLoader/>
        </div>
      ): (
        <div className='p-8 rounded-lg shadow-lg text-center max-w-md mx-auto'>
           <div className='text-green-500 mb-4 flex justify-center'>
                <FaCheckCircle size={64}/>
            </div> 
            <h2 className='text-3xl font-bold text-gray-800 mb-2'>Payment Successfull</h2>
            <p className='text-gray-600 mb-6'>
                Thankyou for your purchase! Your payment was successfull,
                and we're processing your order
            </p>
        </div>
      )}
    </div>
  )
}

export default PaymentConfirmation
