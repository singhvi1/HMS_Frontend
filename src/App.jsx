import './App.css'
import { BrowserRouter, Routes, Route } from "react-router-dom"
import Home from './Components/Home'
import AdminDashBoard from './Components/pages/admins/AdminDashBoard'
import Staff from './Components/pages/staffs/Staff'
import Login from './Components/Login'
import { Provider } from "react-redux";
import store from "./utils/store/store"
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
import AdminStudentActions from './Components/pages/admins/studentlist/AdminStudentProfile'
function App() {
  return (
    <>
      <Provider store={store}>
        <BrowserRouter basename="/">
          <Routes>
            <Route>
              <Route path="/student" element={<StudentDashboard />} >
                <Route index element={<StudentHome />} />
                <Route path='leave/new' element={<LeaveForm />} />
                <Route path='issues' element={<MaintenanceList />} />
                <Route path='issues/new' element={<MaintenanceForm />} />
                <Route path='notfound' element={<NotFound />} />
                <Route path="ann" element={<AnnounceMents announcements={announcements} />} />
              </Route>
            </Route>

            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Login />} />

            <Route>
              <Route path='/admin' element={<AdminDashBoard />}>
                <Route index element={<AdminHome />} />
                <Route path='ann' element={<AnnounceMents announcements={announcements} />} />
                <Route path='ann/new' element={<AnnouncementForm />} />
                <Route path='ann/:id' element={<AnnounceMentDetail announcement={announcements} />} />
                <Route path='ann/:id/edit' element={<EditAnnouncement />} />
                <Route path='students/new' element={<CreateStudent />} />
                <Route path='students' element={<StudentList />} />
                <Route path='students/:id' element={<AdminStudentActions student={student} />} />
                <Route path='rooms' element={<RoomsList />} />
                <Route path='issues' element={<AdminIssueList />} />

              </Route>
            </Route>

            <Route path="/staff" element={<Staff />} />
            <Route path="/test" element={<AdminIssueList />} />
            {/* <Route path="/test1" element={<ThemeToggle />} /> */}

          </Routes>
        </BrowserRouter>
      </Provider>
    </>
  )
}

export default App
