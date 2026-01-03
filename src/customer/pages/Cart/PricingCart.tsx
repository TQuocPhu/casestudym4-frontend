import { Box, Divider } from "@mui/material";
import { teal } from "@mui/material/colors";
import React from "react";
import { Cart } from "../../../types/CartTypes";

interface PricingCartProps {
  cart: Cart;
}

const PricingCart = ({ cart }: PricingCartProps) => {

  const totalMrpPrice = cart?.totalMrpPrice || 0;
  const totalSellingPrice = cart?.totalSellingPrice || 0;
  const totalItem = cart?.totalItem || 0;
  const discountAmount = totalMrpPrice - totalSellingPrice;

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('vi-VN', {
      style: 'currency',
      currency: 'VND'
    }).format(amount);
  };


  return (
    <>
      <div className="space-y-3 p-5">
        <div className="flex justify-between items-center">
          <span>Tổng tiền hàng ({totalItem} sản phẩm)</span>
          <span>{formatCurrency(totalMrpPrice)}</span>
        </div>

        <div className="flex justify-between items-center">
          <span>Giảm giá trực tiếp</span>
          <span className="text-green-600">
            -{formatCurrency(discountAmount)}
          </span>
        </div>

        <div className="flex justify-between items-center">
          <span>Phí giao hàng</span>
          <span className="text-gray-500">Miễn phí</span>
        </div>

        <div className="flex justify-between items-center">
          <span>Thuế (VAT)</span>
          <Box sx={{ color: teal[500] }}>Đã bao gồm</Box>
        </div>
      </div>

      <Divider />

      <div className="flex justify-between items-center p-5 text-primary-color font-bold text-lg">
        <span className="text-gray-800">Tổng thanh toán</span>
        <span className="text-red-600">{formatCurrency(totalSellingPrice)}</span>
      </div>
    </>
  );
};

export default PricingCart;
