import { useDispatch, useSelector } from "react-redux";
import { lazy, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { selectAnnounceMentById, updatefilesAnnouncement, updateOneAnnouncement } from "../../../../utils/store/announcementsSlice";
import { announcementService } from "../../../../services/apiService";
import toast from "react-hot-toast";
import AnnouncementForm from "../../../forms/AnnouncementForm";

const EditAnnouncement = () => {
    const { id } = useParams();
    const announcement = useSelector(selectAnnounceMentById(id));
    const dispatch = useDispatch();
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate()

    // console.log(announcement)

    useEffect(() => {
        const resolve = async () => {
            try {
                const res = await announcementService.getAnnouncementById(id);
                dispatch(updateOneAnnouncement(res.data.announcement))
            } catch (err) {
                console.log("Not able to fetch announcement", err)
            } finally {
                setLoading(false)
            }
        };
        if (!announcement) {
            resolve();
        } else {
            setLoading(false);
        }
    }, [announcement, dispatch, id]);

    const handleUpdate = async ({ payload, images, pdfs, removedFileIds }) => {
        console.log(payload, images, pdfs, removedFileIds);
        try {
            setLoading(true);
            const res = await announcementService.updateAnnouncement({ ...payload, removedFileIds }, id,);
            dispatch(updateOneAnnouncement(res.data.announcement))
            toast.success("Announcement created successfully");
            navigate(`/admin/anns/${id}`, { replace: true });
        } catch (err) {
            console.error("Not able to update announcement", err);
        } finally {
            setLoading(false)
        }
    };
    if (loading) {
        return <div className="p-6">Loading announcement...</div>;
    }

    return (
        <>
            <AnnouncementForm
                initialData={announcement}
                onSubmit={handleUpdate}
                isEdit={true}
            />
        </>
    );
};

export default EditAnnouncement;
