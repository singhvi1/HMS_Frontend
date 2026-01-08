import { useDispatch, useSelector } from "react-redux";
import './App.css'
import { Routes, Route, Navigate } from "react-router-dom"
import { lazy, Suspense, useEffect, useState } from "react";

const Home = lazy(() => import("./components/Home.jsx"));
const Login = lazy(() => import("./components/Login.jsx"));
const AdminDashBoard = lazy(() =>
  import("./components/pages/admins/AdminDashBoard.jsx")
)

const StudentDashBoard = lazy(() =>
  import("./components/pages/student/StudentDashboard.jsx")
);

const StudentHome = lazy(() =>
  import("./components/pages/student/StudentHome.jsx")
);

const MaintenanceList = lazy(() =>
  import("./components/pages/student/MaintenanceList.jsx")
);

const MaintenanceForm = lazy(() =>
  import("./components/forms/MaintenanceForm.jsx")
);

const LeaveForm = lazy(() =>
  import("./components/forms/LeaveForm.jsx")
);

const Announcements = lazy(() =>
  import("./components/dashboard/Announcements.jsx")
);

const NotFound = lazy(() =>
  import("./components/NotFound.jsx")
);

const AdminHome = lazy(() =>
  import("./components/pages/admins/AdminHome.jsx")
);
const CreateAnnouncement = lazy(() =>
  import("./components/pages/admins/announcements/CreateAnnouncement.jsx")
);
const AnnounceMentDetail = lazy(() =>
  import("./components/dashboard/AnnouncementDetail.jsx")
);

const EditAnnouncement = lazy(() =>
  import("./components/pages/admins/announcements/EditAnnouncement.jsx")
);
const CreateStudent = lazy(() =>
  import("./components/forms/CreateStudent.jsx")
);
const StudentList = lazy(() =>
  import("./components/pages/admins/list/student/StudentList.jsx")
);
const IssuesList = lazy(() =>
  import("./components/pages/admins/list/issues/IssuesList.jsx")
);
const RoomsList = lazy(() => import("./components/pages/admins/list/room/RoomsList.jsx"))
const LeavesList = lazy(() => import("./components/pages/admins/list/leave/LeavesList.jsx"))
const AdminStudentProfile = lazy(() => import("./components/pages/admins/list/student/AdminStudentProfile.jsx"))
const AdminRoomProfile = lazy(() => import("./components/pages/admins/list/room/AdminRoomProfile.jsx"))
const EditRoom = lazy(() => import("./components/pages/admins/list/room/EditRoom.jsx"))
const CreateRoom = lazy(() => import("./components/forms/CreateRoom.jsx"))
const EditStudent = lazy(() => import("./components/pages/admins/list/student/EditStudent.jsx"))
const AdminIssueProfile = lazy(() => import("./components/pages/admins/list/issues/AdminIssueProfile.jsx"));
const PageLoader = lazy(() => import("./components/common/PageLoader.jsx"))
import { removeLoggedinUser, setLoggedinUser } from './utils/store/logedinUser'
import { userService } from "./services/apiService";
const List = lazy(() => import("./components/pages/student/studentPersonalList/List.jsx"));
const HostelOverview = lazy(() => import("./components/pages/admins/hostel/HostelOverview.jsx"))
const EditHostel = lazy(() => import("./components/pages/admins/hostel/EditHostel.jsx"))
const HostelForm = lazy(() => import("./components/forms/HostelForm.jsx"))



function App() {
  const user = useSelector((state) => state.loggedinUser);
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (user) {
      setLoading(false);
      return;
    }
    const fetchMe = async () => {
      try {
        const res = await userService.getMe();
        dispatch(setLoggedinUser(res.data.user));
      } catch (err) {
        dispatch(removeLoggedinUser());
        console.log(err)
      } finally {
        setLoading(false)
      }
    };

    fetchMe();
  }, [dispatch, user]);


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
              <Route path="/student" element={<StudentDashBoard />}>
                <Route index element={<StudentHome />} />
                <Route path="leave/new" element={<LeaveForm />} />
                <Route path="issues" element={<MaintenanceList />} />
                <Route path="list" element={<List />} />
                <Route path="issues/:id" element={<AdminIssueProfile />} />
                <Route path="issues/new" element={<MaintenanceForm />} />
                <Route path="anns" element={<Announcements />} />
                <Route path="anns/:id" element={<AnnounceMentDetail />} />
                <Route path="*" element={<NotFound />} />

              </Route>
            )}

            <Route path="/" element={<Home />} />



            {user.role === "admin" && (
              <Route path="/admin" element={<AdminDashBoard />}>
                <Route index element={<AdminHome />} />
                <Route path="hostel" element={<HostelOverview />} />
                <Route path="hostel/new" element={<HostelForm />} />
                <Route path="hostel/:id/edit" element={<EditHostel />} />

                <Route path="anns" element={<Announcements />} />
                <Route path="anns/new" element={<CreateAnnouncement />} />
                <Route path="anns/:id" element={<AnnounceMentDetail />} />
                <Route path="anns/:id/edit" element={<EditAnnouncement />} />
                <Route path="students" element={<StudentList />} />
                <Route path="students/new" element={<CreateStudent />} />
                <Route path="students/:id" element={<AdminStudentProfile />} />
                <Route path="students/:id/edit" element={<EditStudent />} />
                <Route path="rooms" element={<RoomsList />} />
                <Route path="rooms/new" element={<CreateRoom />} />
                <Route path="rooms/:id" element={<AdminRoomProfile />} />
                <Route path="rooms/:id/edit" element={<EditRoom />} />
                <Route path="issues" element={<IssuesList />} />
                <Route path="issues/:id" element={<AdminIssueProfile />} />
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

