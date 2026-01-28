import { configureStore } from "@reduxjs/toolkit";
import CartReducer from '../features/cart/cartSlice';
import ProductsReducer from '../features/cart/productSlice';
import AuthReducer from '../features/cart/authSlice'


export const store = configureStore({
    reducer: {
        Cart: CartReducer,
        Products:ProductsReducer,
        Auth: AuthReducer
    }
})