export const BASE_URL = location.hostname === "localhost" ? "http://localhost:3000/api/v1" : "/api/v1";

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

export const formatDateTime = (date) =>
  new Date(date).toLocaleString("en-IN", {
    day: "2-digit",
    month: "short",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
    hour12: true
  });

export const getDateInfo = (createdAt, updatedAt) => {
  const isUpdated =
    updatedAt &&
    new Date(updatedAt).getTime() !== new Date(createdAt).getTime();

  return {
    label: isUpdated ? "Updated at" : "Posted at",
    value: isUpdated ? updatedAt : createdAt
  };
};
import {
  Trophy,
  AlertCircle,
  ShieldAlert,
  BookOpen,
  Utensils,
  Bell,
  ClipboardList,
  CalendarDays,
  GraduationCap
} from "lucide-react";

export const CATEGORIES = [
  "notice",
  "sports",
  "maintenance",
  "security",
  "disciplinary",
  "food",
  "dinner",
  "books",
  "library",
  "event",
  "hostel"
];
export const categoryIconMap = {
  // Announcements / General
  notice: Megaphone,
  announcement: Bell,
  alert: AlertCircle,

  // Sports & Activities
  sports: Trophy,
  event: CalendarDays,

  // Maintenance & Security
  maintenance: Wrench,
  security: ShieldAlert,

  // Discipline & Admin
  disciplinary: ClipboardList,
  discipline: ClipboardList,
  admin: Users,

  // Academics
  books: BookOpen,
  library: BookOpen,
  academic: GraduationCap,

  // Food & Hostel Life
  food: Utensils,
  dinner: Utensils,
  mess: Utensils,

  // Hostel / Room
  hostel: Home
};
export const categoryColorMap = {
  notice: "bg-blue-100 text-blue-600",
  sports: "bg-green-100 text-green-600",
  maintenance: "bg-yellow-100 text-yellow-700",
  security: "bg-red-100 text-red-600",
  disciplinary: "bg-orange-100 text-orange-600",
  food: "bg-purple-100 text-purple-600",
  books: "bg-indigo-100 text-indigo-600",
  event: "bg-pink-100 text-pink-600"
};


export const FILE_NAMES = {
  accountants: "accountant-payments.xlsx",
  studentwise: "student-wise-allotment.xlsx",
  roomwise: "room-wise.xlsx",
};

export const TITLES = {
  accountants: "Download Accountant Excel",
  studentwise: "Download Student-wise Excel",
  roomwise: "Download Room-wise Excel",
};

