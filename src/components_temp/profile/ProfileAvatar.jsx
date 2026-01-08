import { User } from "lucide-react";
import { useState } from "react";

const ProfileAvatar = ({ image_url, name="", size = 36 }) => {
  const [imgError, setImgError] = useState(false);
  const showImage = image_url && !imgError;

  return (
    <div
      style={{ width: size, height: size }}
      className="rounded-full border-2 border-indigo-100 bg-gray-100 flex items-center justify-center overflow-hidden"
    >
      {showImage ? (
        <img
          src={image_url}
          alt={name}
          className="md:w-full md:h-full object-cover"
          onError={() => setImgError(true)}
        />
      ) : (
        <User size={size / 2} className="text-gray-400" />
      )}
    </div>
  );
};


export default ProfileAvatar;
