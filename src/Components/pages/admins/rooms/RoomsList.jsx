import { useDispatch, useSelector } from "react-redux";
import Pagination from "../studentlist/Pagination";
import RoomsTable from "./RoomsTable";
import {
  selectRoomsFilters,
  selectRoomsPageData,
  setRoomsFilters,
  setRoomsPage,
  setRoomsPageSize
} from "../../../../utils/store/roomsSlice";
import { useNavigate } from "react-router-dom";

const RoomsList = () => {
  const dispatch = useDispatch();
  const navigate=useNavigate();
  const filters = useSelector(selectRoomsFilters);
  const pageData = useSelector(selectRoomsPageData);

  return (
    <div className="bg-white rounded-xl shadow p-6">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-bold">Rooms</h2>
        <button className="bg-green-600 text-white px-4 py-2 rounded cursor-pointer"
        onClick={()=>{navigate('/admin/students/new');}}
        >
          + Add Room
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-3 mb-4">
        <input
          value={filters.search}
          onChange={(e) => dispatch(setRoomsFilters({ search: e.target.value }))}
          placeholder="Search block / room"
          className="input"
        />

        <select
          className="input"
          value={filters.block}
          onChange={(e) => dispatch(setRoomsFilters({ block: e.target.value }))}
        >
          <option value="">All Block</option>
          <option value="A">A</option>
          <option value="B">B</option>
          <option value="C">C</option>
        </select>

        <select
          className="input"
          value={filters.floor}
          onChange={(e) => dispatch(setRoomsFilters({ floor: e.target.value }))}
        >
          <option value="">All Floor</option>
          <option value="1">1</option>
          <option value="2">2</option>
          <option value="3">3</option>
          <option value="4">4</option>
        </select>

        <div className="flex gap-3">
          <select
            className="input"
            value={filters.is_active}
            onChange={(e) => dispatch(setRoomsFilters({ is_active: e.target.value }))}
          >
            <option value="">All Status</option>
            <option value="true">Active</option>
            <option value="false">Inactive</option>
          </select>

          <select
            className="input"
            value={pageData.pageSize}
            onChange={(e) => dispatch(setRoomsPageSize(Number(e.target.value)))}
          >
            <option value={10}>10</option>
            <option value={20}>20</option>
            <option value={50}>50</option>
          </select>
        </div>
      </div>

      <RoomsTable rooms={pageData.items} page={pageData.page} limit={pageData.pageSize} />

      <Pagination
        page={pageData.page}
        totalPages={pageData.totalPages}
        onPrev={() => dispatch(setRoomsPage(Math.max(pageData.page - 1, 1)))}
        onNext={() =>
          dispatch(setRoomsPage(Math.min(pageData.page + 1, pageData.totalPages)))
        }
      />
    </div>
  );
};

export default RoomsList;
