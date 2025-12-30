/* eslint-disable react-hooks/exhaustive-deps */
import { Calendar, AlertCircle } from "lucide-react";
import { useNavigate } from "react-router-dom";
import BackButton from "../common/ui/Backbutton";
import { categoryIconMap, categoryColorMap, formatDateTime } from "../../utils/constant";
import { useDispatch, useSelector } from "react-redux";
import { announcementService } from "../../services/apiService";
import { clearSelectedAnnouncement, setAnnouncements, setLoading, setSelectedAnnouncement } from "../../utils/store/announcementsSlice";
import { useEffect } from "react";


const AnnounceMents = () => {
    const navigate = useNavigate();
    // console.log("announcements called");
    const dispatch = useDispatch();
    dispatch(clearSelectedAnnouncement())
    const { list, loading } = useSelector((state) => state.anns)
    // console.log(list, loading)

    const fetchAnn = async () => {
        dispatch(setLoading(true))
        try {
            const res = await announcementService.getAllAnnouncements();
            dispatch(setAnnouncements(res.data.announcements));
        } catch (err) {
            console.error("Failed to fetch  announcements", err)
        } finally {
            dispatch(setLoading(false));
        }
    }
    useEffect(() => {
        fetchAnn()
    }, [])

    if (loading) {
        return <div className="p-6">Loading announcements...</div>;
    }

    if (!list.length) {
        return (
            <div className="p-6 text-gray-500 text-center">
                No announcements found
            </div>
        );
    }

    return (
        <div>
            <div className="flex items-center justify-between mb-4">
                <BackButton />

                <button
                    onClick={() => navigate("/admin/anns/new")}
                    className="flex items-center gap-2 px-4 py-2 text-sm font-medium rounded-lg bg-indigo-600 text-white hover:bg-indigo-700 transition"
                >
                    + Add Announcement
                </button>
            </div>

            {list.map((announcement) => {
                const Icon =
                    categoryIconMap[announcement.category] || AlertCircle;

                const color =
                    categoryColorMap[announcement.category] ||
                    "bg-gray-100 text-gray-600";

                return (
                    <div
                        key={announcement._id}
                        className="transform transition-all duration-300 hover:scale-[1.02] cursor-pointer p-2"
                        onClick={() => {
                            dispatch(setSelectedAnnouncement(announcement))
                            navigate(`/admin/anns/${announcement._id}`);
                        }}
                    >
                        <div className="border rounded-xl overflow-hidden shadow-sm hover:shadow-md transition-shadow">
                            <div className="flex items-start p-4">
                                {/* Icon */}
                                <div className={`rounded-lg p-3 ${color} mr-4`}>
                                    <Icon className="w-6 h-6" />
                                </div>

                                {/* Content */}
                                <div className="flex-1">
                                    <h3 className="font-semibold text-lg text-gray-800">
                                        {announcement.title}
                                    </h3>

                                    <p className="text-gray-600 mt-1">
                                        {announcement.message}
                                    </p>

                                    <div className="flex items-center mt-2 text-sm text-gray-500">
                                        <Calendar className="w-4 h-4 mr-1" />

                                        <span>
                                            {formatDateTime(
                                                announcement.updatedAt &&
                                                    announcement.updatedAt !== announcement.createdAt
                                                    ? announcement.updatedAt
                                                    : announcement.createdAt
                                            )}
                                        </span>
                                        <span className="ml-auto flex items-center gap-2">
                                            <span className="text-gray-400">•</span>
                                            <span className="px-2 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-700">
                                                Admin
                                            </span>
                                        </span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                );
            })}
        </div >
    );
};

export default AnnounceMents;
