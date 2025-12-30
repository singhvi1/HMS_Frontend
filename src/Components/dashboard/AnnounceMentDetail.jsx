import { useParams, useNavigate } from "react-router-dom";
import { Pencil, Trash2, Paperclip } from "lucide-react";
import BackButton from "../common/ui/Backbutton";
import { formatDateTime } from "../../utils/constant";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { announcementService } from "../../services/apiService";
import { removeAnnouncement, setSelectedAnnouncement } from "../../utils/store/announcementsSlice";


const AnnouncementDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { selected } = useSelector((state) => state.anns);
  const dispatch = useDispatch();
  const [announcement, setAnnouncement] = useState(null)
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadAnn = async () => {
      try {
        if (selected && selected._id === id) {
          setAnnouncement(selected);
        } else {
          const res = await announcementService.getAnnouncementById(id);
          // console.log(res);
          setAnnouncement(res.data.announcement);
          dispatch(setSelectedAnnouncement(res.data))
        }
      } catch (err) {
        console.error("Failed to load announcement", err);
      } finally {
        setLoading(false);
      }

    }

    loadAnn()
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id])


  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center text-gray-500">
        Loading announcement...
      </div>
    );
  }
  if (!announcement) {
    return (
      <div className="min-h-screen flex items-center justify-center text-gray-500">
        Announcement not found.
      </div>
    );
  }
  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <BackButton />

      <div className="max-w-3xl mx-auto bg-white rounded-xl shadow p-6 space-y-5">
        {/* Title */}
        <h1 className="text-2xl font-bold text-gray-800">
          {announcement?.title || ""}
        </h1>

        {/* Meta */}
        <p className="text-sm text-gray-500">
          published On : <span>
            {formatDateTime(
              announcement?.updatedAt &&
                announcement?.updatedAt !== announcement?.createdAt
                ? announcement?.updatedAt
                : announcement?.createdAt
            )}
          </span> by{" "}
          <b>{announcement?.created_by?.full_name} </b>as Warden
        </p>

        {/* Message */}
        <p className="text-gray-700 leading-relaxed">
          {announcement?.message}
        </p>

        {/* Attachment */}
        {announcement?.notice_url && (
          <a
            href={announcement?.notice_url}
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center text-sm text-indigo-600 hover:underline"
          >
            <Paperclip size={16} className="mr-1 opacity-70" />
            View attachment
          </a>
        )}

        {/* Actions */}
        <div className="flex gap-3 pt-4 border-t">

          <button
            onClick={() =>
              navigate(`/admin/anns/${id}/edit`, {
                state: announcement
              })
            }
            className="flex items-center gap-2 px-4 py-2 text-sm rounded bg-indigo-600 text-white hover:bg-indigo-700"
          >
            <Pencil size={16} />
            Edit
          </button>

          <button
            className="flex items-center gap-2 px-4 py-2 text-sm rounded bg-red-600 text-white hover:bg-red-700"
            onClick={() => {
              announcementService.deleteAnnouncement(id)
              dispatch(removeAnnouncement(id))
              navigate(`/admin/ann`)
            }}
          >
            <Trash2 size={16} />
            Delete
          </button>
        </div>
      </div>
    </div>
  );
};

export default AnnouncementDetail;


