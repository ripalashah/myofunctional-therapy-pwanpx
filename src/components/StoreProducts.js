// frontend/src/components/StoreProducts.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';

const StoreProducts = ({ addToCart }) => {
    const [products, setProducts] = useState([]);

    const fetchProducts = async () => {
        try {
            const response = await axios.get('http://localhost:5000/api/store/products', {
                headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
            });
            setProducts(response.data);
        } catch (error) {
            console.error('Error fetching products:', error);
        }
    };

    useEffect(() => {
        fetchProducts();
    }, []);

    return (
        <div>
            <h2>Store Products</h2>
            {products.length === 0 ? (
                <p>No products available.</p>
            ) : (
                products.map((product) => (
                    <div key={product._id}>
                        <h3>{product.name}</h3>
                        <p>{product.description}</p>
                        <p>Price: ${product.price}</p>
                        <button onClick={() => addToCart(product)}>Add to Cart</button>
                    </div>
                ))
            )}
        </div>
    );
};

export default StoreProducts;
