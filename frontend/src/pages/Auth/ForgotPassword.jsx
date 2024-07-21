// import React from 'react'

import { NavLink } from "react-router-dom";

const ForgotPassword = () => {
  return (
    <form action=''>
      <div className='h-screen flex flex-col justify-center items-center'>
        <h1 className="text-3xl p-4">Forgot your password?</h1>
        <input type='text' placeholder='enter your enail' className="border-2 border-black rounded-md px-2 h-10 focus-visible:bg-gray-300" />
      
      <NavLink to='/newpassword'>
      <input type="submit" className="bg-blue-500 rounded-lg p-2 m-6 text-white font-semibold" />
      </NavLink>

      </div>
    </form>
  );
};

export default ForgotPassword;
