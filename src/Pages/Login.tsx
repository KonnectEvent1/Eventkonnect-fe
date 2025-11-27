import React, { useState } from "react";
import { Link } from "react-router-dom";
import { toast } from "react-hot-toast";
import AuthService from "../services/auth.service";

const Login: React.FC = () => {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);

  const handleLogin = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);

    try {
      console.log("=== ATTEMPTING LOGIN ===");
      console.log("Email:", email);
      
      await AuthService.login(email, password);
      
      console.log("=== LOGIN SUCCESS ===");
      console.log("Token in localStorage:", localStorage.getItem("accessToken") ? "✅ EXISTS" : "❌ MISSING");
      console.log("User in localStorage:", localStorage.getItem("user") ? "✅ EXISTS" : "❌ MISSING");
      
      toast.success("Login successful! Redirecting...");
      
      // Small delay to ensure localStorage is written
      setTimeout(() => {
        console.log("=== NAVIGATING TO DASHBOARD ===");
        window.location.href = "/dashboard";
      }, 500);
      
    } catch (err) {
      const error = err as { error?: string };
      console.error("=== LOGIN ERROR ===", err);
      toast.error(error?.error || "Login failed. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col">
      {/* Header */}
      <header className="bg-black border-b border-gray-800">
        <div className="container mx-auto px-4 py-4">
          <Link to="/" className="text-2xl font-bold text-green-500">
            EventKonnect
          </Link>
        </div>
      </header>

      {/* Main Content */}
      <div
        className="flex-1 flex items-center justify-center p-4 bg-gradient-to-br from-black via-gray-900 to-green-900"
      >
        <div className="bg-gray-900 bg-opacity-95 backdrop-blur-sm shadow-2xl rounded-3xl p-6 sm:p-8 md:p-12 w-full max-w-md border border-gray-800">
          <div className="mb-8 text-center">
            <h2 className="text-3xl md:text-4xl font-bold text-green-500 mb-2">
              Welcome Back
            </h2>
            <p className="text-gray-400">Sign in to your account</p>
          </div>

          <form onSubmit={handleLogin} className="space-y-6">
            <div>
              <label
                htmlFor="email"
                className="block text-gray-300 font-semibold mb-2"
              >
                Email Address
              </label>
              <input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                autoComplete="email"
                className="w-full px-4 py-3 bg-gray-800 text-white border border-gray-700 rounded-xl focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent transition"
                placeholder="you@example.com"
              />
            </div>

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
                className="w-full px-4 py-3 bg-gray-800 text-white border border-gray-700 rounded-xl focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent transition"
                placeholder="Enter your password"
              />
            </div>

            <div className="flex items-center justify-between">
              <label className="flex items-center">
                <input
                  type="checkbox"
                  className="w-4 h-4 text-green-600 bg-gray-800 border-gray-700 rounded focus:ring-green-500"
                />
                <span className="ml-2 text-sm text-gray-400">Remember me</span>
              </label>
              <Link
                to="/forgot-password"
                className="text-sm text-green-400 hover:text-green-300 transition"
              >
                Forgot password?
              </Link>
            </div>

            <button
              type="submit"
              disabled={loading}
              className={`w-full bg-gradient-to-r from-green-600 to-green-700 text-white py-3 rounded-xl font-semibold shadow-lg transition-all transform ${
                loading
                  ? "opacity-70 cursor-not-allowed"
                  : "hover:from-green-700 hover:to-green-800 hover:shadow-xl hover:-translate-y-0.5"
              }`}
            >
              {loading ? (
                <span className="flex items-center justify-center">
                  <svg
                    className="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                  >
                    <circle
                      className="opacity-25"
                      cx="12"
                      cy="12"
                      r="10"
                      stroke="currentColor"
                      strokeWidth="4"
                    ></circle>
                    <path
                      className="opacity-75"
                      fill="currentColor"
                      d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                    ></path>
                  </svg>
                  Logging in...
                </span>
              ) : (
                "Sign In"
              )}
            </button>
          </form>

          <div className="mt-8">
            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-gray-700"></div>
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="px-4 bg-gray-900 text-gray-400">
                  New to EventKonnect?
                </span>
              </div>
            </div>

            <div className="mt-6 text-center">
              <Link
                to="/register"
                className="inline-flex items-center justify-center w-full px-4 py-3 border-2 border-green-600 text-green-400 font-semibold rounded-xl hover:bg-green-600 hover:text-white transition-all"
              >
                Create an Account
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
