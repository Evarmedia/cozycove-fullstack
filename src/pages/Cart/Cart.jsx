import React, { useContext } from "react";
import EmptyCart from "./EmptyCart";
import { CartContext } from "../../contexts/CartContext";
import Loading from "../Shared/Loading";
import CartItem from "./CartItem";
import CheckoutButton from "./CheckoutButton";
import { MdOutlineRemoveShoppingCart } from "react-icons/md";
import 'react-toastify/dist/ReactToastify.css';
import { NavLink, useNavigate } from "react-router-dom";

// import logout from '../Auth/logout';

const Cart = () => {

  const { cart, loading, clearCart } = useContext(CartContext);
  
  // const navigate = useNavigate();
  // const tokenExpiry = localStorage.getItem("tokenExpiry");

  // if (tokenExpiry && Date.now() > tokenExpiry) {
  //   logout(navigate);
  //   return;
  // }

  if (loading) {
    return <Loading />;
  }

  if (!cart || cart.length === 0) {
    return <EmptyCart />;
  }
  // console.log(cart);
  
  return (
    <section className='py-5 relative'>
      <div className='w-full max-w-7xl px-4 md:px-5 lg-6 mx-auto relative'>
        <div title='Clear Cart'className='absolute flex text-black text-sm font-semibold bg-red-300 rounded-full right-8 top-5 p-2 hover:bg-red-400 shadow-black shadow-sm'>
          <MdOutlineRemoveShoppingCart className="text-xl" />
      <button  onClick={clearCart}>Clear Cart</button>

        </div>
        <h2 className='title font-manrope font-semibold text-4xl leading-10 mb-8 text-center text-black'>
          Your Shopping Cart
        </h2>
        {cart.map((item) => {
          // console.log(item);
          if (!item || !item.productId) {
            return null; // Skip rendering if item or productId is null/undefined
          }
          return <CartItem key={item._id} item={item} />;
        })}
        {/* Calculated the total here.. might need to change to state to pull it out for use later */}
        <div className='flex flex-col px-4 lg:px-6 pb-6 border-b border-gray-200 max-lg:max-w-lg max-lg:mx-auto w-full'>
          <div className='w-full flex justify-start'>
            <h5 className='text-gray-900 font-manrope font-semibold text-2xl leading-9 w-full max-md:mb-8'>
              Subtotal:
            </h5>
            <h6 className='font-manrope font-bold text-3xl lead-10 text-indigo-600'>
              ₦
              {cart
                .reduce((acc, item) => {
                  if (item && item.productId) {
                    return acc + item.productId.price * item.quantity;
                  }
                  return acc;
                }, 0)
                .toFixed(2)}
            </h6>
          </div>
        </div>
        <div className='flex justify-center items-center flex-col'>
          <p className='font-normal text-base leading-7 text-gray-500 text-center mb-5 mt-6'>
            Shipping taxes, and discounts calculated at checkout
          </p>
          <NavLink to='/checkout'>

          <button className='rounded-full py-4 px-6 bg-indigo-600 text-white font-semibold text-lg text-center transition-all duration-500 hover:bg-indigo-700 shadow-black shadow-sm'>
            <CheckoutButton />
          </button>
          </NavLink>
        </div>
      </div>
    </section>
  );
};

export default Cart;
