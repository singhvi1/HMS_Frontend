import { configureStore } from "@reduxjs/toolkit";
import studentReducer from "./studentSlice"
import roomsReducer from "./roomsSlice"
import issuesReducer from "./issuesSlice"

const store=configureStore({
    reducer:{
        students:studentReducer,
        rooms: roomsReducer,
        issues: issuesReducer,
    }
})

export default store;