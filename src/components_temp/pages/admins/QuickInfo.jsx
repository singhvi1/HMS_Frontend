import StatCard from '../../dashboard/StatCard'
import { ShieldCheck, Users, BedDouble, AlertTriangle } from "lucide-react";
import { useQuickInfo } from '../../../customHooks/useQuickInfo';
const QuickInfo = () => {

    const stats = useQuickInfo();


    return (
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
            <StatCard
                icon={<Users size={18} />}
                label="Total Students"
                value={stats?.totalStudents || ""}
                color="bg-blue-50 text-blue-700"
            />
            <StatCard
                icon={<BedDouble size={18} />}
                label="Total Rooms"
                value={stats.totalRooms || ""}
                color="bg-indigo-50 text-indigo-700"
            />
            <StatCard
                icon={<AlertTriangle size={18} />}
                label="Pending Issues"
                value={stats?.pendingIssues || ""}
                color="bg-yellow-50 text-yellow-700"
            />
            <StatCard
                icon={<ShieldCheck size={18} />}
                label="Active Rooms"
                value={stats?.activeRooms || ""}
                color="bg-green-50 text-green-700"
            />
        </div>
    )
}

export default QuickInfo
