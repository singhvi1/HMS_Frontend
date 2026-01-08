import { ExternalLink, Trash2 } from "lucide-react";
import { useNavigate } from "react-router-dom";
import useStudentDelete from "../../../../../customHooks/useStudentDelete";
import Button from "../../../../common/ui/Button";

const RoomStudentsList = ({ students = [] }) => {
  const { deleteStudent } = useStudentDelete();
  const navigate = useNavigate();
  const activeStudents = students.filter(s => s.user_id?.status === "active");
  const inactiveStudents = students.filter(s => s.user_id?.status == "inactive");
  return (
    <div className="bg-white rounded-xl shadow p-5 space-y-6">

      <div>
        <h2 className="text-lg font-semibold mb-3">
          Active Students ({activeStudents.length})
        </h2>

        {activeStudents.length === 0 ? (
          <p className="text-gray-500">No active students</p>
        ) : (
          <ul className="space-y-2">
            {activeStudents.map(s => (
              <StudentRow key={s._id} student={s} navigate={navigate} deleteStudent={deleteStudent} />
            ))}
          </ul>
        )}
      </div>

      <div>
        <h2 className="text-lg font-semibold mb-3">
          Inactive Students ({inactiveStudents.length})
        </h2>

        {inactiveStudents.length === 0 ? (
          <p className="text-gray-500">No inactive students</p>
        ) : (
          <ul className="space-y-2">
            {inactiveStudents.map(s => (
              <StudentRow key={s._id} student={s} inactive navigate={navigate} deleteStudent={deleteStudent} />
            ))}
          </ul>
        )}
      </div>
    </div>
  );
};

const StudentRow = ({ student, inactive, navigate, deleteStudent }) => (


  <li
    className={`flex justify-between items-center p-3 rounded-lg border
      ${inactive ? "bg-gray-50 text-gray-500" : "bg-green-50"}
    `}
  >
    <div className="flex justify-around items-center gap-5">
      <p className="font-medium cursor-pointer hover:underline" onClick={() => navigate(`/admin/students/${student.user_id._id}`)}>Name: {student.user_id.full_name}</p>
      <p className="text-sm">SID: {student.sid}</p>
      <p className="text-sm">MobileNo: {student.user_id.phone}</p>
      <p className="text-sm">Address: {student.permanent_address}</p>
      <p className="text-sm">Branch: {student.branch}</p>
      <ExternalLink size={20} className="cursor-pointer"
        onClick={() => navigate(`/admin/students/${student.user_id._id}`)} />
    </div>
    <div className="flex">
      <span
        className={`text-xs px-2 py-1 rounded-full
        ${inactive ? "bg-gray-300" : "bg-green-600 text-white"}
      `}
      >
        {student.user_id.status}
      </span>
      <Button variant="text" onClick={() => deleteStudent({ userId: student.user_id._id })}>
        <Trash2 className="mx-3 w-5 h-5 text-red-600 cursor-pointer" />
      </Button>
    </div>
  </li>
);

export default RoomStudentsList;
