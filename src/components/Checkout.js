import React from 'react';
import axios from 'axios';

const Checkout = ({ cartItems, totalPrice, clearCart }) => {
    const handleCheckout = async () => {
        try {
            const products = cartItems.map(item => ({
                productId: item._id,
                quantity: item.quantity,
            }));
            const res = await axios.post(
                'http://localhost:5000/api/store/create-order',
                { products, totalPrice },
                {
                    headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
                }
            );
            alert('Order placed successfully!');
            clearCart();
        } catch (error) {
            console.error('Error placing order:', error);
        }
    };

    return <button onClick={handleCheckout}>Checkout</button>;
};

export default Checkout;
