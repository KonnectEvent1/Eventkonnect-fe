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
}

export interface Testimonial {
  id: number;
  name: string;
  role: string;
  content: string;
  avatar: string;
}
