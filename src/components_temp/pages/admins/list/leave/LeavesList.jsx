import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { forceLeaveRefresh, selectAllLeaveState, selectLeaveFilters, selectLeavePageData, setLeaveError, setLeaveFilters, setLeaveList, setLeavePage, setLeavePageSize } from '../../../../../utils/store/leaveSlice';
import { leaveColumns } from '../../../../../../MockData';
import BackButton from '../../../../common/ui/Backbutton';
import SearchBar from '../../../../common/table/SearchBar';
import Table from '../../../../common/table/Table';
import Pagination from '../../../../common/table/Pagination';
import { useCallback, useEffect } from 'react';
import { leaveService } from '../../../../../services/apiService';
import { useDebounce } from '../../../../../customHooks/useDebounce';
import { useLeaveStatus } from '../../../../../customHooks/useLeaveStatus';
import PageLoader from "../../../../common/PageLoader"
import Button from '../../../../common/ui/Button';
import { RefreshCcw } from 'lucide-react';

const LeavesList = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const filters = useSelector(selectLeaveFilters);
    const { page, pages, limit } = useSelector(selectLeavePageData)
    const { items, loading, error } = useSelector(selectAllLeaveState);


    const debouncedSid = useDebounce(filters.sid, 600)
    const debouncedRoomNumber = useDebounce(filters.room_number, 600)
    const debouncedFromDate = useDebounce(filters.from_date, 600)
    const debouncedToDate = useDebounce(filters.to_date, 600)
    const { updateStatus } = useLeaveStatus()


    const fetchLeave = useCallback(async () => {
        try {
            const res = await leaveService.getAllLeaves({
                page,
                limit,
                sid: debouncedSid,
                room_number: debouncedRoomNumber,
                from_date: debouncedFromDate,
                to_date: debouncedToDate,
                status: filters.status,
                block: filters.block,

            })
            dispatch(setLeaveList(res.data))
        } catch (err) {
            console.log("Not able to fetch issue from api", err?.message || err?.response?.data?.message)
            dispatch(setLeaveError(err?.response?.data?.message || err?.message || "Error in fetching leave list"
            ))
        }
    }, [page, limit, debouncedSid, debouncedRoomNumber, debouncedFromDate, debouncedToDate, filters.status, filters.block, dispatch])

    useEffect(() => {
        if (loading) {
            fetchLeave()
        }
    }, [fetchLeave, loading])
    if (loading && items.length === 0) {
        return <PageLoader />
    }
    if (error) {
        return <h1>Error Page : {error}</h1>
    }

    return (
        <div className="bg-white rounded-xl shadow p-6">

            <BackButton />
            <div className="flex items-center justify-between mb-6">
                <div className="flex gap-1 items-center-safe">
                    <h2 className="text-xl font-semibold text-gray-800">
                        Leaves List
                    </h2>
                    <Button
                        variant="text"
                        className="p-2 text-gray-500 hover:text-indigo-600 hover:bg-indigo-50 rounded-full transition-all"
                        onClick={() => dispatch(forceLeaveRefresh())}
                        title="Refresh List"
                    >
                        <RefreshCcw size={20} className={loading ? "animate-spin" : ""} />
                    </Button>
                </div>

            </div>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-3 mb-4">

                <SearchBar search={filters.sid} onChange={(v) => dispatch(setLeaveFilters({ sid: v }))} placeholder={"Sid"} />

                <SearchBar search={filters.room_number} onChange={(v) => dispatch(setLeaveFilters({ room_number: v }))} placeholder={"RoomNumber"} />

                <select
                    className="input"
                    value={filters.block}
                    onChange={(e) => dispatch(setLeaveFilters({
                        block: e.target.value
                    }))}
                >
                    <option value="">All Block</option>
                    <option value="a">Block A</option>
                    <option value="b">Block B</option>
                    <option value="c">Block C</option>
                </select>
                {/* <input
                    type="date"
                    className="input"
                    value={filters.from_date}
                    onChange={(e) =>
                        dispatch(setLeaveFilters({ from_date: e.target.value }))
                    }
                /> */}

                {/* <input
                    type="date"
                    className="input"
                    value={filters.to_date}
                    onChange={(e) =>
                        dispatch(setLeaveFilters({ to_date: e.target.value }))
                    }
                /> */}




                <div className="flex gap-3">
                    <select
                        className="input"
                        value={filters.status}
                        onChange={(e) => dispatch(setLeaveFilters({ status: e.target.value }))}
                    >
                        <option value="">All Status</option>
                        <option value="approved">Approved</option>
                        <option value="rejected">Rejected</option>
                        <option value="pending">Pending</option>
                    </select>

                    <select
                        className="input"
                        value={limit}
                        onChange={(e) => dispatch(setLeavePageSize(Number(e.target.value)))}
                    >
                        <option value={10}>10</option>
                        <option value={20}>20</option>
                        <option value={50}>50</option>
                    </select>
                </div>
            </div>


            <Table
                columns={leaveColumns(updateStatus, navigate)}
                data={items}
            />

            <Pagination
                currPage={page}
                totalPages={pages}
                onPageChange={(p) => dispatch(setLeavePage(p))}
            />
        </div>
    )
}

export default LeavesList
