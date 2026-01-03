import { Box, Button } from '@mui/material'
import React from 'react'
import { useNavigate } from 'react-router-dom'
import OrderStepper from './OrderStepper';
import { Divider } from '@mui/material';
import { Payment } from '@mui/icons-material';

const OrderDetail = () => {
    const navigate = useNavigate();
    return (
        <Box className='space-y-5'>

            <section className='flex flex-col gap-5 justify-center items-center'>

                <img className='w-[100px]'
                    src={""} alt="" />

                <div className='text-sm space-y-1 text-center'>

                    <h1 className='font-bold'>{"Bussiness Name"}</h1>

                    <p>{"Tên sản phẩm"}</p>

                    <p><strong>Size: </strong> M </p>

                </div>

                <div>
                    <Button onClick={() => navigate(`/reviews/${5}/create`)}>
                        Viết Đánh Giá
                    </Button>
                </div>

            </section>

            <section className='border p-5'>

                <OrderStepper orderStatus={"SHIPPED"} />

            </section>

            <div className='border p-5'>

                <h1 className='font-bold pb-3'>
                    Địa chỉ giao hàng
                </h1>

                <div className='text-sm space-y-2'>

                    <div className='flex gap-5 font-medium'>

                        <p>{`shippingAddress Name`}</p>

                        <Divider flexItem orientation='vertical' />

                        <p>{`shipping address mobile`}</p>
                    </div>

                    <p>
                        {`shipping address address`},
                        {`s................ city`},
                        {`s................ state`},
                        {`s................ pinCode`},
                    </p>

                </div>

            </div>

            <div className='border space-y-4'>

                <div className='flex justify-between text-sm pt-5 px-5'>

                    <div className='space-y-1'>

                        <p className='font-bold'>
                            Tổng tiền sản phẩm
                        </p>

                        <p>
                            Bạn cần thanh toán <span className='text-green-500 font-medium text-xs'>{`1000000 đ`}</span> cho đơn hàng này
                        </p>

                    </div>

                    <p className='font-medium'>{`tiền selling`}</p>

                </div>

                <div className='px-5'>

                    <div className='bg-teal-50 px-5 py-2 text-xs font-medium flex items-center gap-3'>
                        <Payment />
                        <p>Thanh toán khi nhận hàng</p>
                    </div>

                </div>

                <Divider />

                <div className='px-5 pb-5'>

                    <p className="text-xs"><strong>Bởi: </strong>{`tên bussinessName của seller`}</p>

                </div>

                <div className="p-10">

                    <Button
                        disabled={true}
                        // disabled={Orders.currentOrder?.orderStatus === 'CANCELLED'}
                        // onClick={handleCancelOrder}
                        color='error' sx={{ py: "0.7rem" }} className='' variant='outlined'
                        fullWidth
                    >
                        Cancel Order
                        {/* {orders.currentOrder?.orderStatus === 'CANCELLED' ? 'order canceled' : 'Cancel Order'} */}
                    </Button>

                </div>

            </div>

        </Box>
    )
}

export default OrderDetail
