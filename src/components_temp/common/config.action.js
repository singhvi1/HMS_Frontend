// config.action.js  for Quick Action Grid just below header card of profile
import {
  AlertCircle,
  Wrench,
  CalendarDays,
  CreditCard,
  AlertTriangle,
  Building2,
  Megaphone,
  UserPlus,
  HousePlus,
  Trash2
} from "lucide-react";

export const studentActions = [
  {
    title: "Issue Form",
    description: "Raise new issue",
    icon: Wrench,
    color: "bg-yellow-100",
    to: "/student/issues/new"
  },
  {
    title: "Leave Form",
    description: "Apply new leave",
    icon: CalendarDays,
    color: "bg-purple-100",
    to: "/student/leave/new"
  },
  
  {
    title: "Payments",
    description: "Pay fees and dues",
    icon: CreditCard,
    color: "bg-green-100",
    to: "/student/notfound"
  },
  {
    title: "Discipline",
    description: "Provide justification",
    icon: AlertTriangle,
    color: "bg-red-100",
    to: "/student/notfound"
  }
];

export const adminActions = [
  {
    title: "Hostel",
    icon: Building2,
    description: "Create or edit hostels",
    color: "bg-yellow-50",
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


export const issuesAdminActions = [
  {
    title: "Change Status",
    description: "All issues By this Student",
    icon: AlertCircle,
    color: "bg-blue-100",
    to: "*"
    // to: "/admin/issues"
  },
  {
    title: "Delete Issue",
    description: "Delete This Issue",
    icon: Trash2,
    color: "bg-red-100",
    to: "*"
    // to: "/admin/issues"
  },
];

