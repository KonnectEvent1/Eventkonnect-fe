import React from "react";
import { Link, useLocation } from "react-router-dom";

const Navbar: React.FC = () => {
  const location = useLocation();

  // Determine if the current route is the hero section ("/")
  const isHeroSection = location.pathname === "/";

  return (
    <nav
      className={`px-6 py-4 flex items-center fixed w-full z-50 ${
        isHeroSection
          ? "bg-black/80 backdrop-blur-sm text-green-500" // Green text for the hero section
          : "bg-black/80 backdrop-blur-sm text-green-500" // Green text for other pages
      }`}
    >
      {/* Left Section: Logo */}
      <div className="flex items-center">
        <h1 className="text-2xl font-bold text-green-400">EventKonnect</h1>
      </div>

      {/* Center Section: Links */}
      <div className="flex gap-8 justify-center flex-1">
        <Link to="/" className="text-green-500 hover:underline font-extrabold">
          Home
        </Link>
        <Link to="/dashboard" className="text-green-500 hover:underline font-extrabold">
          Dashboard
        </Link>
        <Link to="/vendors" className="text-green-500 hover:underline font-extrabold">
          Vendors
        </Link>
        <Link to="/payments" className="text-green-500 hover:underline font-extrabold">
          Payments
        </Link>
      </div>

      {/* Right Section: Login Button */}
      <div className="flex items-center gap-4">
        <Link
          to="/register"
          className="bg-green-500 px-4 py-2 rounded-lg text-white hover:bg-green-600 transition font-extrabold"
        >
          Sign Up
        </Link>

        <Link
          to="/login"
          className="bg-green-500 px-4 py-2 rounded-lg text-white hover:bg-green-600 transition font-extrabold"
        >
          Login
        </Link>
      </div>
    </nav>
  );
};

export default Navbar;
