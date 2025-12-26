import { createSelector, createSlice } from "@reduxjs/toolkit";
import { leaves as mockLeaves } from "../../../data";

const initialState = {
  items: mockLeaves,
  filters: {
    search: "",
    branch: "",
    block: "",
    status: "",
  },
  pagination: {
    page: 1,
    pageSize: 10,
  },
};

const leaveSlice = createSlice({
  name: "leaves",
  initialState,
  reducers: {
    setLeaveFilters(state, action) {
      state.filters = { ...state.filters, ...action.payload };
      state.pagination.page = 1;
    },
    setLeavePage(state, action) {
      state.pagination.page = action.payload;
    },
    setLeavePageSize(state, action) {
      state.pagination.pageSize = action.payload;
      state.pagination.page = 1;
    },
    updateLeaveStatus(state, action) {
      const leave = state.items.find((l) => l._id === action.payload.id);
      if (leave) leave.status = action.payload.status;
    },
  },
});

export const {
  setLeaveFilters,
  setLeavePage,
  setLeavePageSize,
  updateLeaveStatus,
} = leaveSlice.actions;

const selectLeavesState = (state) => state.leaves;
export const selectLeaveFilters = (state) => selectLeavesState(state).filters;
export const selectLeavePagination = (state) =>
  selectLeavesState(state).pagination;
export const selectLeaveItems = (state) => selectLeavesState(state).items;

export const selectLeavesFiltered = createSelector(
  [selectLeaveItems, selectLeaveFilters],
  (items, filters) => {
    const search = filters.search.toLowerCase().trim();

    return items.filter((l) => {
      const name = (l.full_name || "").toLowerCase();
      const sid = (l.sid || "").toLowerCase();
      const branch = (l.branch || "").toLowerCase();
      const block = (l.block || "").toLowerCase();
      const status = (l.status || "").toLowerCase();
      const room = (l.room_number || "").toLowerCase();

      const matchesSearch =
        !search ||
        name.includes(search) ||
        sid.includes(search) ||
        room.includes(search);

      const matchesBranch =
        !filters.branch || branch === filters.branch.toLowerCase();
      const matchesBlock =
        !filters.block || block === filters.block.toLowerCase();
      const matchesStatus =
        !filters.status || status === filters.status.toLowerCase();

      return matchesSearch && matchesBranch && matchesBlock && matchesStatus;
    });
  }
);

export const selectLeavePageData = createSelector(
  [selectLeavesFiltered, selectLeavePagination],
  (filtered, pagination) => {
    const total = filtered.length;
    const pageSize = pagination.pageSize;
    const totalPages = Math.max(1, Math.ceil(total / pageSize));
    const page = Math.min(Math.max(1, pagination.page), totalPages);
    const start = (page - 1) * pageSize;

    return {
      page,
      pageSize,
      totalPages,
      items: filtered.slice(start, start + pageSize),
    };
  }
);

export default leaveSlice.reducer;