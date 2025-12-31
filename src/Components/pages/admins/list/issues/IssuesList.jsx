import { useDispatch, useSelector } from 'react-redux';
import { selectIssuesFilters, selectIssuesPageData, setIssuesFilters, setIssuesPage, setIssuesPageSize } from '../../../../../utils/store/issuesSlice';
import Pagination from '../../../../common/table/Pagination';
import Table from '../../../../common/table/Table';
import { issueColumns } from '../../../../../../MockData';
import { useNavigate } from 'react-router-dom';
import { Filters } from '../../../../common/ui/ProfileComponents';
import BackButton from '../../../../common/ui/Backbutton';
import SearchBar from '../../../../common/table/SearchBar';

const IssuesList = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const filters = useSelector(selectIssuesFilters);
    const pageData = useSelector(selectIssuesPageData);

    return (
        <div className="p-6 bg-gray-50 min-h-screen">

            <BackButton />
            <div className="grid grid-cols-1 md:grid-cols-4 gap-3 mb-4">

                <SearchBar search={filters.search} onChange={(v) => dispatch(setIssuesFilters({ search: v }))} placeholder={"Search name"} />

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
                    value={filters.priority}
                    onChange={(e) => dispatch(setIssuesFilters({ priority: e.target.value }))}
                >
                    <option value="">Priority</option>
                    <option value="low">Low</option>
                    <option value="medium"> Medium</option>
                    <option value="high">High</option>
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
                        value={pageData.pageSize}
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
                data={pageData.items}
            />

            <Pagination
                currPage={pageData.page}
                totalPages={pageData.totalPages}
                onPageChange={(p) => dispatch(setIssuesPage(p))}

            />
        </div>
    );
}

export default IssuesList
