import { User, CreditCard, Wrench, CalendarDays, X, Megaphone, BedDouble } from "lucide-react";
import SideBarItem from "../../../layout/SidebarItem";
import { useNavigate } from "react-router-dom";

const SideBar = ({ isOpen, onClose }) => {
  const navigate = useNavigate()

  return (
    <>
      {/* Overlay (mobile only) */}
      {isOpen && (
        <div
          onClick={onClose}
          className="fixed inset-0 bg-black/40 z-40 md:hidden"
        />
      )}

      <aside
        className={`
          fixed md:static z-50 top-0 left-0 min-h-screen w-64 bg-white shadow-md p-6
          transform transition-transform duration-300
          ${isOpen ? "translate-x-0" : "-translate-x-full"}
          md:translate-x-0
        `}
      >
        {/* Mobile close button */}
        <div className="flex justify-between items-center mb-8 md:hidden">
          <h1 className="text-xl font-bold text-indigo-600">HMS</h1>
          <X onClick={onClose} className="cursor-pointer" />
        </div>



        <nav className="space-y-4 text-gray-700">
          <SideBarItem
            icon={<User size={18} />}
            label="Profile"
            onClick={() => {
              navigate("/admin");
              onClose();
            }}
          />
          <SideBarItem
            icon={<Megaphone size={18} />}
            label="Announcements"
            onClick={() => {
              navigate("/admin/ann");
              onClose();
            }}
          />
          <SideBarItem icon={<BedDouble size={18} />} label="StudentList"
            onClick={() => {
              navigate("/admin/students");
              onClose();
            }}
          />
          <SideBarItem icon={<BedDouble size={18} />} label="Rooms"
            onClick={() => {
              navigate("/admin/rooms");
              onClose();
            }}
          />
          <SideBarItem icon={<Wrench size={18} />}
            onClick={() => {
              navigate("/admin/issues");
              onClose();
            }}
            label="Issues"
          />
          <SideBarItem icon={<CalendarDays size={18} />}

            label="Leave"
            onClick={() => {
              // navigate("/student/leave/new");
              onClose();
            }}
          />
          <SideBarItem icon={<CreditCard size={18} />} label="Payments"
            onClick={() => {
              // navigate("/student/notfound");
              onClose();
            }} />

        </nav>
      </aside>
    </>
  );
};

export default SideBar;
