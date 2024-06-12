/* eslint-disable react/prop-types */
// import React from 'react';
import { NavLink } from "react-router-dom";
import { FaStar } from "react-icons/fa6";
import { useState } from "react";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import { MdFavoriteBorder } from "react-icons/md";

const ProductCard = ({ product }) => {
  const [isFavorited, setIsFavorited] = useState(false);

  const token = localStorage.getItem("token");
  const userId = localStorage.getItem("userId");
  const productId = product._id;

  const addToCartHandler = async () => {
    try {
      const response = await axios.put(
        `http://localhost:3005/api/addtocart/${userId}/${productId}`,
        {},
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      // console.log(response.data);
      toast.success(response.data.message);
    } catch (error) {
      console.log(error);
      if (error.response && error.response.status === 401) {
        toast.error("Unauthorized access. Please log in again.");
      } else {
        toast.error("An error occurred while adding to the cart.");
      }
    }
  };

  const handleFavoriteClick = () => {
    setIsFavorited(!isFavorited);
  };

  return (
    <>
      <div className='relative w-full h-full bg-white border border-gray-200 rounded-lg shadow-md'>
        {/* image/title */}
        <div className=' flex flex-col md:h-2/3'>
          <NavLink to={`/products/${product._id}`}>
            <div className='flex items-center justify-center'>
              <img
                className='sm:p-4 p-2 rounded-t-lg w-[250px] h-[200px] object-contain'
                src={product.image}
                alt={product.title}
              />
            </div>
          </NavLink>

          {/* Favourite Button... needs backend to stick just a toggle for now */}
          <button onClick={handleFavoriteClick} className='focus:outline-none'>
            {isFavorited ? (
              <div className='absolute right-3 cursor-pointer top-3 text-3xl text-red-500 hover:text-gray-300'>
                <MdFavoriteBorder />
              </div>
            ) : (
              <div className='absolute right-3 cursor-pointer top-3 text-3xl text-gray-500 hover:text-red-300'>
                <MdFavoriteBorder />
              </div>
            )}
          </button>

            {/* Product Title */}
          <div className='h-5 mb-3 overflow-hidden'>
            <h5 className='text-xs md:text-sm font-semibold tracking-tight text-gray-900 mx-4'>
              {product.title}
            </h5>
          </div>
        </div>

            {/* Card Buttom-->rating/price/addtocart */}
        <div className='px-1 md:px-5 py-1 md:pb-5 md:bg-gray-100 md:h-1/3 rounded-b-2xl'>
        
          <div className='flex items-center md:mt-2 md:mb-5 mb-2'>
            <div className='flex items-center space-x-1 rtl:space-x-reverse'>
              <FaStar className='text-yellow-300' />
            </div>
            <span className=' bg-blue-100 text-blue-800 text-xs font-semibold px-2.5 py-0.5 rounded dark:bg-blue-200 dark:text-blue-800 ms-3'>
              {product.rating}
            </span>
          </div>
          <div className='flex items-center justify-between'>
            <span className='md:text-2xl font-semibold text-gray-900'>
              ${product.price}
            </span>
            <button className='btn-cart' onClick={addToCartHandler}>
              Add to cart
            </button>
          </div>
        </div>
        <ToastContainer />
      </div>
    </>
  );
};

export default ProductCard;

// <div className="border shadow-md rounded-lg p-4 mb-4">
//   <h2 className="text-xl font-semibold">{product.title}</h2>
//   <p className="text-gray-600 mb-2">${product.price}</p>
//   <img src={product.image} alt={product.title} className="w-full" />
//   <button>Add to Cart</button>
// </div>
