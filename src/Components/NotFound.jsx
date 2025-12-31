import { Link } from "react-router-dom";
import { BackButton } from "./index";

const NotFound = () => {
  return (
    // 1. Added 'relative' here so the absolute child positions itself inside this box
    <div className="min-h-screen relative flex flex-col items-center justify-center bg-linear-to-b from-gray-50 to-gray-200 px-4 text-center">

      {/* 2. Positioned the BackButton at the top-left */}
      <div className="absolute top-5 left-5">
        <BackButton />
      </div>

      {/* Illustration */}
      <img
        src="https://cdn.vectorstock.com/i/1000v/20/99/cloud-server-error-404-technology-system-vector-51242099.jpg"
        alt="404 Not Found"
        className="w-72 md:w-96 mb-6 mix-blend-multiply object-contain"
      />

      {/* Text Content */}
      <h1 className="text-6xl md:text-8xl font-extrabold text-indigo-600 mb-2">
        404
      </h1>

      <h2 className="text-2xl font-bold text-gray-800 mb-3">
        Page Not Found
      </h2>

      <p className="text-gray-600 max-w-md mb-8 mx-auto">
        Oops! The page you are looking for doesn’t exist, has been removed, or is temporarily unavailable.
      </p>

      {/* Actions */}
      <div className="flex flex-col sm:flex-row items-center gap-4">
        <Link
          to="/"
          className="px-6 py-3 rounded-lg bg-indigo-600 text-white font-medium hover:bg-indigo-700 transition shadow-lg shadow-indigo-200"
        >
          Go Back Home
        </Link>
      </div>
    </div>
  );
};

export default NotFound;