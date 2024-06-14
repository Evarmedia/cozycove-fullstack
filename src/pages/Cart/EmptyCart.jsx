// import React from 'react'
import { FaRegWindowClose } from "react-icons/fa";


const EmptyCart = () => {
  return (
    <div className='flex justify-center items-center flex-col md:p-48 my-10'>

      <FaRegWindowClose className='text-8xl animate-bounce'/>
      <h1 className="my-5 text-3xl font-semibold">Your Cart is Empty</h1>
      <p className="text-gray-600 text-lg">Add some items to your cart to get started.</p>
    </div>
  );
};

export default EmptyCart;
