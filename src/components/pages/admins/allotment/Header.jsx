import { AlertCircle, Filter, Home, Plus, Users } from 'lucide-react';
import Button from '../../../common/ui/Button';
import BackButton from '../../../common/ui/Backbutton';

import { useNavigate } from 'react-router-dom'
import SearchBar from '../../../common/table/SearchBar';
import { useAllotmentQuickInfo } from '../../../../customHooks/useQuickInfo';

const Header = () => {
    const quickInfo=useAllotmentQuickInfo()
    const stats = [
        {
            label: "Total Active Rooms",
            value: quickInfo.totalActiveRooms,
            icon: Home,
            color: "text-blue-600",
            bg: "bg-blue-100"
        },
        {
            label: "Available Rooms",
            value: quickInfo.availableRooms,
            icon: Home,
            color: "text-green-600",
            bg: "bg-green-100"
        },
        {
            label: "Fully Occupied",
            value: quickInfo.fullyOccupiedRooms,
            icon: Users,
            color: "text-red-600",
            bg: "bg-red-100"
        },
        {
            label: "Pending Requests",
            value: quickInfo.pendingAllotmentReq,
            icon: AlertCircle,
            color: "text-orange-600",
            bg: "bg-orange-100"
        },
        {
            label: "Successful Allotments",
            value: quickInfo.allotmentSuccessFul,
            icon: Users,
            color: "text-green-700",
            bg: "bg-green-200"
        },
        {
            label: "Failed Requests",
            value: quickInfo.failedAllotment,
            icon: AlertCircle,
            color: "text-red-700",
            bg: "bg-red-200"
        }
    ];

    const navigate = useNavigate();


    return (
        <>
            <div className="bg-white border-b border-gray-200 px-6 py-5">
                <BackButton />

                <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6">
                    <div>
                        <h1 className="text-2xl font-bold text-gray-900">Room Allotment</h1>
                        <p className="text-sm text-gray-500 mt-1">Manage room assignments and student requests.</p>
                    </div>

                    <div className="flex items-center gap-3">
                        <Button variant='text' className="flex items-center gap-2 px-4 py-2 bg-white border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition-colors shadow-sm text-sm font-medium">
                            <Filter size={18} />
                            <span>Filters</span>
                        </Button>
                        <Button variant='success' className="flex items-center gap-2 px-4 py-2 shadow-sm text-sm font-medium"
                            onClick={() => navigate("/allotment/phase-a/newUserStudent")}>
                            <Plus size={18} />
                            <span>New Allotment</span>
                        </Button>
                    </div>
                </div>

                <div className="mb-6">
                    <SearchBar
                        className="py-2.5 border border-gray-300 rounded-lg bg-gray-50 focus:ring-indigo-500 focus:border-indigo-500"
                        placeholder="Search by student name, roll number, or room ID..."
                    />
                </div>

                {/* Bottom Row: Quick Stats Cards */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    {stats.map((stat, index) => (
                        <div key={index} className="flex items-center p-4 bg-white border border-gray-200 rounded-xl shadow-sm">
                            <div className={`p-3 rounded-full ${stat.bg} ${stat.color} mr-4`}>
                                <stat.icon size={24} />
                            </div>
                            <div>
                                <p className="text-sm font-medium text-gray-500">{stat.label}</p>
                                <p className="text-2xl font-semibold text-gray-900">{stat.value}</p>
                            </div>
                        </div>
                    ))}
                </div>

            </div>
        </>
    )
}

export default Header
