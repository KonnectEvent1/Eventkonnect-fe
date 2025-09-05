import React from "react";

import bridalShowerImg from "./image/bridal shower image.jpeg";
import corporateImg from "./image/corporate.jpeg";
import weddingImg from "./image/wedding image.jpeg";
import happyBirtdayImg from "./image/HappyBirthday image.jpeg";
import otherImg from "./image/other image.jpeg";

const events = [
  {
    id: 1,
    title: "Bridal Shower",
    description: "Celebrate love and friendship beautifully.",
    image: bridalShowerImg,
  },
  {
    id: 2,
    title: "Birthday Party",
    description: "Make birthdays unforgettable with fun and memories.",
    image: happyBirtdayImg,
  },
  {
    id: 3,
    title: "Wedding",
    description: "Turn your dream wedding into reality with elegance.",
    image: weddingImg,
  },
  {
    id: 4,
    title: "Corporate Events",
    description: "Professional planning for meetings and conferences.",
    image: corporateImg,
  },
  {
    id: 5,
    title: "Other Celebrations",
    description: "From baby showers to anniversaries, we bring events to life.",
    image: otherImg,
  },
];

const Events: React.FC = () => {
  return (
    <section className="bg-gray-50 py-24">
      <div className="container mx-auto px-6 text-center mb-16">
        <h2 className="text-4xl font-extrabold text-gray-900 mb-4">
          Events We Organize
        </h2>
        <p className="text-gray-600 text-lg">
          From intimate gatherings to grand celebrations — we’ve got you
          covered.
        </p>
      </div>

      <div className="container mx-auto px-6 grid gap-8 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
        {events.map((event) => (
          <div
            key={event.id}
            className="bg-white rounded-3xl shadow-lg overflow-hidden hover:shadow-2xl transition-transform transform hover:-translate-y-2"
          >
            <img
              src={event.image}
              alt={event.title}
              className="w-full h-64 object-cover"
            />
            <div className="p-6 text-left">
              <h3 className="text-xl font-bold text-gray-900 mb-2">
                {event.title}
              </h3>
              <p className="text-gray-600 mb-4">{event.description}</p>
              <button className="mt-2 bg-green-600 text-white px-4 py-2 rounded-xl font-semibold shadow hover:bg-green-700 transition">
                Learn More
              </button>
            </div>
          </div>
        ))}


const Events: React.FC = () => {
  return (
    <section className="py-16 bg-gray-50">
      <div className="container mx-auto px-4">
        <h3 className="text-3xl font-bold text-center text-gray-900 mb-12">
          Upcoming Events
        </h3>
        {/* Events will be added here */}

      </div>
    </section>
  );
};

export default Events;
