import { useDispatch } from "react-redux"
import { authService } from "../services/apiService";
import { resetAnnouncements } from "../utils/store/announcementsSlice";
import { clearHostel } from "../utils/store/hostelSlice";
import { resetIssuesSlice } from "../utils/store/issuesSlice";
import { resetLeaveSlice } from "../utils/store/leaveSlice";
import { resetRoomSlice } from "../utils/store/roomsSlice";
import { reSetStudent } from "../utils/store/studentProfile";
import { resetStudents } from "../utils/store/studentSlice";
import { removeLoggedinUser } from "../utils/store/logedinUser";
import { clearComments } from "../utils/store/commentSlice";



export const useLogout = () => {
    const dispatch = useDispatch();

    return async () => {
        await authService.logoutUser();
        dispatch(resetAnnouncements());
        // dispatch(clearHostel());
        dispatch(resetIssuesSlice());
        dispatch(resetLeaveSlice());
        dispatch(removeLoggedinUser());
        dispatch(resetRoomSlice());
        dispatch(reSetStudent());
        dispatch(resetStudents());
        dispatch(clearComments());
    }
}