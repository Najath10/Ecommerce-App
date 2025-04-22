import toast from "react-hot-toast";
import api from "../../api/api.js";
import { current } from "@reduxjs/toolkit";
import { ESModulesEvaluator } from "vite/module-runner";

export const fetchProducts = (queryString) => async (dispatch) => {
  try {
    dispatch({ type: "IS_FETCHING" });
    const { data } = await api.get(`/public/products?${queryString}`); 
    dispatch({
      type: "FETCH_PRODUCTS",
      payload: data.content,
      pageNumber: data.pagenumber,
      pageSize: data.pageSize,
      totalElements: data.totalElements,
      totalPages: data.totalPages,
      lastPage: data.lastPage,
    });
    dispatch({ type: "IS_SUCCESS" });
  } catch (error) {
    console.log(error);
    dispatch({
      type: "IS_ERROR",
      payload: error?.response?.data?.message || "Failed to fetch Products",
    });
  }
};

export const fetchCategories = (queryString) => async (dispatch) => {
  try {
    dispatch({ type: "CATEGORY_LOADER" });
    const { data } = await api.get(`/public/categories`);
    dispatch({
      type: "FETCH_CATEGORIES",
      payload: data.content,
      pageNumber: data.pagenumber,
      pageSize: data.pageSize,
      totalElements: data.totalElements,
      totalPages: data.totalPages,
      lastPage: data.lastPage,
    });
    dispatch({ type: "CATEGORY_SUCCESS" });
  } catch (error) {
    console.log(error);
    dispatch({
      type: "IS_ERROR",
      payload: error?.response?.data?.message || "Failed to fetch Category",
    });
  }
};

export const addToCart = (data,qty=1,toast) =>
      (dispatch, getState) => {
        const {products} = getState().products;
        
        const getProduct = products.find(
          (item) => item.productId === data.productId
        );

        const isQuantityExist = getProduct.quantity >= qty;

        if (isQuantityExist) {
              dispatch({type: "ADD_CART",
                 payload: {...data,quantity:qty}});
                 toast.success(`${data?.productName} added to the cart`);
                 localStorage.setItem("cartItems",JSON.stringify(getState().carts.cart))
        }else {
            toast.error("Out of Stock");
        }
};

export const increaseCartQuantity =
      (data , toast, currentQuantity, setCurrentQuantity) => 
        (dispatch, getState)  => {
            
          const products = getState().products.products;
          if (!Array.isArray(products)) return;
           
            const getProduct = products.find(
              (item) => item.productId === data.productId
            );

            const isQuantityExist = getProduct.quantity >= currentQuantity;

            if (isQuantityExist) {
              const newQty = currentQuantity + 1;
              setCurrentQuantity(newQty);

              dispatch({
                type:"ADD_CART",
                payload: {...data, quantity:newQty }
              });
              localStorage.setItem("cartItems",JSON.stringify(getState().carts.cart));
            } else {
                toast.error("Quantity Reached to Limit")
            }};
    
export const decreaseCartQuantity =
      (data , newQuantity) => (dispatch, getState)  => {
          dispatch({
            type:"ADD_CART",
            payload :{...data ,quantity: newQuantity}
          });
          localStorage.setItem("cartItems",JSON.stringify(getState().carts.cart));
        }

    export const removeFromCart = 
          (data,toast) => (dispatch,getState) => {
              dispatch({
                type:"REMOVE_CART",
                payload: data
              });
              toast.success(`${data.productName} removed from cart`)
              localStorage.setItem("cartItems",JSON.stringify(getState().carts.cart));

          }
      
export const authenticateSignInUser 
      = (sendData,toast,reset,navigate,setLoader) => 
            async(dispatch) => {
            try {
              setLoader(true);
              const {data} = await api.post("/auth/signin", sendData);
              console.log("login API triggered", data);
              dispatch({
                type:"LOGIN_USER",
                payload:data
              });
              localStorage.setItem("auth",JSON.stringify(data));
              reset();
              toast.success("Login Success");
              navigate("/")
            } catch (error) {
              console.log(error);
              toast.error(error?.response?.data?.message || "Internal Server Error")    
            } finally {
              setLoader(false)
            }
}
export const registerNewUser 
      = (sendData,toast,reset,navigate,setLoader) => 
            async(dispatch) => {
            try {
              setLoader(true);
              const {data} = await api.post("/auth/signup", sendData);
              localStorage.setItem("auth",JSON.stringify(data));
              reset();
              toast.success(data?.message || "User Registered Successfully");
              navigate("/login")
            } catch (error) {
              console.log(error);
              toast.error(error?.response?.data?.message || error?.response?.data?.password ||"Internal Server Error")    
            } finally {
              setLoader(false)
            }
}

export const logoutUser = (navigate) => (dispatch) => {
      dispatch({
        type:"LOG_OUT"
      })
      dispatch({ type: "CLEAR_CART" });
      localStorage.removeItem("cartItems");
      localStorage.removeItem("auth");
      navigate("/login")
}

export const addUpdateUserAddress = 
        (sendData, toast, addressId, setOpenAddressModal)  => 
        async (dispatch,getState) => {
              // const { user } = getState().auth;
              // await api.post("/addresses", sendData, {
              //   headers : {Authorization:"Bearer " + user.jwttoken},
              // });
          dispatch({ type:"BUTTON_LOADER" })
          try {
            if (!addressId) {
              const { data } = await api.post("/addresses", sendData);
              toast.success("Address Saved Successfully !!");
            }else{
              await api.put(`addresses/${addressId}`, sendData);
              toast.success("Address Updated Successfully !!");
            }
            dispatch(getUserAddresses());
            dispatch({ type:"IS_SUCCESS"});
          } catch (error) {
            console.log(error);
            toast.error(error?.response?.data?.message || "Internal Server Error")
            dispatch({type :"IS_ERROR", payload: null})
          }finally {
              setOpenAddressModal(false)
}};


export const  getUserAddresses = () => async (dispatch,getState) => {
      try {
        dispatch({type:"IS_FETCHING"});
        const { data } = await api.get(`/addresses/users`)
        console.log("Address API response:", data); 
        dispatch({ type: "USER_ADDRESS", payload : data });
        dispatch({ type:"IS_SUCCESS"});
      } catch (error) {
        console.log(error);
        toast.error(error?.response?.data?.message || "Failed to fetch users addresses")
      }
}

export const  selectUserCheckoutAddress =( address) =>{
  localStorage.setItem("CHECKOUT_ADDRESS",JSON.stringify(address));
  
  return {
      type:"SELECT_CHECKOUT_ADDRESS",
      payload:address,
  }};

export const clearCheckoutAddress = () => {
  return {
      type:"REMOVE_CHECKOUT_ADDRESS",
  }}


export const deleteUserAddress = 
      (toast,addressId,setOpenDeleteModal) => 
        async (dispatch,getState) => {
      try {
          dispatch({type:"BUTTON_LOADER"});
          await api.delete(`addresses/${addressId}`);
          dispatch(getUserAddresses());
          dispatch(clearCheckoutAddress());
          toast.success("Address Deleted successfully!");
      } catch (error) {
        dispatch({type:"IS_ERROR",
          payload:error?.response?.data?.message || "Some error occured",
        });
      }finally {
        setOpenDeleteModal(false)
      }
}
export const addPaymentMethod = (method) => {
  return {
    type: "ADD_PAYMENT_METHOD",
    payload: method,
  }
}
export const creatUserCart = (sendCartItems) => async(dispatch,getState) => {
  try {
    dispatch({ type: "IS_FETCHING" });
    await api.post("/cart/create", sendCartItems);
    await dispatch(getUserCart());
  } catch (error) {
    dispatch({ type: "IS_ERROR",
      payload: error?.response?.data?.message || "Failed to create cart",
     });
  }
}
export const getUserCart = () => async(dispatch,getState) => {
  try {
    dispatch({ type: "IS_FETCHING" });
    const { data } = await api.get("/carts/user/cart");
    dispatch({ type: "GET_USER_CART",
               payload: data.products,
               totalPrice: data.totalPrice,
               cartId: data.cartId,});
      localStorage.setItem("cartItems",JSON.stringify(getState().carts.cart));
      dispatch({ type: "IS_SUCCESS" });
  } catch (error) {
    dispatch({ type: "IS_ERROR",
      payload: error?.response?.data?.message || "Failed to fetch cart",
     });
  }
}
export const createStripePaymentSecret = 
            (totalPrice) => async (dispatch,getState) => {
        try {
          dispatch({ type: "IS_FETCHING" });
          const { data } = await api.post("/order/stripe-client-secret", {
            "amount": Number(totalPrice) * 100,
            "currency":"usd"
          });
          dispatch({type: "CLIENT_SECRET",
            payload: data,
          })
          localStorage.setItem("clientSecret",JSON.stringify(data));
          dispatch({ type: "IS_SUCCESS" });
        } catch (error) {
          dispatch({ type: "IS_ERROR",
            payload: error?.response?.data?.message || "Failed to create payment secret",
           });       
        }}

export const stripePaymentConfirmation  = (sendData,setErrorMessage ,setLoading , toast) => 
            async(dispatch,getState) => {
          try {
            const  response  = await api.post("/order/users/payments/online",sendData);
            if ( response.data){
              localStorage.removeItem("CHECKOUT_ADDRESS")
              localStorage.removeItem("cartItems")
              localStorage.removeItem("clientSecret");
              dispatch({type: "REMOVE_CLIENT_SECRET_ADDRESS", payload: data});
              dispatch({type: "CLEAR_CART"});
              toast.success("Order Accepted");
            } else{
              setErrorMessage("Payment Failed ! Please try again")
            }
          } catch (error) {
            setErrorMessage("Payment Failed ! Please try again")
          }
      }
