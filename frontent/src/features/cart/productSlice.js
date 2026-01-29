import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { productImg } from "../../components/utils/productImage";

export const fetchProducts = createAsyncThunk(
    "products/fetchProducts",
    async () => {

        const response = await axios.get(
            import.meta.env.VITE_BACKEND_URL + "/api/products",
        );
        const fetchedProducts = response.data;
        const processedProducts = fetchedProducts.map((product) => ({
            ...product,
            productImg: productImg[Math.floor(Math.random() * productImg.length)],
        }));
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


