import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { selectAllHostelState, setAllotment, setAllotmentLoading, setError } from '../utils/store/hostelSlice';
import { hostelService } from '../services/apiService';
import { getNextAllotmentStatus } from '../../data';

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
    return { allotment:allotment_status, allotmentLoading, error, toggleAllotment }

}


