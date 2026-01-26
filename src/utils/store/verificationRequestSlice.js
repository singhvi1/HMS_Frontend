import { createSlice, createSelector } from "@reduxjs/toolkit";
import toast from "react-hot-toast";

const initialState = {
    items: [],
    loading: true,
    error: null,
    pagination: {
        page: 1,
        limit: 10,
        pages: 1,
        total: 0,
    },
    filters: {
        search: "",
        phase: "",
        verification_status: ""
    },

    forceRefresh: 0
};

const verificationRequestSlice = createSlice({
    name: "verificationRequest",
    initialState,
    reducers: {
        setVerificationRequestsLoading(state, action) {
            state.loading = action.payload;
        },

        setVerificationRequests(state, action) {
            const { data = [], pagination = {} } = action.payload;
            // console.log(data, "this is data")
            state.items = data;
            state.pagination.page = pagination.page ?? 1;
            state.pagination.limit = pagination.limit ?? state.pagination.limit;
            state.pagination.pages = pagination.totalPages ?? 1;
            state.pagination.total = pagination.total ?? 0;
            state.loading = false;
            state.error = null;
            // console.log(state.items)
        },

        setVerificationRequestsError(state, action) {
            state.error = action.payload;
            state.loading = false;
        },

        setVerificationRequestsPage(state, action) {
            state.pagination.page = action.payload;
            state.loading = true;
        },

        setVerificationRequestsPageSize(state, action) {
            state.pagination.limit = action.payload;
            state.pagination.page = 1;
            state.loading = true;
        },

        setVerificationRequestsFilters(state, action) {
            state.filters = { ...state.filters, ...action.payload };
            state.pagination.page = 1;
            state.loading = true;
        },

        forceVerificationRequestRefresh(state) {
            state.forceRefresh += 1;
            state.loading = true;
            state.error = null;
        },
        setVerificationStatus: (state, action) => {
            const { user_id, status } = action.payload;
            // console.log(user_id, "this is userId", "status", status)
            const student = state.items.find(s => s.student.user_id === user_id)
            // console.log(student, "from store student detail ")
            if (student) {
                student.verification_status = status
            } else {
                toast.error("No student Found ")
            }
        },
    }
});

export const {
    setVerificationRequests,
    setVerificationRequestsError,
    setVerificationRequestsFilters,
    setVerificationRequestsLoading,
    setVerificationRequestsPage,
    setVerificationRequestsPageSize,
    forceVerificationRequestRefresh,
    setVerificationStatus
} = verificationRequestSlice.actions;


const selectVerificationRequestsState = (state) => state.verificationRequest;

export const selectVerificationRequestsItems = (state) => selectVerificationRequestsState(state)?.items

export const selectVerificationRequestsFilters = (state) => selectVerificationRequestsState(state)?.filters

export const selectVerificationRequestsPagination = (state) => selectVerificationRequestsState(state)?.pagination;

export const selectStudentsTotalCount = (state) => selectVerificationRequestsState(state).pagination.total




export const selectVerificationRequestsPageData = createSelector(
    [
        (state) => state.verificationRequest.items,
        (state) => state.verificationRequest.pagination.page,
        (state) => state.verificationRequest.pagination.limit,
        (state) => state.verificationRequest.pagination.total,
    ],
    (items, page, limit, total) => ({
        items,
        page,
        limit,
        pages: Math.ceil(total / limit),
    })
);


export const selectVerificationRequestsMeta = createSelector(
    [selectVerificationRequestsState],
    (verificationRequest) => ({
        items: verificationRequest?.items,
        loading: verificationRequest?.loading,
        error: verificationRequest?.error
    })
);




export default verificationRequestSlice.reducer;

