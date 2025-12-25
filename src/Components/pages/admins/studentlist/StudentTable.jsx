import StudentRow from "./StudentRow";

const StudentTable = ({ students, page, limit }) => {
  const startIndex = (page - 1) * limit;

  return (
    <table className="w-full text-sm">
      <thead className="bg-gray-50">
        <tr>
          <th className="p-2 text-left">#</th>
          <th className="p-2 text-left">SID</th>
          <th className="p-2 text-left">Name</th>
          <th className="p-2 text-left">Branch</th>
          <th className="p-2 text-left">Year</th>
          <th className="p-2 text-left">Room</th>
          <th className="p-2 text-left">Status</th>
          <th className="p-2 text-left">Actions</th>
        </tr>
      </thead>

      <tbody>
        {students.map((student, i) => (
          <StudentRow
            key={student._id}
            student={student}
            index={startIndex + i + 1}
          />
        ))}
      </tbody>
    </table>
  );
};

export default StudentTable;
