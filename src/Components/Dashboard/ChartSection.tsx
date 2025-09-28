// src/Components/Dashboard/ChartSection.tsx
import React from "react";

interface Event {
  id: number;
  title: string;
  date: string;
  location: string;
  image: string;
  attendees: number;
  ticketsSold: number;
  revenue: number;
}

interface ChartSectionProps {
  events: Event[];
}

const ChartSection: React.FC<ChartSectionProps> = ({ events }) => {
  // Calculate totals from events
  const totalRevenue = events.reduce((sum, event) => sum + event.revenue, 0);
  const totalAttendees = events.reduce(
    (sum, event) => sum + event.attendees,
    0,
  );
  const totalTicketsSold = events.reduce(
    (sum, event) => sum + event.ticketsSold,
    0,
  );

  // Calculate chart data from events
  const revenueData = events.map((event) => ({
    name: event.title,
    revenue: event.revenue,
  }));

  const attendanceData = events.map((event) => ({
    name: event.title,
    attendees: event.attendees,
    ticketsSold: event.ticketsSold,
  }));

  return (
    <div className="bg-white rounded-xl shadow p-6">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-xl font-bold text-gray-800">Event Analytics</h2>
        <select className="bg-gray-100 border border-gray-300 rounded-lg px-3 py-2 text-sm">
          <option>Last 7 days</option>
          <option>Last 30 days</option>
          <option>Last 3 months</option>
          <option>All Time</option>
        </select>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Revenue Chart */}
        <div className="bg-gray-50 rounded-lg p-6">
          <h3 className="text-lg font-semibold text-gray-800 mb-4">
            Revenue by Event
          </h3>
          <div className="space-y-4">
            {revenueData.map((event) => (
              <div
                key={event.name}
                className="flex items-center justify-between"
              >
                <span className="text-sm font-medium text-gray-700 truncate max-w-[120px]">
                  {event.name}
                </span>
                <div className="flex items-center gap-3">
                  <div className="w-32 bg-gray-200 rounded-full h-2">
                    <div
                      className="bg-green-600 h-2 rounded-full"
                      style={{
                        width: `${(event.revenue / Math.max(...revenueData.map((e) => e.revenue))) * 100}%`,
                      }}
                    ></div>
                  </div>
                  <span className="text-sm font-semibold text-gray-800 min-w-[60px]">
                    ${event.revenue.toLocaleString()}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Attendance Chart */}
        <div className="bg-gray-50 rounded-lg p-6">
          <h3 className="text-lg font-semibold text-gray-800 mb-4">
            Attendance vs Capacity
          </h3>
          <div className="space-y-4">
            {attendanceData.map((event) => {
              const attendanceRate =
                (event.ticketsSold / event.attendees) * 100;
              return (
                <div
                  key={event.name}
                  className="flex items-center justify-between"
                >
                  <span className="text-sm font-medium text-gray-700 truncate max-w-[120px]">
                    {event.name}
                  </span>
                  <div className="flex items-center gap-3">
                    <div className="w-32 bg-gray-200 rounded-full h-2">
                      <div
                        className="bg-blue-600 h-2 rounded-full"
                        style={{ width: `${attendanceRate}%` }}
                      ></div>
                    </div>
                    <span className="text-sm font-semibold text-gray-800 min-w-[60px]">
                      {attendanceRate.toFixed(0)}%
                    </span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* Summary Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-6 pt-6 border-t border-gray-200">
        <div className="text-center">
          <div className="text-2xl font-bold text-green-600">
            ${totalRevenue.toLocaleString()}
          </div>
          <div className="text-sm text-gray-600">Total Revenue</div>
        </div>
        <div className="text-center">
          <div className="text-2xl font-bold text-blue-600">
            {totalAttendees.toLocaleString()}
          </div>
          <div className="text-sm text-gray-600">Total Capacity</div>
        </div>
        <div className="text-center">
          <div className="text-2xl font-bold text-purple-600">
            {((totalTicketsSold / totalAttendees) * 100).toFixed(1)}%
          </div>
          <div className="text-sm text-gray-600">Overall Attendance Rate</div>
        </div>
      </div>
    </div>
  );
};

export default ChartSection;
