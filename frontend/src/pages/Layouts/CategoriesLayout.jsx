// import React from 'react'
import { Outlet} from 'react-router-dom'

const RootLayout = () => {
  return (
    <div className="categories-layout">
        <main className='flex flex-col items-center'>
          <h1 className='text-4xl font-semibold'>Categories</h1>
        <Outlet />
        </main>
    </div>
  )
}

export default RootLayout