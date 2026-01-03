import React from 'react'
import ElectricCategory from './ElectricCategory/ElectricCategory'
import CategoryGrid from './CategoryGrid/CategoryGrid'
import Deal from './Deal/Deal'
import ShopByCategory from './ShopByCategory/ShopByCategory'
import { Button } from '@mui/material'
import Storefront from '@mui/icons-material/Storefront'
import { useNavigate } from 'react-router-dom'

const Home = () => {
    const navigate = useNavigate();
    return (
        <>
            <div className='space-y-5 lg:space-y-10 relative'>

                <ElectricCategory />
                <CategoryGrid />


                <div className='pt-20'>
                    <h1 className='text-center text-lg lg:text-4xl font-bold text-primary-color pb-5 lg:pb-10'>
                        TODAY'S DEAL</h1>
                    <Deal />
                </div>

                <section className='pt-20 py-20'>
                    <h1 className='text-center text-lg lg:text-4xl font-bold text-primary-color pb-5 lg:pb-20'>
                        SHOP BY CATEGORY</h1>
                    <ShopByCategory />
                </section>

                <section className='mt-20 lg:px-20 relative h-[200px] lg:h-[450px] object-cover'>
                    <img className='w-full h-full'
                        src="https://img6.thuthuatphanmem.vn/uploads/2022/03/04/background-giam-gia-thoi-trang_025655067.jpg" alt="" />
                    <div className='absolute top-1/2 left-4 lg:left-[15rem] transform -translate-y-1/2 font-semibold lg:text-4xl space-y-3'>
                        <h1>Sell Your Product</h1>
                        <p className='text-lg md:text-2xl'>With <span className='logo lg:text-3xl px-5'>PerVi Ecco</span></p>

                        <div className='pt-6 flex justify-center'>
                            <Button onClick={() => navigate("/become-seller")}
                                startIcon={<Storefront />} variant='contained' size='large'>
                                Become Seller
                            </Button>
                        </div>

                    </div>
                </section>

            </div>
        </>
    )
}

export default Home
