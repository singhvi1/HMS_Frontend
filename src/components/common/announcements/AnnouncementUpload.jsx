import { Image as ImageIcon, FileText, X, Trash2 } from "lucide-react";
import FileDropzone from "../ui/FileDropzone.jsx";
import Button from "../ui/Button.jsx";
import { useEffect } from "react";

export const AnnouncementImageUpload = ({ images, setImages, imagePreviews, setPreviews, setRemovedFileIds }) => {
    useEffect(() => {
        console.log(images, "this is images")
        console.log(imagePreviews, "this is imagePreviews")
    }, [images, imagePreviews])
    const handleChange = (e) => {
        const files = Array.from(e.target.files);
        setImages((prev) => [...prev, ...files]);

        const newPreviews = files.map((file) => ({
            _id: null,
            url: URL.createObjectURL(file),
            isNew: true,
        }));
        setPreviews((prev) => [...prev, ...newPreviews]);
        e.target.value = null;
    };

    const handleRemove = (indexToRemove) => {
        const file = imagePreviews[indexToRemove];
        if (!file.isNew && file._id) {
            setRemovedFileIds((prev) => [...new Set([...prev, file._id])]);
        }
        if (file.isNew) {
            setImages(prev => prev.filter(
                (_, i) =>
                    i !== indexToRemove)
            );
            URL.revokeObjectURL(file.url);

        }

        setPreviews(prev => prev.filter((_, i) => i !== indexToRemove));
    };

    return (
        <>
            <FileDropzone
                label="Announcement Images"
                icon={<ImageIcon size={16} className="text-gray-400" />}
                accept="image/*"
                multiple
                files={images}
                onChange={handleChange}
                helperText="PNG, JPG, WEBP (max 5 images, 10MB each)"
            />

            {imagePreviews?.length > 0 && (
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 mt-4">
                    {imagePreviews.map((file, index) => (
                        <div
                            key={index}
                            className="relative group rounded-xl overflow-hidden border border-gray-200 shadow-sm h-30 w-full"
                        >
                            <img
                                src={file.url || ""}
                                alt={`preview-${index}`}
                                className=" h-full w-full object-cover bg-white"
                            />

                            <button
                                type="button"
                                onClick={() => handleRemove(index)}
                                className="absolute top-1 right-1 p-1 bg-white/90 hover:bg-red-50 text-gray-500 hover:text-red-600 rounded-full shadow-sm transition-all opacity-100 sm:opacity-0 sm:group-hover:opacity-100 focus:opacity-100"
                                title="Remove image"
                            >
                                <X size={14} />
                            </button>
                        </div>
                    ))}
                </div>
            )}
        </>
    );
};

export const AnnouncementPdfUpload = ({ pdfs, setPdfs }) => {

    const handleChange = (e) => {
        // Convert FileList to Array
        setPdfs(Array.from(e.target.files));
    };

    const handleRemove = (indexToRemove) => {
        const updatedPdfs = pdfs.filter((_, index) => index !== indexToRemove);
        setPdfs(updatedPdfs);
    };

    return (
        <>
            <FileDropzone
                label="Announcement PDFs"
                icon={<FileText size={16} className="text-gray-400" />}
                accept="application/pdf"
                multiple
                files={pdfs}
                onChange={handleChange}
                helperText="PDF only (max 5 files, 10MB each)"
            />

            {/* List of selected PDFs with Remove option */}
            {pdfs?.length > 0 && (
                <div className="mt-3 space-y-2">
                    {pdfs.map((file, index) => (
                        <div key={index} className="flex items-center justify-between p-2 bg-gray-50 border border-gray-100 rounded-lg">
                            <div className="flex items-center gap-2 overflow-hidden">
                                <div className="p-1.5 bg-red-100 text-red-600 rounded">
                                    <FileText size={14} />
                                </div>
                                <span className="text-sm text-gray-700 truncate max-w-37.5 sm:max-w-xs">
                                    {file.name}
                                </span>
                                <span className="text-xs text-gray-400 shrink-0">
                                    ({(file.size / 1024 / 1024).toFixed(2)} MB)
                                </span>
                            </div>

                            <Button
                                variant="text"
                                title={"Remove it"}
                                type="button"
                                onClick={() => handleRemove(index)}
                                className="p-1.5  text-gray-400 hover:text-red-500 hover:bg-red-50 rounded-lg transition-colors "
                            >
                                <Trash2 size={14} className="cursor-pointer" />
                            </Button>
                        </div>
                    ))}
                </div>
            )}
        </>
    );
};