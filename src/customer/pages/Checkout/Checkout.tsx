import { Box, Button, Modal } from "@mui/material";
import React from "react";
import AddressCard from "./AddressCard";
import AddressForm from './AddressForm';
import PricingCart from "../Cart/PricingCart";
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import { useAppDispatch, useAppSelector } from "../../../State/Store";
import { createOrder } from "../../../State/customer/OrderSlice";
import { setSelectedAddress } from "../../../State/AuthSlice";
import { Address } from './../../../types/UserTypes';

const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    // width: 400,
    width: { xs: '90%', sm: 700 },
    bgcolor: 'background.paper',
    border: '2px solid #000',
    borderRadius: 2,
    boxShadow: 24,
    p: 4,
};

const paymentList = [
    {
        value: "COD",
        image: "https://static.vecteezy.com/system/resources/previews/030/740/487/large_2x/cash-on-delivery-logo-free-png.png",
        label: "COD"
    },

    {
        value: "STRIPE",
        image: "https://tse4.mm.bing.net/th/id/OIP.-0ZEoJbMXMKb0zYxm1BkIQHaDh?pid=Api&P=0&h=180",
        label: "STRIPE"
    },
]

const Checkout = () => {
    const [open, setOpen] = React.useState(false);
    const [payment, setPayment] = React.useState("COD");

    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);
    const handlePaymentChange = (event: any) => { setPayment(event.target.value) }

    const { auth, cart } = useAppSelector(store => store);
    const dispatch = useAppDispatch();

    const handleAddressChange = (address: Address) => {
        dispatch(setSelectedAddress(address));
    };

    const handlePlaceOrder = () => {
        const jwt = localStorage.getItem("jwt");

        if (!jwt || !auth.selectedAddress) {
            alert("Vui lòng chọn địa chỉ giao hàng!");
            return;
        }

        dispatch(createOrder({
            jwt,
            shippingAddress: auth.selectedAddress,
            paymentMethod: payment,
        }));
    };

    return (
        <>
            <div className="pt-10 px-5 sm:px-10 md:px-44 lg:px-60 min-h-screen">
                <div className="space-y-5 lg:space-y-0 lg:grid gird grid-cols-3 lg:gap-9">
                    <div className="col-span-2 space-y-5">
                        <div className="flex justify-between items-center">
                            <h1 className="font-semibold">Chọn địa chỉ giao hàng</h1>
                            <Button onClick={handleOpen}>Thêm địa chỉ mới</Button>
                        </div>
                        <div className="text-xs font-medium space-y-5">
                            <p>Các địa chỉ đã lưu</p>
                            <div className="space-y-3">
                                {auth.user?.addresses?.map((item: Address) => (
                                    <AddressCard
                                        key={item.id}
                                        address={item}
                                        // So sánh ID từ object trong Redux
                                        selectedValue={auth.selectedAddress?.id ?? null}
                                        // Truyền cả object address để lưu vào store
                                        onChange={() => handleAddressChange(item)}
                                    />
                                ))}
                            </div>
                        </div>

                        <div className="py-4 px-5 rounded-md border">
                            <Button onClick={handleOpen}>Thêm địa chỉ mới</Button>
                        </div>
                    </div>

                    <div>
                        <div>
                            <div className="space-y-3 border p-5 rounded-md">
                                <h1 className="text-center text-primary-color font-medium pb-2 italic">
                                    Chọn phương thức thanh toán
                                </h1>
                                <RadioGroup
                                    row
                                    aria-labelledby="demo-row-radio-buttons-group-label"
                                    name="row-radio-buttons-group"
                                    className="flex justify-between pr-0"
                                    onChange={handlePaymentChange}
                                    value={payment}
                                >

                                    {paymentList.map((item) =>
                                        <FormControlLabel
                                            className="border w-[45%] p-2 rounded-md flex justify-center"
                                            value={item.value}
                                            control={<Radio />}
                                            label={
                                                <img
                                                    className={`${item.value === 'stripe' ? 'w-14' : ''} object-cover`}
                                                    src={item.image} alt={item.label} />
                                            } />)

                                    }

                                </RadioGroup>
                            </div>
                        </div>
                        <div className="border rounded-md">

                            {cart.cart && <PricingCart cart={cart.cart} />}
                            <div className="p-5">
                                <Button
                                    onClick={handlePlaceOrder}
                                    fullWidth
                                    variant="contained"
                                    disabled={!auth.selectedAddress}
                                    sx={{ py: "11px", bgcolor: "#007bff" }}
                                >
                                    Xác nhận đặt hàng
                                </Button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <Modal
                open={open}
                onClose={handleClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Box sx={style}>
                    <AddressForm handleClose={handleClose} />
                </Box>
            </Modal>
        </>
    );
};

export default Checkout;
