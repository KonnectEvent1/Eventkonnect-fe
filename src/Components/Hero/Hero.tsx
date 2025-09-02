import React from "react";

const Hero: React.FC = () => {
  return (
    <section className="bg-gradient-to-br from-green-50 to-green-100 py-20">
      <div className="container mx-auto px-4 text-center">
        <h2 className="text-4xl font-bold text-gray-900 mb-4">
          Connect, Create & Celebrate Events
        </h2>
        <p className="text-lg text-gray-700 mb-8">
          Rwanda's premier event management platform
        </p>
      </div>
    </section>
  );
};

export default Hero;
