/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react/prop-types */
import axios from 'axios';
import React, { createContext, useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import logout from '../pages/Auth/logout';

export const CartContext = createContext();

export const CartProvider = ({ children }) => {
  
  const [cart, setCart] = useState([]);
  const token = localStorage.getItem("token");
  const userId = localStorage.getItem("userId");
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  const deployedUrl = import.meta.env.VITE_DEPLOYED_URL; // to be used after deployment of backend/revert to localhost if during development


// save cart to local storage
  const saveCartToStorage = (cartData) => {
    try {
      localStorage.setItem('cart', JSON.stringify(cartData));
    } catch (error) {
      console.error("Error saving cart data to storage:", error);
    }
  };

    // Function to load cart from Async Storage
  const loadCartFromStorage = () => {
    try {
        const storedCart = localStorage.getItem('cart');
        return storedCart ? JSON.parse(storedCart) : [];
      } catch (error) {
        console.error("Error loading cart data from storage:", error);
        return [];
      }
    };


// Fetch cart items arr
  useEffect(() => {
    const fetchCartData = async () => {
      try {
        const storedCart = await loadCartFromStorage();
        if (storedCart.length > 0) {
          setCart(storedCart);
        } else {
        // Fetch cart data
        const response = await axios.post(
          `${deployedUrl}/api/create_getcart/${userId}`,
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
        saveCartToStorage(cartData.products);
        // console.log(cartData.products)
      }
        setLoading(false);
      } catch (error) {
        console.error("Error fetching cart data:", error);
        setLoading(false);
      }
    };

    fetchCartData();


    // Token expiry check
    const interval = setInterval(() => {
      const tokenExpiry = localStorage.getItem("tokenExpiry");
      if (tokenExpiry && Date.now() > tokenExpiry) {
        logout(navigate);
      }
    }, 60000); // Check every minute

    return () => {
      clearInterval(interval); // Cleanup on component unmount
    };
  }, [token, userId, navigate]);
  

  // set cart UI to render product quantity
  const updateLocalQuantity = (productId, quantity) => {
    setCart(prevCart =>
      prevCart.map(item =>
        item.productId._id === productId ? { ...item, quantity } : item
      )
    );
    saveCartToStorage(cart);
  };

  // sever quantity update
  const updateQuantity = async (productId, quantity) => {
    updateLocalQuantity(productId, quantity)
    try {

      const response = await axios.put(
        `${deployedUrl}/api/updateqty/${userId}`,
        { productId, quantity },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setCart(response.data.products);
      saveCartToStorage(response.data.products);
    } catch (error) {
      console.error("Error updating quantity:", error);
    }
  };


  //Add to cart
  const addToCart = async (productId) => {
    try {
      const response = await axios.put(
        `${deployedUrl}/api/addtocart/${userId}/${productId}`,
        {},
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      setCart(response.data.cart.products);
      toast.success(response.data.message, {
        position: "top-left",
        autoClose: 1000,
        pauseOnFocusLoss: false
      });
      toast.clearWaitingQueue();
      saveCartToStorage(response.data.cart.products)

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
      toast.error("Item Deleted");
      const response = await axios.delete(
        `${deployedUrl}/api/delete/${userId}/${productId}`,
      {
        headers: {'Authorization':`Bearer ${token}`} 
      }
    );

      
      saveCartToStorage(cart.filter((item) => item.productId._id !== productId));
    } catch (error) {
      console.log(error);
      if (error.response && error.response.status === 401) {
        toast.error("Unauthorized access. Please log in again.");
      } else {
        toast.error("An error occurred while deleting the item.");
      }
    }
  };
  

  const clearCart = async () => {
    try {
      setCart([]);
      saveCartToStorage([]);
      toast.success('Opps You just cleared Your cart')
      const response = await axios.delete(
        `${deployedUrl}/api/clearcart/${userId}`,
        {
          headers: {'Authorization':`Bearer ${token}`} 
        }
      );
      setCart(response.data.products);
      // console.log(response.data.products);

    } catch (error) {
      toast.error("An error occurred while clear the items.");
    }
  };


  return (
    <CartContext.Provider value={{ cart, loading, updateQuantity, deleteProduct, addToCart, clearCart }}>
      {children}
    </CartContext.Provider>
  );
};
