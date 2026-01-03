import { Box, Divider } from "@mui/material";
import { teal } from "@mui/material/colors";
import React from "react";

const PricingCart = () => {
  return (
    <>
      <div className="space-y-3 p-5">
        <div className="flex justify-between items-center">
          <span>Tổng tiền hàng</span>
          <span>300000đ</span>
        </div>

        <div className="flex justify-between items-center">
          <span>Giảm giá</span>
          <span>100000đ</span>
        </div>

        <div className="flex justify-between items-center">
          <span>Phí giao hàng</span>
          <span>20000đ</span>
        </div>

        <div className="flex justify-between items-center">
          <span>Thuế</span>
          <Box sx={{ color: teal[500] }}>Miễn phí</Box>
        </div>
      </div>
      <Divider />

      <div className="flex justify-between items-center p-5 text-primary-color">
        <span className="font-semibold">Tổng tiền</span>
        <span>300000đ</span>
      </div>
    </>
  );
};

export default PricingCart;
