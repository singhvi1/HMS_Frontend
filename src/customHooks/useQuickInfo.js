import { useEffect, useState } from "react";
import { dashboardService } from "../services/apiService";

export const useQuickInfo = () => {
    const [stats, setStats] = useState(null);



    useEffect(() => {
        const fetchQuickInfo = async () => {
            try {
                const res = await dashboardService.getDashboardStats();
                setStats(res.data)
            } catch (err) {
                console.log(err.message || "Not able to fetch quickInfo");
            }
        }

        fetchQuickInfo()
    }, [])

    return stats?.data || "";
}