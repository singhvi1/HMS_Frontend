import RoomRow from "./RoomRow";

const RoomsTable = ({ rooms, page, limit }) => {
  const startIndex = (page - 1) * limit;

  return (
    <table className="w-full text-sm">
      <thead className="bg-gray-50">
        <tr>
          <th className="p-2 text-left">#</th>
          <th className="p-2 text-left">Block</th>
          <th className="p-2 text-left">Room</th>
          <th className="p-2 text-left">Floor</th>
          <th className="p-2 text-left">Occupancy</th>
          <th className="p-2 text-left">Status</th>
          <th className="p-2 text-left">Actions</th>
        </tr>
      </thead>

      <tbody>
        {rooms.map((room, i) => (
          <RoomRow key={room._id} room={room} index={startIndex + i + 1} />
        ))}
      </tbody>
    </table>
  );
};

export default RoomsTable;
