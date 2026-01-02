import { useDispatch, useSelector } from "react-redux";
import { selectRoomsFilters, selectRoomsPageData, setRooms, setRoomsFilters, setRoomsPage, setRoomsPageSize } from "../../../../../utils/store/roomsSlice";
import { useNavigate } from "react-router-dom";
import Table from "../../../../common/table/Table";
import Pagination from "../../../../common/table/Pagination";
import { roomColumns } from "../../../../../../MockData";
import Button from "../../../../common/ui/Button";
import BackButton from "../../../../common/ui/Backbutton";
import { roomService } from "../../../../../services/apiService";
import { useEffect } from "react";
import SearchBar from "../../../../common/table/SearchBar";

const RoomsList = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const filters = useSelector(selectRoomsFilters);
    const pageData = useSelector(selectRoomsPageData);

    const fetchRoomList = async () => {
        try {
            const res = await roomService.getAllRooms()

            dispatch(setRooms({
                items: res.data.data,
                count: res.data.count
            }))
        } catch (error) {
            console.log("Not able to fetch roomList form db", error)
        }
    }

    useEffect(() => {
        fetchRoomList();
    }, [])
    return (
        <div className="bg-white rounded-xl shadow p-6">
            <BackButton />
            <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-semibold text-gray-800">
                    Room List
                </h2>
                <div className="space-x-2">
                    <Button
                        variant="success"
                        onClick={() => navigate("/admin/students/new")}
                        className='p-2 cursor-pointer'
                    >
                        + Add Student
                    </Button>
                    <Button
                        variant="danger"
                        onClick={() => navigate("/admin/rooms/new")}
                        className='p-2 cursor-pointer'
                    >
                        + Add Room
                    </Button>
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-4 gap-3 mb-4">
                <SearchBar search={filters.search} onChange={(v) => dispatch(setRoomsFilters({ search: v }))} placeholder={"Search Room"} />

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

            <Table columns={roomColumns(navigate)} data={pageData.items} />

            <Pagination
                currPage={pageData.page}
                totalPages={pageData.totalPages}
                onPageChange={(p) => dispatch(setRoomsPage(p))}
            />
        </div>
    );
};

export default RoomsList;