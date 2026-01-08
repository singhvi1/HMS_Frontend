import { Eye, Pencil, Power, PowerOff, Trash2, UserPlus, Check, X } from "lucide-react";
import RoleGuard from "./src/services/auth.role";
import Button from "./src/components/common/ui/Button";

export const studentColumns = (navigate, deleteStudent) => [
    { key: "sid", label: "SID" },
    {
        key: "full_name", label: "Name",
        render: (row) => (
            <span
                className=" cursor-pointer hover:underline hover:text-blue-500"
                onClick={() => {
                    navigate(`/admin/students/${row.user_id._id}`)
                }}
            >
                {row?.user_id?.full_name}
            </span>
        )
    },
    { key: "branch", label: "Branch" },
    {
        key: "room_number", label: "Room",
        render: (row) => (
            <span  >{row?.room_id?.block.toUpperCase()} - {row?.room_id?.room_number} </span>
        )
    },
    {
        key: "status",
        label: "Status",
        render: (row) => {
            const status = row?.user_id?.status;

            return (
                <span
                    className={`px-2 py-1 text-sm rounded-full font-medium ${status === "active"
                        ? "bg-green-100 text-green-700"
                        : "bg-red-100 text-red-700"
                        }`}
                >
                    {status === "active" ? "Active" : "Inactive"}
                </span>
            );
        }
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
                        navigate?.(`/admin/students/${row.user_id?._id}`)
                    }}
                />
                <Pencil
                    size={16}
                    className="cursor-pointer text-green-600"
                    onClick={() => navigate?.(`/admin/students/${row.user_id._id}/edit`)}
                />
                <Trash2
                    size={16}
                    className="cursor-pointer text-red-600"
                    onClick={() => deleteStudent({ userId: row.user_id._id })}
                />
            </div>
        )
    }
];

export const roomColumns = (navigate, toggleRoomStatus, loadingId) => [
    {
        key: "block", label: "Block",
        render: (row) => (
            <span>{row.block.toUpperCase()}</span>
        )
    },

    {
        key: "room_number", label: "Room No",
        render: (row) => (
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
        label: "Occupied-Capacity",
        render: (row) => {
            const activeStudentsCount =
                row?.occupants?.filter(s => s.user_id.status === "active").length ?? 0;

            return `${activeStudentsCount ? activeStudentsCount + " in" : "0 in "} ${row.capacity}`
        }
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
            const activeStudentsCount = room?.occupants?.filter(s => s.user_id.status === "active").length ?? 0;
            const isEmpty = activeStudentsCount === 0;
            const isFull = activeStudentsCount >= room?.capacity;
            return (
                <div className="flex items-center gap-2">

                    <button
                        title="View Room"
                        className="p-2 rounded hover:bg-gray-100"
                        onClick={() => navigate(`/admin/rooms/${room._id}`)}
                    >
                        <Eye size={18} className="text-gray-700" />
                    </button>


                    {!isFull && room.is_active && (
                        <button
                            title="Add Student"
                            className="p-2 rounded hover:bg-green-100"
                            onClick={() =>
                                navigate(`/admin/students/new?roomId=${room._id}`)
                            }
                        >
                            <UserPlus size={18} className="text-green-600" />
                        </button>
                    )}


                    {isEmpty && <button
                        disabled={loadingId === room._id}
                        title={room.is_active ? "Deactivate Room" : "Activate Room"}
                        className={`p-2 rounded ${room.is_active
                            ? "hover:bg-yellow-100"
                            : "hover:bg-blue-100"
                            }`}
                        onClick={() => toggleRoomStatus(room._id, room.is_active)}
                    >
                        {room.is_active ? (
                            <PowerOff size={18} className="text-yellow-600" />
                        ) : (
                            <Power size={18} className="text-blue-600" />
                        )}
                    </button>}
                </div>
            );
        }
    },

    {
        key: "status",
        label: "Avalibility",
        render: (row) => {
            if (!row.is_active) {
                return (
                    <span className="px-2 py-1 text-sm rounded bg-gray-200 text-gray-600">
                        Inactive
                    </span>
                );
            }
            const activeStudentsCount =
                row?.occupants?.filter(s => s.user_id.status === "active").length ?? 0;

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
        }
    },

];


export const issueColumns = (role, navigate, deleteIssueFxn) => [
    {
        key: "sid", label: "SID",
        render: (row) => (
            <span>{row?.raised_by?.sid}</span>
        )
    },
    {
        key: "student_name", label: "Student",
        render: (row) => (
            <span
                className="cursor-pointer hover:underline hover:text-blue-500"
                onClick={() => navigate(`/admin/students/${row?.raised_by?.user_id?._id}`)}
            >
                {row?.raised_by?.user_id?.full_name}
            </span>
        )
    },
    { key: "title", label: "Title", },
    { key: "category", label: "Category" },
    {
        key: "room", label: "Room",
        render: (row) => (
            <span>{((row?.raised_by?.room_id?.block) || "").toUpperCase()} - {row?.raised_by?.room_id?.room_number}</span>
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
            <div className="flex justify-around">
                <Eye
                    size={16}
                    className="cursor-pointer text-blue-600"
                    onClick={() => navigate(`/${role}/issues/${row._id}`)}
                />

                {((role === "student" && row?.status === "pending") || (role === "admin")) && (<Trash2
                    size={16}
                    className="cursor-pointer text-red-600"
                    onClick={() => deleteIssueFxn(row._id)}
                />)}
            </div>
        )
    }
];



export const leaveColumns = (updateStatus, navigate) => [
    {
        key: "student",
        label: "Student",
        render: (row) => (
            <div
                className="cursor-pointer hover:underline hover:text-blue-500"
                onClick={() => navigate?.(`/admin/students/${row?.student_id?.user_id?._id}`)}
            >
                <div className="font-medium">{row?.student_id?.user_id?.full_name}</div>
                <p className="text-gray-300">{row?.student_id?.sid}</p>
                <div className="text-xs text-gray-400">{row.sid}</div>
            </div>
        ),
    },
    {
        key: "room_number", label: "Room", render: (row) => (
            <div>
                <div className="font-medium">{row?.student_id?.block && row?.student_id?.block?.toUpperCase()} - {row?.student_id?.room_number} </div>
                <div className="text-xs text-gray-400"></div>
            </div>
        ),
    },
    {
        key: "from_date",
        label: "From",
        render: ((row) =>
            row.from_date ? new Date(row.from_date).toLocaleDateString("en-IN", {
                day: "2-digit",
                month: "2-digit",
                year: "numeric",
            }) : "-"
        )
    },
    {
        key: "to_date", label: "To",
        render: ((row) =>
            row.to_date ? new Date(row.to_date).toLocaleDateString("en-IN", {
                day: "2-digit",
                month: "2-digit",
                year: "numeric",
            }) : "-"
        )
    },
    {
        key: "destination",
        label: "Destination",
        render: (row) => (
            <span
                className="cursor-help underline decoration-dotted"
                title={row.reason || "No reason provided"}
            >
                {row.destination}
            </span>
        )
    },
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
                {row?.status}
            </span>
        ),
    },
    {
        key: "actions",
        label: "Actions",
        render: (row) => (
            <RoleGuard allow={["admin"]} >
                <div className="flex gap-2">
                    <Button
                        variant="text"
                        onClick={() =>
                            updateStatus({
                                id: row._id,
                                status: "approved",
                                reason: "approved by admin"
                            })
                        }
                        disabled={row.status !== "pending"}
                        className="bg-green-500 p-2 rounded-xl text-white disabled:bg-gray-400"
                    >
                        <Check size={16} />
                    </Button>

                    <Button
                        variant="text"
                        onClick={() =>
                            updateStatus({
                                id: row._id,
                                status: "rejected",
                                reason: "Rejected by admin"
                            })
                        }
                        disabled={row.status !== "pending"}
                        className="bg-red-500 p-2 rounded-xl text-white disabled:bg-gray-400"
                    >
                        <X size={16} />
                    </Button>

                </div>
            </RoleGuard>
        ),
    },


];



