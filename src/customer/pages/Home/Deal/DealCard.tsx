import React from 'react'

const DealCard = () => {
  return (
    <div className='w-[13rem] cursor-pointer'>
      <img className='border-x-[7px] border-y-[7px] border-pink-600 w-full h-[12rem] object-cover object-top'
       src="" alt="" />
       <div className='border-4 border-black bg-black text-white text-center'>
        <p className='text-lg font-semibold'>Smart Watch</p>
        <p className='text-2xl font-bold'>20% OFF</p>
        <p className='text-balance text-lg'>Shop now</p>
       </div>
    </div>
  )
}

export default DealCard
