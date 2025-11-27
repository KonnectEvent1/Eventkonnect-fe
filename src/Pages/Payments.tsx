import React, { useState, useEffect } from "react";
import { toast } from "react-hot-toast";
import DashboardLayout from "../Components/Dashboard/DashboardLayout";
import EventService from "../services/event.service";
import type { Event } from "../Types";
import { 
  FiDollarSign, 
  FiCreditCard, 
  FiCheckCircle,
  FiClock,
  FiAlertCircle
} from "react-icons/fi";

interface Payment {
  id: string;
  eventId: string;
  eventTitle: string;
  amount: number;
  status: "pending" | "completed" | "failed";
  date: string;
  method: string;
}

const Payments: React.FC = () => {
  const [events, setEvents] = useState<Event[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedTab, setSelectedTab] = useState<"all" | "pending" | "completed">("all");

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const response = await EventService.getAllEvents();
      setEvents(response.data || []);
    } catch (err) {
      console.error(err);
      toast.error("Failed to load payment data");
    } finally {
      setLoading(false);
    }
  };

  // Mock payment data based on events
  const payments: Payment[] = events.map((event, index) => ({
    id: `PAY-${event.id}`,
    eventId: event.id,
    eventTitle: event.title,
    amount: event.budget,
    status: index % 3 === 0 ? "completed" : index % 3 === 1 ? "pending" : "completed",
    date: event.createdAt,
    method: index % 2 === 0 ? "Mobile Money" : "Bank Transfer"
  }));

  const totalPaid = payments
    .filter(p => p.status === "completed")
    .reduce((sum, p) => sum + p.amount, 0);

  const totalPending = payments
    .filter(p => p.status === "pending")
    .reduce((sum, p) => sum + p.amount, 0);

  const filteredPayments = payments.filter(payment => {
    if (selectedTab === "all") return true;
    return payment.status === selectedTab;
  });

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "completed":
        return <FiCheckCircle className="text-green-500" size={20} />;
      case "pending":
        return <FiClock className="text-yellow-500" size={20} />;
      case "failed":
        return <FiAlertCircle className="text-red-500" size={20} />;
      default:
        return null;
    }
  };

  const getStatusBadge = (status: string) => {
    const baseClasses = "px-3 py-1 rounded-full text-xs font-semibold";
    switch (status) {
      case "completed":
        return `${baseClasses} bg-green-100 text-green-600`;
      case "pending":
        return `${baseClasses} bg-yellow-100 text-yellow-600`;
      case "failed":
        return `${baseClasses} bg-red-100 text-red-600`;
      default:
        return baseClasses;
    }
  };

  if (loading) {
    return (
      <DashboardLayout>
        <div className="flex items-center justify-center h-full">
          <div className="text-center">
            <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-green-500 mx-auto"></div>
            <p className="text-gray-600 mt-4">Loading payments...</p>
          </div>
        </div>
      </DashboardLayout>
    );
  }

  return (
    <DashboardLayout>
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-800">Payments</h1>
        <p className="text-gray-600 mt-2">
          Track and manage your event payments
        </p>
      </div>

      {/* Statistics Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
        <div className="bg-gradient-to-br from-green-500 to-green-600 rounded-2xl p-6 text-white shadow-lg">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-green-100 text-sm font-medium">Total Paid</p>
              <h3 className="text-2xl font-bold mt-2">
                RWF {(totalPaid / 1000000).toFixed(1)}M
              </h3>
            </div>
            <div className="w-12 h-12 bg-white bg-opacity-20 rounded-lg flex items-center justify-center">
              <FiCheckCircle size={24} />
            </div>
          </div>
        </div>

        <div className="bg-gradient-to-br from-yellow-500 to-yellow-600 rounded-2xl p-6 text-white shadow-lg">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-yellow-100 text-sm font-medium">Pending</p>
              <h3 className="text-2xl font-bold mt-2">
                RWF {(totalPending / 1000000).toFixed(1)}M
              </h3>
            </div>
            <div className="w-12 h-12 bg-white bg-opacity-20 rounded-lg flex items-center justify-center">
              <FiClock size={24} />
            </div>
          </div>
        </div>

        <div className="bg-gradient-to-br from-blue-500 to-blue-600 rounded-2xl p-6 text-white shadow-lg">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-blue-100 text-sm font-medium">Transactions</p>
              <h3 className="text-2xl font-bold mt-2">{payments.length}</h3>
            </div>
            <div className="w-12 h-12 bg-white bg-opacity-20 rounded-lg flex items-center justify-center">
              <FiCreditCard size={24} />
            </div>
          </div>
        </div>

        <div className="bg-gradient-to-br from-purple-500 to-purple-600 rounded-2xl p-6 text-white shadow-lg">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-purple-100 text-sm font-medium">Success Rate</p>
              <h3 className="text-2xl font-bold mt-2">
                {payments.length > 0 
                  ? ((payments.filter(p => p.status === "completed").length / payments.length) * 100).toFixed(0)
                  : 0}%
              </h3>
            </div>
            <div className="w-12 h-12 bg-white bg-opacity-20 rounded-lg flex items-center justify-center">
              <FiDollarSign size={24} />
            </div>
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div className="bg-white rounded-2xl shadow-lg mb-8">
        <div className="border-b border-gray-200">
          <div className="flex space-x-8 px-6">
            {[
              { key: "all", label: "All Payments" },
              { key: "completed", label: "Completed" },
              { key: "pending", label: "Pending" }
            ].map(tab => (
              <button
                key={tab.key}
                onClick={() => setSelectedTab(tab.key as typeof selectedTab)}
                className={`py-4 px-2 border-b-2 font-medium transition-colors ${
                  selectedTab === tab.key
                    ? "border-green-600 text-green-600"
                    : "border-transparent text-gray-500 hover:text-gray-700"
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>
        </div>

        {/* Payments List */}
        <div className="p-6">
          {filteredPayments.length === 0 ? (
            <div className="text-center py-12">
              <FiCreditCard size={48} className="mx-auto text-gray-300 mb-4" />
              <h3 className="text-lg font-semibold text-gray-800 mb-2">
                No Payments Found
              </h3>
              <p className="text-gray-600">
                {selectedTab === "all" 
                  ? "You don't have any payment transactions yet."
                  : `No ${selectedTab} payments at the moment.`}
              </p>
            </div>
          ) : (
            <div className="space-y-4">
              {filteredPayments.map((payment) => (
                <div
                  key={payment.id}
                  className="flex items-center justify-between p-4 bg-gray-50 rounded-xl hover:bg-gray-100 transition"
                >
                  <div className="flex items-center space-x-4 flex-1">
                    <div className="w-12 h-12 bg-white rounded-lg flex items-center justify-center">
                      {getStatusIcon(payment.status)}
                    </div>
                    <div className="flex-1">
                      <h4 className="font-semibold text-gray-800">
                        {payment.eventTitle}
                      </h4>
                      <div className="flex items-center space-x-4 mt-1 text-sm text-gray-500">
                        <span>{payment.method}</span>
                        <span>•</span>
                        <span>{new Date(payment.date).toLocaleDateString()}</span>
                        <span>•</span>
                        <span className="font-medium">ID: {payment.id}</span>
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center space-x-4">
                    <div className="text-right">
                      <div className="font-bold text-gray-800">
                        RWF {payment.amount.toLocaleString()}
                      </div>
                      <div className={getStatusBadge(payment.status)}>
                        {payment.status.charAt(0).toUpperCase() + payment.status.slice(1)}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Payment Methods */}
      <div className="bg-white rounded-2xl shadow-lg p-6">
        <h2 className="text-xl font-bold text-gray-800 mb-6">Payment Methods</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="p-6 border-2 border-gray-200 rounded-xl hover:border-green-500 transition cursor-pointer">
            <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center mb-4">
              <FiCreditCard className="text-green-600" size={24} />
            </div>
            <h3 className="font-semibold text-gray-800 mb-2">Mobile Money</h3>
            <p className="text-sm text-gray-600">MTN, Airtel, Tigo</p>
          </div>

          <div className="p-6 border-2 border-gray-200 rounded-xl hover:border-green-500 transition cursor-pointer">
            <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mb-4">
              <FiDollarSign className="text-blue-600" size={24} />
            </div>
            <h3 className="font-semibold text-gray-800 mb-2">Bank Transfer</h3>
            <p className="text-sm text-gray-600">All major banks</p>
          </div>

          <div className="p-6 border-2 border-gray-200 rounded-xl hover:border-green-500 transition cursor-pointer">
            <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center mb-4">
              <FiCreditCard className="text-purple-600" size={24} />
            </div>
            <h3 className="font-semibold text-gray-800 mb-2">Credit Card</h3>
            <p className="text-sm text-gray-600">Visa, Mastercard</p>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default Payments;
