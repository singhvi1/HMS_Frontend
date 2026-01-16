import { LogIn } from "lucide-react";
import { useEffect, useState } from "react";
import NavBar from "./layout/NavBar";
import { useDispatch, useSelector } from "react-redux";
import { setLoggedinUser } from "../utils/store/logedinUser";
import { authService, hostelService } from "../services/apiService";
import Button from "./common/ui/Button";
import { selectHostelAllotment, setHostel } from "../utils/store/hostelSlice";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const allotment = useSelector(selectHostelAllotment)
  console.log(allotment);

  const fillAdminCredentials = () => {
    setEmail("admin@hms.com");
    setPassword("Admin@123");
    setError("");
  };

  const fillStudentCredentials = () => {
    setEmail("vikram.kumar@student.hms.com");
    setPassword("Student@123");
    setError("");
  };

  const handleSubmit = async (e) => {
    try {
      e.preventDefault();
      const res = await authService.loginUser(email, password);
      if (res.data.success) {
        // navigate(`/${res?.data.user.role}`);
        dispatch(setLoggedinUser(res.data.user));
      }
    } catch (err) {
      setError(
        err?.response?.data?.message ||
        "Invalid email or password"
      );
    }
  };
  useEffect(() => {
    const fetchHostelStatus = async () => {
      try {
        const res = await hostelService.getAll();
        const hostel = res?.data?.data?.[0];
        if (hostel) {
          console.log(hostel.data || "nonting")
          dispatch(setHostel(hostel));
        }
      } catch (err) {
        console.error("Failed to fetch hostel status", err);
      }
    };

    fetchHostelStatus();
  }, []);

  return (
    <>
      <NavBar />
      {(
        <div className="mt-6 space-y-2 text-center">
          <p className="text-sm text-gray-600">
            Login as{" "}
            <span
              onClick={fillAdminCredentials}
              className="text-indigo-600 font-medium cursor-pointer hover:underline"
            >
              Admin
            </span>
          </p>

          <p className="text-sm text-gray-600">
            Login as{" "}
            <span
              onClick={fillStudentCredentials}
              className="text-indigo-600 font-medium cursor-pointer hover:underline"
            >
              Student
            </span>
          </p>

          <p className="text-xs text-gray-500">
            Click a role to auto-fill credentials
          </p>
        </div>
      )}

      <div className="relative min-h-[calc(100vh-4rem)] flex items-center justify-center bg-gray-50 flex-col">

        {allotment && <div className="absolute top-4 right-4">
          <Button
            variant="success"
            className="p-3"
            onClick={() => navigate(`/allotment`)}
          >Allotment</Button>
        </div>}

        <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-md">

          <div className="flex items-center justify-center mb-8">
            <LogIn className="w-8 h-8 text-indigo-600" />
            <h2 className="text-2xl font-bold ml-2">Login</h2>
          </div>

          {error && (
            <p className="text-red-600 text-sm mb-4 text-center">
              {error}
            </p>
          )}

          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label className="block text-base font-medium text-gray-700">
                Email
              </label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)} autoComplete="current-email"
                className="mt-1 block w-full border border-gray-300 rounded-md p-2 focus:ring-2 focus:ring-indigo-500"
                required
              />
            </div>

            <div>
              <label className="block text-base font-medium text-gray-700">
                Password
              </label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                autoComplete="current-password"
                className="mt-1 block w-full border border-gray-300 rounded-md p-2 focus:ring-2 focus:ring-indigo-500"
                required
              />
            </div>

            <Button
              variant="success"
              type="submit"
              className="w-full py-2 rounded-md text-white"
            >
              Sign in
            </Button>
          </form>
        </div>
      </div>
    </>
  );
};

export default Login;