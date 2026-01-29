import { lazy, useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { announcementService } from "../../../../services/apiService";
import { addAnnouncement, updatefilesAnnouncement } from "../../../../utils/store/announcementsSlice";
import toast from "react-hot-toast";
const AnnouncementForm = lazy(() => import("../../../forms/AnnouncementForm"))

const CreateAnnouncement = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);

    const handleCreate = async ({ payload, images, pdfs }) => {
        setLoading(true);
        // console.log(payload, "this is payload coming to create Anns")
        try {
            const res = await announcementService.createAnnouncement(payload);
            const announcement = res?.data?.announcement ?? "";
            dispatch(addAnnouncement(announcement));


            let uploadTasks = [];

            if (images.length > 0) {
                const res = await announcementService.uploadAnnouncementImages(announcement?._id, images)
                // console.log(res, "this is image upload res")
                uploadTasks = [...uploadTasks, ...res.data];
            }
            if (pdfs.length > 0) {
                const res = await announcementService.uploadAnnouncementFile(announcement?._id, pdfs)
                // console.log(res, "this is pdf upload res")
                uploadTasks = [...uploadTasks, ...res.data];
            }
            if (uploadTasks.length > 0) {
                dispatch(updatefilesAnnouncement({
                    id: announcement._id, files: uploadTasks
                }));
            }
            console.log(uploadTasks, "this is update tasks")
            toast.success("Announcement created successfully");

            navigate(`/admin/anns/${res?.data?.announcement._id}`, { replace: true });
        } catch (error) {
            console.error("Error creating announcement:", error?.response?.data || error);
            toast.error(
                error?.response?.data?.message || "Failed to create announcement. Please try again."
            );
        } finally {
            setLoading(false);
        }
    };

    return (
        <AnnouncementForm
            initialData={null}
            onSubmit={handleCreate}
            loading={loading}
            isEdit={false}
        />
    );
};
export default CreateAnnouncement;