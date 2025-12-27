import api from '../utils/api';

// Student related APIs
export const studentService = {
  getAllStudents: (params) => api.get('/students', { params }),
  getStudent: (userId) => api.get(`/students/${userId}`),
  updateStudent: (userId, data) => api.patch(`/students/${userId}`, data),
  deleteStudent: (userId) => api.delete(`/students/${userId}`),
};

// Room related APIs
export const roomService = {
  getAllRooms: () => api.get('/rooms'),
  assignRoom: (data) => api.patch('/rooms/assign', data),
  vacateRoom: (data) => api.patch('/rooms/vacate', data),
};

// Maintenance/Issue related APIs
export const issueService = {
  getAllIssues: () => api.get('/issues'),
  getIssue: (id) => api.get(`/issues/${id}`),
  updateIssueStatus: (id, status) => api.patch(`/issues/${id}/status`, { status }),
  deleteIssue: (id) => api.delete(`/issues/${id}`),
};

// Leave request related APIs
export const leaveService = {
  getAllLeaves: () => api.get('/leave'),
  updateLeaveStatus: (id, status) => api.patch(`/leave/${id}/status`, { status }),
};

// Announcement related APIs
export const announcementService = {
  createAnnouncement: (data) => api.post('/announcements/create', data),
  getAllAnnouncements: () => api.get('/announcements'),
  deleteAnnouncement: (id) => api.delete(`/announcements/${id}`),
};

// Payment related APIs
export const paymentService = {
  getAllPayments: () => api.get('/payments'),
  createPayment: (data) => api.post('/payments/create', data),
};

// Dashboard related APIs
export const dashboardService = {
  getDashboardStats: () => api.get('/admin/dashboard'),
};

export const authService = {
  loginUser: (email, password) => api.post('/login', { email, password }),
  logoutUser: () => api.post('/logout'),
}

//future : 
export const hostelService = {
  create: (data) => api.post("/admin/hostel", data),

  getAll: () => api.get("/admin/hostel"),

  getById: (id) => api.get(`/admin/hostel/${id}`),

  update: (id, data) => api.patch(`/admin/hostel/${id}`, data),

  toggleStatus: (id) =>
    api.patch(`/admin/hostel/${id}/toggle-status`),

  delete: (id) => api.delete(`/admin/hostel/${id}`)
};
