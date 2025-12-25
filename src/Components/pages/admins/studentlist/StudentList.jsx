import { useDispatch, useSelector } from "react-redux";
import StudentTable from "./StudentTable";
import Pagination from "./Pagination";
import {
  selectStudentsFilters,
  selectStudentsPageData,
  setStudentsFilters,
  setStudentsPage,
  setStudentsPageSize
} from "../../../../utils/store/studentSlice";
import { useNavigate } from "react-router-dom";

const StudentList = () => {
  const navigate=useNavigate();
  const dispatch = useDispatch();
  const filters = useSelector(selectStudentsFilters);
  const pageData = useSelector(selectStudentsPageData);

  return (
    <div className="bg-white rounded-xl shadow p-6">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-bold">Students List</h2>
        <button className="bg-green-600 text-white px-4 py-2 rounded cursor-pointer" 
        onClick={()=>{
          navigate('/admin/students/new');
        }}
        >
          + Add Student
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-3 mb-4">
        <input
          value={filters.search}
          onChange={(e) => dispatch(setStudentsFilters({ search: e.target.value }))}
          placeholder="Search name / SID / branch / room"
          className="input"
        />

        <select
          className="input"
          value={filters.branch}
          onChange={(e) => dispatch(setStudentsFilters({ branch: e.target.value }))}
        >
          <option value="">All Branch</option>
          <option value="CSE">CSE</option>
          <option value="ECE">ECE</option>
          <option value="ME">ME</option>
          <option value="CE">CE</option>
        </select>

        <select
          className="input"
          value={filters.block}
          onChange={(e) => dispatch(setStudentsFilters({ block: e.target.value }))}
        >
          <option value="">All Block</option>
          <option value="A">A</option>
          <option value="B">B</option>
          <option value="C">C</option>
        </select>

        <div className="flex gap-3">
          <select
            className="input"
            value={filters.status}
            onChange={(e) => dispatch(setStudentsFilters({ status: e.target.value }))}
          >
            <option value="">All Status</option>
            <option value="active">Active</option>
            <option value="inactive">Inactive</option>
          </select>

          <select
            className="input"
            value={pageData.pageSize}
            onChange={(e) => dispatch(setStudentsPageSize(Number(e.target.value)))}
          >
            <option value={10}>10</option>
            <option value={20}>20</option>
            <option value={50}>50</option>
          </select>
        </div>
      </div>

      <StudentTable
        students={pageData.items}
        page={pageData.page}
        limit={pageData.pageSize}
      />

      <Pagination
        page={pageData.page}
        totalPages={pageData.totalPages}
        onPrev={() => dispatch(setStudentsPage(Math.max(pageData.page - 1, 1)))}
        onNext={() =>
          dispatch(
            setStudentsPage(Math.min(pageData.page + 1, pageData.totalPages))
          )
        }
      />
    </div>
  );
};

export default StudentList;
