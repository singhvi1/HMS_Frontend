import { useDispatch, useSelector } from "react-redux";
import './App.css'
import { Routes, Route, Navigate } from "react-router-dom"
import { lazy, Suspense, useEffect, useState } from "react";
import { announcements, student } from '../data'

const Home = lazy(() => import("./Components/Home"));
const Login = lazy(() => import("./Components/Login"));
const AdminDashBoard = lazy(() =>
  import("./Components/pages/admins/AdminDashBoard")
);

const StudentDashboard = lazy(() =>
  import("./Components/pages/Student/StudentDashBoard")
);

const StudentHome = lazy(() =>
  import("./Components/pages/Student/StudentHome")
);

const MaintenanceList = lazy(() =>
  import("./Components/pages/Student/MaintenanceList")
);

const MaintenanceForm = lazy(() =>
  import("./Components/pages/Student/MaintenanceForm")
);

const LeaveForm = lazy(() =>
  import("./Components/pages/Student/LeaveForm")
);

const AnnounceMents = lazy(() =>
  import("./Components/dashboard/AnnounceMents")
);

const NotFound = lazy(() =>
  import("./Components/NotFound")
);

const AdminHome = lazy(() =>
  import("./Components/pages/admins/AdminHome")
);
const CreateAnnouncement = lazy(() =>
  import("./Components/pages/admins/announcements/CreateAnnouncement")
);
const AnnounceMentDetail = lazy(() =>
  import("./Components/dashboard/AnnounceMentDetail")
);
const EditAnnouncement = lazy(() =>
  import("./Components/pages/admins/announcements/EditAnnouncement")
);
const CreateStudent = lazy(() =>
  import("./Components/forms/CreateStudent")
);
const StudentList = lazy(() =>
  import("./Components/pages/admins/list/StudentList")
);
const AdminIssueList = lazy(() =>
  import("./Components/pages/admins/issues/AdminIssueList")
);
const RoomsList = lazy(() => import("./Components/pages/admins/rooms/RoomsList"))
const LeavesList = lazy(() => import("./Components/pages/admins/leaves/LeavesList"))
const AdminStudentProfile = lazy(() => import("./Components/pages/admins/studentlist/AdminStudentProfile"))
const AdminRoomProfile = lazy(() => import("./Components/pages/admins/rooms/AdminRoomProfile"))

import { HostelOverview, HostelForm, EditHostel, PageLoader } from "./Components/index"
import { removeLoggedinUser, setLoggedinUser } from './utils/store/logedinUser'
import api from './utils/api'

function App() {
  const user = useSelector((state) => state.loggedinUser);
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchMe = async () => {
      try {
        const res = await api.get("/users/me");
        dispatch(setLoggedinUser(res.data.user));
        // console.log("auto login called")
      } catch (err) {
        dispatch(removeLoggedinUser());
        console.log(err)
      } finally {
        setLoading(false)
      }
    };

    fetchMe();
  }, []);


  if (loading) {
    return <PageLoader />
  }


  return (
    <Suspense fallback={<PageLoader />}>
      <Routes>
        {user ? (
          <>
            <Route path="/login" element={<Navigate to="/" replace />} />

            <Route path="/"
              element={
                <Navigate
                  to={user.role === "student" ? "/student" : "/admin"}
                  replace
                />
              }
            />
            {user.role === "student" && (
              <Route path="/student" element={<StudentDashboard />}>
                <Route index element={<StudentHome />} />
                <Route path="leave/new" element={<LeaveForm />} />
                <Route path="issues" element={<MaintenanceList />} />
                <Route path="issues/new" element={<MaintenanceForm />} />
                <Route path="anns" element={<AnnounceMents />} />
                <Route path="*" element={<NotFound />} />

              </Route>
            )}

            <Route path="/" element={<Home />} />


            {user.role === "admin" && (
              <Route path="/admin" element={<AdminDashBoard />}>
                <Route index element={<AdminHome />} />
                {/* <Route path="test" element={<StudentList1 />} /> */}
                <Route path="hostel" element={<HostelOverview />} />
                <Route path="hostel/new" element={<HostelForm />} />
                <Route path="hostel/:id/edit" element={<EditHostel />} />

                <Route path="anns" element={<AnnounceMents announcements={announcements} />} />
                <Route path="anns/new" element={<CreateAnnouncement />} />
                <Route path="anns/:id" element={<AnnounceMentDetail announcement={announcements} />} />
                <Route path="anns/:id/edit" element={<EditAnnouncement />} />
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

            <Route path="/login" element={<Login />} />
            <Route path="*" element={<Navigate to="/login" replace />} />
          </>
        )}
      </Routes>
    </Suspense>

  );
}

export default App;

