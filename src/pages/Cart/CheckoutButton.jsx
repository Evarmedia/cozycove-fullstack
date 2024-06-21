// // import React from 'react'
// import React, { useContext } from "react";
// import { useHistory } from "react-router-dom";
// import { CartContext } from "../../contexts/CartContext";

// const CheckoutButton = () => {
//   const { isAuthenticated } = useContext(CartContext);
//   const history = useHistory();

//   const handleCheckout = () => {
//     if (!isAuthenticated) {
//       history.push("/login");
//     } else {
//       history.push("/checkout");
//     }
//   };

//   return (
//     <button
//       className='rounded-full py-4 px-6 bg-indigo-600 text-white font-semibold text-lg text-center transition-all duration-500 hover:bg-indigo-700'
//       onClick={handleCheckout}
//     >
//       Checkout
//     </button>
//   );
// };

// export default CheckoutButton;

import React from 'react'

const CheckoutButton = () => {
  return (
    <div className=''>CheckoutButton</div>
  )
}

export default CheckoutButton