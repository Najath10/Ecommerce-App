const initialState = {
    paymentMethod: null,
     // Default value for 
}

export const paymentMethodReducer = (state = initialState, action) => {
    switch (action.type) {
        case 'ADD_PAYMENT_METHOD':
            return {
                ...state,
                paymentMethod: action.payload
            }
        default:
            return state
    }
}