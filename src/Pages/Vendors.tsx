// src/pages/Vendors.tsx
import React, { useEffect, useState } from "react";

interface Vendor {
  id: string;
  name: string;
  category: string;
  location: string;
}

const Vendors: React.FC = () => {
  const [vendors, setVendors] = useState<Vendor[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchVendors = async () => {
      try {
        const response = await fetch("YOUR_BACKEND_API/vendors");
        const data = await response.json();
        setVendors(data);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchVendors();
  }, []);

  return (
    <div className="min-h-screen p-6 bg-gray-50">
      {loading ? (
        <p className="text-center">Loading vendors...</p>
      ) : (
        <div className="grid md:grid-cols-3 gap-6">
          {vendors.map((vendor) => (
            <div
              key={vendor.id}
              className="p-4 bg-white rounded-lg shadow-md hover:shadow-lg transition"
            >
              <h2 className="font-bold text-lg">{vendor.name}</h2>
              <p>Category: {vendor.category}</p>
              <p>Location: {vendor.location}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Vendors;
