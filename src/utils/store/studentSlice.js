import { createSelector, createSlice } from "@reduxjs/toolkit";
// import { students as mockStudents } from "../../../data";

const initialState = {
  items: [],

  filters: {
    search: "",
    branch: "",
    block: "",
    status: "",

  },
  pagination: {
    page: 1,
    pageSize: 10,
    totalItems: 0,
    totalPages: 1

  }
};

const studentsSlice = createSlice({
  name: "students",
  initialState,
  reducers: {
    setStudents: (state, action) => {
      state.items = action.payload.items;
      state.pagination.total = action.payload.pagination.total
      state.pagination.totalPages = action.payload.pagination.totalPages
      state.pagination.totalItems = action.payload.pagination.totalItems
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
export const selectStudentById = (id) => (state) => state.students.items.find((s) => s._id === id);

export const selectStudentsItems = (state) => selectStudentsState(state).items
export const selectStudentsFilters = (state) => selectStudentsState(state).filters
export const selectStudentsPagination = (state) => selectStudentsState(state).pagination;
export const selectStudentsTotalCount = (state) => selectStudentsState(state).pagination.totalItems


export const selectStudentPageData = createSelector([selectStudentsItems, selectStudentsPagination], (items, pagination) => ({
  items,
  page: pagination.page,
  pageSize: pagination.pageSize,
  totalPages: pagination.totalPages,
}))

export default studentsSlice.reducer;
