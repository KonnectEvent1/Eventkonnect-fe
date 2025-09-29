// src/Data/mockData.ts

// Define the Event type
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

// Sample events data
export const events: Event[] = [
  {
    id: 1,
    title: "Kigali Tech Summit 2025",
    date: "2025-09-20",
    location: "Kigali Convention Center",
    image:
      "https://images.unsplash.com/photo-1581091870622-6b6b5e5f4e39?auto=format&fit=crop&w=600&q=80",
    attendees: 1500,
    ticketsSold: 1450,
    revenue: 72500,
    price: 50,
    description:
      "The largest technology conference in Rwanda featuring industry leaders and innovators.",
  },
  {
    id: 2,
    title: "Rwanda Music Festival",
    date: "2025-10-10",
    location: "Amahoro Stadium",
    image:
      "https://images.unsplash.com/photo-1529101091764-c3526daf38fe?auto=format&fit=crop&w=600&q=80",
    attendees: 10000,
    ticketsSold: 9800,
    revenue: 245000,
    price: 25,
    description:
      "Annual music festival showcasing Rwanda's best artists and international acts.",
  },
  {
    id: 3,
    title: "Startup Workshop Kigali",
    date: "2025-11-05",
    location: "Innovation Hub",
    image:
      "https://images.unsplash.com/photo-1551836022-0970f01d6d6c?auto=format&fit=crop&w=600&q=80",
    attendees: 200,
    ticketsSold: 180,
    revenue: 9000,
    price: 50,
    description:
      "Hands-on workshop for aspiring entrepreneurs and startup founders.",
  },
  {
    id: 4,
    title: "New Year Gala",
    date: "2025-12-31",
    location: "Kigali Convention Hall",
    image:
      "https://images.unsplash.com/photo-1515169067865-5387ec356754?auto=format&fit=crop&w=600&q=80",
    attendees: 500,
    ticketsSold: 480,
    revenue: 24000,
    price: 50,
    description:
      "Elegant New Year's Eve celebration with fine dining and entertainment.",
  },
  {
    id: 5,
    title: "Rwanda Fashion Week",
    date: "2025-08-15",
    location: "Kigali Marriott Hotel",
    image:
      "https://images.unsplash.com/photo-1534452203293-494d7ddbf7e0?auto=format&fit=crop&w=600&q=80",
    attendees: 800,
    ticketsSold: 750,
    revenue: 37500,
    price: 50,
    description:
      "Premier fashion event showcasing African designers and emerging talent.",
  },
  {
    id: 6,
    title: "Food & Culture Festival",
    date: "2025-07-22",
    location: "Kimironko Market Square",
    image:
      "https://images.unsplash.com/photo-1555939594-58d7cb561ad1?auto=format&fit=crop&w=600&q=80",
    attendees: 3000,
    ticketsSold: 2850,
    revenue: 42750,
    price: 15,
    description:
      "Celebration of Rwandan cuisine and cultural heritage with local vendors.",
  },
];
