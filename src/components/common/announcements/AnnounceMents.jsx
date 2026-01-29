import { Calendar, Clock, Megaphone, Plus } from "lucide-react";
import { useNavigate } from "react-router-dom";
import BackButton from "../ui/Backbutton";
import { categoryColorMap, formatDateTime } from "../../../utils/constant";
import { useDispatch, useSelector } from "react-redux";
import { announcementService } from "../../../services/apiService";
import { setAnnouncements } from "../../../utils/store/announcementsSlice";
import { useCallback, useEffect, useState } from "react";
import Button from "../ui/Button";
import RoleGuard from "../../../services/auth.role";
import PageLoader from "../PageLoader";
import { selectLoggedinRole } from "../../../utils/store/logedinUser";
import { Tags } from "../ui/Helper"
import NotFoundView from "./NotFoundView";


const AnnounceMents = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const { list, listFetched } = useSelector((state) => state.announcements);
    const [loading, setLoading] = useState(false);

    const fetchAnn = useCallback(async () => {
        setLoading(true);
        try {
            const res = await announcementService.getAllAnnouncements();
            dispatch(setAnnouncements(res.data.announcements));
        } catch (err) {
            console.error("Failed to fetch announcements", err);
        } finally {
            setLoading(false);
        }
    }, [dispatch]);

    useEffect(() => {
        if (listFetched) return;
        fetchAnn();
    }, [fetchAnn, listFetched]);


    const renderContent = () => {
        if (loading) {
            return (
                <div className="py-20 flex justify-center">
                    <PageLoader />
                </div>
            );
        }

        if (!list?.length) {
            return (
                <NotFoundView />
            );
        }

        return (
            <div className="grid grid-cols-1 gap-6 pb-20">
                {list.map((announcement) => (
                    <AnnouncementCard
                        key={announcement._id}
                        data={announcement}
                        navigate={navigate}
                    />
                ))}
            </div>
        );
    };

    return (
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-10">
                <BackButton />
                <div className="flex items-center gap-4 justify-center md:justify-start">
                    <div>
                        <h1 className=" text-center-safe md:text-2xl font-black text-slate-900 tracking-tight">
                            Announcements
                        </h1>
                        <p className="text-slate-500 text-sm mt-1">
                            Latest news, updates, and events
                        </p>
                    </div>
                </div>

                <RoleGuard allow={["admin"]}>
                    <Button
                        variant="primary"
                        onClick={() => navigate("/admin/anns/new")}
                        className="flex items-center justify-center gap-2 px-6 py-3 rounded-xl bg-indigo-600 text-white hover:bg-indigo-700 hover:shadow-lg hover:shadow-indigo-200 transition-all active:scale-95 w-full md:w-auto md:font-medium"
                    >
                        <Plus size={18} strokeWidth={2.5} />
                        <span>Create New</span>
                    </Button>
                </RoleGuard>
            </div>

            {renderContent()}
        </div>
    );
};

// Extracted Card Component
const AnnouncementCard = ({ data, navigate }) => {
    const role = useSelector(selectLoggedinRole);
    const categoryStyle = categoryColorMap[data.category] || "bg-slate-100 text-slate-600 border-slate-200";
    // console.log(data)
    const hasImage = data.announcement_files && data.announcement_files.length > 0;
    const imageUrl = hasImage ? data.announcement_files[0].url : null;
    return (
        <div
            onClick={() => navigate(`/${role}/anns/${data._id}`)}
            className="group relative bg-white rounded-2xl border border-slate-200 shadow-[0_2px_10px_-4px_rgba(6,81,237,0.1)] hover:shadow-xl hover:shadow-indigo-500/10 hover:border-indigo-200 hover:-translate-y-1 transition-all duration-300 cursor-pointer overflow-hidden"
        >
            <div className="flex flex-col md:flex-row">

                {/* Content Section */}
                <div className="flex-1 p-6 md:p-8 flex flex-col justify-between order-2 md:order-1">

                    {/* Header: Author & Category */}
                    <div className="flex items-start justify-between gap-4 mb-4">
                        <div className="flex items-center gap-3">
                            <div className="w-10 h-10 rounded-full bg-linear-to-br from-indigo-50 to-blue-50 border border-indigo-100 flex items-center justify-center text-indigo-600 font-bold text-sm shrink-0">
                                {data.created_by?.full_name?.charAt(0) || "A"}
                            </div>
                            <div>
                                <p className="text-sm font-bold text-slate-900 leading-none mb-1">
                                    {data.created_by?.full_name || "Admin"}
                                </p>
                                <p className="text-[11px] font-semibold text-slate-400 uppercase tracking-wide">
                                    {data.created_by?.role || "Administrator"}
                                </p>
                            </div>
                        </div>

                        <Tags categoryStyle={categoryStyle} category={data.category} />
                    </div>

                    <div className="flex justify-between items-start gap-4 mb-6">

                        {/* Main Text - Takes available space (Left) */}
                        <div className="flex-1 min-w-0"> {/* min-w-0 prevents text truncation issues */}
                            <h3 className="text-xl md:text-2xl font-bold text-slate-900 mb-3 group-hover:text-indigo-600 transition-colors leading-tight">
                                {data.title}
                            </h3>
                            <p className="text-slate-600 leading-relaxed line-clamp-2 text-sm md:text-base pr-4">
                                {data.message}lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
                            </p>
                        </div>

                        {/* Image Section - Fixed size (Right) */}
                        {hasImage && (
                            <div className="shrink-0">
                                <div className="w-28 h-28 relative overflow-hidden bg-slate-100 border border-slate-200 rounded-xl shadow-sm">
                                    <img
                                        src={imageUrl}
                                        alt={data.title}
                                        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                                        loading="lazy"
                                    />
                                </div>
                            </div>
                        )}

                    </div>

                    {/* Footer Meta Data */}
                    <div className="flex items-center gap-5 text-xs font-medium text-slate-400 pt-0 border-t border-slate-50">
                        <div className="flex items-center gap-1.5 bg-slate-50 px-2 py-1 rounded-md">
                            <Calendar size={14} className="text-slate-500" />
                            {formatDateTime(data.createdAt)}
                        </div>

                        {data.updatedAt !== data.createdAt && (
                            <div className="flex items-center gap-1.5 text-orange-500 bg-orange-50 px-2 py-1 rounded-md">
                                <Clock size={14} />
                                Edited
                            </div>
                        )}
                    </div>
                </div>

            </div>
        </div>
    );
};

export default AnnounceMents;