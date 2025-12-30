import { LogOut, Home } from "lucide-react";
import { Link } from "react-router-dom";
import ProfileAvatar from "../profile/ProfileAvatar";
import { useDispatch, useSelector } from "react-redux";
import { removeLoggedinUser } from "../../utils/store/logedinUser";
import { authService } from "../../services/apiService";
import { removeAnnouncement } from "../../utils/store/announcementsSlice";

const Topbar = ({ user }) => {
  const dispatch = useDispatch();
  const handleLogout = async () => {
    const res = await authService.logoutUser();
    dispatch(removeLoggedinUser(null));   // clear redux state
    dispatch(removeAnnouncement(null));   // clear redux state
    // console.log(res)                // SPA navigation
  };

  return (
    <div className="hidden md:flex bg-linear-to-r from-indigo-600 to-blue-500 text-white shadow px-6 py-4 items-center justify-between">

      {/* Left: Logo */}
      <Link to="/" className="flex items-center gap-2">
        <Home className="w-6 h-6" />
        <span className="font-bold text-xl">HMS</span>
      </Link>

      {/* Right */}
      <div className="flex items-center gap-5">
        {/* Avatar */}
        {user && <Link to={`/${user.role}`}>Profile</Link>}
        <ProfileAvatar
          image_url={user?.image_url}
          name={user?.full_name}
          size={36}
        />

        {/* Name */}
        <span className="font-medium">
          {user?.full_name || "User"}
        </span>

        {/* Logout */}
        {user && <button
          onClick={handleLogout}
          className="flex items-center gap-2 text-sm bg-indigo-600 px-4 py-2 rounded-md hover:bg-indigo-700"
        >
          <LogOut size={16} />
          Logout
        </button>}
      </div>
    </div>
  );
};

export default Topbar;
