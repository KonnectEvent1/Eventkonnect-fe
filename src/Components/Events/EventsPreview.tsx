import React from "react";
import type { Event } from "../../Data/mockData";
import { events as sampleEvents } from "../../Data/mockData";

interface EventsPreviewProps {
  events?: Event[];
}

const EventsPreview: React.FC<EventsPreviewProps> = ({
  events = sampleEvents,
}) => {
  // Filter out events without required data for preview
  const validEvents = events.filter((event) => event.image && event.title);

  if (validEvents.length === 0) {
    return (
      <section className="bg-white py-20">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-4xl font-extrabold text-gray-900 mb-4">
            Upcoming Events
          </h2>
          <p className="text-gray-600 text-lg">
            No events scheduled at the moment. Check back soon!
          </p>
        </div>
      </section>
    );
  }

  return (
    <section className="bg-white py-20">
      <div className="container mx-auto px-4 text-center mb-12">
        <h2 className="text-4xl font-extrabold text-gray-900 mb-4">
          Upcoming Events
        </h2>
        <p className="text-gray-600 text-lg">
          Check out our latest events and join the excitement!
        </p>
      </div>

      <div className="container mx-auto px-4 grid gap-8 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
        {validEvents.map((event) => (
          <div
            key={event.id}
            className="bg-green-50 rounded-2xl shadow-lg overflow-hidden hover:shadow-2xl transition-transform transform hover:-translate-y-2"
          >
            <img
              src={event.image}
              alt={event.title}
              className="w-full h-48 object-cover"
              onError={(e) => {
                // Fallback if image fails to load
                e.currentTarget.src = "/images/event-placeholder.jpg";
              }}
            />
            <div className="p-6">
              <h3 className="text-xl font-bold text-gray-900 mb-2">
                {event.title}
              </h3>
              {event.date && <p className="text-gray-600 mb-2">{event.date}</p>}
              {event.location && (
                <p className="text-gray-500 text-sm mb-2">{event.location}</p>
              )}
              {event.price && (
                <p className="text-green-600 font-semibold mb-2">
                  ${event.price}
                </p>
              )}
              {event.description && (
                <p className="text-gray-600 text-sm mb-3 line-clamp-2">
                  {event.description}
                </p>
              )}
              <button className="mt-4 bg-green-600 text-white px-4 py-2 rounded-xl font-semibold shadow hover:bg-green-700 transition">
                Join Now
              </button>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default EventsPreview;
