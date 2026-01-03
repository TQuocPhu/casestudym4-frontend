import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { Order, SellerOrderState } from "../../types/OrderTypes";
import { api } from "../../config/Api";

const initialState: SellerOrderState = {
    orders: [],
    loading: false,
    error: null,
};

export const fetchSellerOrders = createAsyncThunk<Order[], string>(
    "sellerOrder/fetchSellerOrders",
    async (jwt, { rejectWithValue }) => {
        try {
            const response = await api.get("/api/seller/orders", {
                headers: { Authorization: `Bearer ${jwt}` },
            });
            return response.data;
        } catch (error: any) {
            return rejectWithValue(error.response?.data?.message || "Không thể tải danh sách đơn hàng");
        }
    }
);

export const updateSellerOrderStatus = createAsyncThunk<
    Order,
    { jwt: string; orderId: number; status: string }
>(
    "sellerOrder/updateSellerOrderStatus",
    async ({ jwt, orderId, status }, { rejectWithValue }) => {
        try {
            // Khớp với @PatchMapping("/{orderId}/status/{orderStatus}")
            const response = await api.patch(
                `/api/seller/orders/${orderId}/status/${status}`,
                {},
                { headers: { Authorization: `Bearer ${jwt}` } }
            );
            return response.data;
        } catch (error: any) {
            return rejectWithValue(error.response?.data?.message || "Cập nhật trạng thái thất bại");
        }
    }
);

const sellerOrderSlice = createSlice({
    name: "sellerOrder",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            // Fetch Orders
            .addCase(fetchSellerOrders.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchSellerOrders.fulfilled, (state, action) => {
                state.loading = false;
                state.orders = action.payload;
            })
            .addCase(fetchSellerOrders.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload as string;
            })

            // Update Status
            .addCase(updateSellerOrderStatus.fulfilled, (state, action) => {
                state.loading = false;
                
                state.orders = state.orders.map((order) =>
                    order.id === action.payload.id ? action.payload : order
                );
            })
            .addCase(updateSellerOrderStatus.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload as string;
            });
    },
});

export default sellerOrderSlice.reducer;