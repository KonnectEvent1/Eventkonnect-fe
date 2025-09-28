// src/Types/index.ts
export interface Feature {
  id: number;
  title: string;
  description: string;
  icon: string;
}

export interface Event {
  id: number;
  title: string;
  date: string;
  location: string;
  image: string;
  attendees: number;
  ticketsSold: number;
  revenue: number;
  price?: number;
  description?: string;
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


