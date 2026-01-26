import { useDispatch } from "react-redux";
import { allotmentService } from "../services/apiService";
import toast from "react-hot-toast";
import { setStudentVerificationStatus } from "../utils/store/studentSlice";
import { setVerificationStatus } from "../utils/store/verificationRequestSlice";

const useVerificationStatus = () => {
    const dispatch = useDispatch();

    const verifyStudent = async (id, status) => {
        const successAction = status === "VERIFIED" ? "verified" : "rejected"
        let confirmMsg = "";

        if (status === "VERIFIED") {
            confirmMsg = "Verify this Student ?";
        } else if (status === "REJECTED") {
            confirmMsg = "Reject This Student ?";
        }

        if (!window.confirm(confirmMsg)) return;
        try {
            const res = await allotmentService.verification(status, id);
            const studentData = res.data?.data;
            // console.log(res, "this is res after verification form useVerificationStatus")
            // console.log(studentData, "this is studentData after verification form useVerificationStatus");
            dispatch(setStudentVerificationStatus({ user_id: id, studentData: studentData }))
            dispatch(setVerificationStatus({ user_id: id, status: studentData.verification_status }))
            toast.success(`student profile successfuly ${res.data.message || successAction}`)

            // console.log(res, "this is after verification")
            // console.log(status, "this is dispatching data")
        } catch (err) {
            console.log("not able verify stduent Documents", err);
            alert(err.response?.data?.message || "Action failed");
        }

    }
    return { verifyStudent }
}


export default useVerificationStatus
