import { createSelector, createSlice } from "@reduxjs/toolkit";
import { students as mockStudents } from "../../../data";

const initialState = {
  items: mockStudents,
  filters: {
    search: "",
    branch: "",
    block: "",
    status: ""
  },
  pagination: {
    page: 1,
    pageSize: 10
  }
};

const studentsSlice = createSlice({
  name: "students",
  initialState,
  reducers: {
    setStudents: (state, action) => {
      state.items = action.payload;
    },
    setStudentsFilters: (state, action) => {
      state.filters = { ...state.filters, ...action.payload };
      state.pagination.page = 1;
    },
    setStudentsPage: (state, action) => {
      state.pagination.page = action.payload;
    },
    setStudentsPageSize: (state, action) => {
      state.pagination.pageSize = action.payload;
      state.pagination.page = 1;
    },
    resetStudentsFilters: (state) => {
      state.filters = initialState.filters;
      state.pagination = initialState.pagination;
    }
  }
});

export const {
  setStudents,
  setStudentsFilters,
  setStudentsPage,
  setStudentsPageSize,
  resetStudentsFilters
} = studentsSlice.actions;

const selectStudentsState = (state) => state.students;
export const selectStudentsItems = (state) => selectStudentsState(state).items;
export const selectStudentsFilters = (state) => selectStudentsState(state).filters;
export const selectStudentsPagination = (state) => selectStudentsState(state).pagination;

export const selectStudentsFiltered = createSelector(
  [selectStudentsItems, selectStudentsFilters],
  (items, filters) => {
    const search = filters.search.trim().toLowerCase();
    return items.filter((s) => {
      const name = (s.name || s.user_id?.full_name || "").toLowerCase();
      const sid = (s.sid || "").toLowerCase();
      const email = (s.user_id?.email || "").toLowerCase();
      const branch = (s.branch || "").toLowerCase();
      const block = (s.block || "").toLowerCase();
      const status = (s.status || s.user_id?.status || "").toLowerCase();
      const room = (s.room || "").toLowerCase();
      const roomNumber =
        s.room_number === undefined || s.room_number === null
          ? ""
          : String(s.room_number).toLowerCase();

      const matchesSearch =
        !search ||
        name.includes(search) ||
        sid.includes(search) ||
        email.includes(search) ||
        branch.includes(search) ||
        room.includes(search) ||
        roomNumber.includes(search);

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

export const selectStudentsPageData = createSelector(
  [selectStudentsFiltered, selectStudentsPagination],
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

export const selectStudentsTotalCount = createSelector(
  [selectStudentsItems],
  (items) => items.length
);

export default studentsSlice.reducer;
