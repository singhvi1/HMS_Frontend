import { createSelector, createSlice } from "@reduxjs/toolkit";
const initialState = {
    student: null,
    loading: true,
};
const studentProfile = createSlice({
    initialState: initialState,
    name: "studentProfile",
    reducers: {
        setStudent: (state, action) => {
            state.student = action.payload;
            state.loading = false;
        },
        setStudentProfile: (state, action) => {
            if (!state.student) return;
            state.student = { ...state.student, ...action.payload };
        },
        reSetStudent: () => {
            return initialState;
        }
    }
})
export const { setStudent, setStudentProfile, reSetStudent } = studentProfile.actions;


const studentProfileState = (state) => state?.studentProfile;
export const selectAllstudentProfileState = createSelector(
    [studentProfileState],
    (studentProfile) => ({
        student: studentProfile.student,
        loading: studentProfile.loading,
    })
)
export default studentProfile.reducer;