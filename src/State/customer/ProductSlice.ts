import { createAsyncThunk, createSlice, isRejectedWithValue } from "@reduxjs/toolkit";
import { api } from "../../config/Api";
import { Product } from "../../types/ProductTypes";

const API_URL = "/products";

export const fetchProductById = createAsyncThunk("/products/fetchProductById" ,
    async(productId: number, {rejectWithValue}) => {
        try {
            const response = await api.get(`${API_URL}/${productId}`);

            const data = response.data;
            console.log(data)
            return data;
        } catch (error: any) {
            console.log("error", error);
            return rejectWithValue(error.message);
        }
    }
)

export const searchProduct = createAsyncThunk("/products/searchProduct" ,
    async(query, {rejectWithValue}) => {
        try {
            const response = await api.get(`${API_URL}/search`, {
                params: {
                    query,
                }
            });

            const data = response.data;
            console.log("search product data: ", data)
            return data;
        } catch (error: any) {
            console.log("error", error);
            return rejectWithValue(error.message);
        }
    }
)

export const fetchAllProducts = createAsyncThunk<any, any>("/products/fetchAllProducts" ,
    async(params, {rejectWithValue}) => {
        
        try {
            const response = await api.get(`${API_URL}`, {
                params: {
                    category: params.category,
                    ...params.newFilter,
                }
            });

            const data = response.data;
            console.log("All products data: ", response, params)
            return data;
        } catch (error: any) {
            console.log("error", error);
            return rejectWithValue(error.message);
        }
    }
)

interface ProductState {
    product: Product | null;
    products: Product[];
    totalPages: number;
    loading: boolean;
    error: string | null | undefined;
    searchProduct: Product[];
}

const initialState:ProductState = {
    product: null,
    products: [],
    totalPages: 1,
    loading: false,
    error: null,
    searchProduct: [],
}

const productSlice = createSlice({
    name: "products",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
        .addCase(fetchProductById.pending, (state) => {
            state.loading = true;
        })
        .addCase(fetchProductById.fulfilled, (state, action) => {
            state.loading = false;
            state.product = action.payload;
        })
        .addCase(fetchProductById.rejected, (state, action) => {
            state.loading = false;
            state.error = action.payload as string | null | undefined
        })

        //fetchAll
        .addCase(fetchAllProducts.pending, (state) => {
            state.loading = true;
        })
        .addCase(fetchAllProducts.fulfilled, (state, action) => {
            state.loading = false;
            state.products = action.payload.content;
        })
        .addCase(fetchAllProducts.rejected, (state, action) => {
            state.loading = false;
            state.error = action.payload as string | null | undefined
        })

        //search
        .addCase(searchProduct.pending, (state) => {
            state.loading = true;
        })
        .addCase(searchProduct.fulfilled, (state, action) => {
            state.loading = false;
            state.products = action.payload;
        })
        .addCase(searchProduct.rejected, (state, action) => {
            state.loading = false;
            state.error = action.payload as string | null | undefined
        })
    }
})

export default productSlice.reducer;