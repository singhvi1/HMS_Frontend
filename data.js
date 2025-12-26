import dayjs from "dayjs";

export const student = {
  full_name: "Vikash Kumar",
  email: "vikash@example.com",
  image_url: "https://avatars.githubusercontent.com/u/120703712?v=4",
  phone: "9905812623",
  sid: "HMS22104109",
  permanent_address: "Patna, Bihar",
  guardian_name: "Rajesh Kumar",
  guardian_contact: "9876543210",
  branch: "B.Tech CSE",
  year: "3rd Year",
  block: "A",
  room_number: "101",
  hostel: "Boys Hostel A",
  payment: {
    hostel_fee: "Pending",
    mess_fee: "Paid"
  }
};

export const students = Array.from({ length: 47 }, (_, i) => ({
  _id: `st_${i + 1}`,
  sid: `HMS2024${100 + i}`,
  email: `student${i + 1}@example.com`,
  full_name: `Student ${i + 1}`,
  branch: ["CSE", "ECE", "ME", "CE"][i % 4],
  year: (i % 4) + 1,
  permanent_address: `City ${i + 1}, Country`,
  guardian_name: `Guardian ${i + 1}`,
  guardian_contact: `90000000${i + 10}`,
  block: ["A", "B", "C"][i % 3],
  room_number: `${["A", "B", "C"][i % 3]}-${101 + i}`,
  status: i % 6 === 0 ? "inactive" : "active"
}));

export const rooms = Array.from({ length: 60 }, (_, i) => {
  const block = ["A", "B", "C"][i % 3];
  const roomNumber = String(101 + i);
  const floor = Math.floor((101 + i) / 100);
  return {
    _id: `room_${i + 1}`,
    block,
    room_number: roomNumber,
    floor,
    capacity: [1, 2, 3][i % 3],
    is_active: i % 12 !== 0,
    yearly_rent: 85000
  };
});

export const issueList = Array.from({ length: 38 }, (_, i) => ({
  _id: `issue_${i + 1}`,
  issue_id: `ISSUE2024${200 + i}`,

  student_id: `st_${(i % 47) + 1}`,
  student_name: `Student ${(i % 47) + 1}`,

  category: ["Electrical", "Plumbing", "Furniture", "Internet"][i % 4],
  title: [
    "Fan not working",
    "Water leakage",
    "Broken chair",
    "WiFi not connecting"
  ][i % 4],

  description: `Reported issue related to ${["fan", "pipe", "chair", "internet"][i % 4]
    } in the room.`,

  block: ["A", "B", "C"][i % 3],
  room: `${["A", "B", "C"][i % 3]}-${101 + i}`,

  priority: ["low", "medium", "high"][i % 3],

  status: ["pending", "in_progress", "resolved"][i % 3],

  created_at: new Date(
    Date.now() - i * 24 * 60 * 60 * 1000
  ).toISOString(),

  updated_at:
    i % 3 === 2
      ? new Date(
        Date.now() - (i - 1) * 24 * 60 * 60 * 1000
      ).toISOString()
      : null
}));

export const admin = {
  full_name: "Ajay Kumar",
  email: "ajay.kumar@hms.com",
  phone: "9876543210",
  role: "admin",
  image_url: "https://i.ibb.co/qYQVBNrG/Screenshot-2025-12-24-144918.png",
  status: "active",
  total_student: "600",
  occupied_rooms: "72%",
  pending_issues: "77%",
  hostel_name: "Himalya Hostel"

};

export const maintenanceMockData = [
  {
    _id: "1",
    title: "Fan not working",
    description: "Ceiling fan stopped working since last night.",
    category: "Electrical",
    room_number: 204,
    block: "B",
    status: "pending",
    createdAt: "2025-12-21T10:30:00Z",
    staff_remark: ""
  },
  {
    _id: "2",
    title: "Water leakage in washroom",
    description: "Continuous leakage from tap.",
    category: "Plumbing",
    room_number: 204,
    block: "B",
    status: "in_progress",
    createdAt: "2025-12-20T08:00:00Z",
    staff_remark: "Plumber assigned"
  },
  {
    _id: "3",
    title: "Broken chair",
    description: "Study chair leg broken.",
    category: "Furniture",
    room_number: 204,
    block: "B",
    status: "resolved",
    createdAt: "2025-12-18T14:20:00Z",
    staff_remark: "Chair replaced"
  }
];

import { Trophy, Wrench, Users, BookOpen } from "lucide-react"
export const announcements = [
  {
    id: 1,
    title: "Annual Sports Meet 2024",
    date: "2024-03-25",
    category: "sports",
    description: "Join us for the annual inter-hostel sports competition featuring cricket, football, and basketball tournaments.",
    icon: Trophy,
    color: "bg-blue-100 text-blue-600"
  },
  {
    id: 2,
    title: "Hostel Maintenance Schedule",
    date: "2024-03-20",
    category: "maintenance",
    description: "Block A water tank cleaning will be conducted. Water supply will be interrupted from 10 AM to 2 PM.",
    icon: Wrench,
    color: "bg-yellow-100 text-yellow-600"
  },
  {
    id: 3,
    title: "Cultural Night",
    date: "2024-03-30",
    category: "event",
    description: "Annual cultural night celebration in the hostel auditorium. All students are invited to participate.",
    icon: Users,
    color: "bg-purple-100 text-purple-600"
  },
  {
    id: 4,
    title: "Library Extended Hours",
    date: "2024-03-22",
    category: "academic",
    description: "The hostel library will remain open until midnight during the exam period.",
    icon: BookOpen,
    color: "bg-green-100 text-green-600"
  }];

export const galleryImages = [
  {
    url_1: "https://www.shutterstock.com/shutterstock/photos/2016000839/display_1500/stock-photo-new-delhi-india-july-group-of-students-eating-together-in-hostel-dining-room-of-hindu-2016000839.jpg"
  },
  {
    url_2: "https://t4.ftcdn.net/jpg/06/14/15/13/360_F_614151302_RPKa47w8G2nHrHy3DPpU4qKn0bnwRiVI.jpg"
  }

]



export const STATUS_COLOR = {
  pending: "bg-yellow-100 text-yellow-700",
  in_progress: "bg-blue-100 text-blue-700",
  resolved: "bg-green-100 text-green-700"
};

// ---------------
const reasons = [
  "Family function at hometown",
  "Medical checkup scheduled",
  "Attending cousin's wedding",
  "Personal emergency at home",
  "Festival celebration with parents",
  "Property documentation work",
  "Brother's school admission process",
  "Grandparent health concern",
];

const destinations = [
  "Hyderabad",
  "Bangalore",
  "Chennai",
  "Mumbai",
  "Vijayawada",
  "Warangal",
  "Vizag",
];

export const leaves = Array.from({ length: 85 }, (_, i) => {
  const s = students[i % students.length];
  const from = dayjs().add(i % 5, "day");
  const to = from.add((i % 3) + 1, "day");

  return {
    _id: `lv_${i + 1}`,
    student_id: s._id,
    full_name: s.full_name,
    sid: s.sid,
    branch: s.branch,
    block: s.block,
    room_number: s.room_number,
    from_date: from.format("YYYY-MM-DD"),
    to_date: to.format("YYYY-MM-DD"),
    destination: destinations[i % destinations.length],
    reason: reasons[i % reasons.length],
    status: i % 6 === 0 ? "approved" : i % 9 === 0 ? "rejected" : "pending",
  };
});