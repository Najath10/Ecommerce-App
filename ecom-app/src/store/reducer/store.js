
import {configureStore} from '@reduxjs/toolkit'
import { ProductReducer } from './ProductReducer';
import { errorReducer } from './errorReducer';
import { cartReducer } from './cartReducer';


const cartItems =localStorage.getItem("cartItems")
    ? JSON.parse(localStorage.getItem('cartItems'))
    : [];

    const initialState = {
        carts : {cart:cartItems}
    }

 const store =configureStore({
    reducer:{
        products:ProductReducer,
        errors:errorReducer,
        carts:cartReducer,
    },
    preloadedState:initialState,
});

export default store;