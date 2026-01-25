import { useDispatch, useSelector } from 'react-redux'
import { selectAllHostelState, selectHostelAllotment, setAllotment, setAllotmentLoading, setError } from '../utils/store/hostelSlice';
import { allotmentService, hostelService } from '../services/apiService';
import { getNextAllotmentStatus } from '../../data';
import { useCallback, useEffect, useState } from 'react';

export const useAllotment = (hostelId) => {
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
    const allotment_status = useSelector(selectHostelAllotment)
    // console.log(allotment_status, " not found in store");
    const [loading, setLoading] = useState(false)


    const findAllotmentStatus = useCallback(async () => {
        try {
            setLoading(true)
            const res = await
                allotmentService.getAllotmentStatus()
            const status = res.data?.data?.hostel?.allotment_status
            dispatch(setAllotment(status))
        } catch (err) {
            console.error("Status update failed", err);
            alert("Failed to find status");
        } finally {
            setLoading(false);
        }

    }, [dispatch])

    useEffect(() => {
        if (allotment_status == null) {
            findAllotmentStatus();
        }
    }, [allotment_status, findAllotmentStatus])
    const allotmentInfo = {
        status: allotment_status,
        // allowed: false,
        allowed: allotment_status === "PHASE_A" || allotment_status === "PHASE_B"
    };

    return { allotmentInfo, loading };
}

