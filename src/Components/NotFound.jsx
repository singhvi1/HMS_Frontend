import { Link } from "react-router-dom";

const NotFound = () => {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-linear-to-b from-gray-50 to-gray-100 px-4">
      
      {/* Illustration */}
      {/* <img
        src="https://edteam-media.s3.amazonaws.com/blogs/big/2ab53939-9b50-47dd-b56e-38d4ba3cc0f0.png"
        alt="404 Not Found"
        className="w-72 md:w-96 mb-8"
      /> */}

      {/* Text */}
      <h1 className="text-5xl font-extrabold text-gray-800 mb-3">
        404
      </h1>
      <p className="text-lg text-gray-600 text-center max-w-md mb-6">
        Oops! The page you are looking for doesn’t exist or has been moved.
      </p>

      {/* Action */}
      <Link
        to="/"
        className="px-6 py-3 rounded-lg bg-indigo-600 text-white font-medium hover:bg-indigo-700 transition"
      >
        Go Back Home
      </Link>
    </div>
  );
};

export default NotFound;
