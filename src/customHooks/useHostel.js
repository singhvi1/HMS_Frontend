import { useCallback, useEffect, useState } from "react";
import { allotmentService, hostelService } from "../services/apiService";
import { selectAllHostelState, setAllotmentError, setError, setHostel } from "../utils/store/hostelSlice";
import { useDispatch, useSelector } from "react-redux";
import { selectHostelAllotment, setAllotment, setAllotmentLoading } from '../utils/store/hostelSlice';
import { getNextAllotmentStatus } from '../../data';

//increase or decrease hostel capacity;
export const useHostelCapacity = () => {
    const [loading, setLoading] = useState(false)
    const dispatch = useDispatch();

    const roomCapacity = useCallback(async (action, roomCount) => {
        roomCount = Number(roomCount)
        if (!roomCount || roomCount <= 0) {
            alert("Room count must be greater than 0");
            return;
        }
        const actionText =
            action === 1 ? "Increase" : action === -1 ? "Decrease" : "Update";
        if (!window.confirm(`${actionText}  will be capacity for ${roomCount}`)) return;
        try {
            setLoading(true)
            const res = await
                allotmentService.capacity({ action, roomCount })
            alert(`Hostel capacity updated successfully for ${res.data.actionOnRoom
                }`);

        } catch (err) {
            alert(err?.response?.data.message || "Failed to update the capacity");
        } finally {
            setLoading(false);
        }

    }, [dispatch])

    return { loading, roomCapacity };
}


export const useGetAllHostel = () => {
    const { data, allotment_status, loading, error } = useSelector(selectAllHostelState)
    console.log(data);
    const dispatch = useDispatch();
    useEffect(() => {
        if (data && !loading) return;

        const fetchHostelStatus = async () => {
            try {
                const res = await hostelService.getAll();
                const hostel = res?.data?.data?.[0];
                if (hostel) {
                    console.log(hostel)
                    dispatch(setHostel(hostel));

                }
            } catch (error) {
                dispatch(setError(error.response?.data?.message || "Failed to fetch hostel status"));
                console.error("Failed to fetch hostel status", error);
            }
        };
        if (!loading) return;
        fetchHostelStatus();
    }, [data, dispatch, loading]);

    return { data, allotment_status, loading, error };
}


export const useToggleAllotment = (hostelId) => {
    // console.log(hostelId)
    const dispatch = useDispatch();
    const { allotmentLoading, error, allotment_status } = useSelector(selectAllHostelState);

    const toggleAllotment = async () => {
        if (!hostelId || allotmentLoading) return;
        const nextStatus = getNextAllotmentStatus(allotment_status)
        if (!nextStatus) {
            dispatch(setError("Invalid current allotment state"));
            return;
        }

        try {
            dispatch(setAllotmentLoading(true))
            dispatch(setError(null))

            const res = await hostelService.toggleAllotment(hostelId, nextStatus)
            const newAllotment = res.data?.data?.allotment_status;

            dispatch(setAllotment(newAllotment))
        } catch (err) {
            console.error("Status update failed", err);
            dispatch(setError(err.response?.data.message || "failed to toggle allotment"))
            alert("Failed to update status");
        } finally {
            dispatch(setAllotmentLoading(false))
        }
    }
    return { allotment: allotment_status, allotmentLoading, error, toggleAllotment }

}

export const useAllotmentStatus = () => {
    const dispatch = useDispatch();
    const { allotmentLoading, allotment_status } = useSelector(selectAllHostelState)
    // console.log(allotment_status, "  found in store");


    const findAllotmentStatus = useCallback(async () => {
        try {
            const res = await
                allotmentService.getAllotmentStatus()
            const status = res.data?.data?.hostel?.allotment_status
            dispatch(setAllotment(status))
        } catch (err) {
            console.error("Status update failed", err);
            dispatch(setAllotmentError(err.response?.data.message || "failed to fetch allotment status"))
        } finally {
            setAllotmentLoading(false);
        }

    }, [dispatch])

    useEffect(() => {
        if (allotmentLoading) {
            findAllotmentStatus();
        }
    }, [allotmentLoading, allotment_status, findAllotmentStatus])
    
    const allotmentInfo = {
        status: allotment_status,
        // allowed: false,
        allowed: allotment_status === "PHASE_A" || allotment_status === "PHASE_B"
    };

    return { allotmentInfo, setAllotmentLoading };
}