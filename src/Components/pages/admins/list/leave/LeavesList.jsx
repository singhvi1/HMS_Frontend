import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { selectLeaveFilters, selectLeavePageData, setLeaveFilters, setLeavePage, setLeavePageSize, updateLeaveStatus } from '../../../../../utils/store/leaveSlice';
import { leaveColumns } from '../../../../../../MockData';
import BackButton from '../../../../common/ui/Backbutton';
import SearchBar from '../../../../common/table/SearchBar';
import Table from '../../../../common/table/Table';
import Pagination from '../../../../common/table/Pagination';

const LeavesList = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const filters = useSelector(selectLeaveFilters);
    const pageData = useSelector(selectLeavePageData);
    return (
        <div className="p-6 bg-gray-50 min-h-screen">

            <BackButton />
            <div className="grid grid-cols-1 md:grid-cols-4 gap-3 mb-4">

                <SearchBar search={filters.search} onChange={(v) => dispatch(setLeaveFilters({ search: v }))} placeholder={"Search name"} />

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
                <input
                    type="date"
                    className="input"
                    value={filters.fromDate}
                    onChange={(e) =>
                        dispatch(setLeaveFilters({ fromDate: e.target.value }))
                    }
                />

                <input
                    type="date"
                    className="input"
                    value={filters.toDate}
                    onChange={(e) =>
                        dispatch(setLeaveFilters({ toDate: e.target.value }))
                    }
                />




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
                        value={pageData.pageSize}
                        onChange={(e) => dispatch(setLeavePageSize(Number(e.target.value)))}
                    >
                        <option value={10}>10</option>
                        <option value={20}>20</option>
                        <option value={50}>50</option>
                    </select>
                </div>
            </div>


            <Table
                columns={leaveColumns(navigate, updateLeaveStatus)}
                data={pageData.items}
            />

            <Pagination
                currPage={pageData.page}
                totalPages={pageData.totalPages}
                onPageChange={(p) => dispatch(setLeavePage(p))}
            />
        </div>
    )
}

export default LeavesList
