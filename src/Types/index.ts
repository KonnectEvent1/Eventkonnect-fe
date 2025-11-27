// src/Types/index.ts
export interface Feature {
  id: number;
  title: string;
  description: string;
  icon: string;
}

export interface User {
  id: string;
  username: string;
  email: string;
  phone?: string;
  avatar?: string;
  role: string;
  isVerified: boolean;
  createdAt: string;
  organisationName?: string;
  companyName?: string;
  serviceArea?: string;
}

export interface Event {
  id: string;
  title: string;
  description?: string;
  location: string;
  date: string;
  budget: number;
  status: "active" | "cancelled" | "postponed" | "completed";
  organizerId: string;
  organizer?: User;
  images?: Array<{ url: string; publicId: string }>;
  attendees?: EventAttendee[];
  createdAt: string;
  updatedAt?: string;
  // Legacy fields for dashboard compatibility
  image?: string;
  ticketsSold?: number;
  revenue?: number;
  price?: number;
}

export interface EventAttendee {
  id: string;
  eventId: string;
  userId: string;
  status: "PENDING" | "CONFIRMED" | "CANCELLED" | "CHECKED_IN";
  user?: User;
  createdAt: string;
}

export interface Testimonial {
  id: number;
  name: string;
  role: string;
  content: string;
  avatar: string;
}

export interface Vendor {
  id: string;
  name: string;
  category: string;
  location: string;
  rating?: number;
  priceRange?: string;
  image?: string;
}

export interface ApiResponse<T> {
  message: string;
  data: T;
  error?: string;
}

// For dashboard components
export interface OverviewCardProps {
  title: string;
  value: number | string;
  icon?: React.ReactNode;
  bgColor?: string;
}

export interface EventTableProps {
  events: Event[];
}

export interface ChartSectionProps {
  events: Event[];
}

export type QuickActionsProps = Record<string, never>;
