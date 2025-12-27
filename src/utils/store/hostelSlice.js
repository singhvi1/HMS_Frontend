import { createSlice } from "@reduxjs/toolkit";

const hostelSlice = createSlice({
    name: "hostel",
    initialState: {
        data: null,
        loading: true,
    },
    reducers: {
        setHostel: (state, action) => {
            state.data = action.payload;
            state.loading = false;

        },
        clearHostel: (state) => {
            state.data = null;
            state.loading = false;
        }

    }
})
export const { setHostel, clearHostel } = hostelSlice.actions;
export default hostelSlice.reducer;