import { Pencil, Trash2, UserX, AlertTriangle, Settings, UserPlus, Power, PowerOff } from "lucide-react";

// export const getRoomActions = ({ room, navigate }) => {

//     const isFull = room?.occupancy >= room?.capacity;
//     console.log(room)
//     return [
//         {
//             label: "Add New  Student",
//             icon: UserPlus,
//             className: "bg-green-500 text-white hover:bg-green-700",
//             disabled: isFull || !room?.is_active,
//             onClick: () =>
//                 navigate(`/admin/students/new?roomId=${room?._id}`, {
//                     state: { room }
//                 })
//         },
//         {
//             label: "Increase Room Capacity",
//             icon: UserPlus,
//             className: "bg-green-500 text-white hover:bg-green-700",
//             onClick: () =>
//                 navigate(`/admin/students/new?roomId=${room?._id}`, {
//                     state: { room }
//                 })
//         },
//         {
//             label: "Remove Student",
//             icon: UserPlus,
//             className: "bg-green-500 text-white hover:bg-green-700",
//             disabled: isFull || !room?.is_active,
//             onClick: () =>
//                 navigate(`/admin/students/new?roomId=${room?._id}`, {
//                     state: { room }
//                 })
//         },
//         {
//             label: "Change Room Status",
//             icon: UserPlus,
//             className: "bg-blue-500 text-white hover:bg-violet-700",
//             disabled: isFull || !room?.is_active,
//             onClick: () =>
//                 navigate(`/admin/rooms/${room?._id}/edit`, {
//                     state: { room }
//                 })
//         },

//         {
//             label: room?.is_active ? "Deactivate Room" : "Activate Room",
//             icon: room?.is_active ? PowerOff : Power,
//             className: room?.is_active
//                 ? "bg-yellow-500 text-black hover:bg-yellow-600"
//                 : "bg-indigo-600 text-white hover:bg-indigo-700",
//             onClick: () => console.log("Toggle room", room?._id)
//         }
//     ];
// };

export const getRoomActions = ({ room }) => {
    const isFull = room?.occupancy >= room?.capacity;
    // console.log(isFull)
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
                ? "bg-yellow-50"
                : "bg-indigo-50",
            to: `/admin/rooms/${room?._id}/status`
        }
    ];
};

export const getStudentActions = ({ student, navigate }) => [
    {
        label: "Edit Info",
        icon: Pencil,
        className: "bg-blue-600 text-white hover:bg-blue-700",
        onClick: () =>
            navigate(`/admin/students/${student._id}/edit`)
    },
    {
        label: "Change Status",
        icon: UserX,
        className: "bg-yellow-500 text-black hover:bg-yellow-600",
        onClick: () => console.log("Change status", student._id)
    },
    {
        label: "Delete Student",
        icon: Trash2,
        className: "bg-red-600 text-white hover:bg-red-700",
        onClick: () => console.log("Delete student", student._id)
    },
    {
        label: "Add Disciplinery Actions",
        icon: AlertTriangle,
        className: "bg-gray-600 text-white hover:bg-gray-700",
        onClick: () => console.log("Add discipline", student._id)
    }
];
