import { Pencil, Trash2, UserX, Settings, UserPlus, Power, PowerOff, IdCard, Edit, Layers, PlayCircle, StopCircle } from "lucide-react";

export const getRoomActions = ({ room, toggleRoomStatus }) => {
    const activeStudentsCount =
        room?.occupants?.filter(s => s.user_id.status === "active").length ?? 0;
    const isFull = activeStudentsCount >= room?.capacity;
    return [
        {
            title: "Add New Student",
            description: isFull
                ? "Room is full"
                : "Assign a student to this room",
            icon: UserPlus,
            color: isFull || !room?.is_active
                ? "bg-gray-100 cursor-not-allowed"
                : "bg-green-50",
            to: isFull || !room?.is_active
                ? "#"
                : `/admin/students/new?roomId=${room?._id}`
        },
        {
            title: "Edit Room",
            description: "Change room settings or Capacity",
            icon: Settings,
            color: "bg-blue-50",
            to: `/admin/rooms/${room?._id}/edit`
        },

        {
            title: room?.is_active ? "Deactivate Room" : "Activate Room",
            description: "Toggle room availability",
            icon: room?.is_active ? PowerOff : Power,
            color: room?.is_active
                ? activeStudentsCount > 0
                    ? "bg-gray-100 cursor-not-allowed"
                    : "bg-yellow-50"
                : "bg-indigo-50",
            onClick: () => {
                if (room?.is_active && activeStudentsCount > 0) return;
                (toggleRoomStatus(room._id, room.is_active))
            }
        }
    ];
};

// export const getHostelActions = ({
//     data,
//     navigate,
//     handleDelete,
//     toggleAllotment,
//     allotment,
//     allotmentLoading
// }) => {

//     // 1. Determine Allotment Action Details
//     let allotmentTitle = "Start Phase A";
//     let allotmentDesc = "Begin allocation process";
//     let AllotmentIcon = PlayCircle;

//     if (allotment === "PHASE_A") {
//         allotmentTitle = "Move to Phase B";
//         allotmentDesc = "Advance to next phase";
//         AllotmentIcon = Layers;
//     } else if (allotment === "PHASE_B") {
//         allotmentTitle = "Close Allotment";
//         allotmentDesc = "Stop all allocations";
//         AllotmentIcon = StopCircle;
//     }

//     const actions = [
//         {
//             title: "Edit Hostel",
//             description: "Update details and settings",
//             icon: Edit,
//             color: "bg-blue-50 text-blue-600",
//             // We use onClick here instead of 'to' because you were passing specific state in your original code
//             onClick: () => navigate(`/admin/hostel/${data?._id}/edit`, { state: data }),
//         },
//         {
//             title: "Delete Hostel",
//             description: "Permanently remove hostel",
//             icon: Trash2,
//             color: "bg-red-50 text-red-600", // Red styling for danger
//             onClick: handleDelete,
//         }
//     ];

//     // 2. Conditionally add Allotment Action
//     if (data?.is_active) {
//         actions.push({
//             title: allotmentTitle,
//             description: allotmentDesc,
//             icon: AllotmentIcon,
//             color: "bg-indigo-50 text-indigo-600",
//             disabled: allotmentLoading, // Disable if loading
//             onClick: toggleAllotment,
//         });
//     }

//     return actions;
// };
export const getStudentActions = (
    { userId, status, navigate, toggleStudentFxn, deleteStudent, allotmentInfo, verifyStudent, verificationStatus }) => [
        {
            title: "Edit Info",
            icon: Pencil,
            description: "Sid RoomNo Block Guardian Address",
            color: "bg-blue-100 text-gray-800 hover:bg-blue-200",
            onClick: () => navigate(`/admin/students/${userId}/edit`)
        },
        {
            title: "Change Status",
            icon: UserX,
            description: "Active or Inactive Student",
            color: "bg-yellow-100 text-gray-800 hover:bg-yellow-200",
            onClick: () => toggleStudentFxn(userId, status)
        },
        allotmentInfo?.allowed && {
            title:
                verificationStatus === "VERIFIED"
                    ? "Unverify Student"
                    : "Verify Student",
            icon: IdCard,
            description:
                verificationStatus === "VERIFIED"
                    ? "Mark student as not verified"
                    : "Verify student documents",
            color:
                verificationStatus === "VERIFIED"
                    ? "bg-gray-100 text-gray-800 hover:bg-gray-200"
                    : "bg-green-100 text-gray-800 hover:bg-green-200",
            onClick: () =>
                verifyStudent(
                    userId,
                    verificationStatus === "VERIFIED"
                        ? "REJECTED"
                        : "VERIFIED"
                )
        },
        {
            title: "Delete Student",
            icon: Trash2,
            description: "Delete Student Forever",
            color: "bg-red-100 text-gray-800 hover:bg-red-200",
            onClick: () => deleteStudent({ userId: userId }),

        }
    ].filter(Boolean);
