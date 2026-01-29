import { useParams, useNavigate } from "react-router-dom";
import {
  Pencil, Trash2, Calendar, Clock,
  AlertCircle, User, FileImage, FileText // Added FileText for PDFs
} from "lucide-react";
import Button from "../ui/Button";
import { formatDateTime, categoryColorMap } from "../../../utils/constant";
import { useDispatch, useSelector } from "react-redux";
import { lazy, useEffect, useRef, useState } from "react";
import { announcementService } from "../../../services/apiService";
import { removeAnnouncement, selectAnnounceMentById, updateOneAnnouncement } from "../../../utils/store/announcementsSlice";
import PageLoader from "../PageLoader";
import RoleGuard from "../../../services/auth.role";
import BackButton from "../ui/Backbutton";
import { Tags } from "../ui/Helper";
const NotFoundView = lazy(() => import("./NotFoundView"));

const AnnouncementDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);
  const deleteRef = useRef(false);

  const announcement = useSelector(selectAnnounceMentById(id));
  // console.log(announcement, "this is announcement in detail page");
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
    if (window.confirm("Are you sure you want to delete this announcement?")) {
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

  const categoryStyle = categoryColorMap[announcement.category] || "bg-gray-100 text-gray-600 border-gray-200";

  // --- FIX: Correct way to check for files ---
  const files = announcement?.announcement_files || [];
  const hasFiles = files.length > 0;
  // -------------------------------------------

  return (
    <div className="min-h-screen bg-gray-50/50 py-8 px-4 sm:px-6">
      <div className="max-w-3xl mx-auto">

        <div className="mb-6">
          <BackButton />
        </div>

        <div className="bg-white rounded-2xl shadow-sm border border-gray-200 overflow-hidden">

          <div className="p-8 pb-0">
            <div className="flex flex-col-reverse md:flex-row md:items-start md:justify-between gap-4">

              <div className="space-y-4 flex-1 ">

                <h1 className="text-2xl md:text-3xl font-bold text-gray-900 leading-tight">
                  {announcement.title}
                </h1>
              </div>
              <RoleGuard allow={["admin"]}>
                <div className="flex items-center gap-2 shrink-0">
                  <Tags categoryStyle={categoryStyle} category={announcement.category} />
                  <Button
                    variant="text"
                    title="Edit"
                    onClick={() => navigate(`/admin/anns/${id}/edit`)}
                    className="p-2 text-gray-500 hover:text-indigo-600 hover:bg-indigo-50 rounded-lg transition-all"
                  >
                    <Pencil size={18} />
                  </Button>
                  <Button
                    variant="text"
                    onClick={handleDelete}
                    className="p-2 text-gray-500 hover:text-red-600 hover:bg-red-50 rounded-lg transition-all"
                    title="Delete"
                  >
                    <Trash2 size={18} />
                  </Button>
                </div>
              </RoleGuard>
            </div>

            <div className="mt-6 flex items-center gap-3 pb-8 border-b border-gray-100">
              <div className="w-10 h-10 rounded-full bg-linear-to-br from-indigo-500 to-purple-600 flex items-center justify-center text-white font-bold shadow-sm">
                {announcement.created_by?.full_name?.charAt(0) || <User size={18} />}
              </div>
              <div>
                <p className="text-sm font-semibold text-gray-900">
                  {announcement.created_by?.full_name || "Administrator"}
                </p>
                <div className="flex items-center gap-3 text-xs text-gray-500">
                  <span className="flex items-center gap-1">
                    <Calendar size={12} />
                    {formatDateTime(announcement.createdAt)}
                  </span>
                  {announcement.updatedAt !== announcement.createdAt && (
                    <span className="flex items-center gap-1 text-orange-600 bg-orange-50 px-1.5 rounded">
                      <Clock size={12} /> Edited
                    </span>
                  )}
                </div>
              </div>
            </div>
          </div>

          <div className="p-8 pt-6">
            <div className="prose prose-slate prose-lg max-w-none text-gray-700 leading-relaxed whitespace-pre-wrap">
              {announcement.message}lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
            </div>
          </div>

          {/* --- FIX: New Attachment Rendering Logic --- */}
          {hasFiles && (
            <div className="px-8 pb-8">
              <div className="flex items-center gap-2 px-1 py-2 text-xs font-semibold text-gray-500 mb-3">
                <FileImage size={14} /> Attachments ({files.length})
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {files.map((file, index) => {
                  // Use _id if available, otherwise fallback to index
                  const key = file._id || index;

                  if (file.file_type === 'image') {
                    return (
                      <div key={key} className="bg-gray-50 rounded-xl border border-gray-100 p-1 group">
                        <a
                          href={file.url} // FIX: point to .url
                          target="_blank"
                          rel="noreferrer"
                          className="block overflow-hidden rounded-lg cursor-zoom-in relative"
                        >
                          <img
                            src={file.url}
                            loading="lazy"
                            alt="Announcement Attachment"
                            className="w-full h-48 object-cover bg-white transition-transform duration-500 group-hover:scale-105"
                          />
                          <div className="absolute inset-0 bg-black/0 transition-colors group-hover:bg-black/10" />
                        </a>
                      </div>
                    );
                  } else if (file.file_type === 'pdf') {
                    return (
                      <a
                        key={key}
                        href={`${file.url}?fl_attachment=false`}
                        target="_blank"
                        rel="noopener  noreferrer"
                        className="flex items-center gap-3 p-4 rounded-xl border border-gray-200 bg-white hover:border-indigo-300 hover:bg-indigo-50/30 transition-all group"
                      >
                        <div className="p-2 bg-red-50 text-red-500 rounded-lg group-hover:bg-red-100 transition-colors">
                          <FileText size={24} />
                        </div>
                        <div className="overflow-hidden">
                          <p className="text-sm font-medium text-gray-700 truncate">
                            {file.public_id.split('/').pop() || "Document"}
                          </p>
                          <p className="text-xs text-gray-500">Click to view PDF</p>
                        </div>
                      </a>
                    )
                  }
                  return null;
                })}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};



export default AnnouncementDetail;