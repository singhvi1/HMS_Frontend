import { DoorOpen } from "lucide-react";
import { GraduationCap, UserCheck, Clock, ClipboardList } from 'lucide-react';
import BackButton from "../../../../common/ui/Backbutton";
import ProfileAvatar from "../../../../profile/ProfileAvatar";
import StatCard from "../../../../dashboard/StatCard";
import { getFloorLabel } from "../../../../../../data";


const RoomProfileHeader = ({ room }) => {
    if (!room) return null;
    const capacity = room?.capacity || "1"

    const students = room?.occupants ?? [];

    const activeStudents = students.filter((s) => s.user_id.status === "active");
    const isFull = activeStudents >= room.capacity;
    const inactiveStudents = students.filter((s) => s.user_id.status === "inactive");
    return (
        <div className="bg-white rounded-xl shadow p-6 mb-8">
            <BackButton />
            <div className="text-center mb-6">
                <h1 className="text-3xl font-extrabold text-gray-800">
                    <div className="flex items-center justify-center gap-3">
                        {/* NOTE - we need to make it dynamic */}
                        <ProfileAvatar image_url={"https://img.freepik.com/free-photo/portrait-young-student-happy-be-back-university_23-2148586577.jpg?semt=ais_hybrid&w=740&q=80"} size={100} />

                        <h1 className="text-3xl font-extrabold text-gray-800">
                            Room No: {room.room_number}

                            <p className="text-sm text-gray-500 mt-1">
                                room Dashboard
                            </p>
                        </h1>
                    </div>

                </h1>

            </div>
            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6">


                <div className="flex items-center gap-4">
                    <div className="w-14 h-14 rounded-full bg-indigo-600 text-white flex items-center justify-center">
                        <DoorOpen size={38} />

                    </div>

                    <div>
                        <h2 className="text-xl font-semibold text-gray-800">
                            Welcome to {room.room_number}
                        </h2>
                        <p className="text-sm text-gray-500">
                            Block :{room.block.toUpperCase()}
                        </p>
                        {room?.room_number &&
                            <p className="text-sm text-gray-500">
                                Floor :{getFloorLabel(room.room_number)}
                            </p>}
                    </div>
                </div>


                <div className="flex items-center gap-3 mt-2">
                    {/* Status Badge */}
                    <span
                        className={`inline-flex items-center px-3 py-1 text-xs font-medium rounded-full border ${room?.is_active
                            ? "bg-green-50 text-green-700 border-green-200"
                            : "bg-gray-100 text-gray-700 border-gray-200"
                            }`}
                    >
                        <span className={`w-1.5 h-1.5 rounded-full mr-2 ${room?.is_active ? "bg-green-500" : "bg-gray-400"}`}></span>
                        {room?.is_active ? "Active" : "Inactive"}
                    </span>

                    {/* Room Capacity Badge */}
                    <span className="inline-flex items-center px-3 py-1 text-xs font-medium rounded-full bg-blue-50 text-blue-700 border border-blue-200">
                        Type: {
                            capacity === 1 ? "Single"
                                : capacity === 2 ? "Double"
                                    : "Triple"
                        }
                    </span>
                    <span
                        className={`inline-flex items-center px-2 py-1 text-sm rounded-full  ${isFull
                            ? "bg-red-100 text-red-700"
                            : "bg-green-100 text-green-700"
                            }`}
                    >
                        {isFull ? "Full" : "Available"}
                    </span>
                </div>

            </div>
            <div className="my-6 border-t" />
            {/* Quick Info */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">

                <StatCard
                    icon={<GraduationCap size={18} />} // Replaced Users
                    label="Occupancy Students"
                    value={students.length}
                    color="bg-blue-50 text-blue-700"
                />
                <StatCard
                    icon={<GraduationCap size={18} />} // Replaced Users
                    label="Total Capacity"
                    value={capacity}
                    color="bg-blue-50 text-blue-700"
                />
                <StatCard
                    icon={<GraduationCap size={18} />} // Replaced Users
                    label="Total Students"
                    value={students.length}
                    color="bg-blue-50 text-blue-700"
                />

                <StatCard
                    icon={<Clock size={18} />} // Replaced AlertTriangle
                    label="Pending Issues"
                    value="xxx"
                    color="bg-yellow-50 text-yellow-700"
                />
                <StatCard
                    icon={<ClipboardList size={18} />} // Replaced ShieldCheck
                    label="Total Issues"
                    value="xxxx"
                    color="bg-green-50 text-green-700"
                />
                <StatCard
                    icon={<UserCheck size={18} />} // Replaced BedDouble
                    label="InActive Student"
                    value={inactiveStudents.length}
                    color="bg-indigo-50 text-indigo-700"
                />
            </div>

        </div >
    );
};
export default RoomProfileHeader;
