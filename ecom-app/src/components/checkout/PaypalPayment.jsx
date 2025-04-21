import { Alert, AlertTitle } from '@mui/material'
import React from 'react'

const PaypalPayment = () => {
  return (
    <div className='flex justify-center items-center h-96'> 
        <Alert severity='warning' variant='filled' style={{maxWidth:"400px"}}>
            <AlertTitle>Paypal Method Unavailable</AlertTitle>
            Paypal Method is Unavailable .Please use another payment method
        </Alert>
    </div>
  )
}

export default PaypalPayment