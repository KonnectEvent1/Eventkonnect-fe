# EventKonnect Frontend - Integration Guide

## 🚀 Overview

EventKonnect is a comprehensive event management platform built with React, TypeScript, and Tailwind CSS. This frontend connects seamlessly with the EventKonnect backend API.

## 📋 Prerequisites

- Node.js (v16 or higher)
- npm or yarn
- EventKonnect Backend running on `http://localhost:5000`

## 🛠️ Installation

1. **Clone the repository**
```bash
git clone <repository-url>
cd Eventkonnect-fe
```

2. **Install dependencies**
```bash
npm install
```

3. **Configure environment variables**
```bash
cp .env.example .env
```

Edit `.env` file:
```env
VITE_API_URL=http://localhost:5000/api/v1
VITE_API_DOCS=http://localhost:5000/api/docs
```

4. **Start the development server**
```bash
npm run dev
```

The app will be available at `http://localhost:5173`

## 🏗️ Project Structure

```
src/
├── api.ts                    # Axios instance with interceptors
├── services/                 # API service classes
│   ├── auth.service.ts       # Authentication services
│   ├── user.service.ts       # User management services
│   └── event.service.ts      # Event management services
├── Components/
│   ├── ProtectedRoute.tsx    # Route protection HOC
│   ├── Navbar.tsx
│   ├── Hero/
│   ├── Features/
│   ├── Footer/
│   └── Dashboard/
├── Pages/
│   ├── Login.tsx             # Login page
│   ├── Register.tsx          # Registration page
│   ├── ExploreEvents.tsx     # Browse all events
│   ├── CreateEvents.tsx      # Create new event
│   ├── Dashboard.tsx         # Admin dashboard
│   └── ...
├── Types/
│   └── index.ts              # TypeScript interfaces
└── main.tsx                  # App entry point
```

## 🔐 Authentication Flow

### Login
```typescript
import AuthService from './services/auth.service';

const handleLogin = async () => {
  try {
    await AuthService.login(email, password);
    // Token is automatically stored
    navigate('/dashboard');
  } catch (error) {
    console.error('Login failed:', error);
  }
};
```

### Register
```typescript
import AuthService from './services/auth.service';

// For Attendees
await AuthService.registerAttendee(formData);

// For Organizers
await AuthService.registerOrganizer(formData);

// For Vendors
await AuthService.registerVendor(formData);
```

### Protected Routes
```tsx
import ProtectedRoute from './Components/ProtectedRoute';

<Route 
  path="/dashboard" 
  element={
    <ProtectedRoute allowedRoles={['ORGANIZER', 'ADMIN']}>
      <Dashboard />
    </ProtectedRoute>
  } 
/>
```

## 📡 API Services

### Event Service
```typescript
import EventService from './services/event.service';

// Get all events
const events = await EventService.getAllEvents();

// Create event
await EventService.createEvent({
  title: "My Event",
  description: "Event description",
  location: "Kigali, Rwanda",
  date: "2024-12-31T18:00:00",
  budget: 5000000
});

// Register for event
await EventService.registerForEvent(eventId);

// Get event attendees
const attendees = await EventService.getEventAttendees(eventId);
```

### User Service
```typescript
import UserService from './services/user.service';

// Get current user profile
const profile = await UserService.getProfile();

// Update profile
await UserService.updateProfile({
  username: "newusername",
  phone: "+250123456789"
});
```

## 🎨 Design System

### Colors
- **Primary Green**: `#10b981` (green-500)
- **Dark Background**: `#000000` (black)
- **Card Background**: `#1f2937` (gray-900)
- **Border**: `#374151` (gray-800)

### Responsive Breakpoints
```css
sm: 640px   /* Mobile landscape */
md: 768px   /* Tablet */
lg: 1024px  /* Desktop */
xl: 1280px  /* Large desktop */
```

### Common Components

#### Button Styles
```tsx
// Primary Button
<button className="bg-gradient-to-r from-green-600 to-green-700 text-white py-3 px-6 rounded-xl font-semibold hover:from-green-700 hover:to-green-800">
  Click Me
</button>

// Secondary Button
<button className="bg-gray-800 text-white py-3 px-6 rounded-xl font-semibold hover:bg-gray-700">
  Cancel
</button>
```

#### Card
```tsx
<div className="bg-gray-900 bg-opacity-90 backdrop-blur-sm rounded-3xl p-8 border border-gray-800">
  {/* Content */}
</div>
```

#### Input Fields
```tsx
<input 
  type="text"
  className="w-full px-4 py-3 bg-gray-800 text-white border border-gray-700 rounded-xl focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent transition"
  placeholder="Enter text"
/>
```

## 🔔 Notifications

Using `react-hot-toast`:

```typescript
import { toast } from 'react-hot-toast';

// Success
toast.success('Operation successful!');

// Error
toast.error('Something went wrong');

// Loading
const toastId = toast.loading('Processing...');
// Later: toast.dismiss(toastId);
```

## 📱 Responsive Design

All pages are fully responsive with mobile-first approach:

```tsx
<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
  {/* Cards adapt to screen size */}
</div>
```

## 🚦 API Endpoints Reference

### Authentication
- `POST /auth/signup/attendee` - Register attendee
- `POST /auth/signup/organiser` - Register organizer
- `POST /auth/signup/vendor` - Register vendor
- `POST /auth/login` - Login
- `GET /auth/verify-email?token=<token>` - Verify email

### Events
- `GET /events/all` - Get all events
- `GET /events/:id` - Get event by ID
- `POST /events/create` - Create event
- `PATCH /events/update/:id` - Update event
- `DELETE /events/delete/:id` - Delete event
- `PATCH /events/status/:id` - Update event status
- `POST /events/:id/attendees` - Register for event
- `GET /events/:id/attendees` - Get event attendees

### User
- `GET /user/me` - Get current user
- `PUT /user/update` - Update profile
- `DELETE /user/delete` - Delete account

## 🧪 Testing

```bash
# Run linter
npm run lint

# Fix linting issues
npm run lint:fix

# Format code
npm run format

# Type check
npm run type-check
```

## 🏗️ Build for Production

```bash
# Build optimized production bundle
npm run build

# Preview production build
npm run preview
```

## 🔧 Troubleshooting

### CORS Issues
Ensure the backend has CORS enabled for `http://localhost:5173`

### Authentication Errors
- Check if token is stored: `localStorage.getItem('accessToken')`
- Verify API URL in `.env` file
- Check network tab for 401/403 errors

### API Connection Failed
- Ensure backend is running on `http://localhost:5000`
- Check `.env` file configuration
- Verify network connectivity

## 📝 Contributing

1. Create a feature branch
2. Make changes with proper commit messages
3. Run linter and tests
4. Submit pull request

## 🎯 Key Features Implemented

✅ User Authentication (Login/Register)
✅ Event Creation and Management
✅ Event Exploration and RSVP
✅ Protected Routes
✅ Responsive Design
✅ Toast Notifications
✅ Type-safe API calls
✅ Error Handling
✅ Loading States
✅ Form Validation

## 📚 Additional Resources

- [React Documentation](https://react.dev)
- [TypeScript Documentation](https://www.typescriptlang.org/docs/)
- [Tailwind CSS Documentation](https://tailwindcss.com/docs)
- [React Router Documentation](https://reactrouter.com)
- [Axios Documentation](https://axios-http.com/docs/intro)

## 📞 Support

For issues or questions, please contact the development team or create an issue in the repository.

---

Made with ❤️ by the EventKonnect Team
