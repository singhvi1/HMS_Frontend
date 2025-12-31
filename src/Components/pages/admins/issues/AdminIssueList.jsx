import { useDispatch, useSelector } from "react-redux";
import IssueFilters from "./IssueFilters";
import Table from "../../../common/table/Table"
import { issueColumns } from "../../../../../MockData"
import Pagination from "../../../common/table/Pagination";
import {
  selectIssuesFilters,
  selectIssuesPageData,
  setIssuesFilters,
  setIssuesPage,
  setIssuesPageSize
} from "../../../../utils/store/issuesSlice";

const AdminIssueList = () => {
  const dispatch = useDispatch();
  const filters = useSelector(selectIssuesFilters);
  const pageData = useSelector(selectIssuesPageData);

  const handleFilterChange = (key, value) => {
    dispatch(setIssuesFilters({ [key]: value }));
  };

  const handleView = (issue) => {
    // console.log("Selected Issue:", issue);
    // later → open modal
  };

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      <h1 className="text-2xl font-bold mb-6">Maintenance Issues</h1>

      <div className="grid grid-cols-1 sm:grid-cols-4 gap-3 mb-4">
        <input
          className="input"
          value={filters.search}
          onChange={(e) => dispatch(setIssuesFilters({ search: e.target.value }))}
          placeholder="Search issue / student"
        />

        <select
          className="input"
          value={pageData.pageSize}
          onChange={(e) => dispatch(setIssuesPageSize(Number(e.target.value)))}
        >
          <option value={10}>10</option>
          <option value={20}>20</option>
          <option value={50}>50</option>
        </select>

        <IssueFilters
          status={filters.status}
          priority={filters.priority}
          onChange={handleFilterChange}
        />
      </div>


      <Table
        columns={issueColumns}
        data={pageData.items}
      />

      <Pagination
        currPage={pageData.page}
        totalPages={pageData.totalPages}
        onPageChange={(p) => dispatch(setIssuesPage(p))}

      />
    </div>
  );
};

export default AdminIssueList;
