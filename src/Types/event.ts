// src/types/event.ts
export interface Event {
  id: number;
  title: string;
  date: string;
  location: string;
  image: string;
  attendees: number;
  ticketsSold: number;
  revenue: number;
}
