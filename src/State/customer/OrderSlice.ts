import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { api } from "../../config/Api";
import { Order, OrderItem, OrderState } from "../../types/OrderTypes";
import { Address } from './../../types/UserTypes';

const initialState: OrderState = {
    orders: [],
    orderItem: null,
    currentOrder: null,
    paymentOrder: null,
    loading: false,
    error: null,
    orderCanceled: false,
};

// --- Thunks ---

// Tạo đơn hàng (Hỗ trợ cả COD và Stripe)
export const createOrder = createAsyncThunk<
    any, 
    { jwt: string; shippingAddress: Address; paymentMethod: string }
>(
    "order/createOrder",
    async ({ jwt, shippingAddress, paymentMethod }, { rejectWithValue }) => {
        try {
            const response = await api.post("/api/orders", shippingAddress, {
                headers: { Authorization: `Bearer ${jwt}` },
                params: { paymentMethod },
            });
            
            // Nếu là Stripe, backend trả về PaymentLinkResponse. Nếu COD trả về ApiResponse
            console.log("Order created: ", response.data);
            if (response.data.payment_link_url) {
                window.location.href = response.data.payment_link_url; // Chuyển hướng nếu là Stripe
            }
            return response.data;
        } catch (error: any) {
            return rejectWithValue(error.response?.data?.message || "Failed to create order");
        }
    }
);

// Lấy lịch sử đơn hàng của User
export const fetchUserOrderHistory = createAsyncThunk<Order[], string>(
    "order/fetchUserOrderHistory",
    async (jwt, { rejectWithValue }) => {
        try {
            const response = await api.get("/api/orders/user", {
                headers: { Authorization: `Bearer ${jwt}` },
            });
            return response.data;
        } catch (error: any) {
            return rejectWithValue(error.response?.data?.message || "Failed to fetch orders");
        }
    }
);

// Lấy chi tiết đơn hàng theo ID
export const fetchOrderById = createAsyncThunk<Order, { jwt: string; orderId: number }>(
    "order/fetchOrderById",
    async ({ jwt, orderId }, { rejectWithValue }) => {
        try {
            const response = await api.get(`/api/orders/${orderId}`, {
                headers: { Authorization: `Bearer ${jwt}` },
            });
            return response.data;
        } catch (error: any) {
            return rejectWithValue(error.response?.data?.message || "Order not found");
        }
    }
);

// --- Thunk cập nhật trạng thái đơn hàng ---
export const updateOrderStatus = createAsyncThunk<
    Order, 
    { jwt: string; orderId: number; orderStatus: string }
>(
    "order/updateOrderStatus",
    async ({ jwt, orderId, orderStatus }, { rejectWithValue }) => {
        try {
            
            const response = await api.put(`/api/orders/${orderId}/status`, {}, {
                headers: { Authorization: `Bearer ${jwt}` },
                params: { orderStatus },
            });
            return response.data;
        } catch (error: any) {
            return rejectWithValue(error.response?.data?.message || "Failed to update status");
        }
    }
);

// Hủy đơn hàng
export const cancelOrder = createAsyncThunk<Order, { jwt: string; orderId: number }>(
    "order/cancelOrder",
    async ({ jwt, orderId }, { rejectWithValue }) => {
        try {
            const response = await api.put(`/api/orders/${orderId}/cancel`, {}, {
                headers: { Authorization: `Bearer ${jwt}` },
            });
            return response.data;
        } catch (error: any) {
            return rejectWithValue(error.response?.data?.message || "Failed to cancel order");
        }
    }
);

// --- Slice ---

const orderSlice = createSlice({
    name: "order",
    initialState,
    reducers: {
        resetOrderState: (state) => {
            state.orderCanceled = false;
            state.error = null;
        }
    },
    extraReducers: (builder) => {
        builder
            // Create Order
            .addCase(createOrder.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(createOrder.fulfilled, (state, action) => {
                state.loading = false;
                state.paymentOrder = action.payload;
            })
            .addCase(createOrder.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload as string;
            })

            // Fetch History
            .addCase(fetchUserOrderHistory.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchUserOrderHistory.fulfilled, (state, action) => {
                state.loading = false;
                state.orders = action.payload;
            })
            .addCase(fetchUserOrderHistory.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload as string;
            })

            // Fetch Single Order
            .addCase(fetchOrderById.fulfilled, (state, action) => {
                state.currentOrder = action.payload;
            })

            .addCase(updateOrderStatus.fulfilled, (state, action) => {
    state.loading = false;
    state.orders = state.orders.map((order) =>
        order.id === action.payload.id ? action.payload : order
    );
    if (state.currentOrder?.id === action.payload.id) {
        state.currentOrder = action.payload;
    }
})

            // Cancel Order
            .addCase(cancelOrder.fulfilled, (state, action) => {
                state.orderCanceled = true;
                state.orders = state.orders.map((order) =>
                    order.id === action.payload.id ? action.payload : order
                );
                if (state.currentOrder?.id === action.payload.id) {
                    state.currentOrder = action.payload;
                }
            });
    },
});

export const { resetOrderState } = orderSlice.actions;
export default orderSlice.reducer;