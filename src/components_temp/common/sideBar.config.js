import {
    User,
    CreditCard,
    Wrench,
    CalendarDays,
    Megaphone,
    BedDouble,
    List
} from "lucide-react";

export const sidebarConfig = {
    admin: [
        { label: "Profile", icon: User, path: "/admin" },
        { label: "Announcements", icon: Megaphone, path: "/admin/anns" },
        { label: "Students", icon: BedDouble, path: "/admin/students" },
        { label: "Rooms", icon: BedDouble, path: "/admin/rooms" },
        { label: "Issues", icon: Wrench, path: "/admin/issues" },
        { label: "Leaves", icon: CalendarDays, path: "/admin/leaves" },
        { label: "Payments", icon: CreditCard, path: null },
    ],

    student: [
        { label: "Profile", icon: User, path: "/student" },
        { label: "Announcements", icon: Megaphone, path: "/student/anns" },
        { label: "Lists", icon: List, path: "/student/list" },
        { label: "Issues", icon: Wrench, path: "/student/issues" },
        { label: "Leave", icon: CalendarDays, path: "/student/leave" },
        { label: "Payments", icon: CreditCard, path: "/student/notfound" },
        { label: "Disciplinary Actions", icon: CreditCard, path: "/student/notfound" },
    ],
};
