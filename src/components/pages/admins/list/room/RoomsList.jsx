import { useDispatch, useSelector } from "react-redux";
import { forceRoomRefresh, selectAllRoomState, selectRoomsFilters, selectRoomsPageData, setRoomError, setRooms, setRoomsFilters, setRoomsPage, setRoomsPageSize } from "../../../../../utils/store/roomsSlice";
import { useNavigate } from "react-router-dom";
import Table from "../../../../common/table/Table";
import Pagination from "../../../../common/table/Pagination";
import { roomColumns } from "../../../../../../MockData";
import Button from "../../../../common/ui/Button";
import BackButton from "../../../../common/ui/Backbutton";
import { roomService } from "../../../../../services/apiService";
import { useCallback, useEffect } from "react";
import SearchBar from "../../../../common/table/SearchBar";
import { useRoomStateToggle } from "../../../../../customHooks/useRoomStateToggle";
import PageLoader from "../../../../common/PageLoader";
import { RefreshCcw } from "lucide-react";
import { useAllotmentStatus } from "../../../../../customHooks/useAllotment";
import toast from "react-hot-toast";




const RoomsList = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const filters = useSelector(selectRoomsFilters);
    const { items, pages, limit, page } = useSelector(selectRoomsPageData);
    const { loading, error } = useSelector(selectAllRoomState);
    const { toggleRoomStatus, loadingId } = useRoomStateToggle();
    const { allotmentInfo } = useAllotmentStatus()


    const fetchRoomList = useCallback(async () => {
        try {
            const res = await roomService.getAllRooms()
            dispatch(setRooms(res.data))
        } catch (error) {
            dispatch(setRoomError(error?.response?.data?.message || "Not able to fetch issue"))


        }
    }, [dispatch])

    useEffect(() => {
        if (!loading) return;
        fetchRoomList();
    }, [fetchRoomList, loading])


    const renderContent = () => {
        if (loading && items.length === 0) {
            return <PageLoader />
        }

        if (error) {
            return <div className="p-8 text-center text-red-500 font-medium">Error: {error}</div>
        }
        if (!loading && items?.length === 0) {
            return (
                <div className="flex flex-col items-center justify-center py-12 text-gray-500">
                    <p className="text-lg">No Room  found.</p>
                </div>
            )
        }

        return (
            <>
                <Table columns={roomColumns(navigate, toggleRoomStatus, loadingId, allotmentInfo)} data={items} />

                <Pagination
                    currPage={page}
                    totalPages={pages}
                    onPageChange={(p) => dispatch(setRoomsPage(p))}
                />
            </>
        )
    }
    return (
        <div className="bg-white rounded-xl shadow p-6">
            <BackButton />
            <div className="flex items-center justify-between mb-6">

                <div className="flex gap-1 items-center-safe">
                    <h2 className="text-xl font-semibold text-gray-800">
                        Room List
                    </h2>
                    <Button
                        variant="text"
                        className="p-2 text-gray-500 hover:text-indigo-600 hover:bg-indigo-50 rounded-full transition-all"
                        onClick={() => dispatch(forceRoomRefresh())}
                        title="Refresh List"
                    >
                        <RefreshCcw size={20} className={loading ? "animate-spin" : ""} />
                    </Button>
                </div>
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
                    <option value="a">A</option>
                    <option value="b">B</option>
                    <option value="c">C</option>
                </select>

                <select
                    className="input"
                    value={filters.allocation_status}
                    onChange={(e) => dispatch(setRoomsFilters({ allocation_status: e.target.value }))}
                >
                    <option value="">All Availibility</option>
                    <option value="AVAILABLE">Available</option>
                    <option value="FULL">Full</option>
                    <option value="VACANT_UPGRADE">Vacant Upgrade</option>
                </select>
                <div className="flex gap-3">
                    <select
                        className="input"
                        value={filters.is_active}
                        onChange={(e) => dispatch(setRoomsFilters({ is_active: e.target.value }))}
                    >
                        <option value="">All Room Status</option>
                        <option value="true">Active</option>
                        <option value="false">Inactive</option>
                    </select>
                    <select
                        className="input"
                        value={limit}
                        onChange={(e) => dispatch(setRoomsPageSize(Number(e.target.value)))}
                    >
                        <option value={10}>10</option>
                        <option value={20}>20</option>
                        <option value={50}>50</option>
                    </select>
                </div>
            </div>

            {renderContent()}
        </div>
    );
};

export default RoomsList;