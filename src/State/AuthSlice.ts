import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { api } from "../config/Api";
import { Address, User } from "../types/UserTypes";



export const sendLoginSignupOtp = createAsyncThunk("/auth/sendLoginSignupOtp",
    async ({ email }: { email: string }, { rejectWithValue }) => {
        try {
            const response = await api.post("/auth/sent/login-signup-otp", { email })
            console.log("sent login otp: ", response);
        } catch (error) {
            console.log("error ", error)
        }
    }
);

export const signin = createAsyncThunk<any, any>("/auth/signin",
    async (loginRequest: { email: string, otp: string }, { rejectWithValue }) => {
        try {
            const response = await api.post("/auth/login", loginRequest)
            console.log("login: ", response.data);

            const jwt = response.data.token;
            localStorage.setItem("jwt", jwt);
            return jwt;
        } catch (error) {
            console.log("error ", error)
        }
    }
);

export const signup = createAsyncThunk<any, any>("/auth/signup",
    async (signupRequest: { email: string, otp: string }, { rejectWithValue }) => {
        try {
            const response = await api.post("/auth/signup", signupRequest)
            console.log("login: ", response.data);

            const jwt = response.data.token;
            localStorage.setItem("jwt", jwt);
            return jwt;
        } catch (error) {
            console.log("error ", error)
        }
    }
);

export const fetchUserProfile = createAsyncThunk<any, any>("/auth/fetchUserProfile",
    async ({ jwt }, { rejectWithValue }) => {
        try {
            const response = await api.get("/users/profile", {
                headers: {
                    Authorization: `Bearer ${jwt}`
                }
            })
            console.log("User Profile: ", response.data);

            return response.data;
        } catch (error) {
            console.log("error ", error)
        }
    }
);

export const updateUserAddress = createAsyncThunk<any, { jwt: string; address: any }>(
    "auth/updateUserAddress",
    async ({ jwt, address }, { rejectWithValue }) => {
        try {
            const response = await api.patch("/users/addresses", address, {
                headers: { Authorization: `Bearer ${jwt}` },
            });
            return response.data; // Trả về user đã cập nhật
        } catch (error: any) {
            return rejectWithValue(error.response?.data?.message || "Lỗi lưu địa chỉ");
        }
    }
);

export const logout = createAsyncThunk<any, any>("/auth/logout",
    async (navigate: (path: string) => void, { rejectWithValue }) => {
        try {
            localStorage.clear();
            console.log("logout success");
            navigate("/");
        } catch (error) {
            console.log("error: ", error);
        }
    }
)

interface AuthState {
    jwt: string | null,
    otpSent: boolean,
    isLoggedIn: boolean,
    user: User | null,
    loading: boolean,
    selectedAddress: Address | null;
}

const initialState: AuthState = {
    jwt: null,
    otpSent: false,
    isLoggedIn: false,
    user: null,
    loading: false,
    selectedAddress: null,
}

const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {
        setSelectedAddress: (state, action) => {
            state.selectedAddress = action.payload;
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(sendLoginSignupOtp.pending, (state) => {
                state.loading = true
            })
            .addCase(sendLoginSignupOtp.fulfilled, (state) => {
                state.loading = false
                state.otpSent = true
            })
            .addCase(sendLoginSignupOtp.rejected, (state) => {
                state.loading = false
            })

            .addCase(signin.fulfilled, (state, action) => {
                state.jwt = action.payload
                state.isLoggedIn = true
                // state.user = action.payload
            })
            .addCase(signup.fulfilled, (state, action) => {
                state.jwt = action.payload.token
                state.isLoggedIn = true
                // state.user = action.payload
            })

            .addCase(fetchUserProfile.fulfilled, (state, action) => {
                state.user = action.payload
                // state.isLoggedIn = true
            })
            .addCase(updateUserAddress.fulfilled, (state, action) => {
                state.user = action.payload;
                state.loading = false;
                if (action.payload.addresses && action.payload.addresses.length > 0) {
                    const newAddress = action.payload.addresses[action.payload.addresses.length - 1];
                    state.selectedAddress = newAddress;
                }
            })
            .addCase(logout.fulfilled, (state) => {
                state.jwt = null
                state.isLoggedIn = false
                state.user = null
            })
    }
})

export const { setSelectedAddress } = authSlice.actions;
export default authSlice.reducer;