import {
  BedDouble,
  CreditCard,
  Wrench,
  CalendarDays,
  AlertTriangle
} from "lucide-react";
import ActionCard from "./ActionCard";
import { Link } from "react-router-dom";

const QuickActions = () => {

  return (
    <div className="bg-white rounded-xl shadow p-6">
      <h2 className="text-xl font-bold mb-6">Quick Actions</h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">


        <Link to="/student/issues/new">
          <ActionCard icon={<Wrench size={18} />} title="Maintenance" color="bg-yellow-50">
            Raise new issue
          </ActionCard>
        </Link>

        <Link to="/student/leave/new">
          <ActionCard icon={<CalendarDays size={18} />} title="Leave" color="bg-purple-50">
            Apply new leave
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

export default QuickActions;
