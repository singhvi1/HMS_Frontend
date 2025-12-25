import { Eye, Pencil } from "lucide-react";
import ProfileHero from "../../../profile/ProfileHero";
import { useNavigate } from "react-router-dom";

const statusClasses = {
  active: "bg-green-100 text-green-700",
  inactive: "bg-gray-100 text-gray-600"
};

const StudentRow = ({ student, index }) => {
  const navigate = useNavigate();
  const displayName = student?.full_name || student?.user_id?.full_name || "-";
  const displayStatus = (student?.status || student?.user_id?.status || "").toLowerCase();
  const roomLabel = (() => {
    if (student?.room_number) {
      const parts = String(student.room_number).split("-");
      const num = parts.length > 1 ? parts[1] : student.room_number;
      return `${student.block || parts[0] || ""}-${num}`;
    }
    if (student?.block && student?.room_number !== undefined) {
      return `${student.block}-${student.room_number}`;
    }
    return "-";
  })();

  return (
    <tr className="border-t">
      <td className="p-2">{index}</td>
      <td className="p-2">{student.sid}</td>
      <td className="p-2 font-medium">{displayName}</td>
      <td className="p-2">{student.branch}</td>
      <td className="p-2">{student.year}</td>
      <td className="p-2">{roomLabel}</td>

      <td className="p-2">
        <span className={`px-2 py-1 rounded text-xs ${statusClasses[displayStatus] || statusClasses.inactive}`}>
          {displayStatus || "inactive"}
        </span>
      </td>

      <td className="p-2 flex gap-2">
        <Eye size={16} className="cursor-pointer text-gray-600"
          onClick={() => navigate(`/admin/students/${student._id}`,{state: { student }})} />
        <Pencil size={16} className="cursor-pointer text-gray-600" />
      </td>
    </tr>
  );
};

export default StudentRow;
