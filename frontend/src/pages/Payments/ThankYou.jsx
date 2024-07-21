import React from 'react';
import { NavLink } from 'react-router-dom';

const ThankYou = () => {
  return (
    <section className='py-5'>
      <div className='w-full max-w-7xl h-screen px-4 mx-auto text-center mt-8'>
        <h2 className='text-4xl font-semibold mb-8'>Thank You!</h2>
        <p className='mb-4'>Your order has been placed successfully.</p>
        <NavLink to="/products" className='underline text-blue-800'>click here to continue your cozy Shoping</NavLink>
      </div>
    </section>
  );
};

export default ThankYou;