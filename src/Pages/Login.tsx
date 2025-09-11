import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Navbar from "../Components/Navbar"; // Import the Navbar component
import api from "../api"; // Axios instance
import { AxiosError } from "axios";

const Login: React.FC = () => {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [error, setError] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);
  const navigate = useNavigate();

  const handleLogin = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const response = await api.post<{ token: string }>("/auth/login", {
        email,
        password,
      });

      // Save token in localStorage
      localStorage.setItem("token", response.data.token);

      // Redirect to dashboard
      navigate("/dashboard");
    } catch (err: unknown) {
      const axiosError = err as AxiosError<{ message: string }>;

      if (axiosError.response?.data?.message) {
        setError(axiosError.response.data.message);
      } else if (axiosError.request) {
        setError("❌ Network error. Please check your connection.");
      } else {
        setError("❌ Login failed. Please try again.");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      {/* Include the Navbar */}
      <Navbar />

      {/* Login Page Content */}
      <div
        className="min-h-screen flex items-center justify-center p-4"
        style={{
          backgroundImage: "url('/Login-background.jpg')",
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
        }}
      >
        <div className="bg-black bg-opacity-80 shadow-2xl rounded-3xl p-8 sm:p-12 w-full max-w-md border border-gray-700">
          {/* Title */}
          <h2 className="text-3xl font-bold text-green-500 mb-6 text-center">
            Welcome Back 👋
          </h2>

          {/* Error Message */}
          {error && (
            <p className="mb-4 text-center text-red-400 font-semibold">
              {error}
            </p>
          )}

          {/* Login Form */}
          <form onSubmit={handleLogin} className="space-y-5">
            {/* Email */}
            <div>
              <label
                htmlFor="email"
                className="block text-gray-300 font-semibold mb-2"
              >
                Email
              </label>
              <input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                autoComplete="email"
                className="w-full px-4 py-3 bg-gray-800 text-white border border-gray-700 rounded-xl focus:outline-none focus:ring-2 focus:ring-green-500 transition"
                placeholder="you@example.com"
              />
            </div>

            {/* Password */}
            <div>
              <label
                htmlFor="password"
                className="block text-gray-300 font-semibold mb-2"
              >
                Password
              </label>
              <input
                id="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                autoComplete="current-password"
                className="w-full px-4 py-3 bg-gray-800 text-white border border-gray-700 rounded-xl focus:outline-none focus:ring-2 focus:ring-green-500 transition"
                placeholder="Your password"
              />
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={loading}
              className={`w-full bg-green-600 text-white py-3 rounded-xl font-semibold shadow-lg transition-transform transform hover:-translate-y-1 ${
                loading ? "opacity-70 cursor-not-allowed" : "hover:bg-green-700"
              }`}
            >
              {loading ? "🔄 Logging in..." : "Login"}
            </button>
          </form>

          {/* Sign up link */}
          <p className="text-sm text-gray-400 mt-6 text-center">
            Don't have an account?{" "}
            <Link
              to="/register"
              className="text-green-400 font-semibold hover:underline"
            >
              Sign up
            </Link>
          </p>
        </div>
      </div>
    </>
  );
};

export default Login;
