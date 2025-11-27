import React from "react";
import { Navigate } from "react-router-dom";
import AuthService from "../services/auth.service";

interface ProtectedRouteProps {
  children: React.ReactNode;
  allowedRoles?: string[];
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({
  children,
  allowedRoles = [],
}) => {
  const isLoggedIn = AuthService.isLoggedIn();
  const currentUser = AuthService.getCurrentUser();

  console.log("=== PROTECTED ROUTE CHECK ===");
  console.log("Is logged in:", isLoggedIn);
  console.log("Current user:", currentUser);
  console.log("Token exists:", !!localStorage.getItem("accessToken"));
  console.log("User exists:", !!localStorage.getItem("user"));
  console.log("Allowed roles:", allowedRoles);

  if (!isLoggedIn) {
    console.log("❌ Not logged in, redirecting to /login");
    return <Navigate to="/login" replace />;
  }

  if (
    allowedRoles.length > 0 &&
    currentUser &&
    !allowedRoles.includes(currentUser.role)
  ) {
    console.log("❌ User role not allowed, showing 403");
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-black via-gray-900 to-red-900">
        <h1 className="text-4xl font-bold text-white mb-4">403 - Unauthorized</h1>
        <p className="text-gray-400 mb-8">
          You don't have permission to access this page.
        </p>
        <button
          onClick={() => window.history.back()}
          className="px-6 py-3 bg-red-600 text-white rounded-xl font-semibold hover:bg-red-700 transition-all"
        >
          Go Back
        </button>
      </div>
    );
  }

  console.log("✅ Access granted");
  return <>{children}</>;
};

export default ProtectedRoute;
