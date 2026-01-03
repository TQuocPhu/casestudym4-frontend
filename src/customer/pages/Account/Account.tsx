import { Divider } from '@mui/material'
import React from 'react'
import { Route, Routes, useLocation, useNavigate } from 'react-router-dom'
import Orders from './Orders'
import OrderDetail from './OrderDetail'
import UserDetail from './UserDetail'
import Address from './Address'
import { useAppDispatch } from '../../../State/Store'
import { logout } from '../../../State/AuthSlice'

const menu = [
  { title: "Đơn hàng", name: "orders", path: "/account/orders" },
  { title: "Tài khoản", name: "profile", path: "/account" },
  { title: "Địa chỉ", name: "addresses", path: "/account/addresses" },
  { title: "Đăng xuất", name: "logout", path: "/" },
]

const Account = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const dispatch = useAppDispatch();

  const handleLogout = () => {
    dispatch(logout(navigate))
  }

  const handleClick = (item: any) => {
    if (item.path === "/") {
      handleLogout();
    } else {
      navigate(item.path);
    }
  };

  return (
    <div className='px-5 lg:px-52 min-h-screen mt-10'>

      <div>
        <h1 className='text-xl font-bold pb-5'>TQP</h1>
      </div>

      <Divider />

      <div className='grid grid-cols-1 lg:grid-cols-3 lg:min-h-[78vh]'>

        <section className='col-span-1 lg:border-r lg:pr-5 py-5 h-full'>
          {
            menu.map((item) => (
              <div onClick={() => handleClick(item)} key={item.name}
                className={` ${item.path === location.pathname ? "bg-primary-color text-white" : ""}
                  py-3 my-3 cursor-pointer hover:text-white hover:bg-primary-color px-5 rounded-md border-b`}>
                {/* <a href={item.path}>{item.title}</a> */}
                <p>{item.title}</p>
              </div>
            ))
          }
        </section>

        <section className='right lg:col-span-2 lg:pl-5 lg:pt-3 pt-2 pl-3 py-5'>
          <Routes>
            <Route path='/' element={<UserDetail />} />
            <Route path='/orders' element={<Orders />} />
            <Route path='/order/:orderId/:orderItemId' element={<OrderDetail />} />
            <Route path='/addresses' element={<Address />} />

          </Routes>
        </section>

      </div>

    </div>
  )
}

export default Account
