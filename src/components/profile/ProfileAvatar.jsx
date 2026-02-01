import { Camera, User } from "lucide-react";
import { useState, useRef } from "react";
import useUploadProfilePhoto from "../../customHooks/useUploadProfilePhoto.js";
import { useEffect } from "react";


const ProfileAvatar = ({ image_url, name = "", size = 36, userId }) => {
  console.log(userId)

  const [imgError, setImgError] = useState(false);
  const fileRef = useRef(null);
  const { uploading, uploadProfilePhoto } = useUploadProfilePhoto();


  useEffect(() => {
    setImgError(false);
  }, [image_url]);

  const showImage = image_url && !imgError;

  const handleFileChange = async (e) => {
    const file = e.target.files[0];
    if (file && userId) {
      try {
        await uploadProfilePhoto(userId, file);
      } catch (err) {
        console.error("Error uploading profile photo:", err);
      }
    }
  };


  return (
    <div
      onClick={() => fileRef.current?.click()}
      style={{ width: size, height: size }}
      className="rounded-full border-2 border-indigo-100 bg-gray-100 flex items-center justify-center overflow-hidden cursor-pointer relative"
    >
      {showImage ? (
        <img
          key={image_url}
          src={image_url}
          alt={name}
          className="md:w-full md:h-full object-cover"
          onError={() => setImgError(true)}
        />
      ) : (
        <User size={size / 2} className="text-gray-400" />
      )}

      <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 
                      flex items-center justify-center transition">
        {uploading ? (
          <span className="text-white text-xs">Uploading…</span>
        ) : (
          <Camera className="text-white" size={size / 3} />
        )}

        <input
          ref={fileRef}
          type="file"
          accept="image/*"
          hidden
          onChange={handleFileChange}
        />
      </div>
    </div>
  );
};


export default ProfileAvatar;
