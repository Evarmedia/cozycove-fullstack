/* eslint-disable react/prop-types */
import axios from 'axios';
import React, { createContext, useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import Loading from '../pages/Shared/Loading';

export const CartContext = createContext();

export const CartProvider = ({ children }) => {
  // const [pcart, setPCart] = useState({});
  
  const [cart, setCart] = useState([]);
  const token = localStorage.getItem("token");
  const userId = localStorage.getItem("userId");
  
  const [loading, setLoading] = useState(true);


 useEffect(() => {
    const fetchCartData = async () => {
      try {
        // Fetch cart data
        const response = await axios.post(
          `http://localhost:3005/api/create_getcart/${userId}`,
          {},
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        const cartData = response.data;
        // console.log(cartData.products);

        // Update cart data with detailed product information
        setCart(cartData.products);
        // console.log(cartData.products)
        setLoading(false);
      } catch (error) {
        console.error("Error fetching cart data:", error);
        // setLoading(false);
      }
    };

    fetchCartData();
  }, [token, userId]);
  
  if (loading) {
    return (
     <Loading />
    );
  }

  

  return (
    <CartContext.Provider value={{ cart }}>
      {children}
    </CartContext.Provider>
  );
};

// deleteProduct
// updateQuantity
// 