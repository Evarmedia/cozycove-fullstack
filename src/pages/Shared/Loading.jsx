import React from 'react'
import { GiEmptyHourglass } from 'react-icons/gi'

const Loading = () => {
  return (
    <div className='flex justify-center py-20'>
    <GiEmptyHourglass className='animate-spin text-3xl' />
    <h1 className='animate-pulse text-6xl font-semibold'>Loading...</h1>;
  </div>
  )
}

export default Loading