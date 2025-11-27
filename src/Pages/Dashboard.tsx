import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-hot-toast";
import DashboardLayout from "../Components/Dashboard/DashboardLayout";
import EventService from "../services/event.service";
import type { Event } from "../Types";
import { 
  FiCalendar, 
  FiUsers, 
  FiDollarSign, 
  FiTrendingUp,
  FiClock,
  FiMapPin,
  FiCheckCircle,
  FiShoppingBag,
  FiStar
} from "react-icons/fi";

const Dashboard: React.FC = () => {
  const [events, setEvents] = useState<Event[]>([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem("user") || "{}");
  const userRole = user.role?.toLowerCase();

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

  if (loading) {
    return (
      <DashboardLayout>
        <div className="flex items-center justify-center h-full">
          <div className="text-center">
            <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-green-500 mx-auto"></div>
            <p className="text-gray-600 mt-4">Loading dashboard...</p>
          </div>
        </div>
      </DashboardLayout>
    );
  }

  // Render different dashboards based on role
  if (userRole === "organiser" || userRole === "organizer") {
    return <OrganizerDashboard events={events} user={user} navigate={navigate} />;
  } else if (userRole === "vendor") {
    return <VendorDashboard events={events} user={user} navigate={navigate} />;
  } else {
    return <AttendeeDashboard events={events} user={user} navigate={navigate} />;
  }
};

// ===========================
// ORGANIZER DASHBOARD
// ===========================
const OrganizerDashboard: React.FC<{ events: Event[]; user: any; navigate: any }> = ({ events, user, navigate }) => {
  const totalEvents = events.length;
  const activeEvents = events.filter(e => e.status === "active").length;
  const totalBudget = events.reduce((sum, event) => sum + (event.budget || 0), 0);
  const totalAttendees = events.reduce((sum, event) => sum + (event.attendees?.length || 0), 0);

  const upcomingEvents = events
    .filter(e => new Date(e.date) > new Date() && e.status === "active")
    .sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime())
    .slice(0, 5);

  const recentEvents = events
    .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())
    .slice(0, 6);

  return (
    <DashboardLayout>
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-800">
          Welcome back, {user.username}! 👋
        </h1>
        <p className="text-gray-600 mt-2">
          Manage your events and track attendees
        </p>
      </div>

      {/* Statistics Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <div className="bg-gradient-to-br from-blue-500 to-blue-600 rounded-2xl p-6 text-white shadow-lg hover:shadow-xl transition-shadow">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-blue-100 text-sm font-medium">My Events</p>
              <h3 className="text-3xl font-bold mt-2">{totalEvents}</h3>
              <p className="text-blue-100 text-xs mt-1">{activeEvents} active</p>
            </div>
            <div className="w-12 h-12 bg-white bg-opacity-20 rounded-lg flex items-center justify-center">
              <FiCalendar size={24} />
            </div>
          </div>
        </div>

        <div className="bg-gradient-to-br from-green-500 to-green-600 rounded-2xl p-6 text-white shadow-lg hover:shadow-xl transition-shadow">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-green-100 text-sm font-medium">Total Attendees</p>
              <h3 className="text-3xl font-bold mt-2">{totalAttendees}</h3>
              <p className="text-green-100 text-xs mt-1">Across all events</p>
            </div>
            <div className="w-12 h-12 bg-white bg-opacity-20 rounded-lg flex items-center justify-center">
              <FiUsers size={24} />
            </div>
          </div>
        </div>

        <div className="bg-gradient-to-br from-purple-500 to-purple-600 rounded-2xl p-6 text-white shadow-lg hover:shadow-xl transition-shadow">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-purple-100 text-sm font-medium">Total Budget</p>
              <h3 className="text-3xl font-bold mt-2">
                {(totalBudget / 1000000).toFixed(1)}M
              </h3>
              <p className="text-purple-100 text-xs mt-1">RWF</p>
            </div>
            <div className="w-12 h-12 bg-white bg-opacity-20 rounded-lg flex items-center justify-center">
              <FiDollarSign size={24} />
            </div>
          </div>
        </div>

        <div className="bg-gradient-to-br from-orange-500 to-orange-600 rounded-2xl p-6 text-white shadow-lg hover:shadow-xl transition-shadow">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-orange-100 text-sm font-medium">Upcoming</p>
              <h3 className="text-3xl font-bold mt-2">{upcomingEvents.length}</h3>
              <p className="text-orange-100 text-xs mt-1">Events scheduled</p>
            </div>
            <div className="w-12 h-12 bg-white bg-opacity-20 rounded-lg flex items-center justify-center">
              <FiTrendingUp size={24} />
            </div>
          </div>
        </div>
      </div>

      {/* Quick Actions & Upcoming Events */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
        <div className="lg:col-span-2 bg-white rounded-2xl shadow-lg p-6">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-bold text-gray-800">Upcoming Events</h2>
            <button
              onClick={() => navigate("/explore-events")}
              className="text-green-600 hover:text-green-700 font-medium text-sm"
            >
              View All →
            </button>
          </div>

          {upcomingEvents.length === 0 ? (
            <div className="text-center py-12">
              <FiCalendar size={48} className="mx-auto text-gray-300 mb-4" />
              <p className="text-gray-500 mb-4">No upcoming events</p>
              <button
                onClick={() => navigate("/create-event")}
                className="px-6 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition"
              >
                Create Your First Event
              </button>
            </div>
          ) : (
            <div className="space-y-4">
              {upcomingEvents.map((event) => (
                <div
                  key={event.id}
                  className="flex items-center justify-between p-4 bg-gray-50 rounded-xl hover:bg-gray-100 transition cursor-pointer"
                  onClick={() => navigate(`/events/${event.id}`)}
                >
                  <div className="flex items-center space-x-4 flex-1">
                    <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
                      <FiCalendar className="text-green-600" size={20} />
                    </div>
                    <div className="flex-1">
                      <h3 className="font-semibold text-gray-800">{event.title}</h3>
                      <div className="flex items-center space-x-4 mt-1 text-sm text-gray-500">
                        <span className="flex items-center">
                          <FiClock size={14} className="mr-1" />
                          {new Date(event.date).toLocaleDateString()}
                        </span>
                        <span className="flex items-center">
                          <FiMapPin size={14} className="mr-1" />
                          {event.location}
                        </span>
                        <span className="flex items-center">
                          <FiUsers size={14} className="mr-1" />
                          {event.attendees?.length || 0}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Organizer Quick Actions */}
        <div className="bg-white rounded-2xl shadow-lg p-6">
          <h2 className="text-xl font-bold text-gray-800 mb-6">Quick Actions</h2>
          <div className="space-y-3">
            <button
              onClick={() => navigate("/create-event")}
              className="w-full flex items-center space-x-3 p-4 bg-green-600 text-white rounded-xl hover:bg-green-700 transition"
            >
              <FiCalendar size={20} />
              <span className="font-medium">Create Event</span>
            </button>
            <button
              onClick={() => navigate("/explore-events")}
              className="w-full flex items-center space-x-3 p-4 bg-blue-600 text-white rounded-xl hover:bg-blue-700 transition"
            >
              <FiUsers size={20} />
              <span className="font-medium">My Events</span>
            </button>
            <button
              onClick={() => navigate("/vendors")}
              className="w-full flex items-center space-x-3 p-4 bg-purple-600 text-white rounded-xl hover:bg-purple-700 transition"
            >
              <FiShoppingBag size={20} />
              <span className="font-medium">Find Vendors</span>
            </button>
            <button
              onClick={() => navigate("/payments")}
              className="w-full flex items-center space-x-3 p-4 bg-orange-600 text-white rounded-xl hover:bg-orange-700 transition"
            >
              <FiDollarSign size={20} />
              <span className="font-medium">Payments</span>
            </button>
          </div>
        </div>
      </div>

      {/* Recent Events */}
      <div className="bg-white rounded-2xl shadow-lg p-6">
        <h2 className="text-xl font-bold text-gray-800 mb-6">Recent Events</h2>
        {recentEvents.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-gray-500">No events yet</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {recentEvents.map((event) => (
              <div
                key={event.id}
                className="border border-gray-200 rounded-xl overflow-hidden hover:shadow-lg transition cursor-pointer"
                onClick={() => navigate(`/events/${event.id}`)}
              >
                <div className="h-40 bg-gradient-to-br from-green-400 to-blue-500 flex items-center justify-center">
                  {event.images && event.images[0] ? (
                    <img
                      src={event.images[0].url}
                      alt={event.title}
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <FiCalendar size={48} className="text-white" />
                  )}
                </div>
                <div className="p-4">
                  <h3 className="font-semibold text-gray-800 mb-2">{event.title}</h3>
                  <p className="text-sm text-gray-500 mb-3 line-clamp-2">
                    {event.description || "No description"}
                  </p>
                  <div className="flex items-center justify-between text-xs text-gray-500">
                    <span>{new Date(event.date).toLocaleDateString()}</span>
                    <span className="font-semibold text-green-600">
                      {event.attendees?.length || 0} attendees
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </DashboardLayout>
  );
};

// ===========================
// ATTENDEE DASHBOARD
// ===========================
const AttendeeDashboard: React.FC<{ events: Event[]; user: any; navigate: any }> = ({ events, user, navigate }) => {
  const upcomingEvents = events
    .filter(e => new Date(e.date) > new Date() && e.status === "active")
    .sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime())
    .slice(0, 8);

  const myRegisteredEvents = events.filter(e => 
    e.attendees?.some(a => a.userId === user.id)
  );

  return (
    <DashboardLayout>
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-800">
          Welcome, {user.username}! 🎉
        </h1>
        <p className="text-gray-600 mt-2">
          Discover and register for amazing events
        </p>
      </div>

      {/* Attendee Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <div className="bg-gradient-to-br from-blue-500 to-blue-600 rounded-2xl p-6 text-white shadow-lg">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-blue-100 text-sm font-medium">Available Events</p>
              <h3 className="text-3xl font-bold mt-2">{upcomingEvents.length}</h3>
              <p className="text-blue-100 text-xs mt-1">Ready to join</p>
            </div>
            <div className="w-12 h-12 bg-white bg-opacity-20 rounded-lg flex items-center justify-center">
              <FiCalendar size={24} />
            </div>
          </div>
        </div>

        <div className="bg-gradient-to-br from-green-500 to-green-600 rounded-2xl p-6 text-white shadow-lg">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-green-100 text-sm font-medium">My Registrations</p>
              <h3 className="text-3xl font-bold mt-2">{myRegisteredEvents.length}</h3>
              <p className="text-green-100 text-xs mt-1">Events joined</p>
            </div>
            <div className="w-12 h-12 bg-white bg-opacity-20 rounded-lg flex items-center justify-center">
              <FiCheckCircle size={24} />
            </div>
          </div>
        </div>

        <div className="bg-gradient-to-br from-purple-500 to-purple-600 rounded-2xl p-6 text-white shadow-lg">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-purple-100 text-sm font-medium">Total Events</p>
              <h3 className="text-3xl font-bold mt-2">{events.length}</h3>
              <p className="text-purple-100 text-xs mt-1">All available</p>
            </div>
            <div className="w-12 h-12 bg-white bg-opacity-20 rounded-lg flex items-center justify-center">
              <FiTrendingUp size={24} />
            </div>
          </div>
        </div>
      </div>

      {/* My Registered Events */}
      {myRegisteredEvents.length > 0 && (
        <div className="bg-white rounded-2xl shadow-lg p-6 mb-8">
          <h2 className="text-xl font-bold text-gray-800 mb-6">My Registered Events</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {myRegisteredEvents.map((event) => (
              <div
                key={event.id}
                className="border-2 border-green-500 rounded-xl overflow-hidden hover:shadow-lg transition cursor-pointer"
                onClick={() => navigate(`/events/${event.id}`)}
              >
                <div className="h-40 bg-gradient-to-br from-green-400 to-blue-500 flex items-center justify-center relative">
                  {event.images && event.images[0] ? (
                    <img
                      src={event.images[0].url}
                      alt={event.title}
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <FiCalendar size={48} className="text-white" />
                  )}
                  <div className="absolute top-2 right-2 bg-green-500 text-white px-3 py-1 rounded-full text-xs font-semibold">
                    Registered ✓
                  </div>
                </div>
                <div className="p-4">
                  <h3 className="font-semibold text-gray-800 mb-2">{event.title}</h3>
                  <div className="flex items-center text-sm text-gray-500 mb-2">
                    <FiClock size={14} className="mr-1" />
                    {new Date(event.date).toLocaleDateString()}
                  </div>
                  <div className="flex items-center text-sm text-gray-500">
                    <FiMapPin size={14} className="mr-1" />
                    {event.location}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Upcoming Events to Explore */}
      <div className="bg-white rounded-2xl shadow-lg p-6">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-bold text-gray-800">Upcoming Events</h2>
          <button
            onClick={() => navigate("/explore-events")}
            className="text-green-600 hover:text-green-700 font-medium text-sm"
          >
            View All →
          </button>
        </div>

        {upcomingEvents.length === 0 ? (
          <div className="text-center py-12">
            <FiCalendar size={48} className="mx-auto text-gray-300 mb-4" />
            <p className="text-gray-500">No upcoming events available</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {upcomingEvents.map((event) => (
              <div
                key={event.id}
                className="border border-gray-200 rounded-xl overflow-hidden hover:shadow-lg transition cursor-pointer"
                onClick={() => navigate(`/events/${event.id}`)}
              >
                <div className="h-32 bg-gradient-to-br from-blue-400 to-purple-500 flex items-center justify-center">
                  {event.images && event.images[0] ? (
                    <img
                      src={event.images[0].url}
                      alt={event.title}
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <FiCalendar size={40} className="text-white" />
                  )}
                </div>
                <div className="p-4">
                  <h3 className="font-semibold text-gray-800 mb-2 line-clamp-1">{event.title}</h3>
                  <div className="flex items-center text-xs text-gray-500 mb-1">
                    <FiClock size={12} className="mr-1" />
                    {new Date(event.date).toLocaleDateString()}
                  </div>
                  <div className="flex items-center text-xs text-gray-500">
                    <FiUsers size={12} className="mr-1" />
                    {event.attendees?.length || 0} going
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </DashboardLayout>
  );
};

// ===========================
// VENDOR DASHBOARD
// ===========================
const VendorDashboard: React.FC<{ events: Event[]; user: any; navigate: any }> = ({ events, user, navigate }) => {
  const upcomingEvents = events
    .filter(e => new Date(e.date) > new Date() && e.status === "active")
    .slice(0, 6);

  return (
    <DashboardLayout>
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-800">
          Welcome, {user.username}! 💼
        </h1>
        <p className="text-gray-600 mt-2">
          Manage your services and connect with event organizers
        </p>
      </div>

      {/* Vendor Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <div className="bg-gradient-to-br from-purple-500 to-purple-600 rounded-2xl p-6 text-white shadow-lg">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-purple-100 text-sm font-medium">Active Events</p>
              <h3 className="text-3xl font-bold mt-2">{upcomingEvents.length}</h3>
              <p className="text-purple-100 text-xs mt-1">Opportunities</p>
            </div>
            <div className="w-12 h-12 bg-white bg-opacity-20 rounded-lg flex items-center justify-center">
              <FiCalendar size={24} />
            </div>
          </div>
        </div>

        <div className="bg-gradient-to-br from-green-500 to-green-600 rounded-2xl p-6 text-white shadow-lg">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-green-100 text-sm font-medium">My Services</p>
              <h3 className="text-3xl font-bold mt-2">Active</h3>
              <p className="text-green-100 text-xs mt-1">Listed</p>
            </div>
            <div className="w-12 h-12 bg-white bg-opacity-20 rounded-lg flex items-center justify-center">
              <FiShoppingBag size={24} />
            </div>
          </div>
        </div>

        <div className="bg-gradient-to-br from-orange-500 to-orange-600 rounded-2xl p-6 text-white shadow-lg">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-orange-100 text-sm font-medium">Rating</p>
              <h3 className="text-3xl font-bold mt-2">4.8</h3>
              <p className="text-orange-100 text-xs mt-1">★★★★★</p>
            </div>
            <div className="w-12 h-12 bg-white bg-opacity-20 rounded-lg flex items-center justify-center">
              <FiStar size={24} />
            </div>
          </div>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="bg-white rounded-2xl shadow-lg p-6 mb-8">
        <h2 className="text-xl font-bold text-gray-800 mb-6">Quick Actions</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <button
            onClick={() => navigate("/vendors")}
            className="flex items-center space-x-3 p-4 bg-purple-600 text-white rounded-xl hover:bg-purple-700 transition"
          >
            <FiShoppingBag size={20} />
            <span className="font-medium">View My Profile</span>
          </button>
          <button
            onClick={() => navigate("/explore-events")}
            className="flex items-center space-x-3 p-4 bg-blue-600 text-white rounded-xl hover:bg-blue-700 transition"
          >
            <FiCalendar size={20} />
            <span className="font-medium">Browse Events</span>
          </button>
          <button
            onClick={() => navigate("/vendors")}
            className="flex items-center space-x-3 p-4 bg-green-600 text-white rounded-xl hover:bg-green-700 transition"
          >
            <FiUsers size={20} />
            <span className="font-medium">Network</span>
          </button>
        </div>
      </div>

      {/* Available Events for Vendors */}
      <div className="bg-white rounded-2xl shadow-lg p-6">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-bold text-gray-800">Event Opportunities</h2>
          <button
            onClick={() => navigate("/explore-events")}
            className="text-green-600 hover:text-green-700 font-medium text-sm"
          >
            View All →
          </button>
        </div>

        {upcomingEvents.length === 0 ? (
          <div className="text-center py-12">
            <FiCalendar size={48} className="mx-auto text-gray-300 mb-4" />
            <p className="text-gray-500">No events available</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {upcomingEvents.map((event) => (
              <div
                key={event.id}
                className="border border-gray-200 rounded-xl overflow-hidden hover:shadow-lg transition cursor-pointer"
                onClick={() => navigate(`/events/${event.id}`)}
              >
                <div className="h-40 bg-gradient-to-br from-purple-400 to-pink-500 flex items-center justify-center">
                  {event.images && event.images[0] ? (
                    <img
                      src={event.images[0].url}
                      alt={event.title}
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <FiCalendar size={48} className="text-white" />
                  )}
                </div>
                <div className="p-4">
                  <h3 className="font-semibold text-gray-800 mb-2">{event.title}</h3>
                  <div className="flex items-center text-sm text-gray-500 mb-2">
                    <FiClock size={14} className="mr-1" />
                    {new Date(event.date).toLocaleDateString()}
                  </div>
                  <div className="flex items-center text-sm text-gray-500 mb-3">
                    <FiMapPin size={14} className="mr-1" />
                    {event.location}
                  </div>
                  <button className="w-full py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition text-sm font-medium">
                    Contact Organizer
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </DashboardLayout>
  );
};

export default Dashboard;
