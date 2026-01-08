import { useState } from 'react'
import Topbar from '../../layout/Topbar'
import Navbar from '../../layout/Navbar';
import SideBar from '../../layout/SideBar';
import { Outlet } from 'react-router-dom';
import { useSelector } from 'react-redux';

const AdminDashBoard = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const loggedinUser = useSelector((state) => state.loggedinUser)

  return (
    <div className="min-h-screen bg-gray-100">
      {/*ye mobie ke liye  */}
      <Navbar onMenuClick={() => setIsSidebarOpen(true)} />

      {/* Desktop TopBar */}
      <Topbar user={loggedinUser} />

      <div className="flex">
        <SideBar
          role="admin"
          isOpen={isSidebarOpen}
          onClose={() => setIsSidebarOpen(false)}
        />


        <main className="flex-1 p-6">
          {/* Your dashboard content */}
          <Outlet />
        </main>
      </div>
    </div>
  )
}

export default AdminDashBoard;
