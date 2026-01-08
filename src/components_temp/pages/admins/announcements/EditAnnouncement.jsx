import { useNavigate, useParams } from "react-router-dom";
import { AnnouncementForm } from "../../../index";
import { useDispatch, useSelector } from "react-redux";
import { selectAnnounceMentById, updateOneAnnouncement } from "../../../../utils/store/announcementsSlice";
import { useEffect, useState } from "react";
import { announcementService } from "../../../../services/apiService";

const EditAnnouncement = () => {
    const { id } = useParams();
    const announcement = useSelector(selectAnnounceMentById(id));
    const dispatch = useDispatch();
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate()



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

    const handleUpdate = async (data) => {
        try {
            const res = await announcementService.updateAnnouncement(data, id);
            dispatch(updateOneAnnouncement(res.data.announcement))
            navigate(`/admin/anns/${id}`)
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
