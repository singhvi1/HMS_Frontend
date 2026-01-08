import { Pencil, Trash2, UserX, Settings, UserPlus, Power, PowerOff } from "lucide-react";

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
export const getStudentActions = (
    { userId, status, navigate, toggleStudentFxn, deleteStudent }) => [
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
        {
            title: "Delete Student",
            icon: Trash2,
            description: "Delete Student Forever",
            color: "bg-red-100 text-gray-800 hover:bg-red-200",
            onClick: () => deleteStudent({ userId: userId }),

        }
    ];
