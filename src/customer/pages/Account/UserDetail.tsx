import React from 'react'
import ProfileFieldCard from '../../../components/ProfileFieldCard'
import { Divider } from '@mui/material'

const UserDetail = () => {
    return (
        <div className='flex justify-center py-10'>

            <div className='w-full lg:w-[70%]'>

                <div className='flex items-center pb-3 justify-between'>

                    <h1 className='text-2xl font-bold text-gray-600'>Thông tin tài khoản</h1>

                </div>

                <div className='space-y-5'>
                    <ProfileFieldCard keys='Tên' value={`TQP`} />
                    <Divider />
                    <ProfileFieldCard keys='Email' value={`tqp2004@gmail.com`} />
                    <Divider />
                    <ProfileFieldCard keys='Số điện thoại' value={`9876543210`} />
                </div>

            </div>

        </div>
    )
}

export default UserDetail
