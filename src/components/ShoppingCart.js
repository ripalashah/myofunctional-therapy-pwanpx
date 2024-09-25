// src/components/ShoppingCart.js
import React from 'react';

const ShoppingCart = ({ cartItems, removeFromCart }) => {
    const totalPrice = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);

    return (
        <div>
            <h2>Your Cart</h2>
            {cartItems.length === 0 ? (
                <p>Your cart is empty.</p>
            ) : (
                cartItems.map((item, index) => (
                    <div key={index}>
                        <h3>{item.name}</h3>
                        <p>Price: ${item.price}</p>
                        <p>Quantity: {item.quantity}</p>
                        <button onClick={() => removeFromCart(item)}>Remove</button>
                    </div>
                ))
            )}
            <h3>Total Price: ${totalPrice}</h3>
        </div>
    );
};

export default ShoppingCart;
