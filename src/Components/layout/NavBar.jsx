import { Menu, LogOut, Home } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";

const Navbar = ({ onMenuClick }) => {
  const navigate = useNavigate();
  const user = false; // temporary

  const handleLogout = () => {
    navigate("/login");
  };

  return (
    <nav className="md:hidden bg-linear-to-r from-indigo-600 to-blue-500 text-white shadow-lg">
      <div className="px-4">
        <div className="flex items-center justify-between h-16">

          {/* Left */}
          <div className="flex items-center gap-3">
            <button
              onClick={onMenuClick}
              className="md:hidden p-2 hover:bg-indigo-700 rounded-md"
            >
              <Menu />
            </button>

            <Link to="/" className="flex items-center gap-2">
              <Home className="w-6 h-6" />
              <span className="font-bold text-xl">HMS</span>
            </Link>
          </div>

          {/* Right */}
          {user ? (
            <button
              onClick={handleLogout}
              className="flex items-center gap-1 px-4 py-2 bg-indigo-700 rounded-md hover:bg-indigo-800"
            >
              <LogOut size={16} />
              Logout
            </button>
          ) : (
            <Link
              to="/login"
              className="bg-white text-indigo-600 px-4 py-2 rounded-md font-medium"
            >
              Login
            </Link>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
