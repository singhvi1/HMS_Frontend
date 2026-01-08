import { X } from "lucide-react";
import { useNavigate } from "react-router-dom";
import SideBarItem from "./SidebarItem";
import { sidebarConfig } from "../common/sideBar.config";

const SideBar = ({ isOpen, onClose, role }) => {
  const navigate = useNavigate();
  const items = sidebarConfig[role] || [];

  return (
    <>
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
        <div className="flex justify-between items-center mb-8 md:hidden">
          <h1 className="text-xl font-bold text-indigo-600">HMS</h1>
          <X onClick={onClose} className="cursor-pointer" />
        </div>

        <nav className="space-y-4 text-gray-700">
          {items.map(({ label, icon, path }) => (
            <SideBarItem
              key={label}
              icon={icon}
              label={label}
              onClick={() => {
                if (path) navigate(path);
                onClose();
              }}
            />
          ))}
        </nav>
      </aside>
    </>
  );
};

export default SideBar;
