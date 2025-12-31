// config.action.js
import {
  Wrench,
  CalendarDays,
  CreditCard,
  AlertTriangle,
  Building2,
  Megaphone,
  UserPlus,
  HousePlus,
} from "lucide-react";

export const studentActions = [
  {
    title: "Maintenance",
    description: "Raise new issue",
    icon: Wrench,
    color: "bg-yellow-50",
    to: "/student/issues/new"
  },
  {
    title: "Leave",
    description: "Apply new leave",
    icon: CalendarDays,
    color: "bg-purple-50",
    to: "/student/leave/new"
  },
  {
    title: "Payments",
    description: "Pay fees and dues",
    icon: CreditCard,
    color: "bg-green-50",
    to: "/student/notfound"
  },
  {
    title: "Discipline",
    description: "Provide justification",
    icon: AlertTriangle,
    color: "bg-red-50",
    to: "/student/notfound"
  }
];

export const adminActions = [
  {
    title: "Hostel",
    description: "Create or edit hostels",
    icon: Building2,
    color: "bg-yellow-50",
    // to: "*"
    to: "/admin/hostel"
  },
  {
    title: "Announcements",
    description: "Create New Announcement",
    icon: Megaphone,
    color: "bg-orange-50",
    to: "/admin/anns/new"
  },
  {
    title: "New Student",
    description: "Add a Student",
    icon: UserPlus,
    color: "bg-indigo-50",
    to: "/admin/students/new"
  },
  {
    title: "New Room",
    description: "Add a Room",
    icon: HousePlus,
    color: "bg-teal-50",
    to: "/admin/rooms/new"
  },
  {
    title: "Payments",
    description: "Pay fees and dues",
    icon: CreditCard,
    color: "bg-emerald-50",
    to: "/student/notfound"
  },
  {
    title: "Discipline",
    description: "Provide justification",
    icon: AlertTriangle,
    color: "bg-rose-50",
    to: "/student/notfound"
  }
];
