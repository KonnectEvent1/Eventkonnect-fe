// src/services/auth.service.ts
import api from "../api";

interface RegisterData {
  username: string;
  email: string;
  password: string;
  phone: string;
  organisationName?: string;
  companyName?: string;
  serviceArea?: string;
}

class AuthService {
  async registerOrganizer(data: RegisterData) {
    const response = await api.post(`/auth/signup/organiser`, data);
    return response;
  }

  async registerVendor(data: RegisterData) {
    const response = await api.post("/auth/signup/vendor", data);
    return response;
  }

  async registerAttendee(data: RegisterData) {
    const response = await api.post("/auth/signup/attendee", data);
    return response;
  }

  async login(email: string, password: string) {
    try {
      const response = await api.post("/auth/login", {
        email,
        password,
      });

      console.log("=== LOGIN RESPONSE ===");
      console.log("Full response:", response);

      // Your backend returns: { message: "...", data: "JWT_TOKEN_STRING", error: "" }
      let accessToken = null;
      let userData = null;

      // Extract token - it's directly in response.data as a string
      if (
        typeof response?.data === "string" &&
        response.data.startsWith("eyJ")
      ) {
        // JWT token found
        accessToken = response.data;
        console.log("✅ Found JWT token in response.data");

        // Decode JWT to get user info
        try {
          const base64Url = accessToken.split(".")[1];
          const base64 = base64Url.replace(/-/g, "+").replace(/_/g, "/");
          const jsonPayload = decodeURIComponent(
            atob(base64)
              .split("")
              .map((c) => "%" + ("00" + c.charCodeAt(0).toString(16)).slice(-2))
              .join(""),
          );
          const decoded = JSON.parse(jsonPayload);

          // Create user object from JWT payload
          userData = {
            id: decoded.sub,
            email: decoded.email,
            role: decoded.role,
            username: decoded.email.split("@")[0], // Use email prefix as username
          };

          console.log("✅ Decoded user from JWT:", userData);
        } catch (decodeError) {
          console.error("Failed to decode JWT:", decodeError);
        }
      } else {
        console.log("Response.data type:", typeof response?.data);
        console.log("Response.data value:", response?.data);
      }

      if (accessToken && userData) {
        localStorage.setItem("accessToken", accessToken);
        localStorage.setItem("user", JSON.stringify(userData));
        console.log("✅ Token and user saved to localStorage");
        return response;
      } else {
        console.error("❌ Missing token or user data");
        console.error("Token:", accessToken ? "EXISTS" : "MISSING");
        console.error("User:", userData ? "EXISTS" : "MISSING");
        throw new Error("Invalid login response from server");
      }
    } catch (error) {
      console.error("Login error:", error);
      throw error;
    }
  }

  logout() {
    localStorage.removeItem("accessToken");
    localStorage.removeItem("user");
    window.location.href = "/login";
  }

  getCurrentUser() {
    const userStr = localStorage.getItem("user");
    return userStr ? JSON.parse(userStr) : null;
  }

  isLoggedIn() {
    return !!localStorage.getItem("accessToken");
  }

  async verifyEmail(token: string) {
    const response = await api.get(`/auth/verify-email?token=${token}`);
    return response;
  }
}

export default new AuthService();
