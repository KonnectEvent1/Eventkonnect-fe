import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-hot-toast";
import EventService from "../services/event.service";
import type { Event } from "../Types";

const ExploreEvents: React.FC = () => {
  const [events, setEvents] = useState<Event[]>([]);
  const [loading, setLoading] = useState(true);
  const [registering, setRegistering] = useState<string | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    fetchEvents();
  }, []);

  const fetchEvents = async () => {
    try {
      const response = await EventService.getAllEvents();
      setEvents(response.data || []);
    } catch (err) {
      console.error(err);
      toast.error("Failed to load events");
    } finally {
      setLoading(false);
    }
  };

  const handleRSVP = async (eventId: string) => {
    setRegistering(eventId);
    try {
      await EventService.registerForEvent(eventId);
      toast.success("Successfully registered for event!");
      fetchEvents();
    } catch (err) {
      const error = err as { error?: string };
      if (error?.error === "Unauthorized") {
        toast.error("Please login to register for events");
        navigate("/login");
      } else {
        toast.error(error?.error || "Failed to register for event");
      }
    } finally {
      setRegistering(null);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-black via-gray-900 to-green-900 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-green-500 mx-auto"></div>
          <p className="text-white mt-4">Loading events...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-black via-gray-900 to-green-900">
      {/* Header */}
      <div className="bg-black bg-opacity-50 border-b border-gray-800">
        <div className="container mx-auto px-4 py-16 text-center">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-4">
            Explore <span className="text-green-500">Events</span>
          </h1>
          <p className="text-gray-300 text-lg md:text-xl max-w-2xl mx-auto">
            Discover amazing events happening near you
          </p>
        </div>
      </div>

      {/* Events Grid */}
      <div className="container mx-auto px-4 py-12">
        {events.length === 0 ? (
          <div className="text-center py-20">
            <div className="text-6xl mb-4">🎉</div>
            <h3 className="text-2xl font-bold text-white mb-2">
              No events available yet
            </h3>
            <p className="text-gray-400">Check back soon for upcoming events!</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
            {events.map((event) => (
              <div
                key={event.id}
                className="bg-gray-900 bg-opacity-80 backdrop-blur-sm rounded-2xl overflow-hidden shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 border border-gray-800"
              >
                {/* Event Image */}
                <div className="relative h-48 bg-gradient-to-br from-green-900 to-gray-900 overflow-hidden">
                  {event.images && event.images[0] ? (
                    <img
                      src={event.images[0].url}
                      alt={event.title}
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center">
                      <span className="text-6xl">🎪</span>
                    </div>
                  )}
                  <div className="absolute top-4 right-4">
                    <span
                      className={`px-3 py-1 rounded-full text-xs font-semibold ${
                        event.status === "active"
                          ? "bg-green-500 text-white"
                          : event.status === "completed"
                          ? "bg-gray-500 text-white"
                          : "bg-yellow-500 text-black"
                      }`}
                    >
                      {event.status.toUpperCase()}
                    </span>
                  </div>
                </div>

                {/* Event Content */}
                <div className="p-6">
                  <h3 className="text-xl font-bold text-white mb-2 line-clamp-2">
                    {event.title}
                  </h3>

                  {event.description && (
                    <p className="text-gray-400 text-sm mb-4 line-clamp-2">
                      {event.description}
                    </p>
                  )}

                  <div className="space-y-2 mb-4">
                    <div className="flex items-center text-gray-300 text-sm">
                      <svg
                        className="w-5 h-5 mr-2 text-green-500"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                        />
                      </svg>
                      {new Date(event.date).toLocaleDateString("en-US", {
                        weekday: "long",
                        year: "numeric",
                        month: "long",
                        day: "numeric",
                      })}
                    </div>

                    <div className="flex items-center text-gray-300 text-sm">
                      <svg
                        className="w-5 h-5 mr-2 text-green-500"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                        />
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                        />
                      </svg>
                      {event.location}
                    </div>

                    <div className="flex items-center text-gray-300 text-sm">
                      <svg
                        className="w-5 h-5 mr-2 text-green-500"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                        />
                      </svg>
                      Budget: RWF {event.budget.toLocaleString()}
                    </div>

                    {event.attendees && event.attendees.length > 0 && (
                      <div className="flex items-center text-gray-300 text-sm">
                        <svg
                          className="w-5 h-5 mr-2 text-green-500"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"
                          />
                        </svg>
                        {event.attendees.length} Attendees
                      </div>
                    )}
                  </div>

                  <button
                    onClick={() => handleRSVP(event.id)}
                    disabled={
                      registering === event.id || event.status !== "active"
                    }
                    className={`w-full py-3 rounded-xl font-semibold transition-all ${
                      event.status !== "active"
                        ? "bg-gray-700 text-gray-400 cursor-not-allowed"
                        : registering === event.id
                        ? "bg-green-700 text-white cursor-wait"
                        : "bg-gradient-to-r from-green-600 to-green-700 text-white hover:from-green-700 hover:to-green-800 shadow-lg hover:shadow-xl"
                    }`}
                  >
                    {registering === event.id
                      ? "Registering..."
                      : event.status !== "active"
                      ? "Event Not Available"
                      : "Register Now"}
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default ExploreEvents;
