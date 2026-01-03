import React, { useState } from 'react'
import SellerAccountForm from './SellerAccountForm';
import SellerLoginForm from './SellerLoginForm';
import { Button } from '@mui/material';

const BecomeSeller = () => {
    const [isLogin, setIsLogin] = useState(false);

    const handleShowPage = () => {
        setIsLogin(!isLogin);
    }
    return (
        <div className='grid md:gap-10 grid-cols-3 min-h-screen'>

            <section className='lg:col-span-1 md:col-span-2 col-span-3 p-10 shadow-lg rounded-md'>

                {isLogin ? <SellerAccountForm /> : <SellerLoginForm />}

                <div className='mt-10 space-y-2'>

                    {/* <h1 className='text-center text-xl font-medium'>Đã có tài khoản</h1> */}
                    <h1 className="text-center text-xl font-medium">
                        {isLogin ? "Đã có tài khoản?" : "Chưa có tài khoản?"}
                    </h1>

                    <Button
                        onClick={handleShowPage}
                        fullWidth sx={{ py: "11px" }} variant='outlined'>
                        {isLogin ? "Đăng nhập" : "Đăng ký"}
                    </Button>

                </div>

            </section>

            <section className='hidden md:col-span-1 lg:col-span-2 md:flex justify-center items-center'>

                <div className="lg:w-[70%] px-5 space-y-10">

                    <div className='space-y-2 font-bold text-center'>

                        <p className="text-2xl">Join The Marketplace Revolution</p>
                        <p className='text-lg text-primary-color'>Boost your sales today</p>

                    </div>

                    <img className='w-[80%] object-cover'
                        src="https://png.pngtree.com/png-vector/20240204/ourmid/pngtree-sell-products-online-png-image_11609115.png" alt="" />

                </div>

            </section>

        </div>
    )
}

export default BecomeSeller
