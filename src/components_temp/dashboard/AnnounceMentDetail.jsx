import { useParams, useNavigate } from "react-router-dom";
import {
  Pencil, Trash2, Calendar, Clock,
  AlertCircle, Image as ImageIcon
} from "lucide-react";
import BackButton from "../common/ui/Backbutton";
import Button from "../common/ui/Button";
import { formatDateTime, categoryColorMap } from "../../utils/constant";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useRef, useState } from "react";
import { announcementService } from "../../services/apiService";
import { removeAnnouncement, selectAnnounceMentById, updateOneAnnouncement } from "../../utils/store/announcementsSlice";
import PageLoader from "../common/PageLoader";
import RoleGuard from "../../services/auth.role";
import AccordionItem from "../common/AccordionItem";

const AnnouncementDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);
  const deleteRef = useRef(false);

  const announcement = useSelector(selectAnnounceMentById(id));

  useEffect(() => {
    if (deleteRef.current) return;
    if (!announcement) {
      const loadAnn = async () => {
        try {
          setLoading(true);
          const res = await announcementService.getAnnouncementById(id);
          dispatch(updateOneAnnouncement(res.data.announcement));
        } catch (err) {
          console.error(err);
        } finally {
          setLoading(false);
        }
      };
      loadAnn();
    }
  }, [dispatch, announcement, id]);

  const handleDelete = async () => {
    if (window.confirm("Delete this announcement? This cannot be undone.")) {
      deleteRef.current = true;
      try {
        await announcementService.deleteAnnouncement(id);
        dispatch(removeAnnouncement(id));
        navigate(`/admin/anns`);
      } catch (error) {
        console.error(error);
        deleteRef.current = false;
      }
    }
  };

  if (loading) return <PageLoader />;
  if (!announcement) return <NotFoundView navigate={navigate} />;

  return (
    <div className="min-h-screen bg-gray-50/50 pb-20">
      <div className="max-w-4xl mx-auto p-4 sm:p-6 space-y-6">
        <HeaderNav />

        <div className="bg-white rounded-2xl shadow-sm border border-gray-200 overflow-hidden">
          <AnnouncementHeader data={announcement} />
          <AnnouncementBody message={announcement.message} />
          <AnnouncementFooter
            data={announcement}
            onEdit={() => navigate(`/admin/anns/${id}/edit`)}
            onDelete={handleDelete}
          />
        </div>
      </div>
      <h1>Comments Comming Soon ...</h1>
    </div>
  );
};


const HeaderNav = () => (
  <div className="flex items-center justify-between">
    <BackButton />
    <span className="font-bold text-gray-700 hidden sm:block text-xl">Announcement Detail</span>
    <div className="w-10" />
  </div>
);

const NotFoundView = ({ navigate }) => (
  <div className="min-h-screen flex flex-col items-center justify-center text-gray-500 gap-4">
    <AlertCircle size={48} className="text-gray-300" />
    <p>Announcement not found.</p>
    <Button variant="primary" onClick={() => navigate(-1)} className="px-6 py-2">Go Back</Button>
  </div>
);

const AnnouncementHeader = ({ data }) => {
  const categoryStyle = categoryColorMap[data.category] || "bg-gray-100 text-gray-600 border-gray-200";
  const isEdited = data.updatedAt && data.updatedAt !== data.createdAt;

  return (
    <div className="p-8 border-b border-gray-100 bg-gray-50/30">
      <div className="flex flex-wrap items-center justify-between gap-4 mb-6">
        <span className={`px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider border ${categoryStyle}`}>
          {data.category || "General"}
        </span>
        <div className="flex items-center gap-2 text-sm text-gray-500 font-medium">
          <Calendar size={14} /> {formatDateTime(data.createdAt)}
        </div>
      </div>

      <h1 className="text-3xl md:text-4xl font-black text-gray-900 leading-tight mb-8">
        {data.title}
      </h1>

      <div className="flex items-center gap-4">
        <div className="w-12 h-12 rounded-xl bg-indigo-100 flex items-center justify-center text-indigo-700 font-bold text-xl">
          {data.created_by?.full_name?.charAt(0) || "A"}
        </div>
        <div>
          <p className="text-sm font-bold text-gray-900">{data.created_by?.full_name || "Unknown Author"}</p>
          <div className="flex items-center gap-2 text-xs text-gray-500">
            <span className="bg-indigo-50 text-indigo-700 px-2 py-0.5 rounded font-medium">
              {data.created_by?.role || "Warden"}
            </span>
            {isEdited && <span className="flex items-center gap-1 text-gray-400">• <Clock size={12} /> Edited</span>}
          </div>
        </div>
      </div>
    </div>
  );
};

const AnnouncementBody = ({ message }) => (
  <div className="p-8 md:p-10">
    <div className="prose prose-slate max-w-none text-gray-700 leading-relaxed whitespace-pre-wrap">
      {message}
    </div>
  </div>
);


const AnnouncementFooter = ({ data, onEdit, onDelete }) => {
  const hasImage = data.image && data.image.length > 0;
  const [galleryOpen, setGalleryOpen] = useState(true);
  const [adminOpen, setAdminOpen] = useState(false);

  return (
    <div className="border-t border-gray-100 divide-y divide-gray-100">
      {hasImage && (
        <AccordionItem
          title="Event Gallery"
          icon={ImageIcon}
          isOpen={galleryOpen}
          onToggle={() => setGalleryOpen((prev) => !prev)}
        >
          <div className="rounded-xl overflow-hidden border border-gray-200 bg-gray-50">
            <img
              src={data.image[0]}
              alt="Event"
              className="w-full max-h-125 object-contain mx-auto"
            />
          </div>
        </AccordionItem>
      )}

      <RoleGuard allow={["admin"]}>
        <AccordionItem
          title="Admin Controls"
          icon={AlertCircle}
          isOpen={adminOpen}
          onToggle={() => setAdminOpen((prev) => !prev)}
        >
          <div className="bg-red-50/50  rounded-xl p-4  border-red-100">
            <p className="text-xs text-red-600 mb-3 font-medium">
              ⚠️ Deletions cannot be undone.
            </p>
            <div className="flex gap-3">
              <Button
                variant="outline"
                onClick={onEdit}
                className="flex-1 flex justify-center gap-2 py-2.5 text-sm bg-white"
              >
                <Pencil size={16} /> Edit Content
              </Button>
              <Button
                variant="danger"
                onClick={onDelete}
                className="flex-1 flex justify-center gap-2 py-2.5 text-sm"
              >
                <Trash2 size={16} /> Delete Post
              </Button>
            </div>
          </div>
        </AccordionItem>
      </RoleGuard>
    </div>
  );
};




export default AnnouncementDetail;