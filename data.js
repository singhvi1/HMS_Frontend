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
export const toFormData = (data) => {
  const formData = new FormData();

  Object.entries(data).forEach(([key, value]) => {
    if (value === undefined || value === null) return;

    if (value instanceof File) {
      formData.append(key, value);
    }
    else if (typeof value === "object") {
      formData.append(key, JSON.stringify(value));
    }
    else {
      formData.append(key, value);
    }
  });

  return formData;
};

//later update it 
export const initialForm = {
  full_name: "",
  email: "",
  phone: "",
  password: "",
  sid: "",
  branch: "",
  file: null,

  permanent_address: "",
  guardian_name: "",
  guardian_contact: "9902455152",
  verificationIds: {
    studentId: {
      idType: "",
      idValue: ""
    },
    guardianId: {
      idType: "",
      idValue: ""
    },
    paymentId: {
      idType: "",
      idValue: ""
    }
  },
  block: "",
  room_number: "",
  capacity: "1",
  yearly_rent: 7500,
};
export const mapRoomToForm = (room) => ({
  block: room?.block || "",
  room_number: room?.room_number || "",
  capacity: room?.capacity || "1",
});
export const mapStudentToForm = (student) => ({
  full_name: student?.user_id?.full_name || "",
  email: student?.user_id?.email || "",
  phone: student?.user_id?.phone || "",
  sid: student?.sid || "",
  file: student?.profile_photo || null,
  verificationIds: student?.verificationIds || {},
  branch: student?.branch || "",
  permanent_address: student?.permanent_address || "",
  guardian_name: student?.guardian_name || "",
  guardian_contact: student?.guardian_contact || "",
  block: student?.room_id?.block || "",
  room_number: student?.room_id?.room_number || "",
  capacity: student?.room_id?.capacity || "1",
});

export const mapFormToAllotmentPayload = (form) => ({
  full_name: form.full_name,
  email: form.email,
  phone: form.phone,
  password: form.password,

  sid: form.sid,
  branch: form.branch,
  permanent_address: form.permanent_address,
  guardian_name: form.guardian_name,
  guardian_contact: form.guardian_contact,
});
export const mapFormToCreateAnnouncementPayload = (form = {}) => ({
  title: (form.title ?? "").trim(),
  message: (form.message ?? "").trim(),
  category: (form.category ?? "").trim(),
  notice_url: (form.notice_url ?? "").trim()
})

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
  verificationIds: form.verificationIds || {},
  file: form.file || null,

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




