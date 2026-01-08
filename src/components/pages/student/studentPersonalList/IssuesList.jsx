import { useDispatch, useSelector } from 'react-redux';
import { forceIssuesRefresh, selectIssuesAllState, selectIssuesPageData, setIssues, setIssuesError, setIssuesPage } from '../../../../utils/store/issuesSlice';
import { useCallback, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Table from '../../../common/table/Table';
import { issueColumns } from '../../../../../MockData';
import { issueService } from '../../../../services/apiService';
import Pagination from '../../../common/table/Pagination';
import useIssueDelete from '../../../../customHooks/useIssueDelete';

import PageLoader from "../../../common/PageLoader"
import { selectLoggedinUserAllState } from '../../../../utils/store/logedinUser';
import { Plus, RefreshCcw } from 'lucide-react';
import Button from '../../../common/ui/Button';
import RoleGuard from '../../../../services/auth.role';

const IssuesList = ({ studentId }) => {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const { role } = useSelector(selectLoggedinUserAllState)
    const { items, loading, error } = useSelector(selectIssuesAllState);
    const { page, pages, limit } = useSelector(selectIssuesPageData);
    const deleteIssueFxn = useIssueDelete()

    const fetchIssueById = useCallback(async () => {
        try {
            const res = await issueService.getAllIssueOfStudent({
                studentId,
                page,
                limit
            })
            dispatch(setIssues(res.data))
        } catch (err) {
            console.log("Not able to fetch issue from api", err?.message || err?.response?.data?.message)
            dispatch(setIssuesError(err?.response?.data?.message || err?.message || "Error in fetching issueList"))
        }
    }, [dispatch, limit, page, studentId])

    useEffect(() => {
        if (loading) {
            fetchIssueById()
        }
    }, [fetchIssueById, loading])


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
                    <p className="text-lg">No maintenance requests found.</p>
                </div>
            )
        }

        return (
            <>
                <Table
                    columns={issueColumns(role, navigate, deleteIssueFxn)}
                    data={items}
                />
                <Pagination
                    currPage={page}
                    onPageChange={(p) => dispatch(setIssuesPage(p))}
                    totalPages={pages}
                />
            </>
        )
    }

    return (
        <div className='bg-white rounded-xl shadow-lg border border-gray-100 p-6 m-5'>
            <div className='flex flex-col md:flex-row justify-between items-center mb-6 gap-4'>
                <div>
                    <h2 className='text-2xl font-bold text-gray-800'>Maintenance Issues</h2>
                    <p className='text-sm text-gray-500'>Track and manage your room maintenance requests</p>
                </div>
                <RoleGuard allow={["student"]}>
                <div className="flex items-center gap-3">
                    <Button
                        variant="text"
                        className="p-2 text-gray-500 hover:text-indigo-600 hover:bg-indigo-50 rounded-full transition-all"
                        onClick={() => dispatch(forceIssuesRefresh())}
                        title="Refresh List"
                    >
                        <RefreshCcw size={20} className={loading ? "animate-spin" : ""} />
                    </Button>

                    <Button
                        variant='success'
                        className='flex items-center gap-2 bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 rounded-lg'
                        onClick={() => navigate('/student/issues/new')}
                    >
                        <Plus size={18} />
                        Raise Request
                    </Button>
                </div></RoleGuard>
            </div>

            {renderContent()}
        </div>
    )
}

export default IssuesList