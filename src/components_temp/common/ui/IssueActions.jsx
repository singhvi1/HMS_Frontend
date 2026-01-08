import { FileCheck, Hammer, Trash2 } from 'lucide-react';
import RoleGuard from '../../../services/auth.role';

const IssueActions = ({ role, issue, onStatusChange, onDelete }) => {
  if (!issue) return null;
  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-5 space-y-3">
      <h3 className="text-sm font-medium text-gray-500">Actions</h3>
      <RoleGuard allow={["admin"]}>
        {issue.status !== "in_progress" && (
          <button
            onClick={() => onStatusChange("in_progress")}
            className="w-full flex items-center justify-center gap-2 px-4 py-2 bg-blue-50 text-blue-700 hover:bg-blue-100 border border-blue-200 rounded-lg transition-colors text-m font-medium"
          >
            <Hammer size={25} />
            Mark In Progress
          </button>
        )}

        {issue.status !== "resolved" && (
          <button
            onClick={() => onStatusChange("resolved")}
            className="w-full flex items-center justify-center gap-2 px-4 py-2 bg-green-50 text-green-700 hover:bg-green-100 border border-green-200 rounded-lg transition-colors text-m font-medium"
          >
            <FileCheck size={26} />
            Resolve Issue
          </button>
        )}
      </RoleGuard>


      {((role === "student" && issue?.status === "pending") || (role === "admin")) && <button
        onClick={onDelete}
        className="w-full flex items-center justify-center gap-2 px-4 py-2 bg-white text-red-600 hover:bg-red-50 border border-red-200 rounded-lg transition-colors text-m font-medium cursor-pointer"
      >
        <Trash2 color='red' size={26} />
        Delete Issue
      </button>}
    </div>
  );
};

export default IssueActions;