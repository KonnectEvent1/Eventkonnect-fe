// src/Components/Navbar.tsx
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import api from "../api"; // Axios instance
import { AxiosError } from "axios";

const Navbar: React.FC = () => {
  const [showLogin, setShowLogin] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const response = await api.post<{ token: string }>("/auth/login", {
        email,
        password,
      });

      localStorage.setItem("token", response.data.token);
      setShowLogin(false); // close modal
      navigate("/dashboard");
    } catch (err: unknown) {
      const axiosError = err as AxiosError<{ message: string }>;
      setError(
        axiosError.response?.data?.message || "Login failed. Please try again.",
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      {/* Navbar */}
      <nav className="bg-black text-white px-6 py-4 flex justify-between items-center fixed w-full z-50">
        <h1 className="text-2xl font-bold text-green-500">EventKonnect</h1>

        <div className="flex gap-6 items-center">
          <Link to="/">Home</Link>
          <Link to="/dashboard">Dashboard</Link>
          <Link to="/vendors">Vendors</Link>
          <Link to="/payments">Payments</Link>

          {/* Login button */}
          <button
            onClick={() => setShowLogin(true)}
            className="bg-green-600 px-4 py-2 rounded-lg hover:bg-green-700 transition"
          >
            Login
          </button>
        </div>
      </nav>

      {/* Login Modal */}
      {showLogin && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-white w-full max-w-md p-8 rounded-2xl shadow-2xl relative">
            {/* Close button */}
            <button
              onClick={() => setShowLogin(false)}
              className="absolute top-3 right-3 text-gray-500 hover:text-gray-700"
            >
              ✖
            </button>

            <h2 className="text-2xl font-bold text-green-700 mb-6 text-center">
              Welcome to EventKonnect
            </h2>

            {error && (
              <div className="bg-red-100 border border-red-400 text-red-600 px-4 py-2 rounded mb-4 text-center">
                {error}
              </div>
            )}

            <form onSubmit={handleLogin} className="space-y-5">
              <input
                type="email"
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="w-full px-4 py-3 border rounded-xl bg-gray-50 focus:outline-none focus:ring-2 focus:ring-green-400"
              />
              <input
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                className="w-full px-4 py-3 border rounded-xl bg-gray-50 focus:outline-none focus:ring-2 focus:ring-green-400"
              />

              <button
                type="submit"
                disabled={loading}
                className={`w-full py-3 rounded-xl font-semibold shadow-lg text-white transition-transform transform hover:-translate-y-1 ${
                  loading
                    ? "bg-green-400 opacity-70 cursor-not-allowed"
                    : "bg-green-700 hover:bg-green-800"
                }`}
              >
                {loading ? "Logging in..." : "Login"}
              </button>
            </form>

            <p className="text-sm text-gray-500 mt-6 text-center">
              Don’t have an account?{" "}
              <Link
                to="/register"
                className="text-green-600 font-semibold hover:underline"
                onClick={() => setShowLogin(false)}
              >
                Sign up
              </Link>
            </p>
          </div>
        </div>
      )}
    </>
  );
};

export default Navbar;
