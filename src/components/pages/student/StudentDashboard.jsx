import { useState } from "react";
import NavBar from "../../layout/NavBar";
import SideBar from "../../layout/SideBar";
import Topbar from "../../layout/Topbar";
import { Outlet } from "react-router-dom";
import { useSelector } from "react-redux";
import { selectAllstudentProfileState } from "../../../utils/store/studentProfile";

const StudentDashBoard = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const { student } = useSelector(selectAllstudentProfileState);

  return (
    <div className="min-h-screen bg-gray-100">
      {/*ye mobie ke liye  */}
      <NavBar onMenuClick={() => setIsSidebarOpen(true)} />
      
      {/* Desktop TopBar */}
      <Topbar user={student?.user_id} url={student?.profile_photo?.url} />
      <div className="flex">
        <SideBar
          role="student"
          isOpen={isSidebarOpen}
          onClose={() => setIsSidebarOpen(false)}
        />


        <main className="flex-1 p-6">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default StudentDashBoard;
