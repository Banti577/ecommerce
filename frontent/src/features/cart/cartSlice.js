import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    items: [],
}

const cartSlice = createSlice({
    name: 'cart',
    initialState,
    reducers: {
        addTOCart: (state, action) => {
            state.items.push(action.payload)

        },
        removeCart: (state, action) => {

            state.items = state.items.filter(
                (item) => item.productId !== action.payload
            );
        },
        clearCart: (state) => {
            state.items = [];
        },

    }
})

export const { addTOCart, removeCart, clearCart } = cartSlice.actions;
export default cartSlice.reducer;