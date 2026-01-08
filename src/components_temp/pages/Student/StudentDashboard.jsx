import { useState } from "react";
import Navbar from "../../layout/Navbar";
import SideBar from "../../layout/SideBar";
import { student } from "../../../../data";
import Topbar from "../../layout/Topbar";
import { Outlet } from "react-router-dom";

const StudentDashboard = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  return (
    <div className="min-h-screen bg-gray-100">
      {/*ye mobie ke liye  */}
      <Navbar onMenuClick={() => setIsSidebarOpen(true)} />
      {/* Desktop TopBar */}
      <Topbar user={student} />
      <div className="flex">
        <SideBar
          role="student"
          isOpen={isSidebarOpen}
          onClose={() => setIsSidebarOpen(false)}
        />


        <main className="flex-1 p-6">
          {/* <BackButton /> */}
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default StudentDashboard;
