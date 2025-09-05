import React from "react";
import eventBackImg from "../Events/image/event-back.jpeg"; // Correct path

const Hero: React.FC = () => {
  return (
    <section
      className="relative min-h-screen bg-cover bg-center flex flex-col justify-center"
      style={{ backgroundImage: `url(${eventBackImg})` }}
    >
      {/* Dark overlay */}
      <div className="absolute inset-0 bg-black bg-opacity-60"></div>

      {/* Content */}
      <div className="relative container mx-auto px-6 md:px-12 lg:px-24 flex flex-col-reverse md:flex-row items-center justify-between z-10">
        {/* Text */}
        <div className="md:w-1/2 text-center md:text-left">
          <h1 className="text-5xl md:text-6xl font-extrabold text-white mb-6 leading-tight">
            Connect, <span className="text-green-400">Create</span> & Celebrate
            Events
          </h1>
          <p className="text-lg md:text-xl text-gray-200 mb-8">
            Rwanda’s premier event platform. Discover events, join your
            community, and make unforgettable memories.
          </p>
          <div className="flex flex-col sm:flex-row justify-center md:justify-start gap-4">
            <button className="bg-green-600 text-white px-6 py-3 rounded-xl font-semibold shadow-lg hover:bg-green-700 transition-transform transform hover:-translate-y-1">
              Explore Events
            </button>
            <button className="bg-white text-green-600 border border-green-600 px-6 py-3 rounded-xl font-semibold shadow-lg hover:bg-green-50 transition-transform transform hover:-translate-y-1">
              Create Event
            </button>
          </div>
        </div>

        {/* Hero Image */}
        <div className="md:w-1/2 mb-12 md:mb-0">
          <img
            src="https://images.unsplash.com/photo-1551836022-d5d88e9218df?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80"
            alt="Events"
            className="rounded-3xl shadow-2xl mx-auto md:mx-0 transform hover:scale-105 transition-transform duration-500"
          />
        </div>
      </div>

      {/* Features */}
      <div className="container mx-auto px-6 md:px-12 lg:px-24 mt-16 grid md:grid-cols-3 gap-6 text-center relative z-10">
        {[
          {
            icon: "👥",
            title: "Connect",
            desc: "Meet like-minded people at exciting events.",
          },
          {
            icon: "📅",
            title: "Organize",
            desc: "Create events easily with intuitive tools.",
          },
          {
            icon: "🎉",
            title: "Celebrate",
            desc: "Enjoy memorable experiences with your community.",
          },
        ].map((feature, i) => (
          <div
            key={i}
            className="p-6 bg-white bg-opacity-90 rounded-2xl shadow-lg hover:shadow-2xl transition transform hover:-translate-y-2"
          >
            <span className="text-4xl mb-2 block">{feature.icon}</span>
            <h3 className="font-bold text-lg mb-1">{feature.title}</h3>
            <p className="text-gray-600 text-sm">{feature.desc}</p>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Hero;
