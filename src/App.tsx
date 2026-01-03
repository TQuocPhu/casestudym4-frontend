import React, { useEffect } from "react";
import logo from "./logo.svg";
import { Button, ThemeProvider } from "@mui/material";
import AddShoppingCartIcon from "@mui/icons-material/AddShoppingCart";
import "./App.css";
import Navbar from "./customer/components/Navbar/Navbar";
import customeTheme from "./Theme/customeTheme";
import Home from "./customer/pages/Home/Home";
import Product from "./customer/pages/Product/Product";
import ProductDetails from "./customer/pages/PageDetails/ProductDetails";
import Review from "./customer/pages/Review/Review";
import Cart from "./customer/pages/Cart/Cart";
import Checkout from "./customer/pages/Checkout/Checkout";
import Account from "./customer/pages/Account/Account";
import { Route, Routes, useNavigate } from "react-router-dom";
import BecomeSeller from "./customer/pages/BecomeSeller/BecomeSeller";
import SellerDashboard from "./seller/pages/SellerDashboard/SellerDashboard";
import AdminDashboard from "./admin/pages/Dashboard/AdminDashboard";
import { fetchProducts } from "./State/fetchProduct";
import store, { useAppDispatch, useAppSelector } from "./State/Store";
import { fetchSellerProfile } from "./State/seller/sellerSlice";
import Auth from "./customer/pages/Auth/Auth";
import { fetchUserProfile } from "./State/AuthSlice";

function App() {

  const dispatch = useAppDispatch();
  // const { seller, auth } = useAppSelector(store => store)
  const auth = useAppSelector(state => state.auth);
  const seller = useAppSelector(state => state.seller);
  const navigate = useNavigate();

  useEffect(() => {
    dispatch(fetchSellerProfile(localStorage.getItem("jwt") || ""));
  }, [])

  useEffect(() => {

    if (seller.profile) {
      navigate("/seller")
    }
  }, [seller.profile])

  useEffect(() => {
    const jwt = localStorage.getItem("jwt");
    // Chỉ dispatch khi có jwt và chưa có thông tin user trong store
    if (jwt && !auth.user) {
      dispatch(fetchUserProfile({ jwt }));
    }
  }, [auth.jwt, auth.user, dispatch]); // Thêm auth.user để nó biết khi nào đã có dữ liệu rồi thì dừng

  // useEffect(() => {
  //   dispatch(fetchUserProfile({ jwt: auth.jwt || localStorage.getItem("jwt") }))
  // }, [auth.jwt])

  // console.log("Auth: ", auth)
  // console.log("Auth.User: ", auth.user)
  // console.log("Auth.jwt: ", auth.jwt)

  return (
    <ThemeProvider theme={customeTheme}>
      <div>

        <Navbar />
        <Routes>

          <Route path="/" element={<Home />} />
          <Route path="/products/:category" element={<Product />} />
          <Route path="/reviews/:productId" element={<Review />} />
          <Route path="/product-details/:categoryId/:name/:productId" element={<ProductDetails />} />
          <Route path="/login" element={<Auth />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/checkout" element={<Checkout />} />
          <Route path="/account/*" element={<Account />} />
          <Route path="/become-seller" element={<BecomeSeller />} />
          <Route path="/seller/*" element={<SellerDashboard />} />
          <Route path="/admin/*" element={<AdminDashboard />} />

        </Routes>
      </div>
    </ThemeProvider>
  );
}

export default App;
