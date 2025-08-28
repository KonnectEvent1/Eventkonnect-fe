import React from "react";

const Hero: React.FC = () => {
  return (
    <section className="relative bg-gradient-to-br from-green-50 to-green-100 overflow-hidden">
      {/* Floating blobs */}
      <div className="absolute top-0 left-0 w-72 h-72 bg-green-200 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-blob"></div>
      <div className="absolute bottom-0 right-0 w-72 h-72 bg-green-300 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-blob animation-delay-2000"></div>

      <div className="container mx-auto px-4 py-28 flex flex-col-reverse md:flex-row items-center justify-between">
        {/* Text */}
        <div className="text-center md:text-left md:w-1/2 z-10">
          <h1 className="text-5xl md:text-6xl font-extrabold text-gray-900 mb-6 leading-tight">
            Connect, <span className="text-green-600">Create</span> & Celebrate
            Events
          </h1>
          <p className="text-lg md:text-xl text-gray-700 mb-8">
            Rwanda’s premier event management platform. Discover events, join
            your community, and make memories.
          </p>
          <div className="flex flex-col sm:flex-row justify-center md:justify-start gap-4">
            <button className="bg-green-600 text-white px-6 py-3 rounded-xl font-semibold shadow-lg hover:bg-green-700 transition-all transform hover:-translate-y-1">
              Explore Events
            </button>
            <button className="bg-white text-green-600 border border-green-600 px-6 py-3 rounded-xl font-semibold shadow-lg hover:bg-green-50 transition-all transform hover:-translate-y-1">
              Create Event
            </button>
          </div>
        </div>

        {/* Hero Image */}
        <div className="md:w-1/2 mb-12 md:mb-0 z-10">
          <img
            src="https://images.unsplash.com/photo-1551836022-d5d88e9218df?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80"
            alt="Events"
            className="rounded-3xl shadow-2xl mx-auto md:mx-0 transform hover:scale-105 transition-transform duration-500"
          />
        </div>
      </div>

      {/* Features */}
      <div className="container mx-auto px-4 mt-16 grid md:grid-cols-3 gap-6 text-center z-10 relative">
        <div className="p-6 bg-white rounded-2xl shadow-lg hover:shadow-2xl transition transform hover:-translate-y-2">
          <span className="text-4xl mb-2 block">👥</span>
          <h3 className="font-bold text-lg mb-1">Connect</h3>
          <p className="text-gray-600 text-sm">
            Meet like-minded people at exciting events.
          </p>
        </div>
        <div className="p-6 bg-white rounded-2xl shadow-lg hover:shadow-2xl transition transform hover:-translate-y-2">
          <span className="text-4xl mb-2 block">📅</span>
          <h3 className="font-bold text-lg mb-1">Organize</h3>
          <p className="text-gray-600 text-sm">
            Create events with our easy-to-use tools.
          </p>
        </div>
        <div className="p-6 bg-white rounded-2xl shadow-lg hover:shadow-2xl transition transform hover:-translate-y-2">
          <span className="text-4xl mb-2 block">🎉</span>
          <h3 className="font-bold text-lg mb-1">Celebrate</h3>
          <p className="text-gray-600 text-sm">
            Enjoy memorable experiences with your community.
          </p>
        </div>
      </div>

      {/* Tailwind Animations */}
      <style>
        {`
          @keyframes blob {
            0%, 100% { transform: translate(0px, 0px) scale(1); }
            33% { transform: translate(30px, -50px) scale(1.1); }
            66% { transform: translate(-20px, 20px) scale(0.9); }
          }
          .animate-blob {
            animation: blob 7s infinite;
          }
          .animation-delay-2000 {
            animation-delay: 2s;
          }
        `}
      </style>
    </section>
  );
};

export default Hero;
