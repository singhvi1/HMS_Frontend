import './App.css'
import { Routes, Route, Navigate } from "react-router-dom"
import Home from './Components/Home'
import AdminDashBoard from './Components/pages/admins/AdminDashBoard'
import Login from './Components/Login'
import { useDispatch, useSelector } from "react-redux";
import StudentDashboard from './Components/pages/Student/StudentDashBoard'
import MaintenanceForm from './Components/pages/Student/MaintenanceForm'
import MaintenanceList from './Components/pages/Student/MaintenanceList'
import LeaveForm from './Components/pages/Student/LeaveForm'
import NotFound from './Components/NotFound'
import StudentHome from './Components/pages/Student/StudentHome'
import AnnounceMents from './Components/dashboard/AnnounceMents'
import { announcements, student } from '../data'
import AdminHome from './Components/pages/admins/AdminHome'
import AnnouncementForm from './Components/forms/AnnouncementForm'
import AnnounceMentDetail from './Components/dashboard/AnnounceMentDetail'
import EditAnnouncement from './Components/forms/EditAnnouncement'
import CreateStudent from './Components/forms/CreateStudent'
import StudentList from './Components/pages/admins/studentlist/StudentList'
import AdminIssueList from './Components/pages/admins/issues/AdminIssueList'
import RoomsList from './Components/pages/admins/rooms/RoomsList'
import LeavesList from './Components/pages/admins/leaves/LeavesList'
import AdminStudentProfile from './Components/pages/admins/studentlist/AdminStudentProfile'
import AdminRoomProfile from './Components/pages/admins/rooms/AdminRoomProfile'

import { HostelOverview, HostelForm, EditHostel } from "./Components/index"
import api from './utils/api'
import { removeLoggedinUser, setLoggedinUser } from './utils/store/logedinUser'
import { useEffect } from 'react'

function App() {
  const user = useSelector((state) => state.loggedinUser);
  const dispatch = useDispatch();

  useEffect(() => {
    const fetchMe = async () => {
      try {
        const res = await api.get("/users/me");
        dispatch(setLoggedinUser(res.data.user));
        console.log("auto login called")
      } catch (err) {
        dispatch(removeLoggedinUser());
        console.log(err)
      }
    };

    fetchMe();
  }, []);

  return (
    <Routes>
      {user ? (
        <>
          {/* Logged-in users */}
          <Route path="/login" element={<Navigate to="/" replace />} />

          <Route
            path="/"
            element={
              <Navigate
                to={user.role === "student" ? "/student" : "/admin"}
                replace
              />
            }
          />

          {/* STUDENT */}
          {user.role === "student" && (
            <Route path="/student" element={<StudentDashboard />}>
              <Route index element={<StudentHome />} />
              <Route path="leave/new" element={<LeaveForm />} />
              <Route path="issues" element={<MaintenanceList />} />
              <Route path="issues/new" element={<MaintenanceForm />} />
              <Route path="ann" element={<AnnounceMents announcements={announcements} />} />
              <Route path="*" element={<NotFound />} />

            </Route>
          )}
          <Route path="/" element={<Home />} />

          {/* Admins */}
          {user.role === "admin" && (
            <Route path="/admin" element={<AdminDashBoard />}>
              <Route index element={<AdminHome />} />

              <Route path="hostel" element={<HostelOverview />} />
              <Route path="hostel/new" element={<HostelForm />} />
              <Route path="hostel/:id/edit" element={<EditHostel />} />

              <Route path="ann" element={<AnnounceMents announcements={announcements} />} />
              <Route path="ann/new" element={<AnnouncementForm />} />
              <Route path="ann/:id" element={<AnnounceMentDetail announcement={announcements} />} />
              <Route path="ann/:id/edit" element={<EditAnnouncement />} />

              <Route path="students" element={<StudentList />} />
              <Route path="students/new" element={<CreateStudent />} />
              <Route path="students/:id" element={<AdminStudentProfile student={student} />} />
              <Route path="rooms" element={<RoomsList />} />
              <Route path="rooms/:id" element={<AdminRoomProfile />} />
              <Route path="issues" element={<AdminIssueList />} />
              <Route path="leaves" element={<LeavesList />} />
              <Route path="*" element={<NotFound />} />

            </Route>
          )}
        </>
      ) : (
        <>
          {/* GUEST */}
          <Route path="/login" element={<Login />} />
          <Route path="*" element={<Navigate to="/login" replace />} />
        </>
      )}
    </Routes>
  );
}

export default App;

