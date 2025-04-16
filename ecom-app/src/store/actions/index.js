import toast from "react-hot-toast";
import api from "../../api/api.js";

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
      
