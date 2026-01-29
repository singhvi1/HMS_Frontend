import { Eye, Pencil, Power, PowerOff, Trash2, UserPlus, Check, X, IdCard } from "lucide-react";
import RoleGuard from "./src/services/auth.role";
import Button from "./src/components/common/ui/Button";

export const studentColumns = (navigate, allotmentInfo, verifyStudent, deleteStudent) => [
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
            <span  >{row?.room_id?.room_number ? row?.room_id?.block.toUpperCase() : ""} {row?.room_id?.block ? "-" + row?.room_id?.room_number : "Not Assigned"} </span>
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
            <div className="flex justify-around gap-1">

                <Button variant="text" title={"View Student"}>
                    <Eye
                        size={16}
                        className=" text-blue-600"
                        onClick={() => {
                            navigate?.(`/admin/students/${row.user_id?._id}`)
                        }}
                    />
                </Button>

                <Button variant="text" title={"Edit Student"}>
                    <Pencil
                        size={16}
                        className=" text-green-600"
                        onClick={() => navigate?.(`/admin/students/${row.user_id._id}/edit`)}
                    />
                </Button>
                {(allotmentInfo.allowed && row.verification_status === "PENDING")
                    &&
                    <Button variant="text" title={"Document Verification"}>
                        <IdCard
                            size={16}
                            className=" text-green-600"
                            // onClick={() => console.log("verify the student", row)}
                            onClick={() => verifyStudent(row.user_id._id, "VERIFIED")}
                        />
                    </Button>
                }
                <Button variant="text" title={"Delete Student"}>
                    <Trash2
                        size={16}
                        className="cursor-pointer text-red-600"
                        onClick={() => deleteStudent({ userId: row.user_id._id })}
                    />
                </Button>


            </div>
        )
    }
];

export const roomColumns = (navigate, toggleRoomStatus, loadingId, allotmentInfo) => [
    {
        key: "block", label: "Block",
        render: (row) => (
            <span className="block w-fit mx-auto">{row.block.toUpperCase()}</span>
        )
    },

    {
        key: "room_number", label: "Room No",
        render: (row) => (
            <span
                // Added: "block w-full text-center"
                className="cursor-pointer hover:underline hover:text-blue-500 block w-full text-center"
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

            return (
                <span className="block w-full text-center">
                    {`${activeStudentsCount + "  in "} ${row.capacity} `}
                </span>
            )

        }
    },
    allotmentInfo.allowed && {
        key: "filling_order", label: "Order",
        render: (row) => (
            <span className="block w-full text-center">
                {row.filling_order
                    ? new Date(row.filling_order).toLocaleString('en-GB', {
                        day: 'numeric',
                        month: 'short',
                        year: 'numeric',
                        hour: '2-digit',
                        minute: '2-digit',
                        hour12: true
                    })
                    : "-"}
            </span>
        )
    },

    {
        key: "yearly_rent",
        label: "Yearly Rent",
        render: (row) => {
            return (
                <span className="block w-fit mx-auto">
                    {`₹${row.yearly_rent.toLocaleString()}`}
                </span>
            )
        }

    },
    {
        key: "status",
        label: "Avalibility",
        render: (row) => {
            if (!row.is_active) {
                return (
                    <span className="block w-full text-center px-2 py-1 text-sm rounded bg-gray-200 text-gray-600">
                        Inactive
                    </span>
                );
            }
            const activeStudentsCount =
                row?.occupants?.filter(s => s.user_id.status === "active").length ?? 0;

            const isFull = activeStudentsCount >= row.capacity;

            return (
                <span
                    className={`block w-fit mx-auto  px-2 py-1 text-sm rounded ${isFull
                        ? "bg-red-100 text-red-700"
                        : "bg-green-100 text-green-700"
                        }`}
                >
                    {isFull ? "Full" : "Available"}
                </span>
            );
        }
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

                    <Button
                        variant="text"
                        title="View Room"
                        className="p-2 rounded hover:bg-gray-100"
                        onClick={() => navigate(`/admin/rooms/${room._id}`)}
                    >
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


                    {isEmpty &&
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
                            {room.is_active ? (
                                <PowerOff size={18} className="text-yellow-600" />
                            ) : (
                                <Power size={18} className="text-blue-600" />
                            )}
                        </Button>}
                </div>
            );
        }
    },
].filter(Boolean);


export const verificationRequestColumns = (navigate, verifyStudent) => [
    {
        key: "sid",
        label: "SID",
        render: (row) => (
            <span className="font-medium text-gray-800">
                {row?.student?.sid ?? "—"}
            </span>
        )
    },

    {
        key: "name",
        label: "Student Name",
        render: (row) => (
            <span className="text-gray-700 cursor-pointer hover:underline hover:text-blue-500"
                onClick={() => {
                    navigate(`/admin/students/${row.student.user_id}`)
                    // console.log(row)
                }}>
                {row?.student?.name ?? "—"}
            </span>
        )
    },

    {
        key: "branch",
        label: "Branch",
        render: (row) => (
            <span className="text-gray-600">
                {row?.student?.branch ?? "—"}
            </span>
        )
    },

    {
        key: "email",
        label: "Email",
        render: (row) => (
            <span className="text-gray-600">
                {row?.student?.email ?? "—"}
            </span>
        )
    },

    {
        key: "phone",
        label: "Phone",
        render: (row) => (
            <span className="text-gray-600">
                {row?.student?.phone ?? "—"}
            </span>
        )
    },

    {
        key: "phase",
        label: "Phase",
        render: (row) => (
            <span className="px-2 py-1 rounded bg-blue-50 text-blue-700 text-xs">
                {row?.phase}
            </span>
        )
    },

    {
        key: "verification_status",
        label: "Verification Status",
        render: (row) => {
            const status = row?.verification_status;

            const color =
                status === "VERIFIED"
                    ? "bg-green-100 text-green-700"
                    : status === "REJECTED"
                        ? "bg-red-100 text-red-700"
                        : "bg-yellow-100 text-yellow-700";

            return (
                <span className={`px-2 py-1 rounded text-xs ${color}`}>
                    {status}
                </span>
            );
        }
    },

    {
        key: "request_status",
        label: "Request Status",
        render: (row) => (
            <span className="text-gray-700">
                {row?.request_status ?? "—"}
            </span>
        )
    },

    {
        key: "createdAt",
        label: "Requested On",
        render: (row) => (
            <span className="text-gray-600">
                {row?.createdAt
                    ? new Date(row.createdAt).toLocaleDateString()
                    : "—"}
            </span>
        )
    },

    {
        key: "action",
        label: "Action",
        render: (row) => (
            <div className="flex gap-2">
                <Button
                    variant="text"
                    title="Verify"
                    className="px-3 py-1 text-xs bg-green-600 text-white rounded hover:bg-green-700"
                    onClick={() => {
                        verifyStudent(row.student.user_id
                            , "VERIFIED")
                        // console.log("VERIFY:", row);
                    }}
                    disabled={row.verification_status !== "PENDING"}
                >
                    Verify
                </Button>

                <Button
                    variant="text"
                    title="Reject"
                    className="px-3 py-1 text-xs bg-red-600 text-white rounded hover:bg-red-700"
                    onClick={() => {
                        verifyStudent(row.student.user_id, "REJECTED")
                        // console.log("REJECT:", row.request_id);
                    }}
                    disabled={row.verification_status !== "PENDING"}
                >
                    Reject
                </Button>
            </div >
        )
    }
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



