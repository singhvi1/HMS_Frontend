import { ArrowDown, ArrowUp } from "lucide-react";
import { StatItem } from "../../../common/ui/Helper";
import Button from "../../../common/ui/Button";
import { useAllotmentQuickInfo } from "../../../../customHooks/useQuickInfo";
import { useHostelCapacity } from "../../../../customHooks/useHostel";
import { useState } from "react";

const HostelDetail = ({ data, allotment, error }) => {

    const getAllotmentStatus = (status) => {
        switch (status) {
            case "PHASE_A":
                return { text: "Phase A Running", style: "bg-blue-50 text-blue-700 border-blue-200" };
            case "PHASE_B":
                return { text: "Phase B Running", style: "bg-purple-50 text-purple-700 border-purple-200" };
            case "CLOSED":
            default:
                return { text: "Allotment Closed", style: "bg-gray-100 text-gray-600 border-gray-200" };
        }
    };
    const allotmentBadge = getAllotmentStatus(allotment);
    const quickInfo = useAllotmentQuickInfo()
    const { roomCapacity, loading } = useHostelCapacity()
    const [incrementRoom, setIncrementRoom] = useState(1);
    
    return (
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
            <div className="p-6 border-b border-gray-100 flex justify-between items-start bg-gray-50/50">
                <div>
                    <h1 className="text-2xl font-bold text-gray-800">{data.name}</h1>
                    <p className="text-sm text-gray-500 mt-1 flex items-center gap-2">
                        <span className="bg-gray-200 text-gray-600 px-2 py-0.5 rounded text-xs font-mono">
                            {data.code}
                        </span>
                        <span>Hostel Code</span>
                    </p>
                </div>

                <span className={`px-3 py-1 rounded-full text-xs font-bold border ${data.is_active
                    ? "bg-green-50 text-green-700 border-green-200"
                    : "bg-red-50 text-red-700 border-red-200"
                    }`}>
                    {data.is_active ? "● Active" : "○ Inactive"}
                </span>
            </div>

            <div className="p-6">
                <div className="grid grid-cols-2 md:grid-cols-4 gap-y-6 gap-x-4">
                    <StatItem
                        label="Blocks"
                        value={data.blocks?.map(b => b.toUpperCase()).join(", ")}
                    />
                    <StatItem
                        label="Total Rooms"
                        value={data.total_rooms}
                    />
                    <StatItem
                        label="Floors / Block"
                        value={data.floors_per_block}
                    />
                    <StatItem
                        label="Rooms / Floor"
                        value={data.rooms_per_floor}
                    />
                    <StatItem
                        label="Total Students"
                        value={quickInfo.totalStudents || "xxx"}
                    />
                    <StatItem
                        label="Total Active Students"
                        value={quickInfo.totalActiveStudents || "xxx"}
                    />
                    <StatItem
                        label="Warden Name"
                        value="xxxx"
                    />
                </div>

                <div className="my-6 border-t border-dashed border-gray-200"></div>

                <div className="flex items-center justify-between">
                    <div>
                        <p className="text-xs uppercase tracking-wider text-gray-400 font-semibold mb-1">
                            Current Status
                        </p>
                        <div className={`inline-flex items-center px-3 py-1.5 rounded-md text-sm font-medium border ${allotmentBadge.style}`}>
                            {allotmentBadge.text}
                        </div>
                    </div>
                    <div>
                        {/* capacity */}
                        <div className="flex items-center bg-green-50 border border-green-200 rounded-lg px-3 py-2 gap-3 shadow-sm">

                            {/* SECTION A: Label & Current Total */}
                            <div className="flex flex-col border-r border-green-200 pr-3">
                                <span className="text-[10px] uppercase font-bold text-green-600 tracking-wider">
                                    Total Pending
                                </span>
                                <span className="text-2xl font-bold text-green-900 leading-none block text-center">
                                    {quickInfo.pendingAllotmentReq || 0}
                                </span>
                            </div>

                            {/* SECTION B: The Input (How much to change by) */}
                            <div className="flex flex-col">
                                <span className="text-[9px] text-green-500 font-medium mb-0.5">
                                    total Room
                                </span>
                                <input
                                    type="number"
                                    min="1"
                                    value={incrementRoom}
                                    onChange={(e) => setIncrementRoom(e.target.value)}
                                    className="w-12 h-8 text-center text-sm font-bold text-gray-700 bg-white border border-green-300 rounded focus:outline-none focus:ring-2 focus:ring-green-500"
                                />
                            </div>

                            {/* SECTION C: Action Buttons */}
                            <div className="flex flex-col gap-1">
                                <Button
                                    disabled={loading}
                                    variant="text"
                                    onClick={() => roomCapacity(1, incrementRoom)}
                                    // onClick={() => console.log("i want to increase")}
                                    className="w-8 h-4 flex items-center justify-center bg-green-100 text-green-700 rounded hover:bg-green-200 transition-colors"
                                    title={`Increase by 1 for ${incrementRoom}`}
                                // title={`Increase by ${incrementValue}`}
                                >
                                    <ArrowUp size={12} />
                                </Button>

                                <Button
                                    disabled={loading}
                                    variant="text"
                                    onClick={() => roomCapacity(-1, incrementRoom)}
                                    // onClick={() => console.log("i want to dec it")}
                                    className="w-8 h-4 flex items-center justify-center bg-red-50 text-red-500 rounded hover:bg-red-100 transition-colors"
                                    title={`Decrease by 1 for ${incrementRoom}`}
                                // title={`Decrease by ${incrementValue}`}
                                >
                                    <ArrowDown size={12} />
                                </Button>
                            </div>

                        </div>
                    </div>

                </div>

                {error && (
                    <div className="mt-4 p-3 bg-red-50 border border-red-100 rounded-md">
                        <p className="text-sm text-red-600">{error}</p>
                    </div>
                )}
            </div>
        </div>
    );
};

export default HostelDetail;