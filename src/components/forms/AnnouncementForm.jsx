import { useEffect, useState } from "react";
import { BackButton } from "../index";
import { CATEGORIES } from "../../utils/constant";
import { mapFormToCreateAnnouncementPayload } from "../../../data";
import { Imp } from "../common/ui/Helper";
import { Type, AlignLeft, Link as LinkIcon, Layers } from "lucide-react";
import { AnnouncementImageUpload, AnnouncementPdfUpload } from "../common/announcements/AnnouncementUpload";


const AnnouncementForm = ({ initialData, onSubmit, loading, isEdit }) => {
  const [formData, setFormData] = useState({
    title: "",
    message: "",
    notice_url: "",
    category: "",
  });

  // State to track if a file is selected for UI feedback
  const [images, setImages] = useState([]);
  const [pdfs, setPdfs] = useState([]);
  const [imagePreviews, setImagePreviews] = useState([]);
  const [removedFileIds, setRemovedFileIds] = useState([]);

  useEffect(() => {
    if (initialData) {
      setFormData({
        title: initialData.title || "",
        message: initialData.message || "",
        notice_url: initialData.notice_url || "",
        category: initialData?.category || "",
      });
    }
    if (initialData?.announcement_files?.length > 0) {
      setImagePreviews(
        initialData.announcement_files.map(file => ({
          _id: file._id,
          url: file.url,
          isNew: false
        }))
      )
    }
  }, [initialData]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value

    }));
  };

  const submit = (e) => {
    e.preventDefault();
    const payload = mapFormToCreateAnnouncementPayload(formData);
    onSubmit({ payload, images, pdfs, removedFileIds });

    // console.log(payload, images, pdfs);
  };

  return (
    <div className="min-h-screen bg-gray-50/50 py-8 px-4 sm:px-6">
      <BackButton />
      <div className="max-w-4xl mx-auto">
        <div className="bg-white rounded-2xl shadow-xl border border-gray-100 overflow-hidden">
          {/* Header */}
          <div className="bg-linear-to-r from-indigo-600 to-blue-600 px-8 py-6 text-white">
            <h2 className="text-2xl font-bold tracking-tight">
              {isEdit ? "Edit Announcement" : "Create New Announcement"}
            </h2>
            <p className="text-indigo-100 text-sm mt-1 opacity-90">
              Fill in the details below to broadcast information to the students.
            </p>
          </div>

          <form onSubmit={submit} className="p-8 space-y-8">

            {/* Row 1: Title & Category */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Title */}
              <div className="space-y-2">
                <label className="flex items-center gap-2 text-sm font-semibold text-gray-700">
                  <Type size={16} className="text-gray-400" />
                  Title <Imp />
                </label>
                <input
                  type="text"
                  name="title"
                  value={formData.title}
                  onChange={handleChange}
                  placeholder="e.g., Exam Schedule Released"
                  className="w-full rounded-lg border-gray-300 border px-4 py-2.5 text-sm outline-none focus:border-indigo-500 focus:ring-4 focus:ring-indigo-500/10 transition-all"
                  required
                />
              </div>

              {/* Category */}
              <div className="space-y-2">
                <label className="flex items-center gap-2 text-sm font-semibold text-gray-700">
                  <Layers size={16} className="text-gray-400" />
                  Category <Imp />
                </label>
                <div className="relative">
                  <select
                    name="category"
                    value={formData.category}
                    required
                    onChange={handleChange}
                    className="w-full appearance-none rounded-lg border-gray-300 border px-4 py-2.5 text-sm outline-none focus:border-indigo-500 focus:ring-4 focus:ring-indigo-500/10 transition-all capitalize bg-white"
                  >
                    <option value="" disabled>Select a Category</option>
                    {CATEGORIES.map((category, index) => (
                      <option key={index} value={category}>
                        {category}
                      </option>
                    ))}
                  </select>
                  {/* Custom Arrow Icon */}
                  <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none text-gray-500">
                    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m6 9 6 6 6-6" /></svg>
                  </div>
                </div>
              </div>
            </div>

            {/* Row 2: Message */}
            <div className="space-y-2">
              <label className="flex items-center gap-2 text-sm font-semibold text-gray-700">
                <AlignLeft size={16} className="text-gray-400" />
                Message <Imp />
              </label>
              <textarea
                name="message"
                rows="5"
                value={formData.message}
                onChange={handleChange}
                placeholder="Write the detailed announcement here..."
                className="w-full rounded-lg border-gray-300 border px-4 py-3 text-sm resize-y outline-none focus:border-indigo-500 focus:ring-4 focus:ring-indigo-500/10 transition-all"
                required
              />
            </div>

            {/* Row 3: URL */}
            <div className="space-y-2">
              <label className="flex items-center gap-2 text-sm font-semibold text-gray-700">
                <LinkIcon size={16} className="text-gray-400" />
                Notice URL <span className="text-xs font-normal text-gray-400">(Optional)</span>
              </label>
              <input
                type="url"
                name="notice_url"
                value={formData.notice_url}
                onChange={handleChange}
                placeholder="https://..."
                className="w-full rounded-lg border-gray-300 border px-4 py-2.5 text-sm outline-none focus:border-indigo-500 focus:ring-4 focus:ring-indigo-500/10 transition-all"
              />
            </div>

            {/* Row 4: Attachments */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <AnnouncementImageUpload
                images={images}
                setImages={setImages}
                imagePreviews={imagePreviews}
                setPreviews={setImagePreviews}
                setRemovedFileIds={setRemovedFileIds}
              />

              <AnnouncementPdfUpload
                pdfs={pdfs}
                setPdfs={setPdfs}
                setRemovedFileIds={setRemovedFileIds}
              />
            </div>

            {/* Submit Button */}
            <div className="pt-4">
              <button
                type="submit"
                disabled={loading}
                className="w-full flex items-center justify-center gap-2 bg-indigo-600 hover:bg-indigo-700 text-white font-semibold py-3.5 px-6 rounded-xl transition-all shadow-lg shadow-indigo-200 active:scale-[0.98] disabled:opacity-70 disabled:cursor-not-allowed"
              >
                {loading ? (
                  <>
                    <span className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                    Processing...
                  </>
                ) : (
                  isEdit ? "Update Announcement" : "Publish Announcement"
                )}
              </button>
            </div>

          </form>
        </div>
      </div>
    </div>
  );
};

export default AnnouncementForm;