// src/services/user.service.ts
import api from "../api";

interface UpdateProfileData {
  username?: string;
  email?: string;
  phone?: string;
  avatar?: string;
}

class UserService {
  async getProfile() {
    const response = await api.get("/user/me");
    return response;
  }

  async updateProfile(data: UpdateProfileData) {
    const response = await api.put("/user/update", data);

    if (response.data) {
      const currentUser = JSON.parse(localStorage.getItem("user") || "{}");
      localStorage.setItem(
        "user",
        JSON.stringify({
          ...currentUser,
          ...response.data,
        })
      );
    }

    return response;
  }

  async deleteAccount() {
    const response = await api.delete("/user/delete");

    localStorage.removeItem("accessToken");
    localStorage.removeItem("user");

    return response;
  }
}

export default new UserService();
