import { useState } from "react";
import toast from "react-hot-toast";
import { studentService } from "../services/apiService";
import { useDispatch } from "react-redux";
import { setStudentProfilePhoto } from "../utils/store/studentSlice";
import { setStudentProfile } from "../utils/store/studentProfile";

const useUploadProfilePhoto = () => {
    const dispatch = useDispatch();

    const [uploading, setUploading] = useState(false);
    const [error, setError] = useState(null);

    const uploadProfilePhoto = async (userId, file) => {
        try {
            setUploading(true);
            setError(null);

            const res = await studentService.updateStudentProfile(userId, file);

            toast.success("Profile photo updated");

            dispatch(setStudentProfilePhoto({ user_id: userId, profile_photo: res.data.profile_photo }));

            dispatch(setStudentProfile({ profile_photo: res.data.profile_photo }));

        } catch (err) {
            console.error(err);
            const msg =
                err?.response?.data?.message || "Failed to upload profile photo";
            setError(msg);
            toast.error(msg);
            throw err;
        } finally {
            setUploading(false);
        }
    };

    return {
        uploadProfilePhoto,
        uploading,
        error,
    };
};

export default useUploadProfilePhoto;
