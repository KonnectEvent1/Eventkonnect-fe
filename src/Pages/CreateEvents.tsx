import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-hot-toast";
import EventService from "../services/event.service";

const CreateEvent: React.FC = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    location: "",
    date: "",
    budget: "",
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      await EventService.createEvent({
        title: formData.title,
        description: formData.description,
        location: formData.location,
        date: formData.date,
        budget: parseFloat(formData.budget),
      });

      toast.success("Event created successfully!");
      setFormData({
        title: "",
        description: "",
        location: "",
        date: "",
        budget: "",
      });

      setTimeout(() => navigate("/dashboard"), 1500);
    } catch (err) {
      const error = err as { error?: string; message?: string; statusCode?: number };
      
      if (error?.statusCode === 403 || error?.error === "Forbidden") {
        toast.error("Only Organizers can create events. Please register as an Organizer!");
        setTimeout(() => navigate("/register"), 2000);
      } else if (error?.error === "Unauthorized") {
        toast.error("Please login to create events");
        navigate("/login");
      } else {
        toast.error(error?.message || error?.error || "Failed to create event");
      }
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-black via-gray-900 to-green-900">
      {/* Header */}
      <div className="bg-black bg-opacity-50 border-b border-gray-800">
        <div className="container mx-auto px-4 py-12 text-center">
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
            Create Your <span className="text-green-500">Event</span>
          </h1>
          <p className="text-gray-300 text-lg">
            Bring your event vision to life
          </p>
        </div>
      </div>

      {/* Form Container */}
      <div className="container mx-auto px-4 py-12">
        <div className="max-w-3xl mx-auto">
          <form
            onSubmit={handleSubmit}
            className="bg-gray-900 bg-opacity-90 backdrop-blur-sm rounded-3xl p-6 sm:p-8 md:p-12 shadow-2xl border border-gray-800"
          >
            {/* Event Title */}
            <div className="mb-6">
              <label className="block text-gray-300 font-semibold mb-3 text-lg">
                Event Title
              </label>
              <input
                type="text"
                name="title"
                value={formData.title}
                onChange={handleChange}
                required
                className="w-full px-4 py-3 bg-gray-800 text-white border border-gray-700 rounded-xl focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent transition"
                placeholder="e.g., Annual Tech Conference 2024"
              />
            </div>

            {/* Location & Date */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
              <div>
                <label className="block text-gray-300 font-semibold mb-3 text-lg">
                  Location
                </label>
                <input
                  type="text"
                  name="location"
                  value={formData.location}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3 bg-gray-800 text-white border border-gray-700 rounded-xl focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent transition"
                  placeholder="Event venue or city"
                />
              </div>

              <div>
                <label className="block text-gray-300 font-semibold mb-3 text-lg">
                  Event Date
                </label>
                <input
                  type="datetime-local"
                  name="date"
                  value={formData.date}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3 bg-gray-800 text-white border border-gray-700 rounded-xl focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent transition"
                />
              </div>
            </div>

            {/* Budget */}
            <div className="mb-6">
              <label className="block text-gray-300 font-semibold mb-3 text-lg">
                Budget (RWF)
              </label>
              <div className="relative">
                <span className="absolute left-4 top-3 text-gray-400 text-lg">
                  RWF
                </span>
                <input
                  type="number"
                  name="budget"
                  value={formData.budget}
                  onChange={handleChange}
                  required
                  min="0"
                  step="100"
                  className="w-full pl-20 pr-4 py-3 bg-gray-800 text-white border border-gray-700 rounded-xl focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent transition"
                  placeholder="0"
                />
              </div>
            </div>

            {/* Description */}
            <div className="mb-8">
              <label className="block text-gray-300 font-semibold mb-3 text-lg">
                Event Description
              </label>
              <textarea
                name="description"
                value={formData.description}
                onChange={handleChange}
                rows={6}
                className="w-full px-4 py-3 bg-gray-800 text-white border border-gray-700 rounded-xl focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent transition resize-none"
                placeholder="Describe your event, what attendees can expect, schedule, etc."
              />
            </div>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row gap-4">
              <button
                type="button"
                onClick={() => navigate(-1)}
                className="flex-1 py-3 px-6 bg-gray-800 text-white rounded-xl font-semibold hover:bg-gray-700 transition-all border border-gray-700"
              >
                Cancel
              </button>
              <button
                type="submit"
                disabled={loading}
                className={`flex-1 py-3 px-6 rounded-xl font-semibold transition-all ${
                  loading
                    ? "bg-green-700 text-white cursor-wait"
                    : "bg-gradient-to-r from-green-600 to-green-700 text-white hover:from-green-700 hover:to-green-800 shadow-lg hover:shadow-xl"
                }`}
              >
                {loading ? (
                  <span className="flex items-center justify-center">
                    <svg
                      className="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                    >
                      <circle
                        className="opacity-25"
                        cx="12"
                        cy="12"
                        r="10"
                        stroke="currentColor"
                        strokeWidth="4"
                      ></circle>
                      <path
                        className="opacity-75"
                        fill="currentColor"
                        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                      ></path>
                    </svg>
                    Creating Event...
                  </span>
                ) : (
                  "Create Event"
                )}
              </button>
            </div>
          </form>

          {/* Info Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-8">
            <div className="bg-gray-900 bg-opacity-70 p-4 rounded-xl border border-gray-800">
              <div className="text-green-500 text-2xl mb-2">📅</div>
              <h3 className="text-white font-semibold mb-1">Plan Ahead</h3>
              <p className="text-gray-400 text-sm">
                Set your event date and venue
              </p>
            </div>
            <div className="bg-gray-900 bg-opacity-70 p-4 rounded-xl border border-gray-800">
              <div className="text-green-500 text-2xl mb-2">💰</div>
              <h3 className="text-white font-semibold mb-1">Budget Wisely</h3>
              <p className="text-gray-400 text-sm">
                Define your event budget clearly
              </p>
            </div>
            <div className="bg-gray-900 bg-opacity-70 p-4 rounded-xl border border-gray-800">
              <div className="text-green-500 text-2xl mb-2">✨</div>
              <h3 className="text-white font-semibold mb-1">Be Detailed</h3>
              <p className="text-gray-400 text-sm">
                Provide comprehensive description
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CreateEvent;
