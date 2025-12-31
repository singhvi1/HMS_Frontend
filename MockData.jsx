import { Eye, Pencil, Power, PowerOff, Trash2, UserPlus, Check, X } from "lucide-react";

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
                {row?.user_id?.full_name}
            </span>
        )
    },
    { key: "branch", label: "Branch" },
    {
        key: "block", label: "Block",
        render: (row) => (
            <span
                className=" cursor-pointer hover:underline hover:text-blue-500"
                onClick={() => {
                    navigate(`/admin/students/${row._id}`)
                }}
            >
                {row?.room_id?.block.toUpperCase()}
            </span>
        )
    },
    {
        key: "room_number", label: "Room",
        render: (row) => (
            <span
                className=" cursor-pointer hover:underline hover:text-blue-500"
                onClick={() => {
                    navigate(`/admin/students/${row._id}`)
                }}
            >
                {row?.room_id?.room_number}
            </span>
        )
    },
    {
        key: "status", label: "Status", render: (row) => (
            <span
                className=" cursor-pointer hover:underline hover:text-blue-500"
                onClick={() => {
                    navigate(`/admin/students/${row._id}`)
                }}
            >
                {row?.user_id?.status}
            </span>
        )
    },
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

export const roomColumns = (navigate) => [
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


export const issueColumns = (navigate) => [
    { key: "issue_id", label: "Issue ID" },
    {
        key: "student_name", label: "Student",
        render: (row) => (
            <span
                className="cursor-pointer hover:underline hover:text-blue-500"
                onClick={() => navigate(`/admin/issues/${row._id}`)}
            >
                {row.student_name}
            </span>
        )
    },
    { key: "title", label: "Title", },
    { key: "category", label: "Category" },
    { key: "block", label: "Block" },
    { key: "room", label: "Room" },

    {
        key: "priority",
        label: "Priority",
        render: (row) => (
            <span
                className={`px-2 py-0.5 rounded text-xs font-medium
          ${row.priority === "high" && "bg-red-100 text-red-700"}
          ${row.priority === "medium" && "bg-yellow-100 text-yellow-700"}
          ${row.priority === "low" && "bg-green-100 text-green-700"}
        `}
            >
                {row.priority}
            </span>
        )
    },

    {
        key: "status",
        label: "Status",
        render: (row) => (
            <span
                className={`px-2 py-0.5 rounded text-xs font-medium
          ${row.status === "pending" && "bg-gray-100 text-gray-700"}
          ${row.status === "in_progress" && "bg-blue-100 text-blue-700"}
          ${row.status === "resolved" && "bg-green-100 text-green-700"}
        `}
            >
                {row.status.replace("_", " ")}
            </span>
        )
    },

    {
        key: "actions",
        label: "Actions",
        render: (row) => (
            <div className="flex gap-2">
                <Eye
                    size={16}
                    className="cursor-pointer text-blue-600"
                    onClick={() => navigate(`/admin/issues/${row._id}`)}
                />
                <Pencil
                    size={16}
                    className="cursor-pointer text-green-600"
                    onClick={() => navigate(`/admin/issues/${row._id}/edit`)}
                />
                <Trash2
                    size={16}
                    className="cursor-pointer text-red-600"
                    onClick={() => console.log("Delete issue", row._id)}
                />
            </div>
        )
    }
];



export const leaveColumns = (dispatch, updateLeaveStatus) => [
    {
        key: "student",
        label: "Student",
        render: (row) => (
            <div>
                <div className="font-medium">{row.full_name}</div>
                <div className="text-xs text-gray-400">{row.sid}</div>
            </div>
        ),
    },
    { key: "room_number", label: "Room" },
    { key: "from_date", label: "From" },
    { key: "to_date", label: "To" },
    { key: "destination", label: "Destination" },
    {
        key: "status",
        label: "Status",
        render: (row) => (
            <span
                className={`px-2 py-1 rounded text-xs ${row.status === "approved"
                    ? "bg-green-100 text-green-700"
                    : row.status === "rejected"
                        ? "bg-red-100 text-red-700"
                        : "bg-yellow-100 text-yellow-700"
                    }`}
            >
                {row.status}
            </span>
        ),
    },
    {
        key: "actions",
        label: "Actions",
        render: (row) => (
            <div className="flex gap-2">
                <button
                    onClick={() =>
                        dispatch(updateLeaveStatus({ id: row._id, status: "approved" }))
                    }
                    disabled={row.status !== "pending"}
                    className="bg-green-500 p-2 rounded-xl text-white disabled:bg-gray-400"
                >
                    <Check size={16} />
                </button>

                <button
                    onClick={() =>
                        dispatch(updateLeaveStatus({ id: row._id, status: "rejected" }))
                    }
                    disabled={row.status !== "pending"}
                    className="bg-red-500 p-2 rounded-xl text-white disabled:bg-gray-400"
                >
                    <X size={16} />
                </button>
            </div>
        ),
    },
];

