import { createSelector, createSlice } from "@reduxjs/toolkit";

const initialState = {
  items: [],
  loading: true,
  error: null,
  filters: {
    search: "",
    status: "",
    block: "",
    sid: "",
    category: "",
    room_number: "",
    student_search: "",
  },
  pagination: {
    page: 1,
    limit: 10,
    total: 0,
    pages: 1,
  }
};

const issuesSlice = createSlice({
  name: "issues",
  initialState,
  reducers: {

    setIssues: (state, action) => {
      const { issues, pagination } = action.payload;
      state.items = issues;
      state.pagination = pagination;
      state.loading = false;
      state.error = null;
    },
    setIssue: (state, action) => {
      const issue = action.payload;
      const index = state.items.findIndex(i => i._id === issue?._id);
      console.log(index, issue)
      if (index !== -1) {
        state.items[index] = issue
      } else {
        state.items.unshift(issue);
      }
    },
    setIssuesError: (state, action) => {
      state.loading = false;
      state.error = action.payload
    },
    forceIssuesRefresh: (state) => {
      state.loading = true;
      state.error = null;
    },
    updateIssueStatus: (state, action) => {
      const { id, status } = action.payload;
      const index = state.items.findIndex(i => i._id === id);
      if (index !== -1) {
        state.items[index].status = status;
      } else {
        return
      }
    },
    removeOneIssue: (state, action) => {
      const id = action.payload
      state.items = state?.items.filter(item => item?._id !== id)
      state.pagination.total = Math.max(0, state.pagination.total - 1);;
    },
    setIssuesFilters: (state, action) => {
      state.filters = { ...state.filters, ...action.payload };
      state.pagination.page = 1;
      state.loading = true;
      state.error = null;
    },
    setIssuesPage: (state, action) => {
      state.pagination.page = action.payload;
      state.loading = true;
      state.error = null;
    },
    setIssueslimit: (state, action) => {
      state.pagination.limit = action.payload;
      state.pagination.page = 1;
      state.loading = true;
      state.error = null;
    },
    resetIssuesFilters: (state) => {
      state.filters = initialState.filters;
      state.pagination = initialState.pagination;
      state.loading = true;
      state.error = null;
    },
    resetIssuesSlice: () => initialState
  }
});

export const {
  setIssues,
  setIssue,
  updateIssueStatus,
  removeOneIssue,
  setIssuesError,
  forceIssuesRefresh,
  resetIssuesSlice,
  setIssuesFilters,
  setIssuesPage,
  setIssueslimit,
  resetIssuesFilters
} = issuesSlice.actions;

const selectIssuesState = (state) => state.issues;
export const selectIssuesAllState = createSelector(
  [selectIssuesState],
  (issues) => ({
    items: issues.items,
    loading: issues.loading,
    error: issues.error,
  })
)
export const selectIssuesItems = (state) => selectIssuesState(state).items;
export const selectIssueById = (id) => (state) => state?.issues?.items.find(item => item._id === id);
export const selectIssuesFilters = (state) => selectIssuesState(state).filters;
export const selectIssuesPagination = (state) => selectIssuesState(state).pagination;
export const selectIssuesTotalCount = (state) => selectIssuesState(state).pagination.total;


export const selectIssuesPageData = createSelector(
  [selectIssuesPagination],
  (pagination) => ({
    page: pagination.page,
    limit: pagination.limit,
    total: pagination.total,
    pages: pagination.pages,
  })
);


export const selectIssuesPendingCount = createSelector(
  [selectIssuesItems],
  (items) => items.filter((i) => i.status === "pending").length
);

export default issuesSlice.reducer;
