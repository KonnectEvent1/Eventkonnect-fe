// src/Pages/CreateEvent.tsx
import React, { useState } from "react";
import api from "../api";

const CreateEvent: React.FC = () => {
  const [title, setTitle] = useState("");
  const [date, setDate] = useState("");
  const [details, setDetails] = useState(""); // ✅ replaced price with details
  const [message, setMessage] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await api.post("/events/create", {
        title,
        date,
        description: details, // backend expects description
      });
      setMessage("Event created successfully!");
      setTitle("");
      setDate("");
      setDetails("");
    } catch (err) {
      console.error(err);
      setMessage("Failed to create event.");
    }
  };

  return (
    <div className="min-h-screen bg-black text-white flex items-center justify-center p-6">
      <form
        onSubmit={handleSubmit}
        className="bg-gray-900 p-8 rounded-xl shadow-lg w-full max-w-md"
      >
        <h1 className="text-3xl font-bold text-green-400 mb-6 text-center">
          Create Your Event
        </h1>

        {message && (
          <p className="mb-4 text-center text-yellow-400">{message}</p>
        )}

        <input
          type="text"
          placeholder="Event Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="w-full mb-4 p-2 rounded bg-gray-800 text-white"
          required
        />

        <input
          type="date"
          placeholder="Event Date"
          value={date}
          onChange={(e) => setDate(e.target.value)}
          className="w-full mb-4 p-2 rounded bg-gray-800 text-white"
          required
        />

        <textarea
          placeholder="Event Details / Description"
          value={details}
          onChange={(e) => setDetails(e.target.value)}
          className="w-full mb-6 p-2 rounded bg-gray-800 text-white h-32 resize-none"
          required
        />

        <button
          type="submit"
          className="w-full bg-green-600 text-white py-2 rounded hover:bg-green-700 transition-colors"
        >
          Create Event
        </button>
      </form>
    </div>
  );
};

export default CreateEvent;
