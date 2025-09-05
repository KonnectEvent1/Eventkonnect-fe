import React from "react";
import {
  FaFacebookF,
  FaTwitter,
  FaInstagram,
  FaLinkedinIn,
} from "react-icons/fa";

const Footer: React.FC = () => {
  return (
<<<<<<< HEAD
    <footer className="bg-gray-900 text-white py-12">
      <div className="container mx-auto px-4 text-center">
<<<<<<< HEAD
        <p>&copy; 2025 EventKonnect. All rights reserved.</p>
=======
        <p>&copy; 2023 EventKonnect. All rights reserved.</p>
>>>>>>> daef4dd (setup project)
=======
    <footer className="bg-gradient-to-br from-gray-900 via-gray-950 to-black text-gray-300">
      {/* Container */}
      <div className="max-w-7xl mx-auto px-6 lg:px-12 py-16 grid gap-12 md:grid-cols-4">
        {/* Brand */}
        <div>
          <h2 className="text-2xl font-extrabold text-white">EventKonnect</h2>
          <p className="mt-4 text-sm leading-relaxed text-gray-400">
            Discover, create, and celebrate unforgettable events — all in one
            platform.
          </p>
          <div className="flex space-x-4 mt-6">
            <a
              href="#"
              className="p-2 bg-gray-800 hover:bg-green-600 rounded-full transition-colors"
            >
              <FaFacebookF />
            </a>
            <a
              href="#"
              className="p-2 bg-gray-800 hover:bg-green-600 rounded-full transition-colors"
            >
              <FaTwitter />
            </a>
            <a
              href="#"
              className="p-2 bg-gray-800 hover:bg-green-600 rounded-full transition-colors"
            >
              <FaInstagram />
            </a>
            <a
              href="#"
              className="p-2 bg-gray-800 hover:bg-green-600 rounded-full transition-colors"
            >
              <FaLinkedinIn />
            </a>
          </div>
        </div>

        {/* Quick Links */}
        <div>
          <h3 className="text-lg font-semibold text-white mb-4">Quick Links</h3>
          <ul className="space-y-3 text-sm">
            <li>
              <a href="#" className="hover:text-green-500 transition-colors">
                Home
              </a>
            </li>
            <li>
              <a href="#" className="hover:text-green-500 transition-colors">
                Events
              </a>
            </li>
            <li>
              <a href="#" className="hover:text-green-500 transition-colors">
                Create Event
              </a>
            </li>
            <li>
              <a href="#" className="hover:text-green-500 transition-colors">
                About Us
              </a>
            </li>
          </ul>
        </div>

        {/* Resources */}
        <div>
          <h3 className="text-lg font-semibold text-white mb-4">Resources</h3>
          <ul className="space-y-3 text-sm">
            <li>
              <a href="#" className="hover:text-green-500 transition-colors">
                Blog
              </a>
            </li>
            <li>
              <a href="#" className="hover:text-green-500 transition-colors">
                FAQ
              </a>
            </li>
            <li>
              <a href="#" className="hover:text-green-500 transition-colors">
                Support
              </a>
            </li>
            <li>
              <a href="#" className="hover:text-green-500 transition-colors">
                Privacy Policy
              </a>
            </li>
          </ul>
        </div>

        {/* Contact */}
        <div>
          <h3 className="text-lg font-semibold text-white mb-4">
            Get in Touch
          </h3>
          <p className="text-sm text-gray-400">📍 Kigali, Rwanda</p>
          <p className="text-sm text-gray-400">📞 +250 798 668 103</p>
          <p className="text-sm text-gray-400">✉️ eventkonnect1@gmail.com</p>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-gray-800 py-6 text-center text-sm text-gray-500">
        &copy; {new Date().getFullYear()}{" "}
        <span className="text-white font-semibold">EventKonnect</span>. All
        rights reserved.
>>>>>>> a4554a8 (fixed some errors)
      </div>
    </footer>
  );
};

export default Footer;
