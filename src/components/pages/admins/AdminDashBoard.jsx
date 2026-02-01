import { useCallback, useState } from 'react'
import Topbar from '../../layout/Topbar'
import NavBar from '../../layout/NavBar';
import SideBar from '../../layout/SideBar';
import { Outlet } from 'react-router-dom';
import { useSelector } from 'react-redux';

const AdminDashBoard = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const loggedinUser = useSelector((state) => state.loggedinUser)


  const onClose = useCallback(() => {
    setIsSidebarOpen(false);
  }, []);
  const onOpen = useCallback(() => {
    setIsSidebarOpen(true);
  }, []);
  return (
    <div className="min-h-screen bg-gray-100">
      {/*ye mobie ke liye  */}
      <NavBar onMenuClick={onOpen} />

      {/* Desktop TopBar */}
      <Topbar user={loggedinUser?.user} />

      <div className="flex">
        <SideBar
          role="admin"
          isOpen={isSidebarOpen}
          onClose={onClose}
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
