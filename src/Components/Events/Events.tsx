import React from "react";
import { events } from "../../Data/mockData";

const Events: React.FC = () => {
  return (
    <section className="bg-gray-50 py-24">
      <div className="container mx-auto px-6 text-center mb-16">
        <h2 className="text-4xl font-extrabold text-gray-900 mb-4">
          Events We Organize
        </h2>
        <p className="text-gray-600 text-lg">
          From intimate gatherings to grand celebrations — we've got you
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
      </div>
    </section>
  );
};

export default Events;
