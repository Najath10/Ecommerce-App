import { Button, Step, StepLabel, Stepper } from '@mui/material';
import React, { useEffect, useState } from 'react'
import AddressInfo from './AddressInfo';
import { useDispatch, useSelector } from 'react-redux';
import { getUserAddresses } from '../../store/actions';
import toast from 'react-hot-toast';
import Skeleton from '../shared/Skeleton';
import ErrorPage from '../shared/ErrorPage';
import PaymentMethod from './PaymentMethod';
import OrderSummary from './OrderSummary';
import StripePayment from './StripePayment';
import PaypalPayment from './PaypalPayment';

const Checkout = () => {
    const [activeStep, setActiveStep] = useState(0);
    const dispatch = useDispatch();
    const { isLoading, errorMessage } = useSelector((state) => state.errors);
    const { cart, totalPrice } = useSelector((state) => state.carts);
    const { address, selectedUserCheckoutAddress } = useSelector(
        (state) => state.auth
    )
    const { paymentMethod } = useSelector((state) => state.payment);

   

    const handleNext = () => {
        if(activeStep === 0 && !selectedUserCheckoutAddress) {
            toast.error("Please select checkout address before proceeding.");
            return;
        }

        if(activeStep === 1 && (!selectedUserCheckoutAddress || !paymentMethod)) {
            toast.error("Please select payment address before proceeding.");
            return;
        }
        
        setActiveStep((prevStep) => prevStep + 1);
    };

    const steps = [
        "Address",
        "Payment Method",
        "Order Summary",
        "Payment",
    ];
    
    useEffect(() => {
        dispatch(getUserAddresses());
    }, [dispatch]);

  return (
    <div className='py-14 min-h-[calc(100vh-100px)]'>
        <Stepper activeStep={activeStep} alternativeLabel>
            {steps.map((label, index) => (
                <Step key={index}>
                    <StepLabel>{label}</StepLabel>
                </Step>
            ))}
        </Stepper>

        {isLoading ? (
            <div className='lg:w-[80%] mx-auto py-5'>
                <Skeleton />
            </div>
        ) : (
            <div className='mt-5'>
                {activeStep === 0 && <AddressInfo address={address} />}
                {activeStep === 1 && <PaymentMethod />}
                {activeStep === 2 && <OrderSummary 
                                        totalPrice={totalPrice}
                                        cart={cart}
                                        address={selectedUserCheckoutAddress}
                                        paymentMethod={paymentMethod}/>}
                {activeStep === 3 && 
                    <>
                        {paymentMethod === "Stripe" ? (
                            <StripePayment />
                        ) : (
                            <PaypalPayment />
                        )}
                    </>}
            </div>
        )}
        

        
        <div className='flex justify-between items-center px-4 fixed z-50 h-20 bottom-0 bg-white left-0 w-full border-slate-800'
                style={{ boxShadow: "0 -2px 4px rgba(100,100,100,0.15)" }}>
                <Button
                    onClick={() => setActiveStep((prev) => prev - 1)}
                    variant='outlined'
                    disabled={activeStep === 0}>
                    Back
                </Button>
                {activeStep < steps.length - 1 && (
                    <Button
                        onClick={handleNext}
                        disabled={
                            errorMessage || (
                                activeStep === 0 ? !selectedUserCheckoutAddress
                                    : activeStep === 1 ? !paymentMethod
                                        : false
                            )}
                        variant='contained'
                        color='primary'>
                        Proceed
                    </Button>
                )}
            </div>
        
        {errorMessage && <ErrorPage message={errorMessage} />}
    </div>
  );
}

export default Checkout;