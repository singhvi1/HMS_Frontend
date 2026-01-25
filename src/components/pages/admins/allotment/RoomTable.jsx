import { useCallback, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';

import { allotmentService } from '../../../../services/apiService';
import { forceAllotmentRoomRefresh, selectAllAllotmentRoomState, selectAllotmentRoomsFilters, selectAllotmentRoomsPageData, setAllotmentRooms, setAllotmentRoomsError, setAllotmentRoomsFilters, setAllotmentRoomsLoading, setAllotmentRoomsPage, setAllotmentRoomsPageSize } from '../../../../utils/store/allotmentRoom';
import { RefreshCcw } from 'lucide-react';
import Button from '../../../common/ui/Button';
import Table from "../../../common/table/Table";
import { useNavigate } from 'react-router-dom';
import Pagination from '../../../common/table/Pagination';
import PageLoader from '../../../common/PageLoader';
import SearchBar from '../../../common/table/SearchBar';
import { allotmentRoomColumns } from '../../../common/actions/baseRoomColumns';



const RoomTable = () => {
    // console.log("Room tABLE called")
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const filters = useSelector(selectAllotmentRoomsFilters);
    const { items, pages, limit, page } =
        useSelector(selectAllotmentRoomsPageData);
    const { loading, error } =
        useSelector(selectAllAllotmentRoomState);


    const fetchRooms = useCallback(async () => {
        try {
            const res = await allotmentService.getAllPhaseARoom();
            // console.log(res.data.data)
            dispatch(setAllotmentRooms(res.data));
        } catch (err) {
            console.log(err)
            dispatch(setAllotmentRoomsError(err?.response?.message || "Failed to load rooms")
            );
        } finally {
            dispatch(setAllotmentRoomsLoading(false));
        }
    }, [dispatch]);

    useEffect(() => {
        if (!loading) return;
        fetchRooms();
    }, [fetchRooms, loading]);


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
                    <p className="text-lg">No Phase A Room Allotmetn Found Click on " New Allotment ".</p>
                </div>
            )
        }

        return (
            <>
                <Table
                    columns={allotmentRoomColumns(navigate)}
                    data={items}
                />


                <Pagination
                    currPage={page}
                    totalPages={pages}
                    onPageChange={(p) => dispatch(setAllotmentRoomsPage(p))}
                />
            </>
        )
    }
    return (
        <div className="bg-white rounded-xl shadow p-6">
            <div className="flex items-center justify-between mb-4">
                <h2 className="text-xl font-semibold text-gray-800">
                    Available Rooms (Phase-A)
                </h2>

                <Button
                    variant="text"
                    className="p-2 text-gray-500 hover:text-indigo-600 hover:bg-indigo-50 rounded-full"
                    onClick={() => dispatch(forceAllotmentRoomRefresh())}
                    title="Refresh"
                >
                    <RefreshCcw
                        size={20}
                        className={loading ? "animate-spin" : ""}
                    />
                </Button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-4 gap-3 mb-4">
                <SearchBar
                    search={filters.search}
                    onChange={(v) =>
                        dispatch(setAllotmentRoomsFilters({ search: v }))
                    }
                    placeholder="Search by room / block"
                />

                <select
                    className="input"
                    value={filters.block}
                    onChange={(e) =>
                        dispatch(setAllotmentRoomsFilters({ block: e.target.value }))
                    }
                >
                    <option value="">All Blocks</option>
                    <option value="a">A</option>
                    <option value="b">B</option>
                    <option value="c">C</option>
                </select>

                <select
                    className="input"
                    value={limit}
                    onChange={(e) =>
                        dispatch(setAllotmentRoomsPageSize(Number(e.target.value)))
                    }
                >
                    <option value={10}>10</option>
                    <option value={20}>20</option>
                    <option value={50}>50</option>
                </select>
            </div>

            {renderContent()}
        </div>
    );
}

export default RoomTable
