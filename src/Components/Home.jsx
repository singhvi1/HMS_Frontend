import { Bell, Megaphone } from 'lucide-react';
import Topbar from './layout/Topbar.jsx';
import Navbar from './layout/Navbar.jsx';
import Announcements from './dashboard/Announcements.jsx';
import { useSelector } from 'react-redux';

const Home = () => {
  const loogedinUser = useSelector((state) => state.loggedinUser)
  return (
    <>
      <Topbar user={loogedinUser} />
      {/* <Topbar user={loogedinUser} /> */}
      <Navbar />
      <div className="min-h-screen bg-linear-to-b from-gray-50 to-gray-100 py-16 px-4">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">

            <div className="lg:col-span-2 space-y-6">
              <div className="bg-white rounded-xl shadow-lg p-6 backdrop-blur-lg bg-opacity-90">
                <div className="flex items-center justify-between mb-6">
                  <div className="flex items-center space-x-2">
                    <Megaphone className="w-4 h-4 md:w-8 md:h-8 text-indigo-600" />
                    <h2 className="md:text-2xl md:font-bold  font-semibold text-gray-800">Announcements</h2>
                  </div>
                </div>


                <div className="grid gap-6">
                  {/* here we will show Announcements */}
                  <Announcements />

                </div>
              </div>
            </div>

            {/* GALLERY Sidebar */}
            <div className="space-y-6">
              <div className="bg-white rounded-xl shadow-lg p-6 backdrop-blur-lg bg-opacity-90">
                <div className="flex items-center space-x-2 mb-6">
                  <Bell className="w-4 h-4 md:w-8 md:h-8 text-indigo-600" />
                  <h2 className="md:text-2xl font-semibold md:font-bold text-gray-800">Gallery</h2>
                </div>
                <div className="space-y-4">
                  {/* here we will write notification */}
                </div>
              </div>

              {/* Quick Links */}
              <div className="bg-white rounded-xl shadow-lg p-6">
                <h2 className="text-xl font-bold text-gray-800 mb-4">Quick Links</h2>
                <div className="grid grid-cols-2 gap-4">
                  <button className="p-4 bg-indigo-50 rounded-lg text-indigo-600 hover:bg-indigo-100 transition-colors text-sm font-medium">
                    Mess Menu
                  </button>
                  <button className="p-4 bg-green-50 rounded-lg text-green-600 hover:bg-green-100 transition-colors text-sm font-medium">
                    Room Service
                  </button>
                  <button className="p-4 bg-yellow-50 rounded-lg text-yellow-600 hover:bg-yellow-100 transition-colors text-sm font-medium">
                    Pay Fees
                  </button>
                  <button className="p-4 bg-purple-50 rounded-lg text-purple-600 hover:bg-purple-100 transition-colors text-sm font-medium">
                    Contact Staff
                  </button>
                </div>
              </div>
            </div>
            {/* contacts */}



          </div>
        </div>
      </div>
    </>

  );
}

export default Home
