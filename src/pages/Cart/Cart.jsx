import React, { useEffect, useState } from "react";
import { FaPlus, FaMinus } from "react-icons/fa";
import { MdDeleteSweep } from "react-icons/md";
import axios from "axios";
import { useParams } from "react-router-dom";
import EmptyCart from "./EmptyCart";

const Cart = () => {
  const { userId } = useParams();
  const [cart, setCart] = useState([]);
  const [loading, setLoading] = useState(true);

  const token = localStorage.getItem('token');


  useEffect(() => {
    const fetchCartData = async () => {
      try {
        // Fetch cart data
        const response = await axios.post(
          `http://localhost:3005/api/create_getcart/${userId}`, {}, {
            headers: {
              'Authorization': `Bearer ${token}`
            }
          }
        );
        const cartData = response.data;
        // console.log(response.data);
        
        // Fetch product details for each product ID in the cart 
        // this will return a promise
        const productDetailsPromises = cartData.products.map(product =>
          axios.get(`http://localhost:3005/api/product/${product.productId}`, 
          {
            headers: {
              'Authorization': `Bearer ${token}`
            }
          }
          )
        );
        
        // Wait for all product details requests to resolve
        const productDetailsResponses = await Promise.all(productDetailsPromises);
        
        

          // Map the fetched product details to the products in the cart
        const updatedProducts = cartData.products.map((product, index) => ({
          ...product,
          ...productDetailsResponses[index].data
        }));

        console.log(updatedProducts)

        // Update cart data with detailed product information
        setCart({ ...cartData, products: updatedProducts });
        setLoading(false);
      } catch (error) {
        console.error('Error fetching cart data:', error);
        setLoading(false);
      }
    };

    fetchCartData();
  }, [token, userId]);

  if (loading) {
    return <div>Loading...</div>;
  }

  // if (!cart || cart.product.length === 0) {
  //   return <EmptyCart />;
  // }


  return (
    <></>
    // <section className='py-24 relative'>
    //   <div className='w-full max-w-7xl px-4 md:px-5 lg-6 mx-auto'>
    //     <h2 className='title font-manrope font-bold text-4xl leading-10 mb-8 text-center text-black'>
    //       Your Cart
    //     </h2>


    //     {cart.map(
    //       (
    //         item //firstlevel map
    //       ) => (
    //         <div
    //           key={item._id}
    //           className='rounded-3xl border-2 border-gray-200 p-4 lg:p-8 grid grid-cols-12 mb-8 max-lg:max-w-lg max-lg:mx-auto gap-y-4'
    //         >
    //           <ul>
    //             {item.products.map(
    //               (
    //                 product //second array map for products objects
    //               ) => (
    //                 <li key={product._id}>
    //                   <div>
    //                     <div className='col-span-12 lg:col-span-2 img box'>
    //                       <img
    //                         src={product.image}
    //                         alt={product.title}
    //                         className='max-lg:w-full lg:w-[180px]'
    //                       />
    //                     </div>
    //                     <div className='col-span-12 lg:col-span-10 detail w-full lg:pl-3'>
    //                       <div className='flex items-center justify-between w-full mb-4'>
    //                         <h5 className='font-manrope font-bold text-2xl leading-9 text-gray-900'>
    //                           {product.title}
    //                         </h5>
    //                         <button className='rounded-full group flex items-center justify-center focus-within:outline-red-500'>
    //                           <MdDeleteSweep className='text-3xl bg-red-100 p-1 rounded-full transition-all duration-500 hover:bg-red-500' />
    //                         </button>
    //                       </div>
    //                       <p className='font-normal text-base leading-7 text-gray-500 mb-6'>
    //                         {/* product description */}
    //                         {product.description}
    //                         <a href='javascript:;' className='text-indigo-600'>
    //                           More....
    //                         </a>
    //                       </p>
    //                       <div className='flex justify-between items-center'>
    //                         <div className='flex items-center gap-4'>
    //                           <button className='group rounded-[50px] border border-gray-200 shadow-sm shadow-transparent p-2.5 flex items-center justify-center bg-white transition-all duration-500 hover:shadow-gray-200 hover:bg-gray-50 hover:border-gray-300 focus-within:outline-gray-300'>
    //                             <FaMinus className='stroke-gray-900 transition-all duration-500 group-hover:stroke-black' />
    //                           </button>
    //                           <input
    //                             type='text'
    //                             id='number'
    //                             className='border border-gray-200 rounded-full w-10 aspect-square outline-none text-gray-900 font-semibold text-sm py-1.5 px-3 bg-gray-100 text-center'
    //                             placeholder={product.quantity}
    //                           />
    //                           <button className='group rounded-[50px] border border-gray-200 shadow-sm shadow-transparent p-2.5 flex items-center justify-center bg-white transition-all duration-500 hover:shadow-gray-200 hover:bg-gray-50 hover:border-gray-300 focus-within:outline-gray-300'>
    //                             <FaPlus className='stroke-gray-900 transition-all duration-500 group-hover:stroke-black' />
    //                           </button>
    //                         </div>
    //                         <h6 className='text-indigo-600 font-manrope font-bold text-2xl leading-9 text-right'>
    //                           {product.price}
    //                         </h6>
    //                       </div>
    //                     </div>
    //                   </div>
    //                 </li>
    //               )
    //             )}
    //           </ul>
    //         </div>
    //       )
    //     )}
    //     <div className='flex flex-col md:flex-row items-center md:items-center justify-between lg:px-6 pb-6 border-b border-gray-200 max-lg:max-w-lg max-lg:mx-auto'>
    //       <h5 className='text-gray-900 font-manrope font-semibold text-2xl leading-9 w-full max-md:text-center max-md:mb-4'>
    //         Subtotal
    //       </h5>
    //       <div className='flex items-center justify-between gap-5'>
    //         <button className='rounded-full py-2.5 px-3 bg-indigo-50 text-indigo-600 font-semibold text-xs text-center whitespace-nowrap transition-all duration-500 hover:bg-indigo-100'>
    //           Promo Code?
    //         </button>
    //         <h6 className='font-manrope font-bold text-3xl lead-10 text-indigo-600'>
    //           $220
    //         </h6>
    //       </div>
    //     </div>
    //     <div className='max-lg:max-w-lg max-lg:mx-auto'>
    //       <p className='font-normal text-base leading-7 text-gray-500 text-center mb-5 mt-6'>
    //         Shipping taxes, and discounts calculated at checkout
    //       </p>
    //       <button className='rounded-full py-4 px-6 bg-indigo-600 text-white font-semibold text-lg w-full text-center transition-all duration-500 hover:bg-indigo-700'>
    //         Checkout
    //       </button>
    //     </div>
    //   </div>
    // </section>
  );
};

export default Cart;

// import React, { useEffect, useState } from 'react';
// import axios from 'axios';
// import { useParams } from 'react-router-dom';

// const Cart = () => {
//   const { userId } = useParams();
//   const [cart, setCart] = useState(null);
//   const [loading, setLoading] = useState(true);

//   useEffect(() => {
//     const fetchCartData = async () => {
//       try {
//         // Fetch cart data
//         const response = await axios.get(`http://localhost:3005/api/getcart/user/${userId}`);
//         const cartData = response.data;

//         // Fetch product details for each product ID in the cart
//         const productDetailsPromises = cartData.products.map(product =>
//           axios.get(`http://localhost:3005/api/product/${product.productId}`)
//         );

//         // Wait for all product details requests to resolve
//         const productDetailsResponses = await Promise.all(productDetailsPromises);

//         // Map the fetched product details to the products in the cart
//         const updatedProducts = cartData.products.map((product, index) => ({
//           ...product,
//           ...productDetailsResponses[index].data
//         }));

//         // Update cart data with detailed product information
//         setCart({ ...cartData, products: updatedProducts });
//         setLoading(false);
//       } catch (error) {
//         console.error('Error fetching cart data:', error);
//         setLoading(false);
//       }
//     };

//     fetchCartData();
//   }, [userId]);

//   if (loading) {
//     return <div>Loading...</div>;
//   }

//   if (!cart) {
//     return <div>No cart data available.</div>;
//   }

//   return (
//     <div>
//       <h1>Cart</h1>
//       <div key={cart._id}>
//         <h2>User ID: {cart.userId}</h2>
//         <p>Date: {new Date(cart.date).toLocaleDateString()}</p>
//         <ul>
//           {cart.products.map(product => (
//             <li key={product._id}>
//               <p>Product ID: {product.productId}</p>
//               <p>Product Name: {product.name}</p>
//               <p>Quantity: {product.quantity}</p>
//               {/* Add more product details as needed */}
//             </li>
//           ))}
//         </ul>
//       </div>
//     </div>
//   );
// };

// export default Cart;
