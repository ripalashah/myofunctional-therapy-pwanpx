// src/components/OrderHistory.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';

const OrderHistory = () => {
    const [orders, setOrders] = useState([]);

    const fetchOrders = async () => {
        try {
            const res = await axios.get('http://localhost:5000/api/store/orders', {
                headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
            });
            setOrders(res.data);
        } catch (error) {
            console.error('Error fetching orders:', error);
        }
    };

    useEffect(() => {
        fetchOrders();
    }, []);

    return (
        <div>
            <h2>Order History</h2>
            {orders.length === 0 ? (
                <p>No orders found.</p>
            ) : (
                orders.map((order, index) => (
                    <div key={index}>
                        <p>Order Date: {new Date(order.createdAt).toLocaleDateString()}</p>
                        <p>Total Price: ${order.totalPrice}</p>
                        <p>Payment Status: {order.paymentStatus}</p>
                        <h3>Products:</h3>
                        {order.products.map((product, idx) => (
                            <p key={idx}>Product: {product.productId} | Quantity: {product.quantity}</p>
                        ))}
                    </div>
                ))
            )}
        </div>
    );
};

export default OrderHistory;
