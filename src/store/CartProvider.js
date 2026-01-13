import cartContext from './cart-context'
import React, { useContext, useState, useReducer, useEffect } from 'react';

const ACTIONS = {
    ADD_ITEM: "add-item",
    INCREMENT: "increment",
    DECREMENT: "decrement",
    DELETE_ITEM: "delete-item",
    CLEAR_CART: "clear-cart",
}

function cartReducer(cart, action) {
        switch (action.type) {

            case ACTIONS.ADD_ITEM:
                return [...cart, {...action.data.item, quantity: 1}]

            case ACTIONS.DELETE_ITEM:
                return cart.filter((item) => item.id !== action.data.id)

            case ACTIONS.INCREMENT:
                {   
                    return cart.map((item) => {
                        if (item.id === action.data.item.id){
                            return {...item, quantity: (item.quantity + 1)}
                        } else {
                            return item;
                        }

                    })
                }

            case ACTIONS.DECREMENT:
                {
                    const updatedCart = cart.map((item) => {
                        
                        if (item.id === action.data.item.id){
                            return {...item, quantity: item.quantity - 1};
                        } else {
                            return item;
                        }});
                        
                    return updatedCart.filter((item) => item.quantity !== 0);

                }
            case ACTIONS.CLEAR_CART: {
                return []; 
            }

            default:
                return cart;
        }
    }

export function CartProvider({children}) {
    const [cartItems, updateCart] = useReducer(cartReducer, JSON.parse(localStorage.getItem("itemsInCart")) ?? []);
    const [totalAmount, setTotalAmount] = useState(0);

    const [isCartError, setIsCartError] = useState(false);
    const [cartErrorMsg, setCartErrorMsg] = useState(false);
    const [isSuccess, setIsSuccess] = useState(false);
    

    function addToCart(item) {
        if (cartItems.some((inCart) => inCart.id === item.id)) {
            setIsCartError(true);
            setCartErrorMsg("Item is already in cart!");
        } else{
            updateCart({type: ACTIONS.ADD_ITEM, data: {item}});
        }
        
    }


    function removeFromCart(item) {
        updateCart({type: ACTIONS.DELETE_ITEM, data: {item}});
    }

    function increaseItemQuantity(item){
        updateCart({type: ACTIONS.INCREMENT, data: {item}});
    }

    function decreaseItemQuantity(item){
        updateCart({type: ACTIONS.DECREMENT, data: {item}});
    }

    function clearCart(){
        updateCart({type: ACTIONS.CLEAR_CART});
    }

    // for updating total amount in cart
    useEffect(() => {
        let total = 0
        cartItems.forEach(item => {total += item.pricePerUnit * item.quantity});
        setTotalAmount(total);

    }, [cartItems]);

    // for retrieving cart items 
    useEffect(() => {
        localStorage.setItem("itemsInCart", JSON.stringify(cartItems));
    }, [cartItems]);

    const value = {
        cartItems,
        addToCart, removeFromCart, clearCart,
        increaseItemQuantity, decreaseItemQuantity,
        isCartError, setIsCartError, cartErrorMsg, setCartErrorMsg,
        isSuccess, setIsSuccess,
        totalAmount
        
    }

    return(
        <cartContext.Provider value={value}>
            {children}
        </cartContext.Provider>
    )
}

export function useCartProvider() {
    return useContext(cartContext);
}