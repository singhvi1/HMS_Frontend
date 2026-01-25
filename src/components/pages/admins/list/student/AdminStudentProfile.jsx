import { InfoItem, ProfileHeader } from '../../../../common/ui/ProfileComponents';
import Header from "../../../../profile/ProfileHeader"
import { useNavigate, useParams } from 'react-router-dom';
import { selectStudentByUserId, setStudent } from '../../../../../utils/store/studentSlice';
import { useDispatch, useSelector } from 'react-redux';
import BackButton from '../../../../common/ui/Backbutton';
import { studentService } from '../../../../../services/apiService';
import { useCallback, useEffect, useState } from 'react';
import QuickActionsGrid from '../../../../common/QuickActionGrid';
import { getStudentActions } from '../../../../common/config.AdminAction';
import useStudentToggle from '../../../../../customHooks/useStudentToggle';
import useStudentDelete from '../../../../../customHooks/useStudentDelete';
import List from '../../../student/studentPersonalList/List';
import { useAllotment, useAllotmentStatus } from '../../../../../customHooks/useAllotment';
import useVerificationStatus from '../../../../../customHooks/useVerification';

const AdminStudentProfile = () => {
    const { id } = useParams();
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const student = useSelector(selectStudentByUserId(id));
    const status = student?.user_id?.status
    const verificationStatus = student?.verification_status
    const { allotmentInfo } = useAllotmentStatus()
    const { verifyStudent } = useVerificationStatus()
    console.log(allotmentInfo)
    const { toggleStudentFxn } = useStudentToggle();
    const { deleteStudent } = useStudentDelete();
    const [loading, setLoading] = useState(false);



    const fetchStudent = useCallback(async () => {
        try {
            setLoading(true)
            const res = await studentService.getStudentById(id)
            dispatch(setStudent(res.data.student))
        } catch (error) {
            console.error("Not able to fetch student", error)
        } finally {
            setLoading(false)
        }
    }, [dispatch, id])


    useEffect(() => {
        if (!student) {
            fetchStudent();
        }
    }, [fetchStudent, student])

    if (loading) {
        return (
            <h2>Loading</h2>
        )
    }
    if (!student) {
        return (
            <h1>No student found</h1>
        )
    }
    console.log(student)

    return (
        <div>
            <BackButton />

            <Header student={student} />

            <QuickActionsGrid title="Student Actions" actions={getStudentActions({ userId: id, status, navigate, toggleStudentFxn, deleteStudent, allotmentInfo, verifyStudent, verificationStatus })} />

            <List studentId={student._id} />
        </div>
    )
}

export default AdminStudentProfile
