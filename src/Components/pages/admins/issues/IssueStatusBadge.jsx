import { STATUS_COLOR } from "../../../../../data";

const IssueStatusBadge = ({ status }) => {
  return (
    <span
      className={`px-2 py-1 rounded-full text-xs ${
        STATUS_COLOR[status] || "bg-gray-100 text-gray-600"
      }`}
    >
      {status.replace("_", " ")}
    </span>
  );
};

export default IssueStatusBadge;
