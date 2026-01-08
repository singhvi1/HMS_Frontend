import { Calendar, Clock, Megaphone } from "lucide-react"; // Removed unused imports
import { useNavigate } from "react-router-dom";
import BackButton from "../common/ui/Backbutton";
import { categoryColorMap, formatDateTime } from "../../utils/constant";
import { useDispatch, useSelector } from "react-redux";
import { announcementService } from "../../services/apiService";
import { setAnnouncements } from "../../utils/store/announcementsSlice";
import { useCallback, useEffect, useState } from "react";
import Button from "../common/ui/Button";
import RoleGuard from "../../services/auth.role";
import PageLoader from "../common/PageLoader";

const Announcements = () => {
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

    if (loading) {
        return <PageLoader />
    }

    if (!list.length) {
        return (
            <div className="flex flex-col items-center justify-center h-64 text-slate-400 bg-slate-50 rounded-2xl border border-dashed border-slate-300 m-6">
                <Megaphone size={48} className="mb-4 opacity-20" />
                <p>No announcements found</p>
                <div className="mt-4">
                     <BackButton />
                </div>
            </div>
        );
    }

    return (
        <div className="max-w-5xl mx-auto px-4"> 
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 items-center mb-8 mt-6">
                <div className="justify-self-start">
                    <BackButton />
                </div>

               
                <div className="text-center justify-self-center w-full">
                    <h1 className="text-3xl font-black text-slate-900 tracking-tight">
                        Announcements
                    </h1>
                    <p className="text-slate-500 text-sm mt-1">
                        Stay updated with latest news and events
                    </p>
                </div>

                <div className="justify-self-end">
                    <RoleGuard allow={["admin"]}>
                        <Button
                            variant="success"
                            onClick={() => navigate("/admin/anns/new")} // Ensure this route is correct
                            className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-indigo-600 text-white hover:bg-indigo-700 shadow-lg shadow-indigo-200 transition-all active:scale-95"
                        >
                            <Megaphone size={18} />
                            <span className="hidden sm:inline">Make Announcement</span>
                        </Button>
                    </RoleGuard>
                </div>
            </div>
            {/* --- LAYOUT FIX END --- */}

            {/* Grid Layout for Cards */}
            <div className="grid grid-cols-1 gap-6 pb-10">
                {list.map((announcement) => (
                    <AnnouncementCard
                        key={announcement._id}
                        data={announcement}
                        navigate={navigate}
                    />
                ))}
            </div>
        </div>
    );
};

// Extracted Card Component
const AnnouncementCard = ({ data, navigate }) => {
    // You are using 'loggedinUser' in store, make sure this selector matches your Redux setup
    const role = useSelector((store) => store.auth?.user?.role || store.loggedinUser?.role || "student"); 

    const categoryStyle = categoryColorMap[data.category] || "bg-gray-100 text-gray-600 border-gray-200";
    const hasImage = data.image && data.image.length > 0;

    return (
        <div
            onClick={() => navigate(`/${role}/anns/${data._id}`)}
            className="group bg-white rounded-2xl border border-slate-200 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300 cursor-pointer overflow-hidden"
        >
            <div className="flex flex-col md:flex-row min-h-45">

                {/* Left Side: Content */}
                <div className="flex-1 p-6 flex flex-col justify-between">
                    <div>
                        {/* Meta Header */}
                        <div className="flex items-center justify-between mb-4">
                            <div className="flex items-center gap-3">
                                <div className="w-10 h-10 rounded-full bg-indigo-50 flex items-center justify-center text-indigo-600 font-bold text-sm">
                                    {data.created_by?.full_name?.charAt(0) || "A"}
                                </div>
                                <div>
                                    <p className="text-sm font-bold text-slate-900">
                                        {data.created_by?.full_name || "Admin"}
                                    </p>
                                    <p className="text-xs text-slate-500 capitalize">
                                        {data.created_by?.role || "Admin"}
                                    </p>
                                </div>
                            </div>

                            <span className={`px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider border ${categoryStyle}`}>
                                {data.category}
                            </span>
                        </div>

                        {/* Title & Message */}
                        <h3 className="text-xl font-bold text-slate-900 mb-2 group-hover:text-indigo-600 transition-colors">
                            {data.title}
                        </h3>
                        <p className="text-slate-600 leading-relaxed line-clamp-2 mb-2 text-sm">
                            {data.message}
                        </p>
                    </div>

                    {/* Footer Date */}
                    <div className="flex items-center gap-4 text-xs font-medium text-slate-400 mt-4 pt-4 border-t border-slate-50">
                        <div className="flex items-center gap-1.5">
                            <Calendar size={14} />
                            {formatDateTime(data.createdAt)}
                        </div>
                        {data.updatedAt !== data.createdAt && (
                            <div className="flex items-center gap-1.5 text-indigo-400">
                                <Clock size={14} />
                                Edited
                            </div>
                        )}
                    </div>
                </div>

                {/* Right Side: Image Thumbnail */}
                {hasImage && (
                    <div className="md:w-64 h-48 md:h-auto shrink-0 relative bg-slate-50 flex items-center justify-center p-4 border-l border-slate-100">
                        <img
                            src={data.image[0]}
                            alt={data.title}
                            className="max-w-full max-h-full object-contain mix-blend-multiply"
                        />
                    </div>
                )}
            </div>
        </div>
    );
};

export default Announcements;