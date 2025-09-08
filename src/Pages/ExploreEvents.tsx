import React, { useEffect, useState } from "react";
import api from "../api"; // Axios instance
import Placeholder from "../Components/Placeholder";

interface Event {
  id: string;
  title: string;
  date: string;
  price: number;
}

const ExploreEvents: React.FC = () => {
  const [events, setEvents] = useState<Event[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const res = await api.get("/events/all");
        setEvents(res.data);
      } catch (err) {
        console.error(err);
        setError("Failed to load events.");
      } finally {
        setLoading(false);
      }
    };
    fetchEvents();
  }, []);

  if (loading)
    return <Placeholder title="Loading Events..." height="h-screen" />;
  if (error) return <Placeholder title={error} height="h-screen" />;

  return (
    <div className="min-h-screen bg-black text-white p-6">
      <h1 className="text-4xl font-bold text-green-400 mb-8 text-center">
        Explore Events
      </h1>
      {events.length === 0 ? (
        <Placeholder
          title="No events available"
          height="h-64"
          bgColor="bg-gray-900"
        />
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {events.map((event) => (
            <div
              key={event.id}
              className="bg-gray-900 p-6 rounded-xl shadow-xl hover:shadow-2xl"
            >
              <h2 className="text-2xl font-semibold mb-2 text-green-300">
                {event.title}
              </h2>
              <p className="mb-2 text-gray-300">Date: {event.date}</p>
              <p className="mb-4 text-gray-300">Price: ${event.price}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default ExploreEvents;
