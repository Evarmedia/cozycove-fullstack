// import React from 'react'
import { CartProvider } from '../../contexts/CartContext'
import Footer from '../Footer/Footer'
import Navbar from '../Navbar/Navbar'
import { Outlet } from 'react-router-dom'

const RootLayout = () => {
  return (
    <div className="root-layout">
        <CartProvider>
        <Navbar />
        <main className='w-full'>
        <Outlet />

        </main>
        </CartProvider>
        <Footer />
    </div>
  )
}

export default RootLayout