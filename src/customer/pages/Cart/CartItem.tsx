import React from "react";
import { Button, Divider, IconButton } from "@mui/material";
import RemoveIcon from "@mui/icons-material/Remove";
import AddIcon from "@mui/icons-material/Add";
import Close from "@mui/icons-material/Close";
import { type CartItem as CartItemType } from "../../../types/CartTypes";
import { useAppDispatch } from "../../../State/Store";
import { deleteCartItem, updateCartItem } from "../../../State/customer/CartSlice";

const CartItem = ({ item }: { item: CartItemType }) => {

  const dispatch = useAppDispatch();

  const handleUpdateQuantity = (value: number) => () => {
    dispatch(updateCartItem({ jwt: localStorage.getItem("jwt"), cartItemId: item.id, cartItem: { quantity: item.quantity + value } }))
  };

  const handleDeleteItem = () => {
    const jwt = localStorage.getItem("jwt");
    if (jwt) {
      dispatch(deleteCartItem({ jwt, cartItemId: item.id }));
    }
  };

  return (
    <div className="border rounded-md relative">
      <div className="flex p-5 gap-3">
        <div>
          <img className="w-[90px] rounded-md" src={item.product.images[0]} alt="" />
        </div>

        <div className="space-y-2">
          <h1 className="font-semibold text-lg">{item.product.seller?.businessDetails.businessName}</h1>

          <p className="text-gray-600 font-medium text-sm">{item.product.title}</p>

          <p className="text-gray-400 text-xs">
            <strong>Bởi: </strong> {item.product.seller?.sellerName}
          </p>

          <p className="text-sm">Có thể hoàn trả trước 7 ngày</p>

          <p className="text-sm text-gray-500">
            <strong>Số lượng: </strong> {item.quantity}
          </p>
        </div>
      </div>
      <Divider />

      <div className="flex justify-between items-center">
        <div className="px-5 py-2 flex justify-between items-center">
          <div className="flex items-center gap-2 w-[140px] justify-between">
            <Button
              // disabled={true} 
              onClick={handleUpdateQuantity(-1)}>
              <RemoveIcon />
            </Button>

            <span>{item.quantity}</span>

            <Button onClick={handleUpdateQuantity(1)}>
              <AddIcon />
            </Button>
          </div>
        </div>
        <div className="pr-5">
          <p className="text-gray-700 font-medium">{(item.sellingPrice).toLocaleString('vi', { style: 'currency', currency: 'VND' })}</p>
        </div>
      </div>
      <div className="absolute top-1 right-1">
        <IconButton color="primary" onClick={handleDeleteItem}>
          <Close />
        </IconButton>
      </div>
    </div>
  );
};

export default CartItem;
