import React from 'react'
import "./ShopByCategory.css";

const ShopByCategoryCard = () => {
  return (
    <div className='flex gap-3 flex-col justify-center items-center group cursor-pointer'>
      <div className='custome-border w-[150px] h-[150] lg:w-[249px] lg:h-[249px] rounded-full bg-primary-color'>
        <img className='group-hover:scale-95 transition-transform 
                        transform-duration-700 object-cover object-top h-full w-full rounded-full'
         src="https://tse3.mm.bing.net/th/id/OIP.jT-1S8sSlFSURMSvTFTSQQHaHa?pid=Api&P=0&h=180" alt="" />
      </div>
      <h1>Kitchen & Table</h1>
    </div>
  )
}

export default ShopByCategoryCard
