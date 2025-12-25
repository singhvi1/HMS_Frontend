import { useState } from "react";
import { issueList as issueData } from "../../../../../data";
import StudentTable from "../studentlist/StudentTable";
import Pagination from "../studentlist/Pagination";

const IssuesList = () => {
  const [page, setPage] = useState(1);
  const limit = 10;

  const totalPages = Math.ceil(issueData.length / limit);

  const paginatedIssues = issueData.slice(
    (page - 1) * limit,
    page * limit
  );

  return (
    <div className="bg-white rounded-xl shadow p-6">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-bold">Issues List</h2>
        <button className="bg-green-600 text-white px-4 py-2 rounded">
          + Add Student
        </button>
      </div>

      <StudentTable
        students={paginatedIssues}
        page={page}
        limit={limit}
      />

      <Pagination
        page={page}
        totalPages={totalPages}
        onPrev={() => setPage((p) => Math.max(p - 1, 1))}
        onNext={() => setPage((p) => Math.min(p + 1, totalPages))}
      />
    </div>
  );
};

export default IssuesList;

