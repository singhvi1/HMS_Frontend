import { ExternalLink } from "lucide-react";
import { useNavigate } from "react-router-dom";

const RoomStudentsList = ({ students = [] }) => {
  const navigate = useNavigate();

  const activeStudents = students.filter(s => s.status === "active");
  const inactiveStudents = students.filter(s => s.status !== "active");
  return (
    <div className="bg-white rounded-xl shadow p-5 space-y-6">
      {/* Active Students */}
      <div>
        <h2 className="text-lg font-semibold mb-3">
          Active Students ({activeStudents.length})
        </h2>

        {activeStudents.length === 0 ? (
          <p className="text-gray-500">No active students</p>
        ) : (
          <ul className="space-y-2">
            {activeStudents.map(s => (
              <StudentRow key={s._id} student={s} navigate={navigate} />
            ))}
          </ul>
        )}
      </div>

      {/* Inactive Students */}
      <div>
        <h2 className="text-lg font-semibold mb-3">
          Inactive Students ({inactiveStudents.length})
        </h2>

        {inactiveStudents.length === 0 ? (
          <p className="text-gray-500">No inactive students</p>
        ) : (
          <ul className="space-y-2">
            {inactiveStudents.map(s => (
              <StudentRow key={s._id} student={s} inactive navigate={navigate} />
            ))}
          </ul>
        )}
      </div>
    </div>
  );
};

const StudentRow = ({ student, inactive, navigate }) => (


  <li
    className={`flex justify-between items-center p-3 rounded-lg border
      ${inactive ? "bg-gray-50 text-gray-500" : "bg-green-50"}
    `}
  >
    <div className="flex justify-around items-center gap-5">
      <p className="font-medium cursor-pointer hover:underline" onClick={() => navigate(`/admin/students/${student._id}`)}>Name: {student.full_name}</p>
      <p className="text-sm">SID: {student.sid}</p>
      <p className="text-sm">RooomNo: {student.block} -{student.room_number}</p>
      <p className="text-sm">MobileNo: {student.phone}</p>
      <p className="text-sm">Address: {student.permanent_address}</p>
      <p className="text-sm">Branch: {student.branch}</p>
      <ExternalLink size={20} className="cursor-pointer" onClick={() => navigate(`/admin/students/${student._id}`)} />
    </div>
    <span
      className={`text-xs px-2 py-1 rounded-full
        ${inactive ? "bg-gray-300" : "bg-green-600 text-white"}
      `}
    >
      {student.status}
    </span>
  </li>
);

export default RoomStudentsList;
