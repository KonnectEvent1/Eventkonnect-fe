import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-hot-toast";
import AuthService from "../services/auth.service";

type UserType = "attendee" | "organiser" | "vendor";

const Register: React.FC = () => {
  const [userType, setUserType] = useState<UserType>("attendee");
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
    phone: "",
    organisationName: "",
    companyName: "",
    serviceArea: "",
  });
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  // const base_url =

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (formData.password !== formData.confirmPassword) {
      toast.error("Passwords do not match");
      return;
    }

    if (formData.password.length < 6) {
      toast.error("Password must be at least 6 characters");
      return;
    }

    setLoading(true);

    // Log what we're sending (for debugging)
    console.log("=== REGISTRATION DEBUG ===");
    console.log("User Type:", userType);
    console.log("Form Data:", {
      username: formData.username,
      email: formData.email,
      phone: formData.phone,
      password: "[HIDDEN - Length: " + formData.password.length + "]",
      organisationName: formData.organisationName || "N/A",
      companyName: formData.companyName || "N/A",
      serviceArea: formData.serviceArea || "N/A",
    });

    try {
      switch (userType) {
        case "organiser":
          await AuthService.registerOrganizer(formData);
          break;
        case "vendor":
          await AuthService.registerVendor(formData);
          break;
        case "attendee":
          await AuthService.registerAttendee(formData);
          break;
      }

      toast.success(
        "Registration successful! Please check your email to verify your account.",
      );
      setTimeout(() => navigate("/login"), 2000);
    } catch (err) {
      const error = err as {
        error?: string;
        message?: string;
        details?: string;
      };

      console.log("=== ERROR DEBUG ===");
      console.log("Full error object:", JSON.stringify(err, null, 2));
      console.log("Error type:", typeof err);
      console.log("Error.error:", error?.error);
      console.log("Error.message:", error?.message);
      console.log("Error.details:", error?.details);

      // Show more specific error message
      const errorMessage =
        error?.error ||
        error?.message ||
        "Registration failed. Please check all fields and try again.";

      toast.error(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-black via-gray-900 to-green-900">
      {/* Header */}
      <header className="bg-black bg-opacity-50 border-b border-gray-800">
        <div className="container mx-auto px-4 py-4">
          <Link to="/" className="text-2xl font-bold text-green-500">
            EventKonnect
          </Link>
        </div>
      </header>

      {/* Main Content */}
      <div className="flex-1 flex items-center justify-center p-4 py-12">
        <div className="bg-gray-900 bg-opacity-95 backdrop-blur-sm shadow-2xl rounded-3xl p-6 sm:p-8 md:p-12 w-full max-w-2xl border border-gray-800">
          <div className="mb-8 text-center">
            <h2 className="text-3xl md:text-4xl font-bold text-green-500 mb-2">
              Create Account
            </h2>
            <p className="text-gray-400">Join EventKonnect today</p>
          </div>

          {/* User Type Selector */}
          <div className="grid grid-cols-3 gap-3 mb-8">
            <button
              type="button"
              onClick={() => setUserType("attendee")}
              className={`py-3 px-4 rounded-xl font-semibold transition-all ${
                userType === "attendee"
                  ? "bg-green-600 text-white shadow-lg"
                  : "bg-gray-800 text-gray-400 hover:bg-gray-750"
              }`}
            >
              Attendee
            </button>
            <button
              type="button"
              onClick={() => setUserType("organiser")}
              className={`py-3 px-4 rounded-xl font-semibold transition-all ${
                userType === "organiser"
                  ? "bg-green-600 text-white shadow-lg"
                  : "bg-gray-800 text-gray-400 hover:bg-gray-750"
              }`}
            >
              Organizer
            </button>
            <button
              type="button"
              onClick={() => setUserType("vendor")}
              className={`py-3 px-4 rounded-xl font-semibold transition-all ${
                userType === "vendor"
                  ? "bg-green-600 text-white shadow-lg"
                  : "bg-gray-800 text-gray-400 hover:bg-gray-750"
              }`}
            >
              Vendor
            </button>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-gray-300 font-semibold mb-2">
                  Username
                </label>
                <input
                  type="text"
                  name="username"
                  value={formData.username}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3 bg-gray-800 text-white border border-gray-700 rounded-xl focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent transition"
                  placeholder="Your username"
                />
              </div>

              <div>
                <label className="block text-gray-300 font-semibold mb-2">
                  Email
                </label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3 bg-gray-800 text-white border border-gray-700 rounded-xl focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent transition"
                  placeholder="you@example.com"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-gray-300 font-semibold mb-2">
                  Password
                </label>
                <input
                  type="password"
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3 bg-gray-800 text-white border border-gray-700 rounded-xl focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent transition"
                  placeholder="Min. 6 characters"
                />
              </div>

              <div>
                <label className="block text-gray-300 font-semibold mb-2">
                  Confirm Password
                </label>
                <input
                  type="password"
                  name="confirmPassword"
                  value={formData.confirmPassword}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3 bg-gray-800 text-white border border-gray-700 rounded-xl focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent transition"
                  placeholder="Confirm password"
                />
              </div>
            </div>

            <div>
              <label className="block text-gray-300 font-semibold mb-2">
                Phone Number
              </label>
              <input
                type="tel"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                required
                className="w-full px-4 py-3 bg-gray-800 text-white border border-gray-700 rounded-xl focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent transition"
                placeholder="+250 XXX XXX XXX"
              />
            </div>

            {userType === "organiser" && (
              <div>
                <label className="block text-gray-300 font-semibold mb-2">
                  Organisation Name
                </label>
                <input
                  type="text"
                  name="organisationName"
                  value={formData.organisationName}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3 bg-gray-800 text-white border border-gray-700 rounded-xl focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent transition"
                  placeholder="Your organisation name"
                />
              </div>
            )}

            {userType === "vendor" && (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-gray-300 font-semibold mb-2">
                    Company Name
                  </label>
                  <input
                    type="text"
                    name="companyName"
                    value={formData.companyName}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 bg-gray-800 text-white border border-gray-700 rounded-xl focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent transition"
                    placeholder="Your company name"
                  />
                </div>
                <div>
                  <label className="block text-gray-300 font-semibold mb-2">
                    Service Area
                  </label>
                  <input
                    type="text"
                    name="serviceArea"
                    value={formData.serviceArea}
                    onChange={handleChange}
                    className="w-full px-4 py-3 bg-gray-800 text-white border border-gray-700 rounded-xl focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent transition"
                    placeholder="e.g., Catering, Photography"
                  />
                </div>
              </div>
            )}

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
                  Creating account...
                </span>
              ) : (
                "Create Account"
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
                  Already have an account?
                </span>
              </div>
            </div>

            <div className="mt-6 text-center">
              <Link
                to="/login"
                className="inline-flex items-center justify-center w-full px-4 py-3 border-2 border-green-600 text-green-400 font-semibold rounded-xl hover:bg-green-600 hover:text-white transition-all"
              >
                Sign In
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Register;
