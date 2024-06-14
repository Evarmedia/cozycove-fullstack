/* eslint-disable react/prop-types */
import axios from 'axios';
import React, { createContext, useState, useEffect } from 'react';
import { toast } from 'react-toastify';

export const CartContext = createContext();

export const CartProvider = ({ children }) => {
  // const [pcart, setPCart] = useState({});
  
  const [cart, setCart] = useState([]);
  const token = localStorage.getItem("token");
  const userId = localStorage.getItem("userId");
  
  const [loading, setLoading] = useState(true);

// Fetch cart items arr
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
        setLoading(false);
      }
    };

    fetchCartData();
  }, [token, userId]);
  
  // set cart UI to render product quantity
  const updateLocalQuantity = (productId, quantity) => {
    setCart(prevCart =>
      prevCart.map(item =>
        item.productId._id === productId ? { ...item, quantity } : item
      )
    );
  };
  // sever quantity update
  const updateQuantity = async (productId, quantity) => {
    updateLocalQuantity(productId, quantity)
    try {

      const response = await axios.put(
        `http://localhost:3005/api/updateqty/${userId}`,
        { productId, quantity },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setCart(response.data.products);
    } catch (error) {
      console.error("Error updating quantity:", error);
    }
  };

  

  //Add to cart
  const addToCart = async (productId) => {
    try {
      const response = await axios.put(
        `http://localhost:3005/api/addtocart/${userId}/${productId}`,
        {},
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      setCart(response.data.cart.products);
      toast.success(response.data.message);

    } catch (error) {
      console.log(error);
      if (error.response && error.response.status === 400) {
        toast.error(`${error.response.data.message}`);
      } else {
        toast.error(`${error.response.data.message}`);
      }
    }
  };

  //api call to delete product item, render cart first then update quantity in the backend
  const deleteProduct = async (productId) => {
    try {
      setCart(cart.filter((item) => item.productId._id !== productId));
      const response = await axios.delete(
        `http://localhost:3005/api/delete/${userId}/${productId}`,
      {
        headers: {'Authorization':`Bearer ${token}`} 
      }
    );

      toast.success(response.data.mesage);
    } catch (error) {
      console.log(error);
      if (error.response && error.response.status === 401) {
        toast.error("Unauthorized access. Please log in again.");
      } else {
        toast.error("An error occurred while deleting the item.");
      }
    }
  };
  
  return (
    <CartContext.Provider value={{ cart, loading, updateQuantity, deleteProduct, addToCart }}>
      {children}
    </CartContext.Provider>
  );
};
