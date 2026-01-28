import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const productImg = [
    "https://cdn.dummyjson.com/product-images/beauty/essence-mascara-lash-princess/1.webp",
    "https://cdn.dummyjson.com/product-images/beauty/eyeshadow-palette-with-mirror/1.webp",
    "https://cdn.dummyjson.com/product-images/beauty/powder-canister/1.webp",
    "https://cdn.dummyjson.com/product-images/beauty/red-lipstick/1.web",
    "https://cdn.dummyjson.com/product-images/beauty/red-nail-polish/1.webp",
    'https://cdn.dummyjson.com/product-images/beauty/essence-mascara-lash-princess/thumbnail.webp'
    ,
    'https://cdn.dummyjson.com/product-images/beauty/eyeshadow-palette-with-mirror/1.webp'
    ,
    'https://cdn.dummyjson.com/product-images/furniture/annibale-colombo-sofa/thumbnail.webp'
];

export const fetchProducts = createAsyncThunk(
    "products/fetchProducts",
    async () => {

        console.log('yaha aa gya hu');

        const response = await axios.get(
            import.meta.env.VITE_BACKEND_URL + "/api/products",
        );
        const fetchedProducts = response.data;
        const processedProducts = fetchedProducts.map((product) => ({
            ...product,
            productImg: productImg[Math.floor(Math.random() * productImg.length)],
        }));

        console.log('got last ans', processedProducts);

        return processedProducts;
    }
);

const initialState = {
    products: [],
    isLoading: false,
}

const productsSlice = createSlice({
    name: 'products',
    initialState,
    reducers: {
        nextPage: () => {

        },
    },

    extraReducers: (builder) => {
        builder
            .addCase(fetchProducts.pending, (state) => {
                state.isLoading = true;
                state.error = null;
            })
            .addCase(fetchProducts.fulfilled, (state, action) => {

                console.log('oj jii', state);
                state.isLoading = false;

                state.products = action.payload;

            })
            .addCase(fetchProducts.rejected, (state, action) => {
                state.isLoading = false;
                state.error = action.error.message;
            });
    },

})

export const { nextPage } = productsSlice.actions;
export default productsSlice.reducer;


