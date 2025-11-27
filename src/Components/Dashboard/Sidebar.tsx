import React, { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { 
  FiHome, 
  FiCalendar, 
  FiPlus, 
  FiUsers, 
  FiCreditCard,
  FiShoppingBag,
  FiLogOut,
  FiMenu,
  FiX
} from "react-icons/fi";
import AuthService from "../../services/auth.service";

const Sidebar: React.FC = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [isOpen, setIsOpen] = useState(false);
  const user = AuthService.getCurrentUser();

  const handleLogout = () => {
    AuthService.logout();
    navigate("/login");
  };

  const navItems = [
    { path: "/dashboard", icon: FiHome, label: "Dashboard", roles: ["all"] },
    { path: "/explore-events", icon: FiCalendar, label: "Explore Events", roles: ["all"] },
    { path: "/create-event", icon: FiPlus, label: "Create Event", roles: ["organiser", "organizer"] },
    { path: "/vendors", icon: FiShoppingBag, label: "Vendors", roles: ["all"] },
    { path: "/payments", icon: FiCreditCard, label: "Payments", roles: ["organiser", "organizer"] },
    { path: "/checkin", icon: FiUsers, label: "Check-In", roles: ["organiser", "organizer"] },
  ];

  const isActive = (path: string) => location.pathname === path;

  // Filter nav items based on user role
  const filteredNavItems = navItems.filter(item => {
    if (item.roles.includes("all")) return true;
    return item.roles.includes(user?.role?.toLowerCase() || "");
  });

  return (
    <>
      {/* Mobile Menu Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="lg:hidden fixed top-4 left-4 z-50 p-2 bg-gray-900 text-white rounded-lg"
      >
        {isOpen ? <FiX size={24} /> : <FiMenu size={24} />}
      </button>

      {/* Overlay for mobile */}
      {isOpen && (
        <div
          className="lg:hidden fixed inset-0 bg-black bg-opacity-50 z-30"
          onClick={() => setIsOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside
        className={`
          fixed lg:sticky top-0 left-0 h-screen w-64 
          bg-gradient-to-b from-gray-900 via-gray-800 to-gray-900
          text-white flex flex-col z-40
          transition-transform duration-300 ease-in-out
          ${isOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"}
        `}
      >
        {/* Logo */}
        <div className="p-6 border-b border-gray-700">
          <Link to="/" className="flex items-center space-x-2">
            <div className="w-10 h-10 bg-gradient-to-br from-green-400 to-green-600 rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-xl">EK</span>
            </div>
            <div>
              <h2 className="text-xl font-bold text-white">EventKonnect</h2>
              <p className="text-xs text-gray-400">Event Management</p>
            </div>
          </Link>
        </div>

        {/* User Info */}
        {user && (
          <div className="p-4 border-b border-gray-700">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-green-600 rounded-full flex items-center justify-center">
                <span className="text-white font-semibold text-sm">
                  {user.username?.charAt(0).toUpperCase()}
                </span>
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-semibold text-white truncate">
                  {user.username}
                </p>
                <p className="text-xs text-gray-400 truncate">{user.role}</p>
              </div>
            </div>
          </div>
        )}

        {/* Navigation */}
        <nav className="flex-1 p-4 space-y-2 overflow-y-auto">
          {filteredNavItems.map((item) => (
            <Link
              key={item.path}
              to={item.path}
              onClick={() => setIsOpen(false)}
              className={`
                flex items-center space-x-3 px-4 py-3 rounded-lg
                transition-all duration-200
                ${
                  isActive(item.path)
                    ? "bg-green-600 text-white shadow-lg"
                    : "text-gray-300 hover:bg-gray-800 hover:text-white"
                }
              `}
            >
              <item.icon size={20} />
              <span className="font-medium">{item.label}</span>
            </Link>
          ))}
        </nav>

        {/* Logout Button */}
        <div className="p-4 border-t border-gray-700">
          <button
            onClick={handleLogout}
            className="w-full flex items-center space-x-3 px-4 py-3 rounded-lg
                     text-gray-300 hover:bg-red-600 hover:text-white
                     transition-all duration-200"
          >
            <FiLogOut size={20} />
            <span className="font-medium">Logout</span>
          </button>
        </div>
      </aside>
    </>
  );
};

export default Sidebar;
