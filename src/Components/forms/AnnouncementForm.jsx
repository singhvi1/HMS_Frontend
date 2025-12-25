import { ArrowLeft } from "lucide-react";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const AnnouncementForm = ({ initialData, onSubmit }) => {
  const isEdit = Boolean(initialData);
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    title: "",
    message: "",
    notice_url: "",
    file: null
  });

  useEffect(() => {
    if (initialData) {
      setFormData({
        title: initialData.title || "",
        message: initialData.message || "",
        notice_url: initialData.notice_url || "",
        file: null
      });
    }
  }, [initialData]);

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: files ? files[0] : value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit?.(formData);
  };

  return (
    <div className="min-h-screen bg-gray-50 p-6">

      {/* Back button */}
      <button
        onClick={() => navigate(-1)}
        className="mb-4 flex items-center text-sm text-gray-600 hover:text-black"
      >
        <ArrowLeft className="w-4 h-4 mr-1" />
        Back
      </button>

      {/* Centered form */}
      <div className="flex justify-center">
        <form
          onSubmit={handleSubmit}
          className="w-full max-w-2xl bg-white rounded-xl shadow p-6 space-y-5"
        >
          <h2 className="text-xl font-bold text-gray-800">
            {isEdit ? "Edit Announcement" : "Create Announcement"}
          </h2>

          {/* Title */}
          <div>
            <label className="block text-sm font-medium mb-1">Title</label>
            <input
              type="text"
              name="title"
              value={formData.title}
              onChange={handleChange}
              className="w-full border rounded-md px-3 py-2 text-sm focus:ring-2 focus:ring-indigo-500"
              required
            />
          </div>

          {/* Message */}
          <div>
            <label className="block text-sm font-medium mb-1">Message</label>
            <textarea
              name="message"
              value={formData.message}
              onChange={handleChange}
              rows="4"
              className="w-full border rounded-md px-3 py-2 text-sm resize-none focus:ring-2 focus:ring-indigo-500"
              required
            />
          </div>

          {/* URL */}
          <div>
            <label className="block text-sm font-medium mb-1">
              Notice URL (optional)
            </label>
            <input
              type="url"
              name="notice_url"
              value={formData.notice_url}
              onChange={handleChange}
              className="w-full border rounded-md px-3 py-2 text-sm focus:ring-2 focus:ring-indigo-500"
            />
          </div>

          {/* File */}
          <div>
            <label className="block text-sm font-medium mb-1">
              Attach File
            </label>
            <input
              type="file"
              name="file"
              onChange={handleChange}
              className="w-full text-sm"
            />
            {isEdit && (
              <p className="text-xs text-gray-500 mt-1">
                Leave empty to keep existing file
              </p>
            )}
          </div>

          {/* Submit */}
          <button
            type="submit"
            className="w-full bg-indigo-600 text-white py-2 rounded-md font-medium hover:bg-indigo-700"
          >
            {isEdit ? "Update Announcement" : "Publish Announcement"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default AnnouncementForm;
