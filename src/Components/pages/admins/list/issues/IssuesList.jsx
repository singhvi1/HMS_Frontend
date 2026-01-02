import { useDispatch, useSelector } from 'react-redux';
import { selectIssuesFilters, selectIssuesItems, selectIssuesPagination, setIssues, setIssuesFilters, setIssuesPage, setIssuesPageSize } from '../../../../../utils/store/issuesSlice';
import Pagination from '../../../../common/table/Pagination';
import Table from '../../../../common/table/Table';
import { issueColumns } from '../../../../../../MockData';
import { useNavigate } from 'react-router-dom';
import BackButton from '../../../../common/ui/Backbutton';
import SearchBar from '../../../../common/table/SearchBar';
import { issueService } from '../../../../../services/apiService';
import { useEffect } from 'react';

const IssuesList = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const filters = useSelector(selectIssuesFilters);
    const items = useSelector(selectIssuesItems);
    const pagination = useSelector(selectIssuesPagination);

    const fetchData = async () => {
        try {
            const res = await issueService.getAllIssues({
                status: filters.status,
                category: filters.category,
                search: filters.search,
                sid: filters.sid,
                block: filters.block,
                room_number: filters.room_number,
                limit: pagination.pageSize,
                page: pagination.page,
                student_search: filters.student_search,  
            });

            dispatch(setIssues(res.data));
        } catch (error) {
            console.log("Not able to fetch issues list", error);
        }
    };


    useEffect(() => {
        fetchData();
    }, [filters.status, filters.student_search, filters.category, filters.search, filters.sid, filters.block, filters.room_number, pagination.page, pagination.pageSize]);

    console.log("ISSUE FILTERS →", {
        ...filters,
        page: pagination.page,
        limit: pagination.pageSize
    });



    return (
        <div className="bg-white rounded-xl shadow p-6">

            <BackButton />
            <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-semibold text-gray-800">
                    Issues List
                </h2>

            </div>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-3 mb-4">

                <SearchBar search={filters.student_search} onChange={(v) => dispatch(setIssuesFilters({ student_search: v }))} placeholder={"Search Student Name email "} />
                <SearchBar search={filters.search} onChange={(v) => dispatch(setIssuesFilters({ search: v }))} placeholder={"Search Discription Title"} />
                <SearchBar search={filters.sid} onChange={(v) => dispatch(setIssuesFilters({ sid: v }))} placeholder={"Search Sid"} />
                <SearchBar search={filters.room_number} onChange={(v) => dispatch(setIssuesFilters({ room_number: v }))} placeholder={"Search Room"} />

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
                        value={pagination.pageSize}
                        onChange={(e) => dispatch(setIssuesPageSize(Number(e.target.value)))}
                    >
                        <option value={10}>10</option>
                        <option value={20}>20</option>
                        <option value={50}>50</option>
                    </select>
                </div>
            </div>


            <Table
                columns={issueColumns(navigate)}
                data={items}
            />

            <Pagination
                currPage={pagination.page}
                totalPages={pagination.totalPages}
                onPageChange={(p) => dispatch(setIssuesPage(p))}
            />
        </div>
    );
}

export default IssuesList
