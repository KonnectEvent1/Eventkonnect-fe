import React from "react";
import DashboardLayout from "../Components/Dashboard/DashboardLayout";
import OverviewCard from "../Components/Dashboard/OverviewCard";
import EventTable from "../Components/Dashboard/EventTable";
import QuickActions from "../Components/Dashboard/QuickActions";
import ChartSection from "../Components/Dashboard/ChartSection";
import { events } from "../Data/mockData";

// Icons for overview cards
const EventIcon = () => (
  <div className="p-3 bg-blue-100 rounded-full">
    <svg
      className="w-6 h-6 text-blue-600"
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
  </div>
);

const VendorIcon = () => (
  <div className="p-3 bg-green-100 rounded-full">
    <svg
      className="w-6 h-6 text-green-600"
      fill="none"
      stroke="currentColor"
      viewBox="0 0 24 24"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
        d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"
      />
    </svg>
  </div>
);

const PaymentIcon = () => (
  <div className="p-3 bg-purple-100 rounded-full">
    <svg
      className="w-6 h-6 text-purple-600"
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
  </div>
);

const ProgressIcon = () => (
  <div className="p-3 bg-orange-100 rounded-full">
    <svg
      className="w-6 h-6 text-orange-600"
      fill="none"
      stroke="currentColor"
      viewBox="0 0 24 24"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
        d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
      />
    </svg>
  </div>
);

const Dashboard: React.FC = () => {
  // Calculate metrics focused on vendors, payments, and planning
  const totalEvents = events.length;
  const totalVendors = 24; // Mock vendor count
  const totalPayments = events.reduce((sum, event) => sum + event.revenue, 0);
  const averagePlanningProgress = 75; // Mock progress percentage

  // Vendor-related calculations
  const activeVendors = 18;
  const pendingPayments = 3;
  const upcomingDeadlines = events.filter(
    (event) => new Date(event.date) > new Date(),
  ).length;

  return (
    <DashboardLayout>
      {/* Header Section */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-800">Event Dashboard</h1>
        <p className="text-gray-600 mt-2">
          Track vendors, payments, and planning progress in one place
        </p>
      </div>

      {/* Overview Cards - Focused on vendors, payments, planning */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <OverviewCard
          title="Active Events"
          value={totalEvents}
          icon={<EventIcon />}
          bgColor="bg-white"
        />
        <OverviewCard
          title="Total Vendors"
          value={totalVendors}
          icon={<VendorIcon />}
          bgColor="bg-white"
        />
        <OverviewCard
          title="Total Payments"
          value={`$${totalPayments.toLocaleString()}`}
          icon={<PaymentIcon />}
          bgColor="bg-white"
        />
        <OverviewCard
          title="Planning Progress"
          value={`${averagePlanningProgress}%`}
          icon={<ProgressIcon />}
          bgColor="bg-white"
        />
      </div>

      {/* Quick Actions & Planning Status */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-8">
        {/* Quick Actions */}
        <div className="lg:col-span-1">
          <div className="bg-white rounded-xl shadow p-6 h-full">
            <h2 className="text-xl font-bold text-gray-800 mb-4">
              Quick Actions
            </h2>
            <QuickActions />
          </div>
        </div>

        <div className="lg:col-span-2">
          <div className="bg-white rounded-xl shadow p-6 h-full">
            <h2 className="text-xl font-bold text-gray-800 mb-4">
              Planning Progress
            </h2>
            <div className="space-y-4">
              <div>
                <div className="flex justify-between mb-2">
                  <span className="text-gray-700 font-medium">
                    Overall Event Planning
                  </span>
                  <span className="text-blue-600 font-bold">
                    {averagePlanningProgress}%
                  </span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-3">
                  <div
                    className="bg-blue-600 h-3 rounded-full transition-all duration-500"
                    style={{ width: `${averagePlanningProgress}%` }}
                  ></div>
                </div>
              </div>

              <div>
                <div className="flex justify-between mb-2">
                  <span className="text-gray-700 font-medium">
                    Vendor Coordination
                  </span>
                  <span className="text-green-600 font-bold">85%</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-3">
                  <div
                    className="bg-green-600 h-3 rounded-full transition-all duration-500"
                    style={{ width: "85%" }}
                  ></div>
                </div>
              </div>

              <div>
                <div className="flex justify-between mb-2">
                  <span className="text-gray-700 font-medium">
                    Payment Processing
                  </span>
                  <span className="text-purple-600 font-bold">92%</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-3">
                  <div
                    className="bg-purple-600 h-3 rounded-full transition-all duration-500"
                    style={{ width: "92%" }}
                  ></div>
                </div>
              </div>

              <div>
                <div className="flex justify-between mb-2">
                  <span className="text-gray-700 font-medium">
                    Logistics Planning
                  </span>
                  <span className="text-orange-600 font-bold">68%</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-3">
                  <div
                    className="bg-orange-600 h-3 rounded-full transition-all duration-500"
                    style={{ width: "68%" }}
                  ></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
        <div className="bg-white rounded-xl shadow p-6">
          <h2 className="text-xl font-bold text-gray-800 mb-4">
            Vendor Status
          </h2>
          <div className="space-y-4">
            <div className="flex justify-between items-center p-3 bg-green-50 rounded-lg">
              <div className="flex items-center">
                <div className="w-3 h-3 bg-green-500 rounded-full mr-3"></div>
                <span className="text-gray-700">Active Vendors</span>
              </div>
              <span className="font-semibold text-green-600">
                {activeVendors}
              </span>
            </div>
            <div className="flex justify-between items-center p-3 bg-yellow-50 rounded-lg">
              <div className="flex items-center">
                <div className="w-3 h-3 bg-yellow-500 rounded-full mr-3"></div>
                <span className="text-gray-700">Pending Approvals</span>
              </div>
              <span className="font-semibold text-yellow-600">4</span>
            </div>
            <div className="flex justify-between items-center p-3 bg-red-50 rounded-lg">
              <div className="flex items-center">
                <div className="w-3 h-3 bg-red-500 rounded-full mr-3"></div>
                <span className="text-gray-700">Issues Reported</span>
              </div>
              <span className="font-semibold text-red-600">2</span>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow p-6">
          <h2 className="text-xl font-bold text-gray-800 mb-4">
            Payment Overview
          </h2>
          <div className="space-y-4">
            <div className="flex justify-between items-center p-3 bg-blue-50 rounded-lg">
              <div className="flex items-center">
                <div className="w-3 h-3 bg-blue-500 rounded-full mr-3"></div>
                <span className="text-gray-700">Completed Payments</span>
              </div>
              <span className="font-semibold text-blue-600">
                ${(totalPayments * 0.85).toLocaleString()}
              </span>
            </div>
            <div className="flex justify-between items-center p-3 bg-orange-50 rounded-lg">
              <div className="flex items-center">
                <div className="w-3 h-3 bg-orange-500 rounded-full mr-3"></div>
                <span className="text-gray-700">Pending Payments</span>
              </div>
              <span className="font-semibold text-orange-600">
                {pendingPayments}
              </span>
            </div>
            <div className="flex justify-between items-center p-3 bg-purple-50 rounded-lg">
              <div className="flex items-center">
                <div className="w-3 h-3 bg-purple-500 rounded-full mr-3"></div>
                <span className="text-gray-700">Upcoming Deadlines</span>
              </div>
              <span className="font-semibold text-purple-600">
                {upcomingDeadlines}
              </span>
            </div>
          </div>
        </div>
      </div>

      <div className="mb-8">
        <ChartSection events={events} />
      </div>

      <div className="bg-white rounded-xl shadow">
        <div className="p-6 border-b border-gray-200">
          <div className="flex justify-between items-center">
            <div>
              <h2 className="text-xl font-bold text-gray-800">Recent Events</h2>
              <p className="text-gray-600 mt-1">
                Manage events, vendors, and payments
              </p>
            </div>
          </div>
        </div>
        <EventTable events={events} />
      </div>
    </DashboardLayout>
  );
};

export default Dashboard;
