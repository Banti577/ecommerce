import { Routes, Route, BrowserRouter } from "react-router-dom";
import { useDispatch } from "react-redux";
import { useEffect } from "react";

import "./App.css";

import { fetchProducts } from "./features/cart/productSlice";
import { checkAuth } from "./features/cart/authSlice";

import Navbar from "./components/Navbar";
import Home from "./components/Home";
import UserAuth from "./components/UserAuth";
import ProductDeteils from "./components/ProductDeteils";
import BagSummury from "./components/BagSummury";
import MyOrders from "./components/MyOrders";
import SellerDashboard from "./components/SellerDashboard";
import PageNotFound from "./components/PageNotFound";

function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchProducts());
  }, []);

  useEffect(() => {
    dispatch(checkAuth());
  }, []);

  return (
    <>
      <BrowserRouter>
        <Navbar />

        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/auth" element={<UserAuth />} />
          <Route path="/products/:id" element={<ProductDeteils />} />
          <Route path="/checkout/cart" element={<BagSummury />} />
          <Route path="/myorders" element={<MyOrders />} />
          <Route path="/seller/dashboard" element={<SellerDashboard />} />
          <Route path="*" element={<PageNotFound />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
