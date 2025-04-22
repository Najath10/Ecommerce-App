import { PaymentElement, useElements, useStripe } from '@stripe/react-stripe-js'
import React from 'react'
import { useState } from 'react';
import SkeletonLoader from '../shared/SkeletonLoader'
import { useSelector } from 'react-redux';
const PaymentForm = ({clientSecret}) => {

    const stripe= useStripe();
    const elements = useElements();
    const {totalPrice} = useSelector((state) => state.carts);
    const [errorMessage,setErrorMessage] = useState("");

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!stripe || !elements) {
            return;
        }
        const {error : submitError} = await elements.submit();
        const {error} = await stripe.confirmPayment({
            elements,
            clientSecret,
            confirmParams:{
                return_url:`${import.meta.env.VITE_FRONTEND_URL}/order-confirm`,
            },
        });
        if (error) {
            setErrorMessage(error.message);
            return false;
        }};

    const PaymentElementOptions = {
        layout: "tabs"
    }
    const isLoading = !stripe || !elements || !clientSecret;

  return (
        <form onSubmit={handleSubmit}
        className='max-w-lg mx-auto p-4 ' >
                 <h2 className='text-2xl font-semibold mb-4' >Payment Information</h2>
            {isLoading ? (
                <SkeletonLoader/>
            ):(
             <>
             {clientSecret && <PaymentElement options={PaymentElementOptions}/>} 
             {errorMessage && (
                <div className='text-red-500 mt-2'>{errorMessage}</div>
             )}
             <button 
                className='text-white w-full px-5 py-[10px] bg-black mt-2 mb-5 rounded-md font-bold disabled:opacity-50 disabled:animate-pulse'
                disabled={!stripe || isLoading}>
                    {!isLoading ?`Pay $${Number((totalPrice).toFixed(2))}` : "Processing..."}
             </button>
             </>   
            )}

        </form>
    )
}

export default PaymentForm
