// src/Data/mockData.ts
import bridalShowerImg from "../Components/Events/image/bridal shower image.jpeg";
import corporateImg from "../Components/Events/image/corporate.jpeg";
import weddingImg from "../Components/Events/image/wedding image.jpeg";
import happyBirthdayImg from "../Components/Events/image/HappyBirthday image.jpeg";
import otherImg from "../Components/Events/image/other image.jpeg";

export interface Event {
  id: number;
  title: string;
  description: string;
  image: string;
  date?: string;
  location?: string;
  attendees?: number;
  ticketsSold?: number;
  revenue?: number;
  price?: number;
}

export const events: Event[] = [
  {
    id: 1,
    title: "Bridal Shower",
    description: "Celebrate love and friendship beautifully.",
    image: bridalShowerImg,
    date: "2024-01-15",
    location: "Grand Ballroom",
    price: 75,
    attendees: 45,
    ticketsSold: 40,
    revenue: 3000,
  },
  {
    id: 2,
    title: "Birthday Party",
    description: "Make birthdays unforgettable with fun and memories.",
    image: happyBirthdayImg,
    date: "2024-01-20",
    location: "Party Hall",
    price: 50,
    attendees: 60,
    ticketsSold: 55,
    revenue: 2750,
  },
  {
    id: 3,
    title: "Wedding",
    description: "Turn your dream wedding into reality with elegance.",
    image: weddingImg,
    date: "2024-02-14",
    location: "Garden Venue",
    price: 150,
    attendees: 120,
    ticketsSold: 100,
    revenue: 15000,
  },
  {
    id: 4,
    title: "Corporate Events",
    description: "Professional planning for meetings and conferences.",
    image: corporateImg,
    date: "2024-01-25",
    location: "Conference Center",
    price: 200,
    attendees: 80,
    ticketsSold: 75,
    revenue: 15000,
  },
  {
    id: 5,
    title: "Other Celebrations",
    description: "From baby showers to anniversaries, we bring events to life.",
    image: otherImg,
    date: "2024-02-01",
    location: "Various Locations",
    price: 65,
    attendees: 35,
    ticketsSold: 30,
    revenue: 1950,
  },
];
