// src/Pages/Dashboard.tsx
import React, { useEffect, useState } from "react";
import api from "../api"; // Axios instance
import Placeholder from "../Components/Placeholder";

interface EventSummary {
  id: string;
  title: string;
  date: string;
  budget: number;
}

const Dashboard: React.FC = () => {
  const [events, setEvents] = useState<EventSummary[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const response = await api.get("/events/all"); // Your backend API
        setEvents(response.data);
      } catch (err) {
        console.error(err);
        setError("Failed to load events. Please try again later.");
      } finally {
        setLoading(false);
      }
    };

    fetchEvents();
  }, []);

  if (loading)
    return (
      <Placeholder
        title="Loading Dashboard..."
        height="h-screen"
        bgColor="bg-gray-100"
      />
    );
  if (error)
    return (
      <Placeholder title={error} height="h-screen" bgColor="bg-gray-100" />
    );

  return (
    <div className="min-h-screen p-6 bg-gray-100">
      <h1 className="text-4xl font-bold mb-8 text-center text-green-600">
        Event Dashboard
      </h1>

      {events.length === 0 ? (
        <Placeholder
          title="No events found."
          height="h-64"
          bgColor="bg-gray-200"
        />
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {events.map((event) => (
            <div
              key={event.id}
              className="p-6 bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300"
            >
              <h2 className="text-2xl font-bold mb-2 text-green-600">
                {event.title}
              </h2>
              <p className="text-gray-700 mb-1">
                Date: {new Date(event.date).toLocaleDateString()}
              </p>
              <p className="text-gray-700 mb-3">
                Budget: {event.budget.toLocaleString()} RWF
              </p>
              <button className="w-full bg-green-600 text-white py-2 rounded-lg font-semibold hover:bg-green-700 transition-colors">
                View Details
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Dashboard;
