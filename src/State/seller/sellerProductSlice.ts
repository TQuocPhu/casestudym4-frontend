import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { api } from "../../config/Api";
import { Product } from "../../types/ProductTypes";



export const fetchSellerProducts = createAsyncThunk<Product[], any>(
    "/sellerProduct/fetchSellerProducts",
    async (jwt, {rejectWithValue}) => {
        try {
            const response = await api.get(`/sellers/products`, {
                headers: {
                    Authorization: `Bearer ${jwt}`,
                },
            })
            
            const data = response.data;
            console.log(data)
            return data;
        } catch (error) {
            console.log("error: ", error);
            throw error;
        }
    }
)

export const createProduct = createAsyncThunk<Product, {request: any, jwt: string | null}>(
    "/sellerProduct/createProduct",
    async (args, {rejectWithValue}) => {
        const {request, jwt} = args;
        try {
            const response = await api.post(`/sellers/products`, request, {
                headers: {
                    Authorization: `Bearer ${jwt}`,
                },
            })
            console.log("product created: ",response.data)
            return response.data;

        } catch (error: any) {
            console.log("error: ", error);
            return rejectWithValue(
                error.response?.data?.message || "Tạo sản phẩm thất bại"
            );

        }
    }
)

interface SellerProductState {
    products: Product[]
    loading: boolean
    error: string | null | undefined
}

const initialState: SellerProductState = {
    products: [],
    loading: false,
    error: null,
}

const sellerProductSlice = createSlice({
    name: "sellerProduct",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
        // fetch
        .addCase(fetchSellerProducts.pending, (state) => {
            state.loading = true
        })
        .addCase(fetchSellerProducts.fulfilled, (state, action) => {
            state.loading = false;
            state.products = action.payload;
        })
        .addCase(fetchSellerProducts.rejected, (state, action) => {
            state.loading = false;
            state.error = action.error.message;
        })

        //create product

        .addCase(createProduct.pending, (state) => {
            state.loading = true
        })
        .addCase(createProduct.fulfilled, (state, action) => {
            state.loading = false;
            state.products.push(action.payload)
        })
        .addCase(createProduct.rejected, (state, action) => {
            state.loading = false;
            state.error = action.payload as string;
        })
    }
})

export default sellerProductSlice.reducer;
