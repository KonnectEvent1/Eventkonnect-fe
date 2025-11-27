// src/services/vendor.service.ts
import api from "../api";

export interface Vendor {
  id: string;
  userId: string;
  companyName: string;
  serviceArea?: string;
  rating?: number;
  description?: string;
  phone?: string;
  email?: string;
  user?: {
    username: string;
    email: string;
    phone?: string;
  };
}

class VendorService {
  async getAllVendors() {
    const response = await api.get("/vendors/all");
    return response;
  }

  async getVendorById(vendorId: string) {
    const response = await api.get(`/vendors/${vendorId}`);
    return response;
  }

  async updateVendor(vendorId: string, data: Partial<Vendor>) {
    const response = await api.put(`/vendors/${vendorId}`, data);
    return response;
  }
}

export default new VendorService();
