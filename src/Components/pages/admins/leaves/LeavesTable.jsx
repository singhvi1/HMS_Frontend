import { useState } from "react";
import { useDispatch } from "react-redux";
import { updateLeaveStatus } from "../../../../utils/store/leaveSlice";
import { Check, X } from "lucide-react";

const LeavesTable = ({ leaves }) => {
  const dispatch = useDispatch();
  const [openId, setOpenId] = useState(null);

  return (
    <table className="w-full text-sm border">
      <thead className="bg-gray-100">
        <tr className="text-left">
          <th className="p-2">Student</th>
          <th>Room</th>
          <th>From</th>
          <th>To</th>
          <th>Destination</th>
          <th>Status</th>
          <th>Action</th>
        </tr>
      </thead>
      <tbody>
        {leaves.map((l) => (
          <>
            <tr
              key={l._id}
              className="border-t cursor-pointer"
              onClick={() => setOpenId(openId === l._id ? null : l._id)}
            >
              <td className="p-2">
                {l.full_name}
                <div className="text-xs text-gray-400">{l.sid}</div>
              </td>
              <td>{l.room_number}</td>
              <td>{l.from_date}</td>
              <td>{l.to_date}</td>
              <td>{l.destination}</td>
              <td>
                <span
                  className={`px-2 py-1 rounded text-xs ${
                    l.status === "approved"
                      ? "bg-green-100 text-green-700"
                      : l.status === "rejected"
                      ? "bg-red-100 text-red-700"
                      : "bg-yellow-100 text-yellow-700"
                  }`}
                >
                  {l.status}
                </span>
              </td>
              <td className="space-x-2">
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    dispatch(
                      updateLeaveStatus({ id: l._id, status: "approved" })
                    );
                  }}
                  disabled={l.status !== "pending"}
                  className="bg-green-500 px-2 py-1.5 rounded-xl text-white hover:bg-green-600 disabled:bg-gray-400"
                >
                  <Check strokeWidth={2} size={16} />
                </button>
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    dispatch(
                      updateLeaveStatus({ id: l._id, status: "rejected" })
                    );
                  }}
                  disabled={l.status !== "pending"}
                  className="bg-red-400 px-2 py-1.5 rounded-xl text-white hover:bg-red-500 disabled:bg-gray-400"
                >
                  <X strokeWidth={2} size={16} />
                </button>
              </td>
            </tr>

            {openId === l._id && (
              <tr className="bg-gray-50">
                <td colSpan={7} className="p-3 text-sm">
                  <strong>Reason:</strong> {l.reason}
                </td>
              </tr>
            )}
          </>
        ))}
      </tbody>
    </table>
  );
};

export default LeavesTable;