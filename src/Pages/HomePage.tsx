import React from "react";
import Placeholder from "../Components/Placeholder";

const HomePage: React.FC = () => {
  return (
    <div className="min-h-screen bg-white">
      <Placeholder
        title="Header Component"
        height="h-20"
        bgColor="bg-blue-50"
      />
      <main>
        <Placeholder title="Hero Section" bgColor="bg-green-50" />
        <Placeholder title="Features Section" bgColor="bg-white" />
        <Placeholder title="Events Section" bgColor="bg-gray-50" />
        <Placeholder title="Testimonials Section" bgColor="bg-white" />
      </main>
      <Placeholder
        title="Footer Component"
        height="h-32"
        bgColor="bg-gray-900"
      />
    </div>
  );
};

export default HomePage;
