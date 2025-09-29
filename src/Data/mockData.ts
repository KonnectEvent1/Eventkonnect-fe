// src/Data/mockData.ts
export interface Event {
  id: number;
  title: string;
  date?: string;
  location?: string;
  image: string;
  attendees?: number;
  ticketsSold?: number;
  revenue?: number;
  price?: number;
  description?: string;
}

export const events: Event[] = [
  {
    id: 1,
    title: "Bridal Shower",
    description: "Celebrate love and friendship beautifully.",
    image: "/images/bridal-shower.jpeg",
  },
  {
    id: 2,
    title: "Birthday Party",
    description: "Make birthdays unforgettable with fun and memories.",
    image: "/images/happy-birthday.jpeg",
  },
  {
    id: 3,
    title: "Wedding",
    description: "Turn your dream wedding into reality with elegance.",
    image: "/images/wedding.jpeg",
  },
  {
    id: 4,
    title: "Corporate Events",
    description: "Professional planning for meetings and conferences.",
    image: "/images/corporate.jpeg",
  },
  {
    id: 5,
    title: "Other Celebrations",
    description: "From baby showers to anniversaries, we bring events to life.",
    image: "/images/other.jpeg",
  },
];
