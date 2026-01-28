import { Routes, Route, BrowserRouter } from "react-router-dom";
import "./App.css";
import Home from "./components/Home";
import Navbar from "./components/Navbar";
import UserAuth from "./components/UserAuth";
import ProductDeteils from "./components/ProductDeteils";
import BagSummury from "./components/BagSummury";
import { fetchProducts } from "./features/cart/productSlice";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { checkAuth } from "./features/cart/authSlice";
import MyOrders from "./components/MyOrders";


function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchProducts());
  }, []);

  useEffect(() => {
    dispatch(checkAuth());
  }, []);

  const user = useSelector((store) => store.Auth.user);

  console.log("user from  backenf is", user);
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
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
