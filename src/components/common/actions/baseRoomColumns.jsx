// columns/room.base.columns.js
export const baseRoomColumns = (navigate) => [
    {
        key: "block",
        label: "Block",
        render: (row) => <span>{row.block.toUpperCase() || "-"}</span>
    },
    {
        key: "room_number",
        label: "Room No",
        render: (row) => <span>{row.room_number}</span>,
    },
    {
        key: "occupancy",
        label: "Occupied / Capacity",
        render: (row) => {
            return `${row?.occupied_count} / ${row?.capacity}`;
        },
    },
    {
        key: "yearly_rent",
        label: "Yearly Rent",
        render: (row) => `₹${row.yearly_rent.toLocaleString()}`,
    },
];


// columns/room.admin.columns.js
import { Eye, UserPlus, Power, PowerOff, CloudCog } from "lucide-react";
import Button from "../ui/Button";

export const adminRoomColumns = (
    navigate,
    toggleRoomStatus,
    loadingId
) => [
        ...baseRoomColumns(navigate),

        {
            key: "actions",
            label: "Actions",
            render: (room) => {
                const activeCount =
                    room?.occupants?.filter(s => s.user_id.status === "active").length ?? 0;
                const isEmpty = activeCount === 0;
                const isFull = activeCount >= room.capacity;

                return (
                    <div className="flex items-center gap-2">

                        <Button
                            variant="text"
                            title="View Room"
                            className="p-2 rounded hover:bg-gray-100"
                            onClick={() => navigate(`/admin/rooms/${room._id}`)}>
                            <Eye size={18} className="text-gray-700" />
                        </Button>

                        {!isFull && room.is_active && (
                            <Button
                                variant="text"
                                title="Add Student"
                                className="p-2 rounded hover:bg-green-100"
                                onClick={() =>
                                    navigate(`/admin/students/new?roomId=${room._id}`)
                                }
                            >
                                <UserPlus size={18} className="text-green-600" />
                            </Button>
                        )}

                        {isEmpty && (
                            <Button
                                variant="text"
                                disabled={loadingId === room._id}
                                title={room.is_active ? "Deactivate Room" : "Activate Room"}
                                className={`p-2 rounded ${room.is_active
                                    ? "hover:bg-yellow-100"
                                    : "hover:bg-blue-100"
                                    }`}
                                onClick={() => toggleRoomStatus(room._id, room.is_active)}
                            >
                                {room.is_active ?
                                    <PowerOff size={18} className="text-yellow-600" /> : <Power size={18} className="text-blue-600" />}
                            </Button>
                        )}
                    </div>
                );
            },
        },

        {
            key: "status",
            label: "Availability",
            render: (row) => {
                const activeStudentsCount =
                    row?.occupants?.filter(s => s.user_id.status === "active").length ?? 0;
                if (!row.is_active) {
                    return (
                        <span className="px-2 py-1 text-sm rounded bg-gray-200 text-gray-600">
                            Inactive
                        </span>
                    );
                };
                const isFull = activeStudentsCount >= row.capacity;

                return (
                    <span
                        className={`px-2 py-1 text-sm rounded ${isFull
                            ? "bg-red-100 text-red-700"
                            : "bg-green-100 text-green-700"
                            }`}
                    >
                        {isFull ? "Full" : "Available"}
                    </span>
                );
            },
        },
    ];



// columns/room.allotment.columns.js

export const allotmentRoomColumns = (navigate) => [
    ...baseRoomColumns(),

    {
        key: "availability",
        label: "Status",
        render: (row) => {
            const allocationStatus = row?.allocation_status || "";

            let statusText = "";
            let colorClass = "text-gray-500";


            if (allocationStatus === "AVAILABLE" || allocationStatus === "VACANT_UPGRADE") {
                statusText = "Available";
                colorClass = "bg-green-100 text-green-600";
            } else if (allocationStatus === "FULL") {
                statusText = "Full";
                colorClass = "bg-red-100 text-red-600";
            } else {
                statusText = allocationStatus;
            }

            return (
                <span className={`px-2 py-1 ${colorClass}`}>
                    {statusText}
                </span>
            );
        },
    },

    {
        key: "action",
        label: "Action",
        render: (row) => (
            <>
                <Button
                    variant="text"
                    title="New Allotment"
                    disabled={!row?.is_active}
                    className="p-2 rounded hover:bg-green-100"
                    onClick={() =>
                        navigate(`/allotment/phase-a/newUserStudent?roomId=${row._id}`)
                        // console.log("Adding a new student")
                    }
                >
                    <UserPlus size={18} className="text-green-600" />
                </Button>
            </>
        ),
    },
];


