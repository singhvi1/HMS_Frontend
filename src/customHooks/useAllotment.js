import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { selectAllHostelState, setAllotment, setAllotmentLoading, setError } from '../utils/store/hostelSlice';
import { hostelService } from '../services/apiService';

export const useAllotment = (hostelId) => {
    console.log(hostelId)
    const dispatch = useDispatch();
    const { allotmentLoading, error, allotment } = useSelector(selectAllHostelState);

    const toggleAllotment = async () => {
        if (!hostelId || allotmentLoading) return;
        try {
            dispatch(setAllotmentLoading(true))
            dispatch(setError(null))
            const res = await hostelService.toggleAllotment(hostelId)
            const newAllotment = res.data?.data?.allotment;
            dispatch(setAllotment(newAllotment))
        } catch (err) {
            console.error("Status update failed", err);
            dispatch(setError(err.response?.data.message || "failed to toggle allotment"))
            alert("Failed to update status");
        } finally {
            dispatch(setAllotmentLoading(false))
        }
    }
    return { allotment, allotmentLoading, error, toggleAllotment }

}


