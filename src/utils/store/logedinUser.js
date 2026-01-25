import { createSelector, createSlice } from "@reduxjs/toolkit";


const loggedinUser = createSlice({
    name: "loggedinUser",
    initialState: {
        user: null,
        loading: true,
        error: null,
    },
    reducers: {
        setLoggedinUser: (state, action) => {
            state.user = action.payload
            state.loading = false
            state.error = null
        },
        setError: (state, action) => {
            state.error = action.payload?.message || action.payload?.response?.data?.message
            state.loading = false
        },
        removeLoggedinUser: (state) => {
            state.user = null
            state.loading = true;
            state.error = null;
        }

    }
})
export const { setLoggedinUser, removeLoggedinUser, setError } = loggedinUser.actions;


const selectLoggedinUserState = (state) => state.loggedinUser;

export const selectLoggedinUserAllState = createSelector(
    [selectLoggedinUserState],
    (loggedinUser) => ({
        user: loggedinUser.user,
        loading: loggedinUser.loading,
        error: loggedinUser.error,
        id: loggedinUser?.user?._id,
        full_name: loggedinUser?.user?.full_name,
        email: loggedinUser?.user?.email,
        phone: loggedinUser?.user?.phone,
        role: loggedinUser?.user?.role,
        status: loggedinUser?.user?.status,
    })
)
export default loggedinUser.reducer;