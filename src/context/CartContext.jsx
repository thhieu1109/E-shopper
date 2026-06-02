import React, { createContext, useEffect, useState } from 'react';

 export const CartValueContext = createContext();
function CartContext(props) {

    const cartItems = JSON.parse(localStorage.getItem("Cart")) || [];
    
    
    const [valueItemInCart, setValueItemInCart] = useState(0);

    const calculateTotalItemsInCart = () => {
        let totalItems = 0;
        cartItems.forEach(item => {
            totalItems += item.quantity;
        });
        setValueItemInCart(totalItems);
    }
    
    useEffect(() => {
        calculateTotalItemsInCart();
    }, [cartItems]);



    return (
        <div>
            <CartValueContext.Provider value={valueItemInCart} >
                {props.children}
            </CartValueContext.Provider>
        </div>
    );
}

export default CartContext;