import React, { useContext, useState } from "react";
import { CartContext } from "../../contexts/CartContext";
import axios from "axios";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

const Checkout = () => {
  const { cart, loading } = useContext(CartContext);
  const [formData, setFormData] = useState({
    name: "",
    address: "",
    email: "",
    paymentMethod: "card",
  });
  const navigate = useNavigate();

  const deployedUrl = import.meta.env.VITE_DEPLOYED_URL; // to be used after deployment of backend/revert to localhost if during development


  if (loading) {
    return <p>Loading...</p>;
  }

  if (!cart || cart.length === 0) {
    return <p>Your cart is empty</p>;
  }

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        `${deployedUrl}/api/checkout`,
        {
          ...formData,
          cart: cart,
        },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );

      if (response.status === 200) {
        toast.success("Checkout successful!");
        // Optionally clear cart in context and local storage
        navigate("/thank-you");
      } else {
        toast.error("Checkout failed. Please try again.");
      }
    } catch (error) {
      console.error("Checkout error:", error);
      toast.error("Checkout failed. Please try again.");
    }
  };

  return (
    <section className='py-5'>
      <div className='w-full max-w-7xl px-4 mx-auto'>
        <h2 className='text-4xl font-semibold mb-8'>Checkout</h2>
        <form onSubmit={handleSubmit} className='space-y-4'>
          <div>
            <label htmlFor='name' className='block mb-1'>
              Name
            </label>
            <input
              type='text'
              id='name'
              name='name'
              value={formData.name}
              onChange={handleInputChange}
              className='w-full border p-2'
              required
            />
          </div>
          <div>
            <label htmlFor='address' className='block mb-1'>
              Address
            </label>
            <input
              type='text'
              id='address'
              name='address'
              value={formData.address}
              onChange={handleInputChange}
              className='w-full border p-2'
              required
            />
          </div>
          <div>
            <label htmlFor='email' className='block mb-1'>
              Email
            </label>
            <input
              type='email'
              id='email'
              name='email'
              value={formData.email}
              onChange={handleInputChange}
              className='w-full border p-2'
              required
            />
          </div>
          <div>
            <label htmlFor='paymentMethod' className='block mb-1'>
              Payment Method
            </label>
            <select
              id='paymentMethod'
              name='paymentMethod'
              value={formData.paymentMethod}
              onChange={handleInputChange}
              className='w-full border p-2'
              required
            >
              <option value='card'>Credit Card</option>
              <option value='paypal'>PayPal</option>
            </select>
          </div>
          <button
            type='submit'
            className='w-full bg-indigo-600 text-white p-2 rounded'
          >
            Place Order
          </button>
        </form>
      </div>
    </section>
  );
};

export default Checkout;



// const express = require('express');
// const router = express.Router();
// const Order = require('../models/OrderModel'); // Assuming you have an Order model

// router.post('/checkout', async (req, res) => {
//   const { name, address, email, paymentMethod, cart } = req.body;
//   const userId = req.user._id;

//   try {
//     // Create a new order
//     const newOrder = new Order({
//       userId,
//       name,
//       address,
//       email,
//       paymentMethod,
//       products: cart,
//       totalAmount: cart.reduce((acc, item) => acc + item.productId.price * item.quantity, 0)
//     });

//     await newOrder.save();

//     // Optionally clear the user's cart in the database
//     await Cart.findOneAndUpdate({ userId }, { products: [] });

//     res.status(200).json({ message: 'Checkout successful', order: newOrder });
//   } catch (error) {
//     console.error("Checkout error:", error);
//     res.status(500).json({ message: 'Checkout failed', error });
//   }
// });

// module.exports = router;