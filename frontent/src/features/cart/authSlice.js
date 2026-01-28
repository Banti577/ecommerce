import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

export const checkAuth = createAsyncThunk(
    "auth/getUser",
    async () => {

        try {
            const res = await fetch(`${import.meta.env.VITE_BACKEND_URL}/user`, {
                credentials: "include",
            });
            const data = await res.json();

            return data.user;
        }
        catch (err) {
            console.error("Error fetching user:", err);

        }
    }
);

const initialState = {
    user: null,
    isLoading: false,
}

const authSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
       
    },

    extraReducers: (builder) => {
        builder
            .addCase(checkAuth.pending, (state) => {
                state.isLoading = true;
                state.error = null;
            })
            .addCase(checkAuth.fulfilled, (state, action) => {

                state.user = action.payload;

                state.isLoading = false;

                state.products = action.payload;

            })
            .addCase(checkAuth.rejected, (state, action) => {
                state.isLoading = false;
                state.error = action.error.message;
            });
    },

})

export const { logout } = authSlice.actions;
export default authSlice.reducer;


