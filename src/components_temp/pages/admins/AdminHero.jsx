import { ShieldCheck } from "lucide-react";
import QuickInfo from "./QuickInfo";
import { useSelector } from "react-redux";
import { selectLoggedinUserAllState } from "../../../utils/store/logedinUser";

const AdminHero = () => {
  const { full_name, email, phone, status } = useSelector(selectLoggedinUserAllState)
  return (
    <div className="bg-white rounded-xl shadow p-6 mb-8">
      <div className="text-center mb-6">
        <h1 className="text-3xl font-extrabold text-gray-800">
          Himalya Hostel
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
              Welcome, {full_name}
            </h2>
            <p className="text-sm text-gray-500">
              Administrator : {email}
            </p>
            <p className="text-sm text-gray-500">
              MobileNo : +91{phone}
            </p>
          </div>
        </div>

        <span className="inline-flex items-center px-3 py-1 text-sm rounded-full bg-green-100 text-green-700 w-fit">
          Status: {status}
        </span>
      </div>

      <div className="my-6 border-t" />

      <QuickInfo />
    </div>
  );
};

export default AdminHero;
