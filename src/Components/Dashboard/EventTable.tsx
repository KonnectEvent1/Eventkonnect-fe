import React from "react";

interface Event {
  id: number;
  title: string;
  date: string;
  location?: string; // Make location optional
  image: string;
  description?: string; // Add other optional properties from mockData
}

interface EventTableProps {
  events: Event[];
}

const EventTable: React.FC<EventTableProps> = ({ events }) => {
  return (
    <div className="bg-white rounded-xl shadow overflow-auto">
      <table className="min-w-full divide-y divide-gray-200">
        <thead className="bg-gray-50">
          <tr>
            <th className="px-6 py-3 text-left text-sm font-medium text-gray-500 uppercase">
              Event Title
            </th>
            <th className="px-6 py-3 text-left text-sm font-medium text-gray-500 uppercase">
              Date
            </th>
            <th className="px-6 py-3 text-left text-sm font-medium text-gray-500 uppercase">
              Location
            </th>
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200">
          {events.map((event) => (
            <tr key={event.id} className="hover:bg-gray-50">
              <td className="px-6 py-4">{event.title}</td>
              <td className="px-6 py-4">{event.date}</td>
              <td className="px-6 py-4">{event.location || "N/A"}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default EventTable;
