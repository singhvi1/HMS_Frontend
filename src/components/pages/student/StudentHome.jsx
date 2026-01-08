import { useCallback, useEffect } from "react";
import { studentActions } from "../../common/config.action";
import QuickActionsGrid from "../../common/QuickActionGrid";
import { studentService } from "../../../services/apiService";
import PageLoader from "../../common/PageLoader";
import { useDispatch, useSelector } from "react-redux";
import { setStudent } from "../../../utils/store/studentProfile";
import ProfileHeader from "../../profile/ProfileHeader";





const StudentHome = () => {
  const dispatch = useDispatch()
  const { student, loading } = useSelector((store) => store.studentProfile)



  const fetchStudent = useCallback(async () => {
    try {
      const res = await studentService.getStudent();
      dispatch(setStudent(res.data.student))
    } catch (err) {
      console.log("Not able to fetch Student", err)
    }
  }, [dispatch])
  useEffect(() => {
    if (loading) {
      fetchStudent()
    }
  }, [fetchStudent, loading]);

  if (loading) {
    return <PageLoader />
  }
  if (!student) {
    return <h2>No student Found</h2>
  }
  return (
    <section className="space-y-6">
      <ProfileHeader student={student} />
      <QuickActionsGrid actions={studentActions} />
    </section>
  );
};

export default StudentHome;
