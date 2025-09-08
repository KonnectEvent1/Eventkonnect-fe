// src/Components/Hero/Hero.tsx
import React from "react";
import { Link } from "react-router-dom";
import { FaMobileAlt, FaStore, FaChartLine, FaQrcode } from "react-icons/fa";
import eventBackImg from "../Events/image/event-back.jpeg";
import bImg from "../Events/image/bimage.jpeg";

interface Feature {
  icon: React.ReactNode;
  title: string;
  desc: string;
  link: string;
}

const features: Feature[] = [
  {
    icon: <FaMobileAlt className="text-green-600 text-4xl mx-auto mb-3" />,
    title: "Mobile Payments",
    desc: "Seamlessly pay with MTN MoMo, Airtel Money, & M-Pesa.",
    link: "/payments",
  },
  {
    icon: <FaStore className="text-green-600 text-4xl mx-auto mb-3" />,
    title: "Vendor Marketplace",
    desc: "Find trusted vendors by category, location, and budget.",
    link: "/vendors",
  },
  {
    icon: <FaChartLine className="text-green-600 text-4xl mx-auto mb-3" />,
    title: "Event Dashboard",
    desc: "Track budgets, payments, and vendors all in one place.",
    link: "/dashboard",
  },
  {
    icon: <FaQrcode className="text-green-600 text-4xl mx-auto mb-3" />,
    title: "Smart Check-in",
    desc: "QR codes for fast and secure guest check-in.",
    link: "/checkin",
  },
];

const Hero: React.FC = () => {
  return (
    <header
      className="relative min-h-screen bg-cover bg-center flex flex-col justify-center"
      style={{ backgroundImage: `url(${eventBackImg})` }}
      aria-label="Hero section showcasing EventKonnect platform"
    >
      {/* Overlay */}
      <div className="absolute inset-0 bg-black/70"></div>

      {/* Main Content */}
      <div className="relative container mx-auto px-6 md:px-12 lg:px-24 flex flex-col-reverse md:flex-row items-center justify-between z-10">
        {/* Text Section */}
        <div className="md:w-1/2 text-center md:text-left">
          <h1 className="text-5xl md:text-6xl font-extrabold text-white mb-6 leading-tight drop-shadow-lg">
            <span className="text-green-400">Smart Event</span> Platform
          </h1>
          <p className="text-lg md:text-xl text-gray-200 mb-8 max-w-lg">
            EventKonnect makes event planning simple, modern, and connected.
            Discover vendors, manage budgets, accept mobile payments, and create
            unforgettable experiences all in one place.
          </p>

          {/* Explore & Create Buttons */}
          <div className="flex flex-col sm:flex-row justify-center md:justify-start gap-4">
            <Link to="/dashboard">
              <button className="bg-green-600 text-white px-6 py-3 rounded-xl font-semibold shadow-lg hover:bg-green-700 transition-transform transform hover:-translate-y-1 focus:ring-2 focus:ring-green-400 focus:outline-none">
                Explore Events
              </button>
            </Link>
            <Link to="/create-event">
              <button className="bg-white text-green-600 border border-green-600 px-6 py-3 rounded-xl font-semibold shadow-lg hover:bg-green-50 transition-transform transform hover:-translate-y-1 focus:ring-2 focus:ring-green-400 focus:outline-none">
                Create Your Event
              </button>
            </Link>
          </div>
        </div>

        {/* Hero Image */}
        <div className="md:w-1/2 mb-12 md:mb-0">
          <img
            src={bImg}
            alt="People celebrating at an event"
            className="rounded-3xl shadow-2xl mx-auto md:mx-0 transform hover:scale-105 transition-transform duration-500"
          />
        </div>
      </div>

      {/* Feature Cards */}
      <div className="container mx-auto px-6 md:px-12 lg:px-24 mt-20 grid md:grid-cols-4 gap-6 text-center relative z-10">
        {features.map(({ icon, title, desc, link }, index) => (
          <Link
            key={index}
            to={link}
            className="p-6 bg-white/95 rounded-2xl shadow-lg hover:shadow-2xl transition-transform hover:-translate-y-2 block"
          >
            {icon}
            <h3 className="font-bold text-lg mb-1 text-gray-900">{title}</h3>
            <p className="text-gray-600 text-sm">{desc}</p>
          </Link>
        ))}
      </div>
    </header>
  );
};

export default Hero;
