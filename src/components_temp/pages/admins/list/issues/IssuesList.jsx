import { useDispatch, useSelector } from 'react-redux';
import { forceIssuesRefresh, selectIssuesAllState, selectIssuesFilters, selectIssuesItems, selectIssuesPagination, setIssues, setIssuesError, setIssuesFilters, setIssuesPage, setIssueslimit } from '../../../../../utils/store/issuesSlice';
import Pagination from '../../../../common/table/Pagination';
import Table from '../../../../common/table/Table';
import { issueColumns } from '../../../../../../MockData';
import { useNavigate } from 'react-router-dom';
import BackButton from '../../../../common/ui/Backbutton';
import SearchBar from '../../../../common/table/SearchBar';
import { issueService } from '../../../../../services/apiService';
import { useCallback, useEffect } from 'react';
import { useDebounce } from '../../../../../customHooks/useDebounce';
import useIssueDelete from '../../../../../customHooks/useIssueDelete';
import PageLoader from '../../../../common/PageLoader';
import { selectLoggedinUserAllState } from '../../../../../utils/store/logedinUser';
import Button from '../../../../common/ui/Button';
import { RefreshCcw } from 'lucide-react';

const IssuesList = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { role } = useSelector(selectLoggedinUserAllState)

    const filters = useSelector(selectIssuesFilters);
    const pagination = useSelector(selectIssuesPagination);
    const { items, loading, error } = useSelector(selectIssuesAllState);

    const debouncedSearchValue = useDebounce(filters.search, 600);
    const debouncedSidValue = useDebounce(filters.sid, 600);
    const debouncedRoomNoValue = useDebounce(filters.room_number, 600);
    const debouncedStudentValue = useDebounce(filters.student_search, 400);
    const deleteIssueFxn = useIssueDelete()





    const fetchData = useCallback(async () => {
        try {
            const res = await issueService.getAllIssues({
                status: filters.status,
                category: filters.category,
                search: debouncedSearchValue,
                sid: debouncedSidValue,
                block: filters.block,
                room_number: debouncedRoomNoValue,
                limit: pagination.limit,
                page: pagination.page,
                student_search: debouncedStudentValue,
            });
            dispatch(setIssues(res.data));
        } catch (error) {
            dispatch(setIssuesError(error?.message || "Not able to fetch issue"))
            console.log("Not able to fetch issues list", error?.message);
        }
    }, [filters.status, filters.category, debouncedSidValue, filters.block, debouncedRoomNoValue, debouncedStudentValue, debouncedSearchValue, pagination.limit, pagination.page, dispatch]);


    useEffect(() => {
        if (loading) {
            fetchData()
        }
    }, [fetchData, loading])

    if (loading && items.length === 0) {
        return <PageLoader />
    }
    else if (error) {
        return <h1>Error Page : {error}</h1>
    }

    return (
        <div className="bg-white rounded-xl shadow p-6">

            <BackButton />
            <div className="flex items-center justify-between mb-6">
                <div className="flex gap-1 items-center-safe">
                    <h2 className="text-xl font-semibold text-gray-800">
                        Issues List
                    </h2>
                    <Button
                        variant="text"
                        className="p-2 text-gray-500 hover:text-indigo-600 hover:bg-indigo-50 rounded-full transition-all"
                        onClick={() => dispatch(forceIssuesRefresh())}
                        title="Refresh List"
                    >
                        <RefreshCcw size={20} className={loading ? "animate-spin" : ""} />
                    </Button>
                </div>

            </div>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-3 mb-4">

                <SearchBar search={filters.student_search} onChange={(v) => dispatch(setIssuesFilters({ student_search: v }))} placeholder={"Name Email "} />
                <SearchBar search={filters.sid} onChange={(v) => dispatch(setIssuesFilters({ sid: v }))} placeholder={"Search Sid"} />
                <SearchBar search={filters.room_number} onChange={(v) => dispatch(setIssuesFilters({ room_number: v }))} placeholder={"Search Room"} />
                <SearchBar search={filters.search} onChange={(v) => dispatch(setIssuesFilters({ search: v }))} placeholder={"Search Discription Title"} />
                <select
                    className="input"
                    value={filters.block}
                    onChange={(e) => dispatch(setIssuesFilters({ block: e.target.value }))}
                >
                    <option value="">All Block</option>
                    <option value="a">Block A</option>
                    <option value="b">Block B</option>
                    <option value="c">Block C</option>
                </select>
                <select
                    className="input"
                    value={filters.category}
                    onChange={(e) => dispatch(setIssuesFilters({ category: e.target.value }))}
                >
                    <option value="">category</option>
                    <option value="drinking-water">Dinking Water</option>
                    <option value="plumbing">Plumbing</option>
                    <option value="internet">Internet</option>
                    <option value="carpentry">Carpentry</option>
                    <option value="furniture">Furniture</option>
                    <option value="electricity">Electricity</option>
                </select>




                <div className="flex gap-3">
                    <select
                        className="input"
                        value={filters.status}
                        onChange={(e) => dispatch(setIssuesFilters({ status: e.target.value }))}
                    >
                        <option value="">All Status</option>
                        <option value="pending">Pending</option>
                        <option value="in_progress">InProgress</option>
                        <option value="resolved">Resolved</option>
                    </select>

                    <select
                        className="input"
                        value={pagination.limit}
                        onChange={(e) => dispatch(setIssueslimit(Number(e.target.value)))}
                    >
                        <option value={10}>10</option>
                        <option value={20}>20</option>
                        <option value={50}>50</option>
                    </select>
                </div>
            </div>


            <Table
                columns={issueColumns(role, navigate, deleteIssueFxn)}
                data={items}
            />

            <Pagination
                currPage={pagination.page}
                totalPages={pagination.pages}
                onPageChange={(p) => dispatch(setIssuesPage(p))}
            />
        </div>
    );
}

export default IssuesList
