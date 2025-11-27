// src/services/event.service.ts
import api from "../api";

export interface EventData {
  title: string;
  description?: string;
  location: string;
  date: string;
  budget: number;
  status?: "active" | "cancelled" | "postponed" | "completed";
}

class EventService {
  async getAllEvents() {
    const response = await api.get("/events/all");
    return response;
  }

  async getEventById(eventId: string) {
    const response = await api.get(`/events/${eventId}`);
    return response;
  }

  async createEvent(eventData: EventData) {
    const response = await api.post("/events/create", eventData);
    return response;
  }

  async updateEvent(eventId: string, eventData: Partial<EventData>) {
    const response = await api.patch(`/events/update/${eventId}`, eventData);
    return response;
  }

  async deleteEvent(eventId: string) {
    const response = await api.delete(`/events/delete/${eventId}`);
    return response;
  }

  async updateEventStatus(
    eventId: string,
    status: "active" | "cancelled" | "postponed" | "completed"
  ) {
    const response = await api.patch(`/events/status/${eventId}`, { status });
    return response;
  }

  async registerForEvent(eventId: string) {
    const response = await api.post(`/events/${eventId}/attendees`);
    return response;
  }

  async getEventAttendees(eventId: string) {
    const response = await api.get(`/events/${eventId}/attendees`);
    return response;
  }

  async updateAttendeeStatus(
    eventId: string,
    userId: string,
    status: "PENDING" | "CONFIRMED" | "CANCELLED" | "CHECKED_IN"
  ) {
    const response = await api.patch(
      `/events/${eventId}/attendees/${userId}/status`,
      { status }
    );
    return response;
  }
}

export default new EventService();
