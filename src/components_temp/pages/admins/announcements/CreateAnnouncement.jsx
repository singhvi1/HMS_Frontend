import { useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { announcementService } from "../../../../services/apiService";
import { addAnnouncement } from "../../../../utils/store/announcementsSlice";
import { AnnouncementForm } from "../../../index"


const CreateAnnouncement = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);

    const handleCreate = async (data) => {
        setLoading(true);
        try {
            const res = await announcementService.createAnnouncement(data);
            dispatch(addAnnouncement(res?.data?.announcement));
            navigate(`/admin/anns/${res?.data?.announcement._id}`);
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