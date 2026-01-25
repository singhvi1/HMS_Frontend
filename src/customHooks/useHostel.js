import { useCallback, useState } from "react";
import { allotmentService } from "../services/apiService";

export const useHostelCapacity = () => {
    const [loading, setLoading] = useState(false)


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
            console.error("Status update failed", err);
            alert(err?.response?.data.message || "Failed to update the capacity");
        } finally {
            setLoading(false);
        }

    }, [])

    return { loading, roomCapacity };
}