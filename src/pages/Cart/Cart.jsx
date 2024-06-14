import axios from "axios";
import React, { useEffect, useState } from "react";
import { FaMinus, FaPlus } from "react-icons/fa";
import { GiEmptyHourglass } from "react-icons/gi";
import { MdDeleteSweep } from "react-icons/md";
import { useParams } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import EmptyCart from "./EmptyCart";
import { useContext } from "react";
import { CartContext } from "../../contexts/CartContext";


const Cart = () => {
  const { userId } = useParams();
  const [carto, setCart] = useState([]);
  // const [loading, setLoading] = useState(true);

  const token = localStorage.getItem("token");

  const { cart } = useContext(CartContext)

  console.log('MyCart:', cart)

  const deleteProduct = async (productId) => {
    try {
      const response = await axios.delete(
        `http://localhost:3005/api/delete/${userId}/${productId}`,
      {
        headers: {'Authorization':`Bearer ${token}`} 
      }
    );

      toast.success(response.data.mesage)
      // toast.success("You clicked the delete button"); 
      setCart(carto.filter((item) => item.productId._id !== productId));
      // console.log(carto.filter((item) => item.productId._id !== productId))
      
    } catch (error) {
      console.log(error);
      if (error.response && error.response.status === 401) {
        toast.error("Unauthorized access. Please log in again.");
      } else {
        toast.error("An error occurred while deleting the item.");
      }
    }
  };



  const updateQuantity = async (productId, quantity) => {
    try {
      if (quantity < 1) return;

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

  // if (loading) {
  //   return (
  //     <div className='flex justify-center py-20'>
  //       <GiEmptyHourglass className='animate-spin text-3xl' />
  //       <h1 className='animate-pulse text-6xl font-semibold'>Loading...</h1>;
  //     </div>
  //   );
  // }

  // console.log(carto.products)
  // if (carto.length === 0) {
  //   return <EmptyCart />;
  // }

  return (
    // <></>

    <section className='py-5 relative'>
      <div className='w-full max-w-7xl px-4 md:px-5 lg-6 mx-auto'>
        <h2 className='title font-manrope font-semibold text-4xl leading-10 mb-8 text-center text-black'>
          Your Shopping Cart
        </h2>

        {cart &&
          cart.map((item) => (
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
                  {/* Delete buton */}
                  <button className='bg-red-200 p-1 hover:bg-red-400 rounded-full group flex items-center justify-center focus-within:outline-red-500'>
                    <MdDeleteSweep
                      className='text-2xl'
                      onClick={() => deleteProduct(item.productId._id)}
                    />
                  </button>
                </div>
                <p className='font-normal text-base leading-7 text-gray-500 mb-6'>
                  {item.productId.description}
                  {/* <a href='javascript:;' className='text-indigo-600'>
                      More....
                    </a> */}
                </p>
                <div className='flex justify-between items-center'>
                  <div className='flex items-center gap-4'>
                    <button
                      className='group rounded-[50px] border border-gray-200 shadow-sm shadow-transparent p-2.5 flex items-center justify-center bg-white transition-all duration-500 hover:shadow-gray-200 hover:bg-gray-50 hover:border-gray-300 focus-within:outline-gray-300'
                      onClick={() =>
                        updateQuantity(item.productId._id, item.quantity - 1)
                      }
                    >
                      {/* Minus Button */}
                      {/* {console.log(item.productId._id)} */}
                      {/* {console.log(item.quantity)} */}
                      <FaMinus className='stroke-gray-900 transition-all duration-500 group-hover:stroke-black' />
                    </button>

                    <input
                      type='text'
                      id='number'
                      className='border border-gray-200 rounded-full w-10 aspect-square outline-none text-gray-900 font-semibold text-sm py-1.5 px-3 bg-gray-100 text-center'
                      placeholder={item.quantity}
                      value={item.quantity}
                      readOnly
                    />
                    <button
                      className='group rounded-[50px] border border-gray-200 shadow-sm shadow-transparent p-2.5 flex items-center justify-center bg-white transition-all duration-500 hover:shadow-gray-200 hover:bg-gray-50 hover:border-gray-300 focus-within:outline-gray-300'
                      onClick={() =>
                        updateQuantity(item.productId._id, item.quantity + 1)
                      }
                    >
                      {/* Plus button */}
                      <FaPlus className='stroke-gray-900 transition-all duration-500 group-hover:stroke-black' />
                    </button>
                  </div>
                  <h6 className='text-indigo-600 font-manrope font-bold text-2xl leading-9 text-right'>
                    ${(item.productId.price * item.quantity).toFixed(2)}
                  </h6>
                </div>
              </div>
            </div>
          ))}

        <div className='flex flex-col px-4 lg:px-6 pb-6 border-b border-gray-200 max-lg:max-w-lg max-lg:mx-auto w-full'>
          <div className='w-full flex justify-start'>
            <h5 className='text-gray-900 font-manrope font-semibold text-2xl leading-9 w-full max-md:mb-8'>
              Subtotal:
            </h5>
            <h6 className='font-manrope font-bold text-3xl lead-10 text-indigo-600'>
              $
              {cart
                .reduce(
                  (acc, item) => acc + item.productId.price * item.quantity,
                  0
                )
                .toFixed(2)}
            </h6>
          </div>
        </div>

        <div className='flex justify-center items-center flex-col'>
          <p className='font-normal text-base leading-7 text-gray-500 text-center mb-5 mt-6'>
            Shipping taxes, and discounts calculated at checkout
          </p>
          <button className='rounded-full py-4 px-6 bg-indigo-600 text-white font-semibold text-lg text-center transition-all duration-500 hover:bg-indigo-700'>
            Checkout
          </button>
        </div>
      </div>
      <ToastContainer />
    </section>
  );
};

export default Cart;
