import React from "react";
import {
  FaUsers,
  FaMoneyBillWave,
  FaChartPie,
  FaQrcode,
  FaStar,
  FaStore,
} from "react-icons/fa";
import { MdMessage } from "react-icons/md";
import { BsLaptop } from "react-icons/bs";

const Features: React.FC = () => {
  const features = [
    {
      icon: <BsLaptop className="text-green-600 text-4xl mb-4" />,
      title: "Responsive Design",
      desc: "Works seamlessly on mobile, tablet, and desktop devices.",
    },
    {
      icon: <FaStore className="text-green-600 text-4xl mb-4" />,
      title: "Vendor Marketplace",
      desc: "Browse and search for vendors by category, location, and budget.",
    },
    {
      icon: <FaMoneyBillWave className="text-green-600 text-4xl mb-4" />,
      title: "Secure Payments",
      desc: "Pay easily with MTN MoMo, Airtel Money, and M-Pesa.",
    },
    {
      icon: <FaChartPie className="text-green-600 text-4xl mb-4" />,
      title: "Event Dashboard",
      desc: "Manage your events, vendors, and payments in one place.",
    },
    {
      icon: <MdMessage className="text-green-600 text-4xl mb-4" />,
      title: "Direct Messaging",
      desc: "Communicate instantly with vendors for smoother planning.",
    },
    {
      icon: <FaUsers className="text-green-600 text-4xl mb-4" />,
      title: "Budget Planner",
      desc: "Plan your event expenses with a detailed cost breakdown tool.",
    },
    {
      icon: <FaQrcode className="text-green-600 text-4xl mb-4 " />,
      title: "QR Check-In",
      desc: "Streamline guest check-in with QR code scanning system.",
    },
    {
      icon: <FaStar className="text-green-600 text-4xl mb-4" />,
      title: "Reviews & Ratings",
      desc: "Build trust with authentic reviews and vendor ratings.",
    },
  ];

  return (
    <section className="py-20 bg-white">
      <div className="container mx-auto px-6">
        <h2 className="text-4xl font-extrabold text-center text-gray-900 mb-6">
          Why Choose <span className="text-green-600">EventKonnect?</span>
        </h2>
        <p className="text-center text-gray-600 mb-12 max-w-2xl mx-auto">
          EventKonnect simplifies and centralizes the event planning process .
          From planning and payments to vendor collaboration, we’ve got you
          covered.
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((feature, index) => (
            <div
              key={index}
              className="p-6 bg-gray-50 rounded-2xl shadow-md hover:shadow-xl transition-transform transform hover:-translate-y-2 text-center"
            >
              <div className="flex justify-center items-center">
                {feature.icon}
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">
                {feature.title}
              </h3>
              <p className="text-gray-600 text-sm">{feature.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Features;
