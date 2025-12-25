import {
  BedDouble,
  CreditCard,
  Wrench,
  CalendarDays,
  AlertTriangle
} from "lucide-react";
import ActionCard from "../../dashboard/ActionCard";
import { Link } from "react-router-dom";

const AdminActions = () => {

  return (
    <div className="bg-white rounded-xl shadow p-6">
      <h2 className="text-xl font-bold mb-6">Quick Actions</h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">

{/* announcement */}
        <Link to="/admin/ann/new">
          <ActionCard icon={<Wrench size={18} />} title="Announcements" color="bg-yellow-50" children="Create New Announcement">

          </ActionCard>
        </Link>
{/* adding a student */}
        <Link to="/admin/students/new">
          <ActionCard icon={<CalendarDays size={18} />} title="New Student" color="bg-purple-50">
            Add a Student
          </ActionCard>
        </Link>

        <Link to="/student/notfound">
          <ActionCard icon={<CreditCard size={18} />} title="Payments" color="bg-green-50">
            Pay fees and dues
          </ActionCard>
        </Link>

        <Link to="/student/notfound">
          <ActionCard icon={<AlertTriangle size={18} />} title="Discipline" color="bg-red-50">
            Provide justification
          </ActionCard>
        </Link>
      </div>
    </div>
  );
};

export default AdminActions;
