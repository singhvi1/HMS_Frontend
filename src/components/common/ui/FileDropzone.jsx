import { UploadCloud } from "lucide-react";

const FileDropzone = ({
    label,
    icon,
    accept,
    multiple = false,
    helperText,
    files,
    onChange,
}) => {
    return (
        <div className="space-y-2">
            <span className="flex items-center gap-2 text-sm font-semibold text-gray-700">
                {icon}
                {label}
            </span>

            <div className="relative group">
                <input
                    type="file"
                    multiple={multiple}
                    accept={accept}
                    onChange={onChange}
                    className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-10"
                />

                <div className="border-2 border-dashed border-gray-300 rounded-xl p-6 flex flex-col items-center justify-center text-center transition-all group-hover:border-indigo-400 group-hover:bg-indigo-50/30 bg-gray-50">
                    <div className="bg-white p-3 rounded-full shadow-sm mb-3">
                        <UploadCloud className="text-indigo-500" size={24} />
                    </div>

                    {files?.length > 0 ? (
                        <div className="text-sm font-medium text-indigo-600 space-y-1">
                            {files.map((file, idx) => (
                                <p key={idx} className="break-all">
                                    {file.name}
                                </p>
                            ))}
                        </div>
                    ) : (
                        <>
                            <p className="text-sm font-medium text-gray-700">
                                Click to upload or drag and drop
                            </p>
                            <p className="text-xs text-gray-400 mt-1">
                                {helperText}
                            </p>
                        </>
                    )}
                </div>
            </div>
        </div>
    );
};

export default FileDropzone;
