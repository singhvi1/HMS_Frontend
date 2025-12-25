import { Eye } from "lucide-react";
import { useNavigate } from "react-router-dom";

const activeClasses = {
  true: "bg-green-100 text-green-700",
  false: "bg-gray-100 text-gray-600"
};

const RoomRow = ({ room, index }) => {
  const navigate = useNavigate();
  console.log(room);
  const isActiveKey = String(!!room.is_active);

  return (
    <tr className="border-t">
      <td className="p-2">{index}</td>
      <td className="p-2 uppercase">{room.block}</td>
      <td className="p-2">{room.room_number}</td>
      <td className="p-2">{room.floor ?? "-"}</td>
      <td className="p-2">{room.capacity}</td>
      <td className="p-2">
        <span className={`px-2 py-1 rounded text-xs ${activeClasses[isActiveKey]}`}>
          {room.is_active ? "active" : "inactive"}
        </span>
      </td>
      <td className="p-2 flex gap-2">
        <Eye size={16} className="cursor-pointer text-gray-600"
          onClick={() => { navigate(`/admin/rooms/${room._id}`) }}
        />
      </td>
    </tr>
  );
};

export default RoomRow;
