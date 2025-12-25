import React, { useState } from 'react'
import Topbar from '../../layout/Topbar'
import { student } from '../../../../data';
import Navbar from '../../layout/NavBar';
import SideBar from './layout/SideBar';
import { Outlet } from 'react-router-dom';

const AdminDashBoard = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  console.log("studentDashBoard rendring")

  return (
    <div className="min-h-screen bg-gray-100">
      {/*ye mobie ke liye  */}
      <Navbar onMenuClick={() => setIsSidebarOpen(true)} />
      {/* Desktop TopBar */}
      <Topbar user={student} />
      <div className="flex">
        <SideBar
          isOpen={isSidebarOpen}
          onClose={() => setIsSidebarOpen(false)}
        />

        <main className="flex-1 p-6">
          {/* Your dashboard content */}
          {/* <section className="flex-1 p-4 md:p-6 space-y-6">
            <ProfileHero student={student} />
            <QuickActions />

          </section> */}
          <Outlet />
        </main>
      </div>
    </div>
  )
}

export default AdminDashBoard
