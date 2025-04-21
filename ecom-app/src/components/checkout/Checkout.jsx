import { Button,Skeleton, Step, StepLabel, Stepper } from '@mui/material'
import React, { useEffect, useState } from 'react'
import AddressInfo from './AddressInfo';
import { useDispatch, useSelector } from 'react-redux';
import { getUserAddresses } from '../../store/actions';
import { toast } from 'react-hot-toast';
import '../../App.css'
import ErrorPage from '../shared/ErrorPage';
import PaymentMethod from './PaymentMethod';
import OrderSummary from './OrderSummary';
import StripePayment from './StripePayment';
import PaypalPayment from './PaypalPayment';


const Checkout = () => {
    const [activeStep, setActiveStep] = useState(0);
    const { paymentMethod } = useSelector((state)=>state.payment)
    const { isLoading, errorMessage } = useSelector((state) => state.errors)
    const { address, selectedUserAddress } = useSelector((state) => state.auth)
    const { totalPrice, cart } = useSelector((state) => state.carts)
    
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(getUserAddresses());
    }, [dispatch]);

    const handleNext = () => {
        if (activeStep === 0 && !selectedUserAddress) {
            toast.error("Please select checkout address before proceeding")
        }
        if (activeStep === 1 && !paymentMethod) {
            toast.error("Please select payment method before proceeding")
        }
        setActiveStep((prev) => prev + 1);
    }

    const steps = [
        "Address",
        "Payment Method",
        "Order Summary",
        "Payment",
    ]
    return (
        <div className='py-14 min-h-[calc(100vh-100px)]:'>
            <Stepper activeStep={activeStep} alternativeLabel>
                {steps.map((label, index) => (
                    <Step key={index}>
                        <StepLabel>{label}</StepLabel>
                    </Step>

                ))}
            </Stepper>
              {isLoading ? (
                      <div className="flex flex-col gap-6 px-6 py-12 max-w-3xl mx-auto">
                        <div className="grid sm:grid-cols-1 gap-4">
                          {[...Array(2)].map((_, index) => (
                            <div key={index} className="border p-4 rounded-md shadow-sm">
                              <Skeleton variant="text" width="60%" height={25} />
                              <Skeleton variant="text" width="80%" />
                              <Skeleton variant="text" width="90%" />
                              <Skeleton variant="text" width="40%" />
                            </div>
                          ))}
                        </div>
                        </div>
                    ) : (     
                <div className="mt-5">
                  {activeStep === 0 && <AddressInfo address={address} />}
                  {activeStep === 1 && <PaymentMethod  />}
                  {activeStep === 2 && <OrderSummary 
                                        address={selectedUserAddress}
                                        cart={cart}
                                        paymentMethod={paymentMethod}
                                        totalPrice={totalPrice}  />}
                  {activeStep === 3 && 
                        <>
                        {paymentMethod === "Stripe" ? (
                            <StripePayment/>
                        ):(
                            <PaypalPayment/>
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
                                activeStep === 0 ? !selectedUserAddress
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
    )
}

export default Checkout
