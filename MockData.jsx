import { Eye, Pencil, Power, PowerOff, Trash2, UserPlus } from "lucide-react";

export const studentColumns = (navigate) => [
    { key: "sid", label: "SID" },
    {
        key: "full_name", label: "Name",
        render: (row) => (
            <span
                className=" cursor-pointer hover:underline hover:text-blue-500"
                onClick={() => {
                    navigate(`/admin/students/${row._id}`)
                }}
            >
                {row.full_name}
            </span>
        )
    },
    { key: "branch", label: "Branch" },
    { key: "block", label: "Block" },
    { key: "room_number", label: "Room" },
    { key: "status", label: "Status", },
    {
        key: "actions",
        label: "Actions",
        render: (row) => (
            <div className="flex gap-2">
                <Eye
                    size={16}
                    className="cursor-pointer text-blue-600"
                    onClick={() => {
                        navigate(`/admin/students/${row._id}`)
                    }}
                />
                <Pencil
                    size={16}
                    className="cursor-pointer text-green-600"
                    onClick={() => navigate(`/admin/students/${row._id}/edit`)}
                />
                <Trash2
                    size={16}
                    className="cursor-pointer text-red-600"
                    onClick={() => console.log("Delete", row._id)}
                />
            </div>
        )
    }
];

export const roomColumns = (navigate, dispatch) => [
    { key: "block", label: "Block" },

    {
        key: "room_number", label: "Room No", render: (row) => (
            <span
                className=" cursor-pointer hover:underline hover:text-blue-500"
                onClick={() => {
                    navigate(`/admin/rooms/${row._id}`)
                }}
            >
                {row.room_number}
            </span>
        )
    },

    {
        key: "occupancy",
        label: "Occupied",
        render: (row) => `${row.occupancy ? row?.occupancy : ""} ${row.capacity}`
    },

    {
        key: "yearly_rent",
        label: "Yearly Rent",
        render: (row) => `₹${row.yearly_rent.toLocaleString()}`
    },
    {
        key: "actions",
        label: "Actions",
        render: (room) => {
            const isFull = room.occupancy >= room.capacity;

            return (
                <div className="flex items-center gap-2">
                    {/* View Room */}
                    <button
                        title="View Room"
                        className="p-2 rounded hover:bg-gray-100"
                        onClick={() => navigate(`/admin/rooms/${room._id}`)}
                    >
                        <Eye size={18} className="text-gray-700" />
                    </button>

                    {/* Add Student */}
                    {!isFull && room.is_active && (
                        <button
                            title="Add Student"
                            className="p-2 rounded hover:bg-green-100"
                            onClick={() =>
                                navigate(`/admin/students/new?roomId=${room._id}`, { state: { room } })
                            }
                        >
                            <UserPlus size={18} className="text-green-600" />
                        </button>
                    )}

                    {/* Activate / Deactivate */}
                    <button
                        title={room.is_active ? "Deactivate Room" : "Activate Room"}
                        className={`p-2 rounded ${room.is_active
                            ? "hover:bg-yellow-100"
                            : "hover:bg-blue-100"
                            }`}
                    // onClick={() => dispatch(toggleRoomStatus(room._id))}
                    >
                        {room.is_active ? (
                            <PowerOff size={18} className="text-yellow-600" />
                        ) : (
                            <Power size={18} className="text-blue-600" />
                        )}
                    </button>
                </div>
            );
        }
    },

    {
        key: "status",
        label: "Status",
        render: (row) => {
            if (!row.is_active) {
                return (
                    <span className="px-2 py-1 text-sm rounded bg-gray-200 text-gray-600">
                        Inactive
                    </span>
                );
            }

            const isFull = row.occupancy >= row.capacity;

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
        }
    }
];
