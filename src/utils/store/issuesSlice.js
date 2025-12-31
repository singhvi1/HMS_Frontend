import { createSelector, createSlice } from "@reduxjs/toolkit";
import { issueList as mockIssues } from "../../../data";

const initialState = {
  items: mockIssues,
  filters: {
    search: "",
    status: "",
    priority: "",
    block: "",
  },
  pagination: {
    page: 1,
    pageSize: 10
  }
};

const issuesSlice = createSlice({
  name: "issues",
  initialState,
  reducers: {
    setIssues: (state, action) => {
      state.items = action.payload;
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

export const selectIssuesFiltered = createSelector(
  [selectIssuesItems, selectIssuesFilters],
  (items, filters) => {
    const search = filters.search.trim().toLowerCase();
    return items.filter((issue) => {
      const title = (issue.title || "").toLowerCase();
      const description = (issue.description || "").toLowerCase();
      const issueId = (issue.issue_id || "").toLowerCase();
      const studentName = (issue.student_name || "").toLowerCase();
      const status = (issue.status || "").toLowerCase();
      const priority = (issue.priority || "").toLowerCase();
      const block = (issue.block || "").toLowerCase();
      const category = (issue.category || "").toLowerCase();
      const matchesSearch =
        !search ||
        title.includes(search) ||
        description.includes(search) ||
        issueId.includes(search) ||
        studentName.includes(search) ||
        category.includes(search);

      const matchesStatus = !filters.status || status === filters.status.toLowerCase();
      const matchesBlock = !filters.block || block === filters.block.toLowerCase();
      const matchesPriority = !filters.priority || priority === filters.priority.toLowerCase();

      return matchesSearch && matchesStatus && matchesPriority && matchesBlock;
    });
  }
);

export const selectIssuesPageData = createSelector(
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
);

export const selectIssuesPendingCount = createSelector(
  [selectIssuesItems],
  (items) => items.filter((i) => i.status === "pending").length
);

export default issuesSlice.reducer;
