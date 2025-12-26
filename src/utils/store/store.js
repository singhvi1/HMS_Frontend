import { configureStore } from "@reduxjs/toolkit";
import studentReducer from "./studentSlice"
import roomsReducer from "./roomsSlice"
import issuesReducer from "./issuesSlice"
import leaveReducer from "./leaveSlice"
import loggedinUserReducer from "./logedinUser"

const store=configureStore({
    reducer:{
        students:studentReducer,
        rooms: roomsReducer,
        issues: issuesReducer,
        loggedinUser:loggedinUserReducer,
        leaves: leaveReducer,
    }
})

export default store;