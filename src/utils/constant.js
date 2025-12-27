  export const BASE_URL=location.hostname === "localhost" ? "http://localhost:3000/api/v1" : "/";


export const statusColors = {
  pending: "bg-yellow-100 text-yellow-800",
  in_progress: "bg-blue-100 text-blue-800",
  resolved: "bg-green-100 text-green-800"
};


import {
  LayoutDashboard,
  Users,
  FileText,
  Wrench,
  CreditCard,
  Megaphone,
  Home
} from "lucide-react";

export const sidebarConfig = {
  admin: [
    { label: "Dashboard", path: "/admin", icon: LayoutDashboard },
    { label: "Students", path: "/admin/students", icon: Users },
    { label: "Leave Requests", path: "/admin/leaves", icon: FileText },
    { label: "Maintenance", path: "/admin/issues", icon: Wrench },
    { label: "Payments", path: "/admin/payments", icon: CreditCard },
    { label: "Announcements", path: "/admin/announcements", icon: Megaphone }
  ],

  student: [
    { label: "Home", path: "/student", icon: Home },
    { label: "Leave", path: "/student/leave", icon: FileText },
    { label: "Maintenance", path: "/student/issues", icon: Wrench },
    { label: "Payments", path: "/student/payments", icon: CreditCard }
  ]
};
