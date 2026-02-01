import { toFormData } from '../../data.js';
import api from './api.js';

export const announcementService = {
  createAnnouncement: (data) => api.post('/home/announcements', data),

  uploadAnnouncementImages: (announcementId, files) => {
    const formData = new FormData();
    files.forEach(file => {
      formData.append("files", file);
    });
    return api.post(`home/announcements/upload/images/${announcementId}`, formData, { headers: { "Content-Type": "multipart/form-data" } });
  },

  uploadAnnouncementFile: (announcementId, files) => {
    const formData = new FormData();
    files.forEach(file => {
      formData.append("files", file);
    });
    return api.post(`home/announcements/upload/pdfs/${announcementId}`, formData, { headers: { "Content-Type": "multipart/form-data" } });
  },

  getAllAnnouncements: () => api.get('/home/announcements'),

  getAnnouncementById: (id) => api.get(`/home/announcements/${id}`),

  updateAnnouncement: (data, user_id,) => api.patch(`/home/announcements/${user_id}`, data,),

  deleteAnnouncement: (id) => api.delete(`/home/announcements/${id}`),
};

export const studentService = {

  createUserStudent: (data) => {
    const payload = toFormData(data);
    return api.post(`/students/create`, payload);
  },
  createStudent: (data) => api.post(`/students`, data),

  getAllStudents: (params) => api.get('/students/getall', { params }),

  getStudentById: (id) => api.get(`/students/profile/${id}`),

  getStudent: () => api.get(`/students/profile`),

  updateStudent: (user_id, data) => {
    const payload = toFormData(data)

    return api.patch(`/students/edit/${user_id}`, payload);
  },


  toogleStudentStatus: (user_id) => api.patch(`/students/status/${user_id}`,),

  downloadDocument: (id) => api.get(`/students/document/${id}`, { responseType: 'blob' }),

  updateStudentProfile: (userId, file) => {
    const formData = new FormData();
    formData.append("file", file);
    return api.post(`/students/upload/profile/${userId}`, formData)
  },

  deleteStudent: (userId) => api.delete(`/students/${userId}`),
};


export const roomService = {
  createRoom: (data) => api.post(`/admin/rooms`, data),

  getAllRooms: () => api.get('/admin/rooms'),

  toggleRoomStatus: (id) => api.patch(`/admin/rooms/${id}/toggle`),

  getRoomById: (id) => api.get(`/admin/rooms/${id}`),

  updateRoom: (room_id, data) => api.patch(`/admin/rooms/${room_id}`, data),


};

export const issueService = {
  createIssues: (data) => api.post('/issues/create', data),

  getAllIssues: (params) => api.get('/issues', { params }),

  getIssueById: (id) => api.get(`/issues/${id}`),

  getAllIssueOfStudent: (params) => api.get(`/issues`, { params }),

  updateIssueStatus: (id, status) => api.patch(`/issues/${id}/status`,
    { status }),
  deleteIssue: (id) => api.delete(`/issues/${id}`),

};
export const issueCommentService = {

  createComment: (data) => api.post(`/issue-comments`, data),

  getIssueAllCommetents: (issue_id) => api.get(`/issue-comments/all/${issue_id}`),
  getIssueCommetents: (issue_id) => api.get(`/issue-comments/${issue_id}`),

  getCommetent: (id) => api.get(`/issue-comments/${id}`),


  updateComment: (id) => api.patch(`/issue-comments/${id}/status`),

  deleteComment: (id) => api.delete(`/issue-comments/${id}`),
};

export const leaveService = {
  getAllLeaves: (params) => api.get('/leave-requests', { params }),

  getStudentAllLeaves: (params) => api.get(`/leave-requests`,
    { params }),

  updateLeaveStatus: (id, status, reason) => api.patch(`/leave-requests/${id}/status`, { status, reason }),

  createLeave: (data) => api.post('/leave-requests/new', data)
};

export const paymentService = {
  getAllPayments: () => api.get('/payments'),
  createPayment: (data) => api.post('/payments/create', data),
};

export const dashboardService = {
  getDashboardStats: () => api.get('/users'),
};

export const authService = {
  loginUser: (email, password) => api.post('/login', { email, password }),
  logoutUser: () => api.post('/logout'),

}

export const userService = {
  createUser: (data) => api.post(`/users`, data),
  getMe: () => api.get(`/users/me`)
}

export const hostelService = {
  create: (data) => api.post("/admin/hostel", data),

  toggleAllotment: (id, allotment_status) => api.post(`/admin/hostel/${id}/allotment`, { allotment_status }),

  getAll: () => api.get("/admin/hostel"),

  getById: (id) => api.get(`/admin/hostel/${id}`),

  update: (id, data) => api.patch(`/admin/hostel/${id}`, data),

  toggleStatus: (id) =>
    api.patch(`/admin/hostel/${id}/toggle-status`),

  delete: (id) => api.delete(`/admin/hostel/${id}`)
};

export const allotmentService = {

  getQuickInfo: () => api.get("/allotment/quickInfo"),

  getAllotmentStatus: () => api.get("/allotment/status"),

  getAllPhaseARoom: () => api.get('/allotment/rooms'),

  getVerificationList: (params) => api.get('/allotment/verification-requests', { params }),

  getRoomById: (roomId) => api.get(`/allotment/room/${roomId}`),


  addUserStudent: (data) => api.post('/allotment/phase-a/register', data),
  addUserStudentB: (data) => api.post('/allotment/phase-b/register', data),

  capacity: ({ action, roomCount }) => api.patch("/allotment/capacity", { action, roomCount }),

  verification: (status, studentUserId) => api.patch(`/allotment/${studentUserId}/verify`, { status })
}

export const excelService = {
  getExcel: (type, filters) => api.get(`/students/export/${type}`, { params: filters, responseType: 'blob' }),
}