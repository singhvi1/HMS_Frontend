import { createSelector, createSlice } from "@reduxjs/toolkit";

const hostelSlice = createSlice({
    name: "hostel",
    initialState: {
        data: null,
        loading: true,
        allotmentLoading: true,
        error: null,
    },
    reducers: {
        setHostel: (state, action) => {
            state.data = action.payload;
            state.loading = false;
            state.error = null;

        },
        setLoading: (state, action) => {
            state.loading = action.payload;
        },
        setAllotmentLoading: (state, action) => {
            state.allotmentLoading = action.payload;
        },
        clearHostel: (state) => {
            state.data = null;
            state.loading = false;
            state.error = null;
        },
        setError(state, action) {
            state.error = action.payload;
            state.loading = false;
        },
        setAllotment: (state, action) => {
            if (!state.data) state.data = {};
            state.data.allotment_status = action.payload;
            state.allotmentLoading = false;
            state.error = null;
        },
        setAllotmentError: (state, action) => {
            state.error = action.payload;
            state.allotmentLoading = false;
        },

    }
})
export const { setHostel, setAllotment, clearHostel, setError, setLoading, setAllotmentLoading, setAllotmentError } = hostelSlice.actions;


const selectHostelState = (state) => state.hostel;

export const selectAllHostelState = createSelector(
    [selectHostelState],
    (hostel) => ({
        data: hostel?.data,
        allotment_status: hostel?.data?.allotment_status ?? null,
        loading: hostel?.loading ?? false,
        allotmentLoading: hostel?.allotmentLoading,
        error: hostel?.error,
    })
)

export const selectHostelAllotment = (state) => selectHostelState(state).data?.allotment_status ?? null;



export default hostelSlice.reducer;