import { useCallback, useEffect } from "react";
import { studentActions } from "../../common/config.action";
import QuickActionsGrid from "../../common/QuickActionGrid";
import { studentService } from "../../../services/apiService";
import PageLoader from "../../common/PageLoader";
import { useDispatch, useSelector } from "react-redux";
import { selectAllstudentProfileState, setStudent } from "../../../utils/store/studentProfile";
import ProfileHeader from "../../profile/ProfileHeader";





const StudentHome = () => {
  const dispatch = useDispatch()
  const { student, loading } = useSelector(selectAllstudentProfileState)
  console.log(student)



  const fetchStudent = useCallback(async () => {
    try {
      const res = await studentService.getStudent();
      dispatch(setStudent(res.data.student))
    } catch (err) {
      console.log("Not able to fetch Student", err)
    }
  }, [dispatch])
  useEffect(() => {
    if (!loading && student) {
      return;
    }
    fetchStudent()
  }, [fetchStudent, loading, student]);

  if (loading) {
    return <PageLoader />
  }
  if (!student) {
    return <div className="p-4 bg-amber-50"><h2 className="text-3xl font-bold text-center">No student profile found.</h2></div>;
  }
  return (  
    <section className="space-y-6">
      <ProfileHeader student={student} />
      <QuickActionsGrid actions={studentActions} />
    </section>
  );
};

export default StudentHome;
