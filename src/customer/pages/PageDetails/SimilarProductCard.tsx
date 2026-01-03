import React from 'react'

const SimilarProductCard = () => {
  return (
    <>
        <div className='group px-4 relative'>
        <div className='card'>

        <img
           className='card-media object-top'
           src="" alt=""/>

           

        </div>
        <div className='details pt-3 space-y-1 group-hover-effect rounded-md'>
            <div className='name'>
              <h1 className='text-xl'>Blue Shop</h1>
              <p>White Shirt</p>
            </div>
            <div className='price flex items-center gap-3'>
              <span className='font-sans text-gray-800'>
                400.000đ
              </span>
              <span className='thin-line-through text-gray-400'>
                600.000đ
              </span>
              <span className='text-primary-color font-semibold'>
                40%
              </span>
            </div>
        </div>
      </div> 
    </>
  )
}

export default SimilarProductCard
