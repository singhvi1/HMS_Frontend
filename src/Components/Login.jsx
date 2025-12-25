import { LogIn } from "lucide-react";
import { useState } from "react";
import axios from "axios";
import { BASE_URL } from "../utils/constant";
import Navbar from "../Components/layout/NavBar"; // adjust path if needed

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    try {
      e.preventDefault();
      const res = await axios.post(
        BASE_URL + "/login",
        { email, password },
        { withCredentials: true }
      );

      if (res.data.success) {
        const role = res.data.user.role;
        window.location.href = `/${role}`;
      }
    } catch (err) {
      setError(
        err?.response?.data?.message ||
        "Invalid email or password"
      );
    }
  };

  return (
    <>
      <Navbar />
      <div className="min-h-[calc(100vh-4rem)] flex items-center justify-center bg-gray-50">
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
                onChange={(e) => setEmail(e.target.value)}
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
                className="mt-1 block w-full border border-gray-300 rounded-md p-2 focus:ring-2 focus:ring-indigo-500"
                required
              />
            </div>

            <button
              type="submit"
              className="w-full py-2 rounded-md text-white bg-indigo-600 hover:bg-indigo-700"
            >
              Sign in
            </button>
          </form>
        </div>
      </div>
    </>
  );
};

export default Login;
