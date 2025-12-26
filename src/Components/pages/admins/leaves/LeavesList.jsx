import { useDispatch, useSelector } from "react-redux";
import LeavesTable from "./LeavesTable";
import Pagination from "../studentlist/Pagination";
import {
  selectLeaveFilters,
  selectLeavePageData,
  setLeaveFilters,
  setLeavePage,
  setLeavePageSize,
} from "../../../../utils/store/leaveSlice";

const LeavesList = () => {
  const dispatch = useDispatch();
  const filters = useSelector(selectLeaveFilters);
  const pageData = useSelector(selectLeavePageData);

  return (
    <div className="bg-white rounded-xl shadow p-6">
      <h2 className="text-xl font-bold mb-4">Leave Requests</h2>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-3 mb-4">
        <input
          className="input"
          placeholder="Search name / SID / room"
          value={filters.search}
          onChange={(e) =>
            dispatch(setLeaveFilters({ search: e.target.value }))
          }
        />

        <select
          className="input"
          value={filters.status}
          onChange={(e) =>
            dispatch(setLeaveFilters({ status: e.target.value }))
          }
        >
          <option value="">All Status</option>
          <option value="pending">Pending</option>
          <option value="approved">Approved</option>
          <option value="rejected">Rejected</option>
        </select>

        <select
          className="input"
          value={pageData.pageSize}
          onChange={(e) => dispatch(setLeavePageSize(Number(e.target.value)))}
        >
          <option value={10}>10</option>
          <option value={20}>20</option>
        </select>
      </div>

      <LeavesTable leaves={pageData.items} />

      <Pagination
        page={pageData.page}
        totalPages={pageData.totalPages}
        onPrev={() => dispatch(setLeavePage(Math.max(pageData.page - 1, 1)))}
        onNext={() =>
          dispatch(
            setLeavePage(Math.min(pageData.page + 1, pageData.totalPages))
          )
        }
      />
    </div>
  );
};

export default LeavesList;