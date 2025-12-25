import { LogOut, Home } from "lucide-react";
import { Link } from "react-router-dom"
import ProfileAvatar from "../profile/ProfileAvatar";

//this is for laptop hidden for mobile
const Topbar = ({ user }) => {
  // console.log(user)
  return (
    <div className="hidden md:flex  bg-linear-to-r from-indigo-600 to-blue-500 text-white shadow px-6 py-4 items-center justify-between ">
      {/* left loggo home wala */}
      <Link to="/" className="flex items-center gap-2">
        <Home className="w-6 h-6" />
        <span className="font-bold text-xl">HMS</span>
      </Link>

      {/* right  side */}

      <div className="flex items-center gap-4">
        <Link to="/admin">Admin</Link>
        <Link to="/student">student</Link>
        <div className="w-9 h-9 flex items-center justify-center rounded-full bg-indigo-100 text-indigo-600">
          <ProfileAvatar
            image_url={user?.image_url
            }
            name={user?.full_name}
            size={36}
          />
        </div>
        {/* Name */}
        <span className="font-medium text-gray-700">
          {user?.full_name || "Student"}
        </span>

        <button
          className="flex items-center gap-2 text-sm bg-indigo-600 text-white px-4 py-2 rounded-md hover:bg-indigo-700">
          <LogOut size={16} />
          Logout
        </button>
      </div>
    </div>
  );
};

export default Topbar;
