import { configureStore } from "@reduxjs/toolkit";
import studentReducer from "./studentSlice"
import roomsReducer from "./roomsSlice"
import issuesReducer from "./issuesSlice"
import leaveReducer from "./leaveSlice"
import loggedinUserReducer from "./logedinUser"
import hostelReducer from "./hostelSlice"
const store=configureStore({
    reducer:{
        hostel:hostelReducer,
        loggedinUser:loggedinUserReducer,
        students:studentReducer,
        rooms: roomsReducer,
        issues: issuesReducer,
        leaves: leaveReducer,
    }
})

export default store;