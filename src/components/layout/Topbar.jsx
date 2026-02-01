import { LogOut, Home } from "lucide-react";
import { Link } from "react-router-dom";
import ProfileAvatar from "../profile/ProfileAvatar";
import { useDispatch } from "react-redux";
import { removeLoggedinUser, selectLoggedinUserAllState } from "../../utils/store/logedinUser";
import { authService } from "../../services/apiService";
import { removeAnnouncement } from "../../utils/store/announcementsSlice";
import { clearHostel } from "../../utils/store/hostelSlice";
import { resetStudents } from "../../utils/store/studentSlice";
import { resetRoomSlice } from "../../utils/store/roomsSlice";
import { resetLeaveSlice } from "../../utils/store/leaveSlice";
import { resetIssuesSlice } from "../../utils/store/issuesSlice";
import { reSetStudent } from "../../utils/store/studentProfile";
import { PecLogo } from "../common/ui/Helper";
import Button from "../common/ui/Button";

const Topbar = ({ user, url }) => {
  const dispatch = useDispatch();
  console.log(user, url)
  const handleLogout = async () => {
    await authService.logoutUser();
    dispatch(removeAnnouncement(null));
    dispatch(clearHostel(null));
    dispatch(resetIssuesSlice());
    dispatch(removeLoggedinUser(null));
    dispatch(resetLeaveSlice());
    dispatch(resetRoomSlice());
    dispatch(reSetStudent());
    dispatch(resetStudents());
  };

  return (
    <div className="hidden md:flex bg-linear-to-r from-blue-700 to-indigo-800 text-white shadow-lg px-8 py-4 items-center justify-between">

      {/* Left: Branding */}
      <Link to="/" className="flex items-center gap-4 group">
        {/* Logo Container: White background ensures PEC logo is always visible */}
        <div className=" group-hover:scale-105 transition-transform duration-200">
          <PecLogo size="large" />
        </div>

        <div className="flex flex-col border-l border-white/20 pl-4">
          <span className="text-xl font-bold tracking-tight text-white leading-tight">
            Punjab Engineering College
          </span>
          <span className="text-[10px] uppercase tracking-widest text-blue-100/80 font-semibold">
            Deemed to be University
          </span>
        </div>
      </Link>

      {/* Right: User Section */}
      <div className="flex items-center gap-6">
        <div className="flex items-center gap-3">
          <ProfileAvatar
            image_url={url}
            name={user?.full_name}
            size={32}
            className="border border-white/40"
          />
          <div className="flex flex-col">
            <span className="text-sm font-semibold text-white">
              {user?.full_name || "User"}
            </span>
            <span className="text-[9px] uppercase font-bold text-blue-200">{user?.role}</span>
          </div>
        </div>

        {user && (
          <Button
            variant="text"
            title={"logout"}
            onClick={handleLogout}
            className="flex items-center gap-2 text-sm font-bold bg-white text-indigo-700 px-5 py-2 rounded-lg hover:bg-blue-50 transition-colors shadow-md active:transform active:scale-95"
          >
            <LogOut size={16} />
            Logout
          </Button>
        )}
      </div>
    </div>

  );
};

export default Topbar;
