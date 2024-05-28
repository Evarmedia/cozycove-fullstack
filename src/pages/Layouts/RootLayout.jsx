// import React from 'react'
import Footer from '../Footer/Footer'
import Navbar from '../Navbar/Navbar'
import { Outlet} from 'react-router-dom'

const RootLayout = () => {
  return (
    <div className="root-layout">
        <Navbar />
        <main className='w-full'>
        <Outlet />
        </main>
        <Footer />
    </div>
  )
}

export default RootLayout