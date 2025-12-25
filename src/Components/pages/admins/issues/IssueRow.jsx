import IssueStatusBadge from "./IssueStatusBadge";

const IssueRow = ({ issue, onView }) => {
  return (
    <tr className="border-t hover:bg-gray-50">
      <td className="p-3 font-medium">{issue.issue_id}</td>
      <td className="p-3">{issue.student_name}</td>
      <td className="p-3">{issue.block}-{issue.room}</td>
      <td className="p-3">{issue.category}</td>
      <td className="p-3 capitalize">{issue.priority}</td>
      <td className="p-3">
        <IssueStatusBadge status={issue.status} />
      </td>
      <td className="p-3">
        <button
          onClick={() => onView(issue)}
          className="text-indigo-600 hover:underline"
        >
          View / Update
        </button>
      </td>
    </tr>
  );
};

export default IssueRow;
