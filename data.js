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
export const getFloorLabel = (n) => {
  const prefix = Math.floor(n / 100);
  if (prefix === 1) return "Ground";
  const floor = prefix - 1;
  const j = floor % 10;
  const k = floor % 100;
  if (j === 1 && k !== 11) return `${floor}st Floor`;
  if (j === 2 && k !== 12) return `${floor}nd Floor`;
  if (j === 3 && k !== 13) return `${floor}rd Floor`;
  return `${floor}th Floor`;
};

//later update it 
export const initialForm = {
  full_name: "",
  email: "",
  phone: "",
  password: "",
  sid: "",
  branch: "",
  permanent_address: "",
  guardian_name: "",
  guardian_contact: "",
  block: "",
  room_number: "",
  capacity: "1",
  yearly_rent: 7500,
};

export const leaveForm = {
  leave_type: "",
  from_date: "",
  to_date: "",
  reason: "",
  half_day: false,
  only_tomorrow: false
}

export const mapFormToCreateStudentPayload = (form = {}) => ({
  full_name: (form.full_name ?? "").trim(),
  email: (form.email ?? "").trim().toLowerCase(),
  phone: (form.phone ?? "").toString().trim(),
  password: form.password ?? "",
  role: "student",

  sid: (form.sid ?? "").trim(),
  branch: (form.branch ?? "").trim(),
  permanent_address: (form.permanent_address ?? "").trim(),
  guardian_name: (form.guardian_name ?? "").trim(),
  guardian_contact: (form.guardian_contact ?? "").toString().trim(),

  block: (form.block ?? "").toLowerCase(),
  room_number: Number(form.room_number ?? 0),
  capacity: Number(form.capacity ?? 1),
  yearly_rent: Number(form.yearly_rent ?? 0),
});

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

export const getNextAllotmentStatus = (current) => {
  switch (current) {
    case "CLOSED":
      return "PHASE_A";
    case "PHASE_A":
      return "PHASE_B";
    case "PHASE_B":
      return "CLOSED";
    default:
      return null;
  }
};

export const allotmentRouteMap = {
  PHASE_A: "/allotment/phase-a",
  PHASE_B: "/allotment/phase-b",
};




