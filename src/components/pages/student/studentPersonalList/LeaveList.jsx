import { useCallback, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { forceLeaveRefresh, selectAllLeaveState, selectLeavePageData, setLeaveError, setLeaveList, setLeavePage, } from '../../../../utils/store/leaveSlice';
import PageLoader from "../../../common/PageLoader"
import Table from '../../../common/table/Table';
import Pagination from '../../../common/table/Pagination';
import { leaveColumns } from '../../../../../MockData';
import { leaveService } from '../../../../services/apiService';
import { useLeaveStatus } from '../../../../customHooks/useLeaveStatus';
import { useNavigate } from 'react-router-dom';
import { RefreshCcw, Plus } from 'lucide-react';
import Button from '../../../common/ui/Button';
import RoleGuard from '../../../../services/auth.role';

const LeaveList = ({ studentId }) => {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const { items, loading, error, } = useSelector(selectAllLeaveState);
    const { page, limit, pages } = useSelector(selectLeavePageData)
    const { updateStatus } = useLeaveStatus()

    const fetchLeave = useCallback(async () => {
        try {
            const res = await leaveService.getStudentAllLeaves({
                studentId,
                page,
                limit,
            })
            dispatch(setLeaveList(res.data))
        } catch (err) {
            console.log("Not able to fetch leave data", err?.message || err?.response?.data?.message)
            dispatch(setLeaveError(err?.response?.data?.message || err?.message || "Error in fetching leaves"))
        }
    }, [dispatch, limit, page, studentId])

    useEffect(() => {
        if (loading) {
            fetchLeave()
        }
    }, [fetchLeave, loading])

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
                    <p className="text-lg">No leave records found.</p>
                </div>
            )
        }

        return (
            <>
                <Table
                    columns={leaveColumns(updateStatus, navigate)}
                    data={items}
                />
                <Pagination
                    currPage={page}
                    onPageChange={(p) => dispatch(setLeavePage(p))}
                    totalPages={pages}
                />
            </>
        )
    }

    return (
        <div className='bg-white rounded-xl shadow-lg border border-gray-100 p-6 m-5'>
            <div className='flex flex-col md:flex-row justify-between items-center mb-6 gap-4'>
                <div>
                    <h2 className='text-2xl font-bold text-gray-800'>Leave History</h2>
                    <p className='text-sm text-gray-500'>View and manage your leave applications</p>
                </div>
                <RoleGuard allow={["student"]}>
                    <div className="flex items-center gap-3">
                        <Button
                            variant="text"
                            className="p-2 text-gray-500 hover:text-indigo-600 hover:bg-indigo-50 rounded-full transition-all"
                            onClick={() => dispatch(forceLeaveRefresh())}
                            title="Refresh List"
                        >
                            <RefreshCcw size={20} className={loading ? "animate-spin" : ""} />
                        </Button>

                        <Button
                            variant='success'
                            className='flex items-center gap-2 bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 rounded-lg'
                            onClick={() => navigate('/student/leave/new')}
                        >
                            <Plus size={18} />
                            Apply Leave
                        </Button>
                    </div></RoleGuard>
            </div>
            {renderContent()}

        </div>
    )
}

export default LeaveList