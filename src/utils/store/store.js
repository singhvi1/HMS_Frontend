import { configureStore } from "@reduxjs/toolkit";
import studentReducer from "./studentSlice"
import roomsReducer from "./roomsSlice"
import issuesReducer from "./issuesSlice"
import leaveReducer from "./leaveSlice"
import loggedinUserReducer from "./logedinUser"
import hostelReducer from "./hostelSlice"
import announcementsSlice from "./announcementsSlice"
import studentProfileReducer from "./studentProfile"
import commentReducers from "./commentSlice"
import allotmentRoomsReducer from "./allotmentRoom"
import verificationRequestReducer from "./verificationRequestSlice"

const store = configureStore({
    reducer: {
        announcements: announcementsSlice,
        verificationRequest: verificationRequestReducer,
        allotmentRooms: allotmentRoomsReducer,
        comments: commentReducers,
        studentProfile: studentProfileReducer,
        loggedinUser: loggedinUserReducer,
        hostel: hostelReducer,
        students: studentReducer,
        rooms: roomsReducer,
        issues: issuesReducer,
        leaves: leaveReducer,
    }
})

export default store;