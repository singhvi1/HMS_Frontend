import { createSelector, createSlice } from "@reduxjs/toolkit";
import toast from "react-hot-toast";

const initialState = {
  items: [],
  loading: true,
  error: null,
  filters: {
    search: "",
    branch: "",
    block: "",
    status: "",

  },
  pagination: {
    page: 1,
    limit: 10,
    pages: 1,
    total: 0,
  }
};

const studentsSlice = createSlice({
  name: "students",
  initialState,
  reducers: {
    setStudents: (state, action) => {
      state.items = action.payload.students;
      state.pagination = action.payload.pagination;
      state.loading = false;
      state.error = null;
    },
    setStudent: (state, action) => {
      const student = action.payload;
      const index = state.items.findIndex(r => r._id === student._id);
      if (index !== -1) {
        state.items[index] = student;
      } else {
        state.items.unshift(student);
        state.pagination.total += 1;
      }
    },
    setStudentStatus: (state, action) => {
      const { user_id, status } = action.payload;
      const student = state.items.find(s => s.user_id?._id === user_id)
      if (student) {
        student.user_id.status = status
      }
    },
    setStudentVerificationStatus: (state, action) => {
      const { user_id, studentData } = action.payload;
      // console.log(user_id, "this is userId", "status", studentData)
      const student = state.items.find(s => s.user_id?._id === user_id)
      // console.log(student, "from store student detail ")
      if (student) {

        student.verification_status = studentData?.verification_status;
        student.allotment_status = studentData.allotment_status;
        if (!student.room_id) {
          student.room_id = {};
        }

        if (studentData?.room_number) {
          student.room_id.room_number = studentData.room_number;
        }

        if (studentData?.capacity) {
          student.room_id.capacity = studentData.capacity;
        }

        if (studentData?.block) {
          student.room_id.block = studentData.block;
        }
        // console.log(student, "after updating store student detail ")
      } else {
        toast.error("No student Found ")
      }
    },
    removeStudent: (state, action) => {
      const user_id = action.payload;
      state.items = state?.items?.filter(s => s.user_id?._id.toString() !== user_id);
      state.pagination.total -= 1;
    },
    setStudentError: (state, action) => {
      state.error = action.payload;
      state.loading = false;
    },
    forceStudentRefresh: (state) => {
      state.loading = true;
      state.error = null;
    },
    setStudentsFilters: (state, action) => {
      state.filters = { ...state.filters, ...action.payload };
      state.pagination.page = 1;
      state.loading = true
      state.error = null;
    },
    setStudentsPage: (state, action) => {
      state.pagination.page = action.payload;
      state.loading = true;
      state.error = null;
    },
    setStudentsPageSize: (state, action) => {
      state.pagination.limit = action.payload;
      state.pagination.page = 1;
      state.loading = true
      state.error = null;
    },
    resetStudentsFilters: (state) => {
      state.filters = { ...initialState.filters }
      state.pagination = { ...initialState.pagination }
      state.loading = true;
      state.error = null;
    },
    resetStudents: () => initialState
  }
});

export const {
  setStudents,
  setStudent,
  setStudentsPageSize,
  setStudentStatus,
  setStudentVerificationStatus,
  removeStudent,
  setStudentError,
  forceStudentRefresh,
  setStudentsFilters,
  setStudentsPage,
  resetStudentsFilters,
  resetStudents,
} = studentsSlice.actions;





const selectStudentsState = (state) => state.students;
export const selectStudentByUserId = (id) => (state) => state.students.items.find((s) => s.user_id?._id === id);

export const selectStudentVerificationStatus = (id) => (state) => {
  const student = selectStudentByUserId(id)(state);

  return student?.verification_status;
};

export const selectStudentsItems = (state) => selectStudentsState(state).items
export const selectStudentsFilters = (state) => selectStudentsState(state).filters
export const selectStudentsPagination = (state) => selectStudentsState(state).pagination;
export const selectStudentsTotalCount = (state) => selectStudentsState(state).pagination.total

export const selectStudentAllState = createSelector(
  [selectStudentsState],
  (students) => ({
    items: students.items,
    loading: students.loading,
    error: students.error
  })
)
export const selectStudentPageData = createSelector([selectStudentsItems, selectStudentsPagination],
  (items, pagination) => ({
    items,
    page: pagination.page,
    limit: pagination.limit,
    pages: pagination.pages,
  }))

export default studentsSlice.reducer;
