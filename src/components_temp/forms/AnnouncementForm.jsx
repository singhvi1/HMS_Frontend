import { useEffect, useState } from "react";
import { BackButton } from "../index";
import { CATEGORIES } from "../../utils/constant"

const AnnouncementForm = ({ initialData, onSubmit, loading, isEdit }) => {

  const [formData, setFormData] = useState({
    title: "",
    message: "",
    notice_url: "",
    category: "",
    file: null
  });


  useEffect(() => {
    if (initialData) {
      setFormData({
        title: initialData.title || "",
        message: initialData.message || "",
        notice_url: initialData.notice_url || "",
        category: initialData?.category || "",
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

  const submit = (e) => {
    e.preventDefault();

    const payload = new FormData();

    payload.append("title", formData.title);
    payload.append("message", formData.message);
    payload.append("category", formData.category);

    if (formData.notice_url) {
      payload.append("notice_url", formData.notice_url);
    }
    onSubmit(payload);
  };


  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <BackButton />

      <div className="flex justify-center">
        <form
          onSubmit={submit}
          className="w-full max-w-2xl bg-white rounded-xl shadow p-6 space-y-5"
        >
          <h2 className="text-xl font-bold">
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


          <label className="block text-sm font-medium mb-1">Message</label>
          <textarea
            name="message"
            rows="4"
            value={formData.message}
            onChange={handleChange}
            className="w-full border rounded-md px-3 py-2 text-sm resize-none focus:ring-2 focus:ring-indigo-500"
            required
          />

          <select
            name="category"
            value={formData.category}
            required
            onChange={handleChange}
            className="block w-full rounded-md border border-gray-300 p-2 text-sm  focus:border-blue-500 focus:ring-blue-500 capitalize"
          >
            <option value="">Select a Category</option>
            {/* Dynamic mapping of options */}
            {CATEGORIES.map((category, index) => (
              <option key={index} value={category}>
                {category}
              </option>
            ))}
          </select>
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
            <label
              htmlFor="file-upload"
              className="block text-sm font-medium text-gray-700 mb-2"
            >
              Attach File
            </label>

            <input
              type="file"
              id="file-upload"
              name="file"
              onChange={handleChange}
              className="block w-full text-sm text-gray-500
                          file:mr-4 file:py-2 file:px-4
                          file:rounded-md file:border-0
                          file:text-sm file:font-semibold
                          file:bg-blue-50 file:text-blue-700
                          hover:file:bg-blue-100
                          "
            />

            {isEdit && (
              <p className="text-xs text-gray-500 mt-2">
                Leave empty to keep existing file
              </p>
            )}
          </div>

          {/* Submit */}
          <button
            type="submit"
            disabled={loading}
            className="w-full bg-indigo-600 text-white py-2 rounded-md font-medium hover:bg-indigo-700 disabled:opacity-60"
          >
            {loading
              ? "Saving..."
              : isEdit
                ? "Update Announcement"
                : "Publish Announcement"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default AnnouncementForm;
