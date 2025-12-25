import { ShieldCheck } from "lucide-react";
import QuickInfo from "./QuickInfo";

const AdminHero = ({ admin }) => {
  return (
    <div className="bg-white rounded-xl shadow p-6 mb-8">

      {/* Header */}
      <div className="text-center mb-6">
        <h1 className="text-3xl font-extrabold text-gray-800">
          {admin.hostel_name}
        </h1>
        <p className="text-sm text-gray-500 mt-1">
          Admin Dashboard
        </p>
      </div>

      {/* Admin Row */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6">
        
        {/* Admin Info */}
        <div className="flex items-center gap-4">
          <div className="w-14 h-14 rounded-full bg-indigo-600 text-white flex items-center justify-center">
            <ShieldCheck size={28} />
          </div>

          <div>
            <h2 className="text-xl font-semibold text-gray-800">
              Welcome, {admin.full_name}
            </h2>
            <p className="text-sm text-gray-500">
              Administrator • {admin.email}
            </p>
          </div>
        </div>

        {/* Status Badge */}
        <span className="inline-flex items-center px-3 py-1 text-sm rounded-full bg-green-100 text-green-700 w-fit">
          Status: {admin.status}
        </span>
      </div>

      {/* Divider */}
      <div className="my-6 border-t" />

      {/* Quick Info */}
      <QuickInfo admin={admin} />
    </div>
  );
};

export default AdminHero;
