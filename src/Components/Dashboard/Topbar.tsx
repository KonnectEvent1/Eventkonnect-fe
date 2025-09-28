import React from "react";

const Topbar: React.FC = () => {
  return (
    <header className="bg-white shadow-md px-6 py-4 flex justify-between items-center">
      <h1 className="font-bold text-xl text-gray-800">Dashboard</h1>
      {/* Add profile, notifications, etc. */}
    </header>
  );
};

export default Topbar;
