import { createContext } from "react";

const cartContext = createContext({
    // Data
    cartItems: [],
    totalAmount: 0,

    //Actions
    addToCart: (item) => {},
    removeFromCart: (item) => {},
    increaseItemQuantity: (item) => {},
    decreaseItemQuantity: (item) => {},
    clearCart: () => {},

    // States
    isCartError: false,
    setIsCartError: (bool) => {},
    cartErrorMsg: "",
    setCartErrorMsg: (msg) => {},
    isSuccess: false,
    setIsSuccess: (bool) => {} 
});

export default cartContext;