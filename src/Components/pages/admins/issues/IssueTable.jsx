import IssueRow from "./IssueRow";

const IssueTable = ({ issues, onView }) => {
  return (
    <div className="bg-white rounded-xl shadow overflow-x-auto">
      <table className="w-full text-sm">
        <thead className="bg-gray-100 text-left">
          <tr>
            <th className="p-3">Issue</th>
            <th className="p-3">Student</th>
            <th className="p-3">Room</th>
            <th className="p-3">Category</th>
            <th className="p-3">Priority</th>
            <th className="p-3">Status</th>
            <th className="p-3">Action</th>
          </tr>
        </thead>

        <tbody>
          {issues.map(issue => (
            <IssueRow
              key={issue._id}
              issue={issue}
              onView={onView}
            />
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default IssueTable;
