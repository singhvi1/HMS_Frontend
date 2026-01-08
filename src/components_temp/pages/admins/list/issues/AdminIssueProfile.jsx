import { useSelector, useDispatch } from 'react-redux'
import { useParams, useNavigate } from 'react-router-dom'
import { removeOneIssue, selectIssueById, setIssue, updateIssueStatus } from "../../../../../utils/store/issuesSlice"
import IssueDetailsCard from "../../../../common/issue/IssueDetailsCard"
import BackButton from "../../../../common/ui/Backbutton"
import IssueActions from '../../../../common/ui/IssueActions'
import IssueSidebarInfo from '../../../../common/issue/IssueSidebarInfo'
import useIssueDelete from '../../../../../customHooks/useIssueDelete'
import { issueService } from '../../../../../services/apiService'
import { useCallback, useEffect, useState } from 'react'
import CommentsSection from '../../../../common/issue/CommentsSection'
import toast from 'react-hot-toast'

const AdminIssueProfile = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const deleteIssueFxn = useIssueDelete()
    const role = useSelector((store) => store.loggedinUser.role)

    const issue = useSelector(selectIssueById(id));
    const [Loading, setLoading] = useState(false)
    const fetchIssue = useCallback(async () => {
        try {
            setLoading(true)
            const res = await issueService.getIssueById(id);
            dispatch(setIssue(res.data.issue))
        } catch (err) {
            console.error("Not able to fetch Issue", err)
        } finally {
            setLoading(false)
        }

    }, [id, dispatch])

    useEffect(() => {
        if (!issue) {
            fetchIssue();
        }
    }, [fetchIssue, issue])


    const handleStatusChange = async (newStatus) => {
        const res = await issueService.updateIssueStatus(id, newStatus)
        dispatch(updateIssueStatus({ id, status: newStatus }));
    };

    const handleDelete = async () => {
        const res = await deleteIssueFxn(id)
        if (res) {
            navigate(`/admin/issues`);
        } else {
            toast.error("Not able to delete Try again")
        }
    };

    if (Loading) return <div className="p-6">Loading issue details...</div>;
    if (!issue) {
        return <h1>No issue found</h1>
    }
    return (
        <div className="max-w-5xl mx-auto space-y-6 pb-10">
            <div className="flex items-center justify-between">
                <BackButton />
                <span className="text-sm text-gray-400 font-mono">ID: {id?.slice(-6).toUpperCase()}</span>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">

                <div className="lg:col-span-2 space-y-6">
                    <IssueDetailsCard issue={issue} />
                    {issue.status !== "resolved" && <CommentsSection issueId={issue?._id} />}
                </div>

                {/* RIGHT COLUMN: Sidebar */}
                <div className="space-y-6">
                    <IssueSidebarInfo issue={issue} />
                    <IssueActions
                        role={role}
                        issue={issue}
                        onStatusChange={handleStatusChange}
                        onDelete={handleDelete}
                    />
                </div>
            </div>
        </div>
    )
}

export default AdminIssueProfile