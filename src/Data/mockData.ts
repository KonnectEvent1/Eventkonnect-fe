import type { Feature } from "../Types";
import type { Event } from "../Types";
import type { Testimonial } from "../Types";

export const features: Feature[] = [
  {
    id: 1,
    title: "Connect with People",
    description:
      "Meet like-minded individuals and expand your network through various events.",
    icon: "👥",
  },
  {
    id: 2,
    title: "Easy Event Management",
    description:
      "Create and manage events with our intuitive tools and organized dashboard.",
    icon: "📅",
  },
  {
    id: 3,
    title: "Discover Events",
    description:
      "Find events that match your interests and preferences with smart recommendations.",
    icon: "🔍",
  },
];

export const events: Event[] = [
  {
    id: 1,
    title: "Kigali Tech Summit",
    date: "June 15, 2023",
    location: "Kigali Convention Center",
    image:
      "https://images.unsplash.com/photo-1511795409834-ef04bbd61622?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80",
  },
  {
    id: 2,
    title: "Rwanda Music Festival",
    date: "July 22, 2023",
    location: "Amahoro Stadium",
    image:
      "https://images.unsplash.com/photo-1524368535928-5b5e00ddc76b?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80",
  },
  {
    id: 3,
    title: "Startup Workshop",
    date: "August 5, 2023",
    location: "Innovation Hub, Kigali",
    image:
      "https://images.unsplash.com/photo-1555244162-803834f70033?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80",
  },
];

export const testimonials: Testimonial[] = [
  {
    id: 1,
    name: "Alice Mukamana",
    role: "Event Organizer",
    content:
      '"EventKonnect made planning my wedding so much easier. I found all my vendors in one place."',
    avatar: "https://randomuser.me/api/portraits/women/65.jpg",
  },
  {
    id: 2,
    name: "John Habimana",
    role: "Catering Service Owner",
    content:
      '"As a vendor, EventKonnect has helped me reach more clients and grow my business."',
    avatar: "https://randomuser.me/api/portraits/men/32.jpg",
  },
  {
    id: 3,
    name: "Marie Aimee",
    role: "Event Attendee",
    content:
      '"I\'ve attended several events I discovered on EventKonnect. The recommendation system is great."',
    avatar: "https://randomuser.me/api/portraits/women/45.jpg",
  },
];
