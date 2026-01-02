import { createSelector, createSlice } from "@reduxjs/toolkit";
import { issueList as mockIssues } from "../../../data";

const initialState = {
  items: [],
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
    pageSize: 10,
    total: 0,
    totalPages: 1,
  }
};

const issuesSlice = createSlice({
  name: "issues",
  initialState,
  reducers: {
    setIssues: (state, action) => {
      state.items = action.payload.issues
      state.pagination.total = action.payload.pagination.total;
      state.pagination.totalPages = action.payload.pagination.pages;
    },

    setIssuesFilters: (state, action) => {
      state.filters = { ...state.filters, ...action.payload };
      state.pagination.page = 1;
    },
    setIssuesPage: (state, action) => {
      state.pagination.page = action.payload;
    },
    setIssuesPageSize: (state, action) => {
      state.pagination.pageSize = action.payload;
      state.pagination.page = 1;
    },
    resetIssuesFilters: (state) => {
      state.filters = initialState.filters;
      state.pagination = initialState.pagination;
    }
  }
});

export const {
  setIssues,
  setIssuesFilters,
  setIssuesPage,
  setIssuesPageSize,
  resetIssuesFilters
} = issuesSlice.actions;

const selectIssuesState = (state) => state.issues;
export const selectIssuesItems = (state) => selectIssuesState(state).items;
export const selectIssuesFilters = (state) => selectIssuesState(state).filters;
export const selectIssuesPagination = (state) => selectIssuesState(state).pagination;
export const selectIssuesTotalCount = (state) => selectIssuesState(state).pagination.total;

/*export const selectIssuesFiltered = createSelector(
  [selectIssuesItems, selectIssuesFilters],
  (items, filters) => {
    const search = filters.search.trim().toLowerCase();
    return items.filter((issue) => {
      const title = (issue?.title || "").toLowerCase();
      const description = (issue?.description || "").toLowerCase();
      const status = (issue?.status || "").toLowerCase();
      const block = (issue?.block || "").toLowerCase();
      const category = (issue?.category || "").toLowerCase();
      const sid = (issue?.sid || "").toLowerCase();
      const room_number = (issue?.room_number || "");

      const matchesSearch =
        !search ||
        title.includes(search) ||
        description.includes(search);

      const matchesStatus = !filters.status || status === filters.status.toLowerCase();
      const matchesBlock = !filters.block || block === filters.block.toLowerCase();
      const matchescategory = !filters.category || category === filters.category.toLowerCase();
      const matchesSid = !filters.sid || sid === filters.sid.toLowerCase();
      const matchesRoom_number = !filters.room_number || room_number === filters.room_number;

      return matchesSearch && matchesStatus && matchesBlock && matchescategory && matchesSid && matchesRoom_number;
    });
  }
);*/

/*export const selectIssuesPageData = createSelector(
  [selectIssuesFiltered, selectIssuesPagination],
  (filtered, pagination) => {
    const total = filtered.length;
    const pageSize = pagination.pageSize;
    const totalPages = Math.max(1, Math.ceil(total / pageSize));
    const page = Math.min(Math.max(1, pagination.page), totalPages);
    const start = (page - 1) * pageSize;
    const end = start + pageSize;

    return {
      page,
      pageSize,
      total,
      totalPages,
      items: filtered.slice(start, end)
    };
  }
);*/

export const selectIssuesPendingCount = createSelector(
  [selectIssuesItems],
  (items) => items.filter((i) => i.status === "pending").length
);

export default issuesSlice.reducer;
