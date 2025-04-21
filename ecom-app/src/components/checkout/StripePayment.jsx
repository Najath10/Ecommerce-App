import { Alert, AlertTitle } from '@mui/material'
import React from 'react'

const StripePayment = () => {
  return (
    <div className='flex justify-center items-center h-96'> 
            <Alert severity='warning' variant='filled' style={{maxWidth:"400px"}}>
                <AlertTitle>Stripe Method Unavailable</AlertTitle>
                Stripe Method is Unavailable .Please use another payment method
            </Alert>
        </div>
  )
}

export default StripePayment
