/* eslint-disable react/prop-types */
import React, { useContext, useEffect, useState } from "react";
import { CartContext } from "../../contexts/CartContext";
import { FaMinus, FaPlus } from "react-icons/fa";
import { MdDeleteSweep } from "react-icons/md";

const CartItem = ({ item }) => {
  const { updateQuantity, deleteProduct } = useContext(CartContext);
  const [localQuantity, setLocalQuantity] = useState(item.quantity);
  const [isUpdating, setIsUpdating] = useState(false); // New mini state to track if quantity updating

  useEffect(() => {
    setLocalQuantity(item.quantity); //set quantity to server's
  }, [item.quantity]);

  const handleQuantityChange = (newQuantity) => {
    if (newQuantity < 1) return;

    const previousQuantity = localQuantity;
    setLocalQuantity(newQuantity);
    setIsUpdating(true); // quantity is being updated, will  update style later

    updateQuantity(item.productId._id, newQuantity)
      .then(() => {
        setIsUpdating(false); // Update successful, stop tracking
      })
      .catch(() => {
        setLocalQuantity(previousQuantity); // Revert to previous quantity on error
        setIsUpdating(false); // Stop tracking
      });
  };

  const handleDeleteProduct = () => {
    deleteProduct(item.productId._id);
  };

  return (
    <div
      key={item._id}
      className='rounded-3xl border-2 border-gray-200 p-4 lg:p-8 grid grid-cols-12 mb-8 max-lg:max-w-lg max-lg:mx-auto gap-y-4'
    >
      <div className='col-span-3 lg:col-span-1'>
        <img
          src={item.productId.image}
          alt='Product Image'
          className='max-lg:w-full lg:w-[180px]'
        />
      </div>
      <div className='col-span-12 lg:col-span-11 detail w-full lg:pl-3'>
        <div className='flex items-center justify-between w-full mb-4'>
          <h5 className='font-manrope font-bold text-2xl leading-9 text-gray-900'>
            {item.productId.title}
          </h5>
          <button
            className='bg-red-200 p-1 hover:bg-red-400 rounded-full group flex items-center justify-center focus-within:outline-red-500'
            onClick={handleDeleteProduct}
          >
            <MdDeleteSweep className='text-2xl' />
          </button>
        </div>
        <p className='font-normal text-base leading-7 text-gray-500 mb-6'>
          {item.productId.description}
        </p>
        <div className='flex justify-between items-center'>
          <div className='flex items-center gap-4'>
            <button
              className={`group rounded-[50px] border border-gray-200 shadow-sm shadow-transparent p-2.5 flex items-center justify-center bg-white transition-all duration-500 hover:shadow-gray-200 hover:bg-gray-50 hover:border-gray-300 focus-within:outline-gray-300 ${
                isUpdating ? 'bg-gray-200 border-gray-300' : ''
              }`}
              onClick={() => handleQuantityChange(localQuantity - 1)}
              disabled={isUpdating} // Disable button while updating
            >
              <FaMinus className='stroke-gray-900 transition-all duration-500 group-hover:stroke-black' />
            </button>
            <input
              type='text'
              className='border border-gray-200 rounded-full w-10 aspect-square outline-none text-gray-900 font-semibold text-sm py-1.5 px-3 bg-gray-100 text-center'
              value={localQuantity}
              readOnly
            />
            <button
             className={`group rounded-[50px] border border-gray-200 shadow-sm shadow-transparent p-2.5 flex items-center justify-center bg-white transition-all duration-500 hover:shadow-gray-200 hover:bg-gray-50 hover:border-gray-300 focus-within:outline-gray-300 ${
                isUpdating ? 'bg-gray-200 border-gray-300' : ''
              }`}
              onClick={() => handleQuantityChange(localQuantity + 1)}
              disabled={isUpdating} // Disable button while updating
            >
              <FaPlus className='stroke-gray-900 transition-all duration-500 group-hover:stroke-black' />
            </button>
          </div>
          <h6 className='text-indigo-600 font-manrope font-bold text-2xl leading-9 text-right'>
          ₦{(item.productId.price * item.quantity).toFixed(2)}
          </h6>
        </div>
      </div>
    </div>
  );
};

export default CartItem;
