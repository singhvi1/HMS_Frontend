import { InfoItem, ProfileHeader } from '../../../../common/ui/ProfileComponents';
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

const AdminStudentProfile = () => {
    const { id } = useParams();
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const student = useSelector(selectStudentByUserId(id));
    const [loading, setLoading] = useState(false);
    const userId = id;
    const status = student?.user_id?.status
    const { toggleStudentFxn } = useStudentToggle();
    const { deleteStudent } = useStudentDelete();



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

    
    return (
        <div>
            <BackButton />
            <ProfileHeader student={student} InfoItem={InfoItem} />
            <QuickActionsGrid title="Student Actions" actions={getStudentActions({ userId, status, navigate, toggleStudentFxn, deleteStudent })} />

            <List studentId={student._id} />
        </div>
    )
}

export default AdminStudentProfile
