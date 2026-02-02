import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    items: [],
}

const cartSlice = createSlice({
    name: 'cart',
    initialState,
    reducers: {
        addTOCart: (state, action) => {
            const incomingItem = action.payload;

            const existingItem = state.items.find(
                (item) => item.productId === incomingItem.productId
            );

            if (existingItem) {
                existingItem.quantity += 1;
            } else {
                state.items.push({ ...incomingItem, quantity: 1 });
            }
        },

        removeCart: (state) => {

            state.items = [];
        },
        clearCart: (state) => {
            state.items = [];
        },

    }
})

export const { addTOCart, removeCart, clearCart } = cartSlice.actions;
export default cartSlice.reducer;