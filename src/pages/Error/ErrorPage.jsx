// import React from 'react'
import { Link } from 'react-router-dom';
const ErrorPage = () => {
  return (
    <div className='flex justify-center m-40 text-center'>
        <div className='flex flex-col gap-10 text-3xl'>
        <h1 className='font-bold text-6xl'>404 Not Found</h1>
        <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Iste, exercitationem vero voluptates, illo sequi commodi quam minus corrupti consequatur enim quisquam officiis sed adipisci ipsam eius quo. Sint, deleniti hic?</p>
        <Link className="underline hover:text-blue-700" to='/'>Go Home</Link>
    </div>
    </div>
    
  )
}

export default ErrorPage