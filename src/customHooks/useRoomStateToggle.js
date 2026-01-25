import { useState } from 'react'
import { useDispatch } from 'react-redux';
import { roomService } from '../services/apiService';
import { setRoom } from '../utils/store/roomsSlice';
import toast from 'react-hot-toast';

export const useRoomStateToggle = () => {
    const dispatch = useDispatch();
    const [loadingId, setLoadingId] = useState(null);


    const toggleRoomStatus = async (roomId, isActive) => {
        const action = isActive ? "deactivate" : "activate";
        const confirmMsg = isActive
            ? "Deactivate this room?"
            : "Activate this room?";

        if (!window.confirm(confirmMsg)) return;

        try {
            setLoadingId(roomId)
            const res = await roomService.toggleRoomStatus(roomId);
            dispatch(setRoom(res.data.data))
            toast.success(`Room ${action}d successfully`);
        } catch (err) {
            console.error("Room status change failed", err);
            toast.error(err.response?.data?.message || "Action failed");
        } finally {
            setLoadingId(null);
        }
    };

    return { toggleRoomStatus, loadingId }

}

