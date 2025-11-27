import React, { useState, useEffect } from "react";
import { toast } from "react-hot-toast";
import DashboardLayout from "../Components/Dashboard/DashboardLayout";
import VendorService from "../services/vendor.service";
import type { Vendor } from "../services/vendor.service";
import { 
  FiMail, 
  FiPhone, 
  FiStar, 
  FiBriefcase,
  FiSearch
} from "react-icons/fi";

const Vendors: React.FC = () => {
  const [vendors, setVendors] = useState<Vendor[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedService, setSelectedService] = useState("all");

  useEffect(() => {
    fetchVendors();
  }, []);

  const fetchVendors = async () => {
    try {
      const response = await VendorService.getAllVendors();
      setVendors(response.data || []);
    } catch (err) {
      console.error(err);
      toast.error("Failed to load vendors");
    } finally {
      setLoading(false);
    }
  };

  const serviceCategories = [
    "all",
    ...Array.from(new Set(vendors.map(v => v.serviceArea).filter(Boolean)))
  ];

  const filteredVendors = vendors.filter(vendor => {
    const matchesSearch = 
      vendor.companyName?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      vendor.serviceArea?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      vendor.user?.username?.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesService = 
      selectedService === "all" || vendor.serviceArea === selectedService;
    
    return matchesSearch && matchesService;
  });

  if (loading) {
    return (
      <DashboardLayout>
        <div className="flex items-center justify-center h-full">
          <div className="text-center">
            <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-green-500 mx-auto"></div>
            <p className="text-gray-600 mt-4">Loading vendors...</p>
          </div>
        </div>
      </DashboardLayout>
    );
  }

  return (
    <DashboardLayout>
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-800">Find Vendors</h1>
        <p className="text-gray-600 mt-2">
          Connect with professional event service providers
        </p>
      </div>

      {/* Search and Filter */}
      <div className="bg-white rounded-2xl shadow-lg p-6 mb-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* Search */}
          <div className="relative">
            <FiSearch className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
            <input
              type="text"
              placeholder="Search vendors by name or service..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-12 pr-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
            />
          </div>

          {/* Service Filter */}
          <select
            value={selectedService}
            onChange={(e) => setSelectedService(e.target.value)}
            className="px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
          >
            {serviceCategories.map(category => (
              <option key={category} value={category}>
                {category === "all" ? "All Services" : category}
              </option>
            ))}
          </select>
        </div>

        <div className="mt-4 text-sm text-gray-600">
          Found {filteredVendors.length} vendor{filteredVendors.length !== 1 ? 's' : ''}
        </div>
      </div>

      {/* Vendors Grid */}
      {filteredVendors.length === 0 ? (
        <div className="bg-white rounded-2xl shadow-lg p-12 text-center">
          <FiBriefcase size={64} className="mx-auto text-gray-300 mb-4" />
          <h3 className="text-xl font-semibold text-gray-800 mb-2">
            {vendors.length === 0 ? "No Vendors Yet" : "No Vendors Found"}
          </h3>
          <p className="text-gray-600">
            {vendors.length === 0 
              ? "Be the first to register as a vendor!"
              : "Try adjusting your search or filters"}
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredVendors.map((vendor) => (
            <div
              key={vendor.id}
              className="bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow"
            >
              {/* Header */}
              <div className="bg-gradient-to-br from-green-500 to-green-600 p-6 text-white">
                <div className="w-16 h-16 bg-white bg-opacity-20 rounded-full flex items-center justify-center mb-4">
                  <span className="text-2xl font-bold">
                    {vendor.companyName?.charAt(0).toUpperCase()}
                  </span>
                </div>
                <h3 className="text-xl font-bold">{vendor.companyName}</h3>
                {vendor.serviceArea && (
                  <p className="text-green-100 text-sm mt-1">{vendor.serviceArea}</p>
                )}
              </div>

              {/* Body */}
              <div className="p-6">
                {/* Rating */}
                {vendor.rating && (
                  <div className="flex items-center mb-4">
                    <FiStar className="text-yellow-400 fill-current" size={18} />
                    <span className="ml-2 font-semibold text-gray-800">
                      {vendor.rating.toFixed(1)}
                    </span>
                    <span className="ml-1 text-gray-500 text-sm">/5.0</span>
                  </div>
                )}

                {/* Description */}
                {vendor.description && (
                  <p className="text-gray-600 text-sm mb-4 line-clamp-3">
                    {vendor.description}
                  </p>
                )}

                {/* Contact Info */}
                <div className="space-y-2">
                  {vendor.user?.email && (
                    <div className="flex items-center text-sm text-gray-600">
                      <FiMail size={16} className="mr-2 text-green-600" />
                      <span className="truncate">{vendor.user.email}</span>
                    </div>
                  )}
                  {vendor.user?.phone && (
                    <div className="flex items-center text-sm text-gray-600">
                      <FiPhone size={16} className="mr-2 text-green-600" />
                      <span>{vendor.user.phone}</span>
                    </div>
                  )}
                </div>

                {/* Action Button */}
                <button
                  onClick={() => {
                    if (vendor.user?.email) {
                      window.location.href = `mailto:${vendor.user.email}`;
                    } else {
                      toast.error("Contact information not available");
                    }
                  }}
                  className="w-full mt-6 py-3 bg-green-600 text-white rounded-xl font-semibold hover:bg-green-700 transition-colors"
                >
                  Contact Vendor
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Stats Footer */}
      <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="bg-white rounded-xl p-6 text-center shadow">
          <div className="text-3xl font-bold text-green-600">{vendors.length}</div>
          <div className="text-gray-600 text-sm mt-1">Total Vendors</div>
        </div>
        <div className="bg-white rounded-xl p-6 text-center shadow">
          <div className="text-3xl font-bold text-blue-600">
            {serviceCategories.length - 1}
          </div>
          <div className="text-gray-600 text-sm mt-1">Service Categories</div>
        </div>
        <div className="bg-white rounded-xl p-6 text-center shadow">
          <div className="text-3xl font-bold text-purple-600">
            {vendors.filter(v => v.rating && v.rating >= 4).length}
          </div>
          <div className="text-gray-600 text-sm mt-1">Top Rated</div>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default Vendors;
