import React from "react";
import { Link } from "react-router-dom";

const Sidebar: React.FC = () => {
  return (
    <aside className="w-64 bg-gray-800 flex flex-col p-6">
      <h2 className="text-2xl font-bold mb-6">EventKonnect</h2>
      <nav className="flex flex-col gap-4">
        <Link to="/dashboard" className="hover:text-green-400">
          Dashboard
        </Link>
        <Link to="/events" className="hover:text-green-400">
          Explore Events
        </Link>
        <Link to="/create-event" className="hover:text-green-400">
          Create Event
        </Link>
        <Link to="/vendors" className="hover:text-green-400">
          Vendors
        </Link>
        <Link to="/payments" className="hover:text-green-400">
          payments
        </Link>
        <Link to="/login" className="hover:text-green-400">
          login
        </Link>
      </nav>
    </aside>
  );
};

export default Sidebar;
