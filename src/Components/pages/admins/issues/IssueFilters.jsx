const IssueFilters = ({ status, priority, onChange }) => {
  return (
    <div className="flex gap-3 mb-4">
      <select
        className="border p-2 rounded"
        value={status}
        onChange={e => onChange("status", e.target.value)}
      >
        <option value="">All Status</option>
        <option value="pending">Pending</option>
        <option value="in_progress">In Progress</option>
        <option value="resolved">Resolved</option>
      </select>

      <select
        className="border p-2 rounded"
        value={priority}
        onChange={e => onChange("priority", e.target.value)}
      >
        <option value="">All Priority</option>
        <option value="low">Low</option>
        <option value="medium">Medium</option>
        <option value="high">High</option>
      </select>
    </div>
  );
};

export default IssueFilters;
