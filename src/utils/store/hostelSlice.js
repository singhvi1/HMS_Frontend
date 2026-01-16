import { createSelector, createSlice } from "@reduxjs/toolkit";

const hostelSlice = createSlice({
    name: "hostel",
    initialState: {
        data: null,
        loading: true,
        allotmentLoading: false,
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
        },
        setAllotment: (state, action) => {
            if (state.data) {
                state.data.allotment = action.payload;
            }
        }

    }
})
export const { setHostel, setAllotment, clearHostel, setError, setLoading, setAllotmentLoading } = hostelSlice.actions;


const selectHostelState = (state) => state.hostel;
export const selectAllHostelState = createSelector(
    [selectHostelState],
    (hostel) => ({
        data: hostel.data,
        allotment: hostel?.data?.allotment,
        loading: hostel?.loading,
        allotmentLoading: hostel?.allotmentLoading,
        error: hostel?.error,
    })
)

export const selectHostelAllotment = (state) => selectHostelState(state).data?.allotment ;
export default hostelSlice.reducer;